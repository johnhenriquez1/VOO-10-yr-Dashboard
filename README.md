# VOO Investment Dashboard - Progressive Web App

A sleek, mobile-optimized investment timing dashboard that tracks VOO (Vanguard S&P 500 ETF) with market indicators, valuation metrics, and technical signals.

## 🌟 Features

- **Dark Gradient Theme**: Elegant 135° gradient from navy to slate
- **Investment Timing Signal**: 0-100 score with color-coded progress bar
- **Progressive Web App**: Install to home screen, works offline
- **Real-time Refresh**: Update timestamp on demand
- **Warning Boxes**: Contextual information about valuations and volatility
- **Trend Arrows**: Visual indicators for market direction
- **Responsive Design**: Perfect on mobile, tablet, and desktop

## 📊 Dashboard Sections

### Investment Timing Signal
- **Score Range**: 0-100 with color coding
  - Green (70-100): Attractive
  - Yellow (50-69): Moderately Attractive  
  - Red (0-49): Cautious/Unattractive
- **Progress Bar**: Visual representation of score
- **Dynamic Description**: Context-aware guidance based on conditions

### Current Market
- VOO price with daily change ($ and %)
- Trend arrows showing direction

### Valuation Metrics
- **S&P 500 P/E Ratio**: Current vs historical average
- **Shiller CAPE**: Cyclically-adjusted P/E ratio
- **Historical Percentiles**: Shows where current valuations rank
- **Warning Box**: Alert when valuations are elevated

### Technical Indicators
- **50-Day Moving Average**: Short-term trend
- **200-Day Moving Average**: Long-term trend
- **VIX (Fear Index)**: Market volatility gauge
- **Info Box**: Commentary on volatility levels

### Economic Indicators
- **Federal Funds Rate**: Current Fed policy
- **Inflation (CPI)**: Year-over-year change
- **Unemployment Rate**: U-3 unemployment
- **Yield Curve**: 10Y-2Y spread (recession indicator)

## 🚀 Quick Deploy to GitHub Pages

### 1. Create Repository
```bash
# Go to github.com
# Click "New repository"
# Name it: voo-dashboard
# Make it Public
# Click "Create repository"
```

### 2. Upload Files
```bash
# Click "Add file" → "Upload files"
# Drag all 6 files from investment-dashboard-pwa folder:
#   - index.html
#   - app.js
#   - manifest.json
#   - sw.js
#   - icon-192.png
#   - icon-512.png
# Click "Commit changes"
```

### 3. Enable GitHub Pages
```bash
# Go to Settings → Pages
# Source: "Deploy from a branch"
# Branch: "main"
# Folder: "/ (root)"
# Click "Save"
```

### 4. Access Your Dashboard
```
# Your URL will be:
https://[your-username].github.io/voo-dashboard/

# Wait 2-3 minutes for deployment
# Example: https://johnsmith.github.io/voo-dashboard/
```

## 📱 Install on Phone

### iPhone (Safari)
1. Open your GitHub Pages URL in **Safari**
2. Tap **Share** button (square with arrow)
3. Scroll and tap **"Add to Home Screen"**
4. Name it **"VOO Dashboard"**
5. Tap **"Add"**
6. App appears on home screen! 📲

### Android (Chrome)
1. Open your GitHub Pages URL in **Chrome**
2. Tap **Menu** (three dots)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm installation
5. App appears on home screen! 📲

## 🔄 Update Data

To update with fresh market data:

1. **Tell Claude**: "Update my VOO dashboard with current data"

2. **Claude will search for**:
   - Latest VOO price
   - S&P 500 P/E ratio
   - Shiller CAPE
   - Moving averages (50-day, 200-day)
   - VIX (Fear Index)
   - Federal Funds Rate
   - Inflation (CPI)
   - Unemployment Rate
   - Yield Curve spread

3. **Claude updates** `app.js` with new data

4. **Redeploy**:
   - GitHub Pages: Upload new `app.js` to repo
   - Netlify: Drag updated folder
   - Vercel: Run `vercel` command

5. **Refresh app** on your phone

## 🎨 Customization

### Change Colors

Edit CSS in `index.html`:

```css
/* Background gradient */
background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);

/* Score colors */
Green: #10b981
Yellow: #f59e0b
Red: #ef4444
```

