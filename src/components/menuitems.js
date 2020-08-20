/* eslint-disable no-underscore-dangle, no-unused-expressions */
import { Weapon } from './weapons';

export class MenuItem {
  constructor(cf) {
    this.cf = cf;
    this.boxSize = 40;
    this.x = 28 + (64 * this.cf.item);
    this.y = 298;
    this.c1 = 0xFFFFFF;
    this.c2 = 0x000000;
    this.selBox = cf.scene.add.graphics();
    this.selBox.lineStyle(1, this.c2);
    this.selBox.fillStyle(this.c2, 2);
    this.selBox.strokeRect(this.x, this.y, this.boxSize, this.boxSize);
    this.selBox.name = this.cf.name;
    this.selected = false;
    this.itemEnabled = false;


    // Add Button weapon Icon
    this.button = new Weapon(this.cf.scene,
      this.x + 20,
      this.y + 20,
      this.cf.weapon,
      this.cf.name,
      () => {
        this.select();
        this.cf.callback(this.cf.name, this.cf.item);
      });
    this.deselect();
    this.disable();
  }


  select() {
    if (this.itemEnabled === true) {
      this.selBox.lineStyle(1, this.c1);
      this.selBox.fillStyle(this.c1, 2);
      this.selBox.strokeRect(this.x, this.y, this.boxSize, this.boxSize);
      this.selected = true;
    }
  }

  deselect() {
    this.selected = false;
    this.selBox.lineStyle(1, this.c2);
    this.selBox.fillStyle(this.c2, 2);
    this.selBox.strokeRect(this.x, this.y, this.boxSize, this.boxSize);
  }

  enable() {
    this.selected = false;
    this.itemEnabled = true;
    this.selBox.lineStyle(1, this.c2);
    this.selBox.fillStyle(this.c2, 2);
    this.selBox.strokeRect(this.x, this.y, this.boxSize, this.boxSize);
    // enabling button
    this.button.alpha = 1.1;
    // disableInteractive();
    this.button.setInteractive;
  }

  disable() {
    this.selected = false;
    this.itemEnabled = false;
    this.selBox.lineStyle(1, this.c2);
    this.selBox.fillStyle(this.c2, 2);
    this.selBox.strokeRect(this.x, this.y, this.boxSize, this.boxSize);
    // enabling button
    this.button.alpha = 0.2;
    this.button.disableInteractive;
  }
}

export default MenuItem;