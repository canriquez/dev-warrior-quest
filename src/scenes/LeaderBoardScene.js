/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Weapon } from '../components/weapons';
import { MicroverseAPI } from '../components/leaderboardapi';
import { LeadBoardObject } from '../components/leadboardobject';

export class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.LEADER,
    });
  }

  init() {
  }

  preload() {
  }

  create() {
    this.add.image(240, 175, 'leadboard');


    this.saveButton = new Weapon(this, 240, 295, 'bluebtn', 'exit', () => {
      this.hideEvent = null;
      this.visible = false;
      this.backToParent();
    });
    this.saveButton.scale = 0.2;

    this.text1 = new Phaser.GameObjects.Text(this, 220, 285, 'Back',
      {
        color: '#FFCC00',
        align: 'center',
        fontSize: 18,
        wordWrap:
        {
          width: 240,
          useAdvancedWrap: true,
        },
      });
    this.add.existing(this.text1);

    this.text2 = new Phaser.GameObjects.Text(this, 105, 75,
      'This is a list of Bravest Warriors ',
      {
        color: '#FFCC00',
        align: 'center',
        fontSize: 14,
        wordWrap:
        {
          width: 300,
          useAdvancedWrap: true,
        },
      });
    this.add.existing(this.text2);


    // Fetch Leader Score Object from API
    MicroverseAPI.getScore(1).then((response) => {
      // build score objects
      for (let i = 0; i < 6; i += 1) {
        if (response[i]) {
          const scoreObject = new LeadBoardObject(this, 240, (170 + (i * 25)),
            response[i].user, response[i].score);
          this.add.existing(scoreObject);
        } else {
          const scoreObject = new LeadBoardObject(this, 240, (170 + (i * 25)),
            '', '');
          this.add.existing(scoreObject);
        }
      }
    });
  }

  backToParent() {
    this.scene.start(CONST.SCENES.TITLE, 'Go from UserName Scene');
  }
}

export default LeaderBoardScene;