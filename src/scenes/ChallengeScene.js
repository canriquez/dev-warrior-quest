import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Player } from '../components/characters';

export class ChallengeScene extends Phaser.Scene {
  constructor() {
    super({ key: CONST.SCENES.CHALLENGE });
  }

  init(data) {
    console.log('data');
  }

  preload() {

  }

  create() {
    console.log('here we are in challenge');

    this.add.image(240, 175, 'chall01sm');
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0x000000);
    this.graphics.fillStyle(0x000000, 1);

    this.graphics.strokeRect(7, 282, 465, 345);
    this.graphics.fillRect(7, 282, 465, 345);

    this.add.image(Help.posFixLeftX(0.498), Help.posFixBottomY(0.116), 'board');
    this.ground = this.physics.add.staticGroup();
    this.ground.create(240, 265, 'ground');


    // Create Player Characters
    const devWarrior = new Player({
      scene: this,
      x: 100,
      y: 100,
      texture: 'hero01',
      type: 'hero',
    });

    const deamon1 = new Player({
      scene: this,
      x: 380,
      y: 100,
      texture: 'hero01',
      type: 'deamon',
      deamon: 1,
    });

    console.log(devWarrior);
    console.log(deamon1);

    this.anims.create({
      key: 'Idle',
      frames: this.anims.generateFrameNames('hero01', {
        start: 0,
        end: 39,
        zeroPad: 3,
        prefix: 'Idle_',
        suffix: '.png',
      }),
      frameRate: 8,
      repeat: -1,
    });

    // devWarrior.play('Idle');

    devWarrior.body.setBounce(0.2);
    devWarrior.body.setCollideWorldBounds(true);
    devWarrior.body.setGravityY(300);

    this.physics.add.collider(devWarrior, this.ground);

    deamon1.body.setBounce(0.2);
    deamon1.body.setCollideWorldBounds(true);
    deamon1.body.setGravityY(300);

    this.physics.add.collider(deamon1, this.ground);

    // prepares scene-game variables

    this.heroes = [devWarrior];
    this.enemies = [deamon1];
    // single array of characters at play in the scene
    this.characters = this.heroes.concat(this.enemies);

    // Launch in parallel UI Challenge Scene
    this.scene.launch(CONST.SCENES.UICHALL, 'and so... game starts');
  }
}

export default ChallengeScene;