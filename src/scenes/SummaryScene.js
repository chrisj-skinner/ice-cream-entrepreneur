import Phaser from 'phaser';
import { formatWeatherRecap } from '../constants/weather';
import { generateDayTip } from '../utils/tipGenerator';
import { addValueRow, createButton, drawDivider } from '../utils/ui';

export default class SummaryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SummaryScene' });
  }

  init() {
    this.gameData = this.registry.get('gameData');
    this.levelData = this.gameData.getLevelData(this.gameData.currentLevel);
  }

  create() {
    const { width, height } = this.cameras.main;

    // Title
    const isProfitable = this.gameData.profit > 0;
    this.add
      .text(
        width / 2,
        60,
        isProfitable ? '🎉 Great Job! 🎉' : '📊 Day Summary 📊',
        {
          fontSize: '48px',
          color: isProfitable ? '#4CAF50' : '#FF9800',
          fontStyle: 'bold',
        }
      )
      .setOrigin(0.5);

    // Weather recap
    const recapY = 100;
    this.add
      .text(width / 2, recapY, formatWeatherRecap(this.levelData), {
        fontSize: '20px',
        color: '#555',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    // Summary box
    const boxY = 150;
    const box = this.add.rectangle(
      width / 2,
      boxY + 200,
      650,
      440,
      0xffffff,
      0.95
    );
    box.setStrokeStyle(4, 0x333333);

    let currentY = boxY + 20;

    // Results
    addValueRow(
      this,
      currentY,
      'Ice Creams Bought:',
      this.gameData.stockPurchased,
      { rightStyle: { color: '#333' } }
    );
    currentY += 50;

    addValueRow(this, currentY, 'Ice Creams Sold:', this.gameData.sold, {
      rightStyle: { color: '#4CAF50' },
    });
    currentY += 50;

    addValueRow(this, currentY, 'Leftover:', this.gameData.leftover, {
      rightStyle: { color: this.gameData.leftover > 5 ? '#FF9800' : '#666' },
    });
    currentY += 50;

    // Calculate missed opportunities
    const expectedBuyers = Math.floor(
      this.levelData.preBookedVisitors * this.levelData.buyerPercent
    );
    const missedSales = Math.max(0, expectedBuyers - this.gameData.sold);
    let missedProfit = 0;

    if (missedSales > 0) {
      missedProfit =
        missedSales *
        (this.gameData.iceCreamPrice - this.gameData.iceCreamCost);
      addValueRow(this, currentY, 'Missed Sales:', `${missedSales}`, {
        rightStyle: { color: '#FF6347' },
      });
      currentY += 40;
    }

    // currentY += 20;

    // Finances
    drawDivider(this, currentY, 700);
    currentY += 40;

    addValueRow(this, currentY, 'Revenue:', `$${this.gameData.revenue}`, {
      rightStyle: { color: '#228B22' },
    });
    currentY += 40;

    const costSpent = this.gameData.stockPurchased * this.gameData.iceCreamCost;
    addValueRow(this, currentY, 'Cost:', `$${costSpent}`, {
      rightStyle: { color: '#666' },
    });
    currentY += 50;

    // Profit/Loss
    const profitColor = this.gameData.profit > 0 ? '#228B22' : '#FF0000';
    const profitLabel = this.gameData.profit >= 0 ? 'Profit:' : 'Loss:';
    addValueRow(
      this,
      currentY,
      profitLabel,
      `$${Math.abs(this.gameData.profit)}`,
      { fontSize: '32px', rightStyle: { color: profitColor } }
    );
    currentY += 50;

    // Potential profit if there were missed sales
    if (missedProfit > 0) {
      this.add
        .text(
          width / 2,
          currentY,
          `(Potential Profit: $${this.gameData.profit + missedProfit})`,
          {
            fontSize: '22px',
            color: '#FF6347',
            fontStyle: 'italic',
          }
        )
        .setOrigin(0.5);
      currentY += 70;
    } else {
      currentY += 30;
    }

    // Learning tip (centralized)
    const dayResult =
      this.gameData.dayResults[this.gameData.dayResults.length - 1];
    const tip =
      generateDayTip(dayResult) ||
      '💡 Keep learning! Each day teaches new skills.';
    this.add
      .text(width / 2, currentY, tip, {
        fontSize: '20px',
        color: '#333',
        fontStyle: 'italic',
        align: 'center',
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);

    // Buttons
    const buttonY = height - 40;

    if (this.gameData.currentLevel < 2) {
      createButton(this, width / 2, buttonY, 280, 60, 'Next Day →', {}, () => {
        this.gameData.currentLevel++;
        this.scene.start('PreLevelScene');
      });
    } else {
      createButton(
        this,
        width / 2,
        buttonY,
        280,
        60,
        'Show Summary',
        {},
        () => {
          this.scene.start('FinalSummaryScene');
        }
      );
    }
  }

  // Removed legacy helper methods (addSummaryLine, generateTip) in favor of shared UI helpers and centralized tip logic.
}
