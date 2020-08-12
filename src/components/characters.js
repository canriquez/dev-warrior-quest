import Phaser from 'phaser';
import { HeroProfile } from './herobject'

export class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.texture, 1);
    const corazon = new HeroProfile();
    this.globals = { corazon };

    config.scene.add.existing(this);
    this.setInteractive();

    this.on('pointerdown', this.clickMe, this);
    this.type = config.type;

  }

  clickMe() {
    console.log(`you clicked the sprite :${this.type}`);
    console.log(`Have I lost ?${this.globals.corazon.haveILost()}`);

    console.log(`my challenge Pow before :${this.globals.corazon.challengePow}`);
    this.globals.corazon.resetChallengePow();
    console.log(`my challenge pow after :${this.globals.corazon.challengePow}`);
    console.log(this.globals.corazon.hitPower().sword);
    console.log(this.globals.corazon.hitPower().knife);
    console.log(this.globals.corazon.hitPower().punch);

  }
}

export default Player;