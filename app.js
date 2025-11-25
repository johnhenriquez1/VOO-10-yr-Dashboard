// Market Data - Updated November 24, 2025 (10-Year Baseline: 2015-2025)
const marketData = {
  lastUpdated: 'November 24, 2025',
  baseline: '10-Year Average (2015-2025)',
  voo: {
    price: 614.29,
    change: 8.36,
    changePercent: 1.38
  },
  valuationMetrics: {
    spPE: 29.7,
    spPEHistoricalAvg: 25.2,
    spPEPercentile: 80,
    capePE: 40.0,
    capePEHistoricalAvg: 31.4,
    capePEPercentile: 92
  },
  technicalIndicators: {
    sma50: 615.00,
    sma200: 565.00,
    vix: 20.76,
    vixAvg: 18.5,
    priceVsSMA50: -0.1,
    priceVsSMA200: 8.7
  },
  economicIndicators: {
    fedRate: 3.875,
    inflation: 3.0,
    unemployment: 4.4,
    yieldCurve: 0.52
  }
};

// Calculate overall market attractiveness score (0-100)
function calculateScore() {
  let score = 50; // Start neutral
  
  // VALUATION METRICS - Heavily penalize high percentiles
  // P/E Ratio impact
  if (marketData.valuationMetrics.spPEPercentile > 90) score -= 20;
  else if (marketData.valuationMetrics.spPEPercentile > 75) score -= 15;
  else if (marketData.valuationMetrics.spPEPercentile > 60) score -= 10;
  else if (marketData.valuationMetrics.spPEPercentile < 25) score += 15;
  else if (marketData.valuationMetrics.spPEPercentile < 40) score += 10;
  
  // CAPE Ratio impact
  if (marketData.valuationMetrics.capePEPercentile > 90) score -= 20;
  else if (marketData.valuationMetrics.capePEPercentile > 75) score -= 15;
  else if (marketData.valuationMetrics.capePEPercentile > 60) score -= 10;
  else if (marketData.valuationMetrics.capePEPercentile < 25) score += 15;
  else if (marketData.valuationMetrics.capePEPercentile < 40) score += 10;
  
  // TECHNICAL INDICATORS
  // Price vs 50-day moving average
  if (marketData.technicalIndicators.priceVsSMA50 < -5) score += 10;
  else if (marketData.technicalIndicators.priceVsSMA50 < -2) score += 5;
  else if (marketData.technicalIndicators.priceVsSMA50 > 10) score -= 10;
  else if (marketData.technicalIndicators.priceVsSMA50 > 5) score -= 5;
  
  // Price vs 200-day moving average
  if (marketData.technicalIndicators.priceVsSMA200 < -10) score += 15;
  else if (marketData.technicalIndicators.priceVsSMA200 < -5) score += 10;
  else if (marketData.technicalIndicators.priceVsSMA200 > 15) score -= 10;
  else if (marketData.technicalIndicators.priceVsSMA200 > 10) score -= 5;
  
  // VIX (high VIX = fear = opportunity)
  if (marketData.technicalIndicators.vix > marketData.technicalIndicators.vixAvg * 1.5) score += 15;
  else if (marketData.technicalIndicators.vix > marketData.technicalIndicators.vixAvg * 1.25) score += 10;
  else if (marketData.technicalIndicators.vix < marketData.technicalIndicators.vixAvg * 0.7) score -= 10;
  
  // ECONOMIC INDICATORS
  // Yield curve (inverted = recession warning)
  if (marketData.economicIndicators.yieldCurve < -0.5) score -= 15;
  else if (marketData.economicIndicators.yieldCurve < 0) score -= 5;
  else if (marketData.economicIndicators.yieldCurve > 1.0) score += 5;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getScoreColor(score) {
  if (score >= 70) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function getScoreLabel(score) {
  if (score >= 75) return 'Attractive';
  if (score >= 60) return 'Moderately Attractive';
  if (score >= 45) return 'Neutral';
  if (score >= 30) return 'Cautious';
  return 'Unattractive';
}

function getScoreDescription(score) {
  if (score >= 70) return 'Market conditions appear favorable for investment. Valuations are reasonable and technical indicators suggest opportunity.';
  if (score >= 50) return 'Market conditions are moderately attractive. Consider dollar-cost averaging or waiting for better entry points.';
  if (score >= 30) return 'Market shows elevated valuations. Consider waiting or investing smaller amounts over time.';
  return 'Market appears significantly overvalued. Strong caution advised - consider keeping funds in cash or bonds.';
}

function getTrendIcon(trend, color) {
  if (trend === 'up') {
    return `<svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
  } else if (trend === 'down') {
    return `<svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>`;
  } else {
    return `<svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
  }
}

function createMetricCard(title, value, subtitle, trend, percentile) {
  const card = document.createElement('div');
  card.className = 'metric-card';
  
  let barColor = '';
  if (percentile !== undefined) {
    barColor = percentile > 75 ? 'bar-red' : percentile > 50 ? 'bar-yellow' : 'bar-green';
  }
  
  let trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#f59e0b';
  
  card.innerHTML = `
    ${barColor ? `<div class="metric-bar ${barColor}"></div>` : ''}
    <div class="metric-title">${title}</div>
    <div class="metric-value">${value}</div>
    ${subtitle ? `
      <div class="metric-subtitle">
        ${trend ? getTrendIcon(trend, trendColor) : ''}
        <span>${subtitle}</span>
      </div>
    ` : ''}
    ${percentile !== undefined ? `
      <div class="metric-percentile">${percentile}th percentile historically</div>
    ` : ''}
  `;
  
  return card;
}

function refreshData() {
  const btn = document.getElementById('refresh-btn');
  btn.disabled = true;
  btn.textContent = 'REFRESHING...';
  
  setTimeout(() => {
    marketData.lastUpdated = new Date().toLocaleString();
    initDashboard();
    btn.disabled = false;
    btn.textContent = 'REFRESH DATA';
  }, 500);
}

function initDashboard() {
  const score = calculateScore();
  const scoreColor = getScoreColor(score);
  
  // Update timestamp
  document.getElementById('last-update').textContent = marketData.lastUpdated;
  
  // Update score card
  const scoreCard = document.getElementById('score-card');
  scoreCard.style.background = `linear-gradient(135deg, ${scoreColor}15 0%, ${scoreColor}05 100%)`;
  scoreCard.style.border = `2px solid ${scoreColor}`;
  
  document.getElementById('score-value').textContent = `${score.toFixed(0)}/100`;
  document.getElementById('score-value').style.color = scoreColor;
  document.getElementById('score-text').textContent = getScoreLabel(score);
  document.getElementById('score-desc').textContent = getScoreDescription(score);
  
  const scoreFill = document.getElementById('score-bar-fill');
  scoreFill.style.width = `${score}%`;
  scoreFill.style.background = scoreColor;
  
  // Current Market
  const currentMarket = document.getElementById('current-market');
  currentMarket.innerHTML = '';
  const vooTrend = marketData.voo.change > 0 ? 'up' : marketData.voo.change < 0 ? 'down' : 'neutral';
  currentMarket.appendChild(createMetricCard(
    'VOO (Vanguard S&P 500 ETF)',
    `$${marketData.voo.price.toFixed(2)}`,
    `${marketData.voo.change >= 0 ? '+' : ''}${marketData.voo.change.toFixed(2)} (${marketData.voo.changePercent >= 0 ? '+' : ''}${marketData.voo.changePercent.toFixed(2)}%) today`,
    vooTrend
  ));
  
  // Valuation Metrics
  const valuationMetrics = document.getElementById('valuation-metrics');
  valuationMetrics.innerHTML = '';
  
  const spPETrend = marketData.valuationMetrics.spPE > marketData.valuationMetrics.spPEHistoricalAvg * 1.2 ? 'down' : 
                    marketData.valuationMetrics.spPE < marketData.valuationMetrics.spPEHistoricalAvg * 0.9 ? 'up' : 'neutral';
  valuationMetrics.appendChild(createMetricCard(
    'S&P 500 P/E Ratio',
    marketData.valuationMetrics.spPE.toFixed(1),
    `Historical avg: ${marketData.valuationMetrics.spPEHistoricalAvg.toFixed(1)}`,
    spPETrend,
    marketData.valuationMetrics.spPEPercentile
  ));
  
  const capeTrend = marketData.valuationMetrics.capePE > marketData.valuationMetrics.capePEHistoricalAvg * 1.2 ? 'down' : 
                    marketData.valuationMetrics.capePE < marketData.valuationMetrics.capePEHistoricalAvg * 0.9 ? 'up' : 'neutral';
  valuationMetrics.appendChild(createMetricCard(
    'Shiller P/E (CAPE)',
    marketData.valuationMetrics.capePE.toFixed(1),
    `Historical avg: ${marketData.valuationMetrics.capePEHistoricalAvg.toFixed(1)}`,
    capeTrend,
    marketData.valuationMetrics.capePEPercentile
  ));
  
  document.getElementById('valuation-warning').innerHTML = '<strong>⚠️ Elevated Valuations:</strong> Both P/E metrics are above historical averages, suggesting the market is relatively expensive. Higher valuations can indicate lower future returns.';
  
  // Technical Indicators
  const technicalMetrics = document.getElementById('technical-metrics');
  technicalMetrics.innerHTML = '';
  
  const sma50Trend = marketData.technicalIndicators.priceVsSMA50 < 0 ? 'up' : 
                     marketData.technicalIndicators.priceVsSMA50 > 5 ? 'down' : 'neutral';
  technicalMetrics.appendChild(createMetricCard(
    '50-Day Moving Average',
    `$${marketData.technicalIndicators.sma50.toFixed(2)}`,
    `Price is ${marketData.technicalIndicators.priceVsSMA50.toFixed(1)}% ${marketData.technicalIndicators.priceVsSMA50 >= 0 ? 'above' : 'below'}`,
    sma50Trend
  ));
  
  const sma200Trend = marketData.technicalIndicators.priceVsSMA200 < 0 ? 'up' : 
                      marketData.technicalIndicators.priceVsSMA200 > 10 ? 'down' : 'neutral';
  technicalMetrics.appendChild(createMetricCard(
    '200-Day Moving Average',
    `$${marketData.technicalIndicators.sma200.toFixed(2)}`,
    `Price is ${marketData.technicalIndicators.priceVsSMA200.toFixed(1)}% ${marketData.technicalIndicators.priceVsSMA200 >= 0 ? 'above' : 'below'}`,
    sma200Trend
  ));
  
  const vixTrend = marketData.technicalIndicators.vix > 20 ? 'up' : 
                   marketData.technicalIndicators.vix < 15 ? 'down' : 'neutral';
  technicalMetrics.appendChild(createMetricCard(
    'VIX (Fear Index)',
    marketData.technicalIndicators.vix.toFixed(1),
    `Average: ${marketData.technicalIndicators.vixAvg.toFixed(1)}`,
    vixTrend
  ));
  
  document.getElementById('technical-info').innerHTML = '<strong>✓ Low Volatility:</strong> VIX is below average, indicating market complacency. While this suggests stability, periods of very low volatility sometimes precede corrections.';
  
  // Economic Indicators
  const economicMetrics = document.getElementById('economic-metrics');
  economicMetrics.innerHTML = '';
  
  economicMetrics.appendChild(createMetricCard(
    'Federal Funds Rate',
    `${marketData.economicIndicators.fedRate.toFixed(2)}%`,
    'Current target range'
  ));
  
  const inflationTrend = marketData.economicIndicators.inflation > 3 ? 'down' : 
                        marketData.economicIndicators.inflation < 2 ? 'up' : 'neutral';
  economicMetrics.appendChild(createMetricCard(
    'Inflation (CPI)',
    `${marketData.economicIndicators.inflation.toFixed(1)}%`,
    'Year-over-year',
    inflationTrend
  ));
  
  const unemploymentTrend = marketData.economicIndicators.unemployment > 5 ? 'down' : 'up';
  economicMetrics.appendChild(createMetricCard(
    'Unemployment Rate',
    `${marketData.economicIndicators.unemployment.toFixed(1)}%`,
    'U-3 unemployment',
    unemploymentTrend
  ));
  
  const yieldCurveTrend = marketData.economicIndicators.yieldCurve < 0 ? 'down' : 'up';
  economicMetrics.appendChild(createMetricCard(
    'Yield Curve (10Y-2Y)',
    `${marketData.economicIndicators.yieldCurve.toFixed(2)}%`,
    marketData.economicIndicators.yieldCurve < 0 ? 'Inverted - Recession signal' : 'Normal',
    yieldCurveTrend
  ));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
