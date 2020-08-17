/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { MenuItem } from '../components/menuitems';
import { Help } from '../components/helpers';
import { Menus } from '../components/menus';
import { MessageChallenge } from '../components/challmessages';
import { OnScreenInstructions } from '../components/osinstructions';

export class UIChallScene extends Phaser.Scene {
  constructor() {
    super(CONST.SCENES.UICHALL);
    this.heroMenu = new Menus();
    this.currentHit = null;
    this.hitSelected = false;
  }

  init() {

  }

  preload() {

  }

  create() {
    this.buildScene();
    this.sys.events.on('wake', this.wake, this);
  }

  buildScene() {
    const menuItemSword = new MenuItem({
      scene: this,
      item: 0,
      name: 'theSword',
      weapon: 'sword',
      callback: (name, item) => {
        this.menuItemSelected(this.heroMenu, item);
      },
    });
    const menuItemKnife = new MenuItem({
      scene: this,
      item: 1,
      name: 'theKnife',
      weapon: 'knife',
      callback: (name, item) => {
        this.menuItemSelected(this.heroMenu, item);
      },
    });
    const menuItemPunch = new MenuItem({
      scene: this,
      item: 2,
      name: 'thePunch',
      weapon: 'punch',
      callback: (name, item) => {
        this.menuItemSelected(this.heroMenu, item);
      },
    });
    this.heroMenu.addMenuItem(menuItemSword);
    this.heroMenu.addMenuItem(menuItemKnife);
    this.heroMenu.addMenuItem(menuItemPunch);


    // retrive Challange scene
    this.battleScene = this.scene.get(CONST.SCENES.CHALLENGE);


    this.battleScene.events.on('HeroSelect', this.onHeroSelect, this);
    this.battleScene.events.on('attackDeamon', this.onDeamonSelect, this);
    this.battleScene.events.on('notYourself', this.notYourself, this);

    // setup listeners for UI messages and Instructions
    this.message = new MessageChallenge(this, this.battleScene.events);
    this.instructions = new OnScreenInstructions(this, this.battleScene.events);

    this.add.existing(this.message);
    this.add.existing(this.instructions);

    this.battleScene.nextTurn();
  }

  menuItemSelected(menus, item) {
    menus.cleanTheOthers(item);
    this.currentHit = item;
    this.hitSelected = true;
    // show message on the hit selected.
    // show message to clock on deamos to attack.
  }

  onHeroSelect() {
    this.heroMenu.enableMenu(); // this will enable all but one weapon randomly
  }

  onDeamonSelect(deamonId) {
    // only react if player has selected a strike in the current move.
    if (this.hitSelected === true) {
      const weapon = Help.hits()[this.currentHit];
      this.hitSelected = false;
      this.currentHit = null;
      this.heroMenu.disableMenu();
      this.events.emit('demonAttacked', { id: deamonId, weapon });
    } else {
      const msg = 'Select first a weapon and then a Demon to attack!';
      this.events.emit('selectWeapon', msg);
    }
  }

  notYourself() {
    if (this.hitSelected === true) {
      const msg = 'You can do this!. Attack the deamon, not yourself!';
      this.events.emit('notYourself', msg);
    }
  }

  wake() {
    this.battleScene.nextTurn();
  }
}

export default UIChallScene;