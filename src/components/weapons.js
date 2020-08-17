/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

export class Weapon extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, text, callback) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.callback = callback;
    this.alpha = 0.5;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();

    this.add(this.button);

    this.button.on('pointerup', () => {
      this.callback(text);
    });

    this.button.on('pointerover', () => {
      // this.button.setTexture(key2);
      this.rotate(this.button);
    });

    this.button.on('pointerout', () => {
      this.button.setAngle(0);
    });

    this.scene.add.existing(this);
  }

  rotate(sprite) {
    for (let i = 0; i < 361; i += 1) {
      sprite.angle += i;
    }
  }
}

export default Weapon;