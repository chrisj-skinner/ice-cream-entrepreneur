# 🍦 Ice Cream Entrepreneur

Educational game teaching kids basic business concepts by running an ice cream stand. Learn about budget, profit, and matching supply with demand!

**[🎮 Play the Demo](https://chrisj-skinner.github.io/ice-cream-entrepreneur/)**

## About

An interactive educational game designed for children ages 6-10 to learn foundational business concepts. Players manage an ice cream stand over 2 days, making purchasing decisions based on weather forecasts and visitor numbers, then seeing the results of their choices.

### Learning Objectives

- **Budget Management**: Understanding available money and spending limits
- **Supply & Demand**: Matching stock to customer needs based on weather
- **Profit Calculation**: Revenue minus costs
- **Decision Making**: Balancing risk of leftovers vs. missed sales
- **Business Vocabulary**: Budget, cost, price, revenue, profit, stock, leftover, missed sales

### Features

- Kid-friendly vocabulary explanations on landing page
- 2-day simulation with different weather conditions
- Real-time feedback on purchasing decisions
- Visual profit/loss summaries with helpful tips
- Weather-based demand modeling (sunny = 100% buyers, cloudy = 50%)

## Tech Stack

- **Phaser 3** - Game engine
- **Vite** - Build tool & dev server
- **JavaScript (ES6+)** - Game logic

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play the game.

## Build

```bash
npm run build
```

Production build outputs to `dist/` directory.

## Deploy to GitHub Pages

The game is hosted on GitHub Pages. To deploy updates:

```bash
# Build with correct base path
npm run deploy

# Commit and push the dist folder
git add dist -f
git commit -m "Update production build"
git subtree push --prefix dist origin gh-pages
```

The live site will update at https://chrisj-skinner.github.io/ice-cream-entrepreneur/ within 1-2 minutes.

## Project Structure

```
src/
├── scenes/          # Phaser game scenes
│   ├── LandingScene.js      # Introduction & vocabulary
│   ├── PreLevelScene.js     # Day briefing
│   ├── ShoppingScene.js     # Purchase ice cream
│   ├── EventDayScene.js     # Simulation
│   ├── SummaryScene.js      # Day results
│   └── FinalSummaryScene.js # Overall results
├── utils/           # Helper functions
│   ├── ui.js               # Shared UI components
│   └── tipGenerator.js     # Educational feedback
├── constants/       # Game constants
│   └── weather.js          # Weather icons & formatting
├── GameData.js      # Core game state & logic
└── main.js          # Phaser configuration
```

## Game Flow

1. **Landing** → Introduction & vocabulary definitions
2. **Day Briefing** → Weather forecast, visitor count, current budget
3. **Shopping** → Purchase ice cream stock
4. **Event Day** → Simulation runs based on weather
5. **Day Summary** → Results & educational tips
6. **Final Summary** → 2-day totals & overall feedback

## License

MIT
