import Phaser from 'phaser';
import { CONST } from '../components/const';

export class InitScene extends Phaser.Scene {
  constructor() {
    super({ key: CONST.SCENES.INIT });
  }

  preload() {
    // load resources here
    // map tiles
    this.load.image('logo', './src/assets/ui/dev-warrior-quest.png', { frameWidth: 32, frameHeight: 16 });
  }

  create() {
    this.scene.start(CONST.SCENES.PRELOAD, 'hello from BootScene');
  }
}

export default InitScene;
