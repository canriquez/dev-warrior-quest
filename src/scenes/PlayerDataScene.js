/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Weapon } from '../components/weapons';


export class PlayerDataScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.INPUT,
    });
  }

  init() {
  }

  preload() { }

  create() {
    this.add.image(240, 175, 'usrinput');
    this.inputTag = document.getElementById('utext');
    this.inputTag.classList.add('showtag');

    this.saveButton = new Weapon(this, 240, 280, 'bluebtn', 'exit', () => {
      this.hideEvent = null;
      this.visible = false;

      if (this.inputTag.value === '') {
        return;
      }

      this.saveAndStart();
    });
    this.saveButton.scale = 0.4;

    this.text1 = new Phaser.GameObjects.Text(this, 225, 270, 'GO!',
      {

        color: '#FFCC00',
        align: 'center',
        fontSize: 24,
        wordWrap: {
          width: 240,
          useAdvancedWrap: true,
        },
      });
    this.add.existing(this.text1);
  }


  saveAndStart() {
    this.userName = this.sys.game.globals.settings;
    this.inputTag.classList.remove('showtag');
    this.userName.playerName = this.inputTag.value;
    this.scene.start(CONST.SCENES.TITLE, 'Go from UserName Scene');
  }
}

export default PlayerDataScene;