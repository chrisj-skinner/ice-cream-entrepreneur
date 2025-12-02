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

## 🎮 Game Overview

| Weather         | Demand                                                              |
| --------------- | ------------------------------------------------------------------- |
| **Hot & Sunny** | **High demand** – every pre‑booked visitor buys ice‑cream (100%).   |
| **Cloudy**      | **Medium demand** – only half of the pre‑booked visitors buy (50%). |

_No other weather types are used._

The player's goal each day is to purchase enough stock to satisfy the expected demand while avoiding waste.

---

## 📋 Level Structure (Levels 1‑2)

Each level follows the same four‑step flow, but the variables change gradually to teach one new concept at a time.

### Step 1 – Pre‑Level Info (Simplified)

1. **Pre‑Booked Visitors** – a fixed number is given (e.g., "50 visitors are confirmed").
2. **Weather Forecast** – tells the player whether the day will be _Hot & Sunny_ (100% buyers) or _Cloudy_ (50% buyers).

### Step 2 – Buying Ice Cream

- The player knows:
  - Their budget
  - The exact number of visitors
  - The buyer‑percentage dictated by the weather

_Decision outcomes_

- **Buy too little** → missed profit.
- **Buy too much** → leftover stock that costs money.

### Step 3 – Event Day Simulation

Sales are calculated based on:

- Number of pre‑booked visitors
- Weather‑buyer percentage (100% or 50%)
- Player‑set price

The simulation is short, deterministic, and satisfying.

### Step 4 – End‑of‑Day Summary

| Metric            | Displayed |
| ----------------- | --------- |
| Ice‑creams bought | ✅        |
| Ice‑creams sold   | ✅        |
| Leftover stock    | ✅        |
| Revenue           | ✅        |
| Profit / loss     | ✅        |

The summary makes the financial lesson crystal‑clear.

---

## ⭐ Why Level 1‑2 Are Designed This Way

They focus on **one variable at a time**:

- **Level 1 → Fixed weather (sunny), fixed number of visitors**  
  → Kids learn profit basics.

- **Level 2 → Weather variation added**  
  → Kids learn that demand changes.

> After Level 2 you can expand the game with:
>
> - Walk‑ins
> - Forecast uncertainty
> - Variable prices
> - Discounts
> - Small events vs. large events

---

## 🔄 Improvements for Repeat Playing

To encourage kids to replay and reinforce learning:

### High Score & Progress Tracking

- **Local High Score Board** – track best profit across all playthroughs with localStorage
- **Today's Best** – daily leaderboard (resets each day) to encourage "beat your morning score"
- **Perfect Day Badge** – award for matching demand exactly (0 leftover, 0 missed sales)
- **Profit Streak** – track consecutive profitable days

### Engagement Mechanics (Kid-Friendly)

- **Star Rating System** – 1-3 stars based on profit efficiency (better than letter grades for younger kids)
- **Unlockable Tips** – reveal advanced strategies after completing levels (e.g., "Weather patterns to watch")
- **Challenge Mode** – randomize weather/visitor counts for experienced players
- **Progress Animations** – visual celebration for beating personal records
- **Profit Threshold Unlocking** – must earn minimum profit on current level to unlock the next (ensures understanding before advancing)

### Why These Work

- **Intrinsic motivation** – kids naturally want to improve their score and see progress
- **Low pressure** – compete with themselves, not others (except optional daily board)
- **Educational reinforcement** – replaying strengthens understanding of profit, demand, and decision-making
- **Accessibility** – localStorage keeps it simple (no accounts/servers needed for initial version)

> **Implementation Note:** Start with local high score + star ratings. Add daily leaderboard later if you want light social engagement without full multiplayer complexity.

---

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

## License

MIT
