/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.PRELOAD,
    });
  }

  init(data) {
    this.readyCount = 0;
    console.log(data);
  }

  ready() {
    this.scene.start(CONST.SCENES.CHALLENGE, 'Challenge call: - hello from Preloader Scene');

    // this.scene.start(CONST.SCENES.CHALLENGE, "Challenge call: - hello from Preloader Scene");
    this.readyCount += 1;
    if (this.readyCount === 2) {
      // this.scene.start(CONST.SCENES.TITLE, 'hello from Preloader Scene');
      // this.scene.start(CONST.SCENES.CHALLENGE, "Challenge call: - hello from Preloader Scene");

    }
  }

  preload() {
    // add logo image
    this.add.image(176, 50, 'logo');

    // display progress bar
    const dpbX = Help.posFixLeftX(0.15);
    const dpbY = Help.posFixBottomY(0.20);
    const dpbXb = Help.posFixLeftX(0.17);
    const dpbYb = Help.posFixBottomY(0.17);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(dpbX, dpbY, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)} %`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(dpbXb, dpbYb, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('tgrass', './src/assets/questmap/grass.png');
    this.load.image('tdirt', './src/assets/questmap/dirth.png');
    this.load.image('base', './src/assets/questmap/base.png');
    this.load.image('pond', './src/assets/questmap/water.png');

    // map in json format
    this.load.tilemapTiledJSON('map', './src/assets/questmap/devquestmap.json');

    // our two characters
    this.load.spritesheet('player', './src/assets/items/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

    // tuto assets
    this.load.image('blueButton1', './src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', './src/assets/ui/blue_button03.png');
    this.load.image('box', './src/assets/ui/grey_box.png');
    this.load.image('checkedBox', './src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['./src/assets/music/TownTheme.mp3']);

    // load challanges assets
    this.load.image('chall01sm', './src/assets/chall/chall01_480x350.png');
    this.load.image('board', './src/assets/chall/weapon_board.png');
    this.load.image('ground', './src/assets/chall/ground.png');
    this.load.image('w1', './src/assets/worrior/idle.png');
    this.load.atlas('hero01', './src/assets/hero01/idle/hero01.png', './src/assets/hero01/idle/hero01.json');
    this.load.image('knife', './src/assets/chall/knife.png');
    this.load.image('sword', './src/assets/chall/sword.png');
    this.load.image('punch', './src/assets/chall/punch.png');
  }

  create() {
  }
}

export default PreloaderScene;