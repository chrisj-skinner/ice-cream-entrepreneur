import Phaser from 'phaser';
import GameData from '../GameData';
import { WEATHER_ICONS } from '../constants/weather';

/**
 * Scene to introduce the level/day with weather and visitor info.
 * Displays budget and tips for the upcoming shopping phase.
 */
export default class PreLevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreLevelScene' });
  }

  init(data) {
    // Initialize or get game data
    if (!this.registry.get('gameData')) {
      this.registry.set('gameData', new GameData());
    }
    this.gameData = this.registry.get('gameData');

    // Reset for new day (but keep budget)
    this.gameData.reset();
    this.levelData = this.gameData.getLevelData(this.gameData.currentLevel);
    // Only set initial budget on Day 1
    if (this.gameData.currentLevel === 1) {
      this.gameData.budget = 50; // Starting budget
    }
    // Otherwise budget carries over from previous day
  }

  create() {
    const { width, height } = this.cameras.main;

    // Title
    this.add
      .text(width / 2, 80, '🍦 Ice Cream Stand Game 🍦', {
        fontSize: '48px',
        color: '#FF1493',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Level indicator
    this.add
      .text(width / 2, 160, `Day ${this.gameData.currentLevel}`, {
        fontSize: '36px',
        color: '#333',
      })
      .setOrigin(0.5);

    // Info box background
    const boxY = 240;
    const box = this.add.rectangle(
      width / 2,
      boxY + 120,
      700,
      240,
      0xffffff,
      0.9
    );
    box.setStrokeStyle(4, 0x333333);

    // Weather icon
    this.add
      .text(width / 2, boxY, WEATHER_ICONS[this.levelData.weather], {
        fontSize: '80px',
      })
      .setOrigin(0.5);

    // Weather info
    this.add
      .text(width / 2, boxY + 80, `Weather: ${this.levelData.weatherText}`, {
        fontSize: '32px',
        color: '#333',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Visitors info
    this.add
      .text(
        width / 2,
        boxY + 130,
        `Pre-Booked Visitors: ${this.levelData.preBookedVisitors}`,
        {
          fontSize: '28px',
          color: '#333',
        }
      )
      .setOrigin(0.5);

    // Budget info
    this.add
      .text(width / 2, boxY + 180, `Your Budget: £${this.gameData.budget}`, {
        fontSize: '28px',
        color: '#228B22',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Hint text
    const hintY = boxY + 260;

    // Dynamic tip based on buyer percentage
    let tipText, weatherExplanation, exampleText;

    if (this.levelData.buyerPercent >= 1.0) {
      tipText = 'Tip: Everyone will want ice cream today!';
      weatherExplanation = `${this.levelData.weatherText} means 100% will buy ice creams`;
      exampleText = '';
    } else {
      tipText = 'Tip: Not everyone will buy ice cream!';
      const percent = Math.floor(this.levelData.buyerPercent * 100);
      weatherExplanation = `${this.levelData.weatherText} means only ${percent}% will buy ice creams`;

      // Calculate example: if 4 people, only 2 will buy
      const exampleVisitors = 4;
      const exampleBuyers = Math.floor(
        exampleVisitors * this.levelData.buyerPercent
      );
      exampleText = `(If ${exampleVisitors} people are on the list, only ${exampleBuyers} will want ice creams.\nMake sure you don't purchase too many!)`;
    }

    this.add
      .text(width / 2, hintY, tipText, {
        fontSize: '20px',
        color: '#666',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, hintY + 30, weatherExplanation, {
        fontSize: '20px',
        color: '#666',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    if (exampleText) {
      this.add
        .text(width / 2, hintY + 75, exampleText, {
          fontSize: '18px',
          color: '#FF9800',
          fontStyle: 'italic',
          align: 'center',
        })
        .setOrigin(0.5);
    }

    // Continue button
    const button = this.add.rectangle(
      width / 2,
      height - 100,
      300,
      60,
      0x4caf50
    );
    button.setStrokeStyle(3, 0x2e7d32);
    button.setInteractive({ useHandCursor: true });

    const buttonText = this.add
      .text(width / 2, height - 100, 'Go Shopping!', {
        fontSize: '28px',
        color: '#FFF',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    button.on('pointerover', () => button.setFillStyle(0x66bb6a));
    button.on('pointerout', () => button.setFillStyle(0x4caf50));
    button.on('pointerdown', () => {
      this.scene.start('ShoppingScene');
    });
  }
}
