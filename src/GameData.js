/**
 * Class to manage game data and logic for the ice cream stand game.
 * Tracks levels, budget, stock, sales, revenue, profit, and daily results.
 * Provides methods to purchase stock and simulate a day's sales.
 */
export default class GameData {
  constructor() {
    this.currentLevel = 1;
    this.budget = 50; // Starting budget
    this.iceCreamCost = 1; // Cost per ice cream
    this.iceCreamPrice = 2; // Selling price
    this.stock = 0;
    this.stockPurchased = 0;
    this.revenue = 0;
    this.profit = 0;
    this.sold = 0;
    this.leftover = 0;
    this.dayResults = []; // Track results for each day
  }

  getLevelData(level) {
    const levels = {
      1: {
        preBookedVisitors: 30,
        weather: 'sunny',
        weatherText: 'Hot & Sunny',
        buyerPercent: 1.0, // 100% will buy on sunny days
      },
      2: {
        preBookedVisitors: 40,
        weather: 'cloudy',
        weatherText: 'Cloudy',
        buyerPercent: 0.5, // 50% will buy
      },
    };
    return levels[level] || levels[1];
  }

  reset() {
    this.stock = 0;
    this.stockPurchased = 0;
    this.revenue = 0;
    this.profit = 0;
    this.sold = 0;
    this.leftover = 0;
  }

  purchaseStock(quantity) {
    const cost = quantity * this.iceCreamCost;
    if (cost <= this.budget) {
      this.stock = quantity;
      this.stockPurchased = quantity;
      this.budget -= cost;
      return true;
    }
    return false;
  }

  simulateDay(levelData) {
    const expectedBuyers = Math.floor(
      levelData.preBookedVisitors * levelData.buyerPercent
    );
    this.sold = Math.min(this.stock, expectedBuyers);
    this.leftover = this.stock - this.sold;
    this.revenue = this.sold * this.iceCreamPrice;
    const totalCost = this.stockPurchased * this.iceCreamCost;
    this.profit = this.revenue - totalCost;

    // Update budget: add revenue from sales (cost was already deducted in purchaseStock)
    this.budget += this.revenue;

    // Calculate missed sales
    const missedSales = Math.max(0, expectedBuyers - this.sold);
    const missedProfit = missedSales * (this.iceCreamPrice - this.iceCreamCost);

    // Save this day's results
    this.dayResults.push({
      day: this.currentLevel,
      profit: this.profit,
      revenue: this.revenue,
      sold: this.sold,
      weather: levelData.weatherText,
      missedSales: missedSales,
      missedProfit: missedProfit,
      stockPurchased: this.stockPurchased,
      leftover: this.leftover,
      expectedBuyers: expectedBuyers,
      budgetAfter: this.budget,
    });
  }

  getTotalProfit() {
    return this.dayResults.reduce((sum, day) => sum + day.profit, 0);
  }

  getTotalMissedProfit() {
    return this.dayResults.reduce((sum, day) => sum + day.missedProfit, 0);
  }
}
