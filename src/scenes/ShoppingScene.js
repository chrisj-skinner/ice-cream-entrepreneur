import Phaser from 'phaser';
import { formatWeatherRecap } from '../constants/weather';
/**
 * Scene for shopping phase where players buy ice cream stock.
 * Players can select quantity, see cost, and confirm purchase.
 * Updates game data with purchased stock and budget.
 */
export default class ShoppingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShoppingScene' });
  }

  init() {
    this.gameData = this.registry.get('gameData');
    this.levelData = this.gameData.getLevelData(this.gameData.currentLevel);
    this.quantity = 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Title
    this.add
      .text(width / 2, 60, '🏪 Ice Cream Supermarket 🏪', {
        fontSize: '42px',
        color: '#FF6347',
        fontStyle: 'bold',
      })
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

    // Budget display
    this.budgetText = this.add
      .text(width / 2, 150, `Budget: £${this.gameData.budget}`, {
        fontSize: '32px',
        color: '#228B22',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Info box
    const infoY = 200;
    this.add
      .rectangle(width / 2, infoY + 40, 600, 80, 0xfff8dc, 0.9)
      .setStrokeStyle(3, 0x333);
    this.add
      .text(width / 2, infoY + 20, '🍦 Ice Cream: £1 each', {
        fontSize: '24px',
        color: '#333',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, infoY + 55, 'You sell for: £2 each', {
        fontSize: '20px',
        color: '#666',
      })
      .setOrigin(0.5);

    // Quantity selector
    const selectorY = 340;
    this.add
      .text(width / 2, selectorY, 'How many ice creams to buy?', {
        fontSize: '28px',
        color: '#333',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Quantity display
    this.quantityText = this.add
      .text(width / 2, selectorY + 80, '0', {
        fontSize: '64px',
        color: '#FF1493',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Minus button
    const minusBtn = this.add.rectangle(
      width / 2 - 150,
      selectorY + 80,
      60,
      60,
      0xff6347
    );
    minusBtn.setStrokeStyle(3, 0x333);
    minusBtn.setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2 - 150, selectorY + 80, '−', {
        fontSize: '48px',
        color: '#FFF',
      })
      .setOrigin(0.5);

    minusBtn.on('pointerover', () => minusBtn.setFillStyle(0xff8c69));
    minusBtn.on('pointerout', () => minusBtn.setFillStyle(0xff6347));
    minusBtn.on('pointerdown', () => this.changeQuantity(-1));

    // Plus button
    const plusBtn = this.add.rectangle(
      width / 2 + 150,
      selectorY + 80,
      60,
      60,
      0x4caf50
    );
    plusBtn.setStrokeStyle(3, 0x333);
    plusBtn.setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2 + 150, selectorY + 80, '+', {
        fontSize: '48px',
        color: '#FFF',
      })
      .setOrigin(0.5);

    plusBtn.on('pointerover', () => plusBtn.setFillStyle(0x66bb6a));
    plusBtn.on('pointerout', () => plusBtn.setFillStyle(0x4caf50));
    plusBtn.on('pointerdown', () => this.changeQuantity(1));

    // Plus 5 button
    const plus5Btn = this.add.rectangle(
      width / 2 + 230,
      selectorY + 80,
      60,
      60,
      0x2196f3
    );
    plus5Btn.setStrokeStyle(3, 0x333);
    plus5Btn.setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2 + 230, selectorY + 80, '+5', {
        fontSize: '24px',
        color: '#FFF',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    plus5Btn.on('pointerover', () => plus5Btn.setFillStyle(0x42a5f5));
    plus5Btn.on('pointerout', () => plus5Btn.setFillStyle(0x2196f3));
    plus5Btn.on('pointerdown', () => this.changeQuantity(5));

    // Cost display
    this.costText = this.add
      .text(width / 2, selectorY + 160, 'Cost: £0', {
        fontSize: '28px',
        color: '#333',
      })
      .setOrigin(0.5);

    // Error message
    this.errorText = this.add
      .text(width / 2, selectorY + 210, '', {
        fontSize: '20px',
        color: '#FF0000',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    // Purchase button
    const buyBtn = this.add.rectangle(
      width / 2,
      height - 100,
      280,
      60,
      0x4caf50
    );
    buyBtn.setStrokeStyle(3, 0x2e7d32);
    buyBtn.setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, height - 100, 'Buy & Continue', {
        fontSize: '28px',
        color: '#FFF',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    buyBtn.on('pointerover', () => buyBtn.setFillStyle(0x66bb6a));
    buyBtn.on('pointerout', () => buyBtn.setFillStyle(0x4caf50));
    buyBtn.on('pointerdown', () => this.purchase());
  }

  changeQuantity(delta) {
    const newQuantity = this.quantity + delta;
    const cost = newQuantity * this.gameData.iceCreamCost;

    if (newQuantity < 0) {
      this.errorText.setText('Cannot buy negative ice creams!');
      return;
    }

    if (cost > this.gameData.budget) {
      this.errorText.setText('Not enough budget!');
      return;
    }

    this.quantity = newQuantity;
    this.errorText.setText('');
    this.updateDisplay();
  }

  updateDisplay() {
    this.quantityText.setText(this.quantity.toString());
    const cost = this.quantity * this.gameData.iceCreamCost;
    this.costText.setText(`Cost: £${cost}`);
  }

  purchase() {
    if (this.quantity === 0) {
      this.errorText.setText('You need to buy at least 1 ice cream!');
      return;
    }

    if (this.gameData.purchaseStock(this.quantity)) {
      this.scene.start('EventDayScene');
    } else {
      this.errorText.setText('Not enough budget!');
    }
  }
}
