import Phaser from 'phaser';
import EventDayScene from './scenes/EventDayScene';
import FinalSummaryScene from './scenes/FinalSummaryScene';
import LandingScene from './scenes/LandingScene';
import PreLevelScene from './scenes/PreLevelScene';
import ShoppingScene from './scenes/ShoppingScene';
import SummaryScene from './scenes/SummaryScene';
import './style.css';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'app',
  backgroundColor: '#87CEEB',
  scene: [
    LandingScene,
    PreLevelScene,
    ShoppingScene,
    EventDayScene,
    SummaryScene,
    FinalSummaryScene,
  ],
};

const game = new Phaser.Game(config);
