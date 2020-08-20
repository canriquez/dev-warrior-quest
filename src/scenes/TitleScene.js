/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Button } from '../components/buttons';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.TITLE,
    });
  }

  init() {
  }

  preload() {
  }

  create() {
    this.add.image(240, 175, 'mainmenu');

    const y = Help.posFixTopY(0.37);
    const sc = 45;
    // Play Game Button
    this.menuButton = new Button(this, Help.posFixLeftX(0.5), y, 'blueButton1', 'blueButton2', 'Play', CONST.SCENES.WORLDMAP);

    // Options button
    this.menuButton = new Button(this, Help.posFixLeftX(0.5), y + sc, 'blueButton1', 'blueButton2', 'Settings', CONST.SCENES.OPTIONS);

    // Credits button
    this.menuButton = new Button(this, Help.posFixLeftX(0.5), y + (2 * sc), 'blueButton1', 'blueButton2', 'Credits', CONST.SCENES.CREDITS);

    // Leader BOard
    this.menuButton = new Button(this, Help.posFixLeftX(0.5), y + (3 * sc), 'blueButton1', 'blueButton2', 'Leaders', CONST.SCENES.LEADER);

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });

    this.config = this.sys.game.globals.settings;
    if (this.config.musicOn === true && this.config.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.config.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}

export default TitleScene;