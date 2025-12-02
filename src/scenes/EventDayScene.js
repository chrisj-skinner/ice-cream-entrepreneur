import Phaser from 'phaser';

/**
 * Scene to introduce the event day with weather and stand info.
 * Simulates the selling phase and transitions to the summary.
 * Displays animations and messages during the simulation.
 */
export default class EventDayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EventDayScene' });
  }

  init() {
    this.gameData = this.registry.get('gameData');
    this.levelData = this.gameData.getLevelData(this.gameData.currentLevel);
  }

  create() {
    const { width, height } = this.cameras.main;

    // Title
    this.add
      .text(width / 2, 60, '🎪 Event Day! 🎪', {
        fontSize: '48px',
        color: '#FF1493',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Weather display
    const weatherIcons = {
      sunny: '☀️',
      cloudy: '☁️',
      rainy: '🌧️',
    };
    this.add
      .text(width / 2, 140, weatherIcons[this.levelData.weather], {
        fontSize: '60px',
      })
      .setOrigin(0.5);

    // Ice cream stand
    this.add
      .text(width / 2, 250, '🍦', {
        fontSize: '120px',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 360, 'Your Ice Cream Stand', {
        fontSize: '28px',
        color: '#333',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Stock info
    this.add
      .text(width / 2, 410, `Stock: ${this.gameData.stock} ice creams`, {
        fontSize: '24px',
        color: '#666',
      })
      .setOrigin(0.5);

    // Message
    this.messageText = this.add
      .text(width / 2, 480, 'Visitors are arriving...', {
        fontSize: '26px',
        color: '#333',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    // Simulate the day after a short delay
    this.time.delayedCall(2000, () => {
      this.simulateDay();
    });
  }

  simulateDay() {
    // Run the simulation
    this.gameData.simulateDay(this.levelData);

    // Show results with animation
    this.messageText.setText('Selling ice cream...');

    this.time.delayedCall(1500, () => {
      this.messageText.setText(`Sold ${this.gameData.sold} ice creams! 🎉`);
    });

    this.time.delayedCall(3500, () => {
      this.scene.start('SummaryScene');
    });
  }
}
