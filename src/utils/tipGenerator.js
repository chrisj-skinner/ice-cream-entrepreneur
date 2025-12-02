// Utility functions for game tips and analysis

export function generateDayTip(dayData) {
  const efficiency = dayData.sold / dayData.stockPurchased;

  // Priority 1: Critical issues
  if (dayData.missedSales > 5) {
    return `💡 Day ${dayData.day}: You ran out of stock! ${dayData.missedSales} customers wanted ice cream but you didn't have enough.`;
  } else if (dayData.leftover > 10) {
    return `💡 Day ${dayData.day}: You bought too many ice creams. Less waste = more profit!`;
  } else if (dayData.profit < 0) {
    return `💡 Day ${dayData.day}: You lost money! Try to match your stock closer to expected demand.`;
  }

  // Priority 2: Good performance with minor issues
  else if (dayData.leftover > 5) {
    return `💡 Day ${dayData.day}: Good profit, but try to reduce waste - you had quite a few leftovers.`;
  } else if (dayData.missedSales > 0 && dayData.missedSales <= 5) {
    return `💡 Day ${dayData.day}: Almost perfect! Just ${dayData.missedSales} missed sales.`;
  }

  // Priority 3: Perfect or excellent performance
  else if (
    dayData.profit > 0 &&
    dayData.missedSales === 0 &&
    dayData.leftover === 0
  ) {
    return `💡 Day ${dayData.day}: Perfect! You matched demand exactly!`;
  } else if (
    dayData.profit > 0 &&
    dayData.missedSales === 0 &&
    dayData.leftover < 3
  ) {
    return `💡 Day ${dayData.day}: Almost perfect! Only ${dayData.leftover} leftover.`;
  } else if (dayData.profit > 20) {
    return `💡 Day ${dayData.day}: Excellent! You made great profit!`;
  }

  return null; // No specific tip for average performance
}

export function generateOverallTip(totalProfit, dayResults) {
  const totalMissedProfit = dayResults.reduce(
    (sum, day) => sum + day.missedProfit,
    0
  );
  const totalMissedSales = dayResults.reduce(
    (sum, day) => sum + day.missedSales,
    0
  );

  if (totalMissedSales > 10) {
    return `💡 You missed ${totalMissedSales} total sales across all days! Consider buying more stock next time.`;
  } else if (totalProfit > 40) {
    return '💡 Outstanding performance! You understand supply and demand!';
  } else if (totalProfit > 20) {
    return "💡 Great job overall! You're learning fast!";
  } else if (totalProfit > 0) {
    return '💡 You made a profit! Keep practicing to improve!';
  } else {
    return '💡 Keep learning! Each day teaches valuable lessons about business.';
  }
}
