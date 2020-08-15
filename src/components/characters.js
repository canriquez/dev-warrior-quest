import Phaser from 'phaser';
import { HeroProfile } from './herobject';
import { DeamonProfile } from './deamonobject';

export class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.texture);

    if (config.type == 'hero') {
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
    console.log(`you clicked the sprite :${this.type}`);
    console.log(`Have I lost ?${this.globals.corazon.haveILost()}`);

    console.log(`my current pow for this is challenge :${this.globals.corazon.challengePow}`);
    console.log(this.globals.corazon.hitPower().sword);
    console.log(this.globals.corazon.hitPower().knife);
    console.log(this.globals.corazon.hitPower().punch);
    if (this.type == 'deamon') {
      console.log('sending deamon message :' + this.deamonId);
      this.scene.events.emit('attackDeamon', this.deamonId);
    }
    if (this.type == 'hero') {
      console.log('sending deamon message :' + this.deamonId);
      this.scene.events.emit('notYourself');
    }
  }

  die() {
    if (!this.alive) {
      this.active = false;
      //call dead animation if possible
      this.visible = false;
    }
  }

}

export default Player;