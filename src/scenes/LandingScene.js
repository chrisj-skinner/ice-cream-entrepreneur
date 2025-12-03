import Phaser from 'phaser';
import GameData from '../GameData';
import { createButton, createPanel } from '../utils/ui';

/**
 * Landing scene introducing the game and key vocabulary.
 * Sets up initial game data and starts the first level.
 * Provides instructions and definitions for players.
 */
export default class LandingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LandingScene' });
  }

  create() {
    const { width } = this.cameras.main;

    // Ensure fresh game data
    this.registry.set('gameData', new GameData());

    // Title
    this.add
      .text(width / 2, 50, '🍦 Ice Cream Stand Game 🍦', {
        fontSize: '52px',
        color: '#FF1493',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 100, 'Welcome Young Entrepreneurs!', {
        fontSize: '34px',
        color: '#333',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Intro panel
    createPanel(this, width / 2, 200, 900, 140, { alpha: 0.97 });
    const introText = [
      '• You will run an ice cream stand for 2 days.',
      '• Each day you see the WEATHER and how many VISITORS signed up.',
      '• Decide how many ice creams to BUY.',
      '• Try not to buy too few or too many!',
      '• Earn MONEY by selling. Learn how BUDGET and PROFIT work.',
    ];
    this.add
      .text(width / 2, 200, introText.join('\n'), {
        fontSize: '20px',
        color: '#333',
        align: 'left',
        lineSpacing: 3,
        wordWrap: { width: 840 },
      })
      .setOrigin(0.5);

    // Vocabulary section
    this.add
      .text(width / 2, 300, 'Key Words (tip, write these down!)', {
        fontSize: '26px',
        color: '#333',
        fontStyle: 'bold',
        align: 'left',
      })
      .setOrigin(0.5);

    const vocab = [
      ['Budget', 'The money you have to spend.'],
      ['Cost', 'How much you pay to buy an ice cream.'],
      ['Price', 'How much you sell one ice cream for.'],
      ['Revenue', 'The money you get from selling ice cream.'],
      ['Profit', 'The money you have left, after paying costs.'],
      ['Visitors', 'People who might want ice cream.'],
      ['Weather', 'This changes how many poeple want ice cream.'],
      ['Stock', 'How many ice creams you bought.'],
      ['Leftover', 'Ice creams you did not sell.'],
      ['Missed Sales', 'People who wanted ice creams but you ran out.'],
    ];

    let startY = 340;
    vocab.forEach(([word, def]) => {
      this.add
        .text(width / 2 - 400, startY, word + ':', {
          fontSize: '20px',
          color: '#000',
          fontStyle: 'bold',
        })
        .setOrigin(0, 0.5);
      this.add
        .text(width / 2 - 220, startY, def, {
          fontSize: '20px',
          color: '#333',
          wordWrap: { width: 650 },
        })
        .setOrigin(0, 0.5);
      startY += 36;
    });

    // Start button
    createButton(this, width / 2, 730, 320, 60, 'Start Day 1', {}, () => {
      this.scene.start('PreLevelScene');
    });
  }
}
