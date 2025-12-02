import Phaser from 'phaser';
import { generateDayTip, generateOverallTip } from '../utils/tipGenerator';
import {
  addValueRow,
  createButton,
  createPanel,
  drawDivider,
} from '../utils/ui';

/**
 * Scene to display the final summary after all days are completed.
 * Shows overall performance, total profit, and final budget.
 * Provides tips based on overall results.
 */
export default class FinalSummaryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FinalSummaryScene' });
  }

  init() {
    this.gameData = this.registry.get('gameData');
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add
      .text(width / 2, 80, '🎊 Game Complete! 🎊', {
        fontSize: '48px',
        color: '#FF1493',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 150, 'Final Summary - All Days', {
        fontSize: '32px',
        color: '#333',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const boxY = 220;
    createPanel(this, width / 2, boxY + 170, 700, 380);
    let currentY = boxY + 20;

    this.gameData.dayResults.forEach((dayResult) => {
      const dayLabel = `Day ${dayResult.day} (${dayResult.weather}):`;
      const profitColor = dayResult.profit >= 0 ? '#228B22' : '#FF0000';
      addValueRow(this, currentY, dayLabel, `£${dayResult.profit}`, {
        fontSize: '24px',
        rightStyle: { color: profitColor },
      });
      currentY += 50;
    });

    drawDivider(this, currentY, 700);
    currentY += 50;

    const totalProfit = this.gameData.getTotalProfit();
    const totalColor = totalProfit >= 0 ? '#228B22' : '#FF0000';
    addValueRow(this, currentY, 'Total Profit:', `£${totalProfit}`, {
      fontSize: '30px',
      rightStyle: { color: totalColor },
    });
    currentY += 50;

    const finalBudget = this.gameData.budget;
    const budgetColor =
      finalBudget >= 50 ? '#228B22' : finalBudget > 0 ? '#FF9800' : '#FF0000';
    addValueRow(this, currentY, 'Final Budget:', `£${finalBudget}`, {
      fontSize: '30px',
      rightStyle: { color: budgetColor },
    });
    currentY += 60;

    const tipsToShow = this.gameData.dayResults
      .map((d) => generateDayTip(d))
      .filter((t) => t !== null);
    if (tipsToShow.length > 0) {
      tipsToShow.forEach((tip) => {
        this.add
          .text(width / 2, currentY, tip, {
            fontSize: '18px',
            color: '#555',
            fontStyle: 'italic',
            align: 'center',
            wordWrap: { width: 650 },
          })
          .setOrigin(0.5);
        currentY += 40;
      });
      currentY += 30;
    }

    const overallTip = generateOverallTip(
      totalProfit,
      this.gameData.dayResults
    );
    this.add
      .text(width / 2, currentY, overallTip, {
        fontSize: '20px',
        color: '#333',
        fontStyle: 'italic',
        align: 'center',
        wordWrap: { width: 650 },
      })
      .setOrigin(0.5);
    currentY += 60;

    createButton(
      this,
      width / 2,
      height - 80,
      280,
      60,
      'Play Again',
      {},
      () => {
        this.gameData.currentLevel = 1;
        this.gameData.dayResults = [];
        this.scene.start('PreLevelScene');
      }
    );
  }
}
