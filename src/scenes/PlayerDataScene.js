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

  init(data) {
    console.log(data);
    //this.scale.fullscreenTarget = document.getElementById(config.parent);
  }

  preload() {
  }

  create() {
    this.add.image(240, 175, 'usrinput');
    this.inputTag = document.getElementById('utext');
    this.inputTag.classList.add('showtag');

    this.saveButton = new Weapon(this, 240, 250, 'bluebtn', 'exit', (text) => {
      this.hideEvent = null;
      this.visible = false;
      if (this.inputTag.value == '') { return }
      console.log('I cought from the input tag :' + this.inputTag.value);
      this.saveAndStart();
      //this.scene.backToParent();
    });
    this.saveButton.scale = 0.2;

    this.text1 = new Phaser.GameObjects.Text(this, 225, 240, "GO!",
      {
        color: '#FFCC00',
        align: 'center',
        fontSize: 18,
        wordWrap:
        {
          width: 240,
          useAdvancedWrap: true
        }
      });
    this.add.existing(this.text1);
  };

  saveAndStart() {
    this.userName = this.sys.game.globals.settings;
    this.inputTag.classList.remove('showtag');
    this.userName.userName = this.inputTag.value;
    console.log('User name is: ' + this.sys.game.globals.settings.userName)
    this.scene.start(CONST.SCENES.TITLE, "Go from UserName Scene");
  }

}

export default PlayerDataScene;