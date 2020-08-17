/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

import {
  CONST
}

  from '../components/const';

import {
  Weapon
}

  from '../components/weapons';

import {
  MicroverseAPI
}

  from '../components/leaderboardapi';


export class PlayerDataScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.INPUT,
    }

    );
  }

  init(data) {
    console.log(data);
    //this.scale.fullscreenTarget = document.getElementById(config.parent);
  }

  preload() { }

  create() {

    this.add.image(240, 175, 'usrinput');
    this.inputTag = document.getElementById('utext');
    this.inputTag.classList.add('showtag');

    /* 
        this.logo = this.add.image(250, 150, 'logo');
        this.logo.scale = 0.5; */

    this.saveButton = new Weapon(this, 240, 280, 'bluebtn', 'exit', (text) => {
      this.hideEvent = null;
      this.visible = false;

      if (this.inputTag.value == '') {
        return
      }

      console.log('I cought from the input tag :' + this.inputTag.value);
      this.saveAndStart();
      //this.scene.backToParent();
    }

    );
    this.saveButton.scale = 0.4;

    this.text1 = new Phaser.GameObjects.Text(this, 225, 270, "GO!",
      {

        color: '#FFCC00',
        align: 'center',
        fontSize: 24,
        wordWrap: {
          width: 240,
          useAdvancedWrap: true
        }
      }

    );
    this.add.existing(this.text1);
  }

  ;

  saveAndStart() {
    this.userName = this.sys.game.globals.settings;
    this.inputTag.classList.remove('showtag');
    this.userName.userName = this.inputTag.value;
    console.log('User name is: ' + this.sys.game.globals.settings.userName);

    /*     let response = MicroverseAPI.setScore('sussi', 240, 0);
        console.log(response);
        MicroverseAPI.getScore(0).then((response) => {
          console.log(response);
        }); */

    this.scene.start(CONST.SCENES.TITLE, "Go from UserName Scene");
  }

}

export default PlayerDataScene;