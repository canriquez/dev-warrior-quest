import Phaser from 'phaser';
import { HeroProfile } from './herobject';
import { DeamonProfile } from './deamonobject';

export class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.texture, 0);

    if (config.type === 'hero') {
      const corazon = new HeroProfile();
      this.globals = { corazon };
    } else {
      const corazon = new DeamonProfile(config.deamon);
      this.globals = { corazon };
      this.flipX = true;
      this.deamonId = config.deamonId;
    }
    this.name = config.name;
    this.alive = true;

    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.setInteractive();

    this.on('pointerdown', this.clickMe, this);
    this.type = config.type;
  }

  clickMe() {
    console.log(`${this.type}CLicked --- actions below`);
    if (this.type === 'deamon') {
      this.scene.events.emit('attackDeamon', this.deamonId);
    }
    if (this.type === 'hero') {
      this.scene.events.emit('notYourself');
    }
  }

  die() {
    if (!this.alive) {
      this.active = false;
      // call dead animation if possible
      this.visible = false;
    }
  }
}

export default Player;