### Adjust Scoring Algorithm

Edit `calculateScore()` in `app.js`:

```javascript
// Current algorithm:
// - Starts at 50
// - Deducts for high P/E percentiles
// - Adds for low prices vs moving averages
// - Adds for high VIX (fear = opportunity)

// Modify weights to change sensitivity
```

### Add Custom Metrics

1. Add data to `marketData` object in `app.js`
2. Create metric cards in `initDashboard()` function
3. Add new sections in `index.html` as needed

## 📝 Current Data (Example)

**Investment Score**: 42/100 (Cautious)

**VOO**: $447.23 (+1.82, +0.41%)

**Valuations**:
- S&P 500 P/E: 24.5 (78th percentile)
- Shiller CAPE: 31.2 (85th percentile)
- ⚠️ Elevated - Both above historical averages

**Technical**:
- 50-day MA: $435.20 (price 2.8% above)
- 200-day MA: $418.50 (price 6.9% above)
- VIX: 13.8 (below 19.5 average)
- ✓ Low volatility suggests stability

**Economic**:
- Fed Rate: 4.75%
- Inflation: 3.2%
- Unemployment: 3.8%
- Yield Curve: +0.35% (normal)

## 🛠️ Technical Stack

- **Pure HTML/CSS/JavaScript** - No frameworks
- **Progressive Web App** - Installable, offline-capable
- **Service Worker** - Caches assets
- **Responsive** - Mobile-first design
- **No Backend** - 100% client-side

## ⚠️ Disclaimer

**This dashboard is for informational purposes only** and does not constitute financial advice.

- Past performance ≠ future results
- Market timing is extremely difficult
- Historical patterns may not repeat
- Data shown is simulated (you'll need real APIs for live data)

**Always consult a qualified financial advisor** before making investment decisions.

## 🔧 Troubleshooting

### Service Worker Error
- **Normal** when opening locally (file://)
- Deploy to GitHub Pages for full PWA features
- Dashboard still works without service worker

### App Won't Install on iPhone
- Must use **Safari** (not Chrome)
- iOS 11.3+ required
- Clear Safari cache and try again

### Data Not Updating
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Uninstall and reinstall app

### Blank Screen
- Check browser console (F12)
- Verify all files uploaded correctly
- Make sure service worker isn't blocking

## 📁 File Structure

```
investment-dashboard-pwa/
├── index.html       # Main HTML structure
├── app.js          # Dashboard logic and data
├── manifest.json   # PWA configuration
├── sw.js           # Service Worker
├── icon-192.png    # App icon (192x192)
├── icon-512.png    # App icon (512x512)
└── README.md       # This file
```

## 🌐 Alternative Deploy Options

### Netlify Drop (Instant)
1. Go to app.netlify.com/drop
2. Drag the entire folder
3. Get instant URL (e.g., `random-name.netlify.app`)

### Vercel (CLI)
```bash
npm install -g vercel
cd investment-dashboard-pwa
vercel
```

## 💡 Tips

- **Mobile Performance**: Loads instantly after first visit
- **Offline Mode**: Works without internet once installed
- **Updates**: Service worker auto-updates when you redeploy
- **Sharing**: Share your GitHub Pages URL with others
- **Privacy**: All calculations happen locally on your device

## 🎯 Scoring Methodology

The investment timing signal (0-100) is calculated using:

1. **Valuation Metrics** (main weight):
   - Lower P/E percentiles = higher scores
   - Lower CAPE percentiles = higher scores
   
2. **Technical Indicators**:
   - Price below moving averages = higher scores
   - High VIX = higher scores (fear = opportunity)
   
3. **Thresholds**:
   - 75+: Attractive (green)
   - 60-74: Moderately Attractive (yellow)
   - 45-59: Neutral (yellow)
   - 30-44: Cautious (red)
   - 0-29: Unattractive (red)

## 📚 Resources

- **VOO Info**: Vanguard S&P 500 ETF
- **P/E Data**: Multpl.com, S&P Global
- **CAPE Data**: Robert Shiller (Yale), Multpl.com
- **VIX Data**: CBOE
- **Economic Data**: Federal Reserve, BLS

---

**Built with Claude** 🤖 | Dark Theme Investment Dashboard | November 2024
