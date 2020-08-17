import Phaser from 'phaser';
import { Help } from './helpers';

export class GameScoreBoard extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    // Instantiates with a variable to obtain total score.
    this.scoreObject = this.scene.player.globals.corazon.gameScore;
    this.totalScore = this.scoreObject.skill
      + this.scoreObject.courage
      + this.scoreObject.motivation
      + scene.player.globals.corazon.extraScore;

    this.playerName = this.scene.sys.game.globals.settings.playerName;
    // this.sys.game.globals.settings.userName
    // Background box

    const graphics = this.scene.add.graphics();
    graphics.setScrollFactor(0);
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.5);
    graphics.strokeRect(0, 0, 295, 65);
    graphics.fillRect(0, 0, 295, 65);

    // TEXT KEYs and individual scores

    this.ScoreKey = new Phaser.GameObjects.Text(
      scene, 80, 20,
      'Skill: -- ',
      {
        color: '#F5EE9E',
        align: 'left',
        fontSize: 13,
        wordWrap:
        {
          width: 180,
          useAdvancedWrap: true,
        },
      },
    );

    this.ScoreKey.setScrollFactor(0);
    this.add(this.ScoreKey);

    this.ScoreKey1 = new Phaser.GameObjects.Text(
      scene, 170, 20,
      'Motivation: ---',
      {
        color: '#d78521',
        align: 'left',
        fontSize: 13,
        wordWrap:
        {
          width: 180,
          useAdvancedWrap: true,
        },
      },
    );


    this.ScoreKey1.setScrollFactor(0);
    this.add(this.ScoreKey1);


    this.ScoreKey2 = new Phaser.GameObjects.Text(
      scene, 80, 40,
      'Courage: ---',
      {
        color: '#2E933C',
        align: 'left',
        fontSize: 13,
        wordWrap:
        {
          width: 180,
          useAdvancedWrap: true,
        },
      },
    );

    this.ScoreKey2.setScrollFactor(0);
    this.add(this.ScoreKey2);

    this.ScoreKey3 = new Phaser.GameObjects.Text(
      scene, 190, 40,
      'Fear: ---',
      {
        color: '#d81e5b',
        align: 'left',
        fontSize: 13,
        wordWrap:
        {
          width: 180,
          useAdvancedWrap: true,
        },
      },
    );


    this.ScoreKey3.setScrollFactor(0);
    this.add(this.ScoreKey3);


    // Overall Score
    this.ScoreText = new Phaser.GameObjects.Text(
      scene, 80, 0,
      '----',
      {
        color: '#ffffff',
        align: 'left',
        fontSize: 13,
        wordWrap:
        {
          width: 210,
          useAdvancedWrap: true,
        },
      },
    );

    this.ScoreText.setScrollFactor(0);
    this.add(this.ScoreText);


    // Add fear box in the back
    this.fBox = this.scene.add.graphics();
    this.fBox.setScrollFactor(0);
    this.fBox.fillStyle(0xd81e5b, 1);
    this.fBox.fillRect(3, 63, 68, 0);
    this.add(this.fBox);

    // Add Skill boxes

    this.sBar = this.scene.add.graphics();
    this.sBar.setScrollFactor(0);
    this.sBar.fillStyle(0xF5EE9E, 1);
    this.sBar.fillRect(6, 60, 18, 0);
    this.add(this.sBar);

    this.mBox = this.scene.add.graphics();
    this.mBox.setScrollFactor(0);
    this.mBox.fillStyle(0xd78521, 1);
    this.mBox.fillRect(28, 60, 18, 0);
    this.add(this.mBox);

    this.cBar = this.scene.add.graphics();
    this.cBar.setScrollFactor(0);
    this.cBar.fillStyle(0x2E933C, 1);
    this.cBar.fillRect(49, 60, 18, 0);
    this.add(this.cBar);
  }


  updateScoreBoard(obj) {
    const scoreObject = obj.player.globals.corazon.gameScore;
    const finalScore = Help.playerScoreToSave(obj);

    const maxScale = 55;
    const scoreA = [scoreObject.skill,
      scoreObject.motivation,
      scoreObject.courage, scoreObject.fear];
    const { fear } = scoreObject;
    const maxScore = scoreA.reduce((a, b) => Math.max(a, b));

    const pixScore = [
      (scoreA[0] / maxScore) * maxScale * -1,
      (scoreA[1] / maxScore) * maxScale * -1,
      (scoreA[2] / maxScore) * maxScale * -1,
      (fear / maxScore) * 55 * -1,
    ]; // [skill, motivation, courage, fear]

    console.log('Score Board Class: this is the level I got');
    console.log(scoreObject);

    // Update Fear
    this.fBox.clear();
    this.fBox.fillStyle(0xd81e5b, 1);
    this.fBox.fillRect(3, 63, 68, pixScore[3]);

    // Update Skill
    this.sBar.clear();
    this.sBar.fillStyle(0xF5EE9E, 1);
    this.sBar.fillRect(6, 60, 18, pixScore[0]);

    // Update Motivation
    this.mBox.clear();
    this.mBox.fillStyle(0xd78521, 1);
    this.mBox.fillRect(28, 60, 18, pixScore[1]);

    // Update Courage
    this.cBar.clear();
    this.cBar.fillStyle(0x2E933C, 1);
    this.cBar.fillRect(49, 60, 18, pixScore[2]);
    this.add(this.cBar);

    // Update score numbers

    // TEXT KEYs and individual scores
    this.ScoreText.setText(`${this.playerName} - Score : ${finalScore}`);
    this.ScoreKey.setText(`Skill: ${scoreObject.skill}`);
    this.ScoreKey1.setText(`Motivation: ${scoreObject.motivation}`);
    this.ScoreKey2.setText(`Courage: ${scoreObject.courage}`);
    this.ScoreKey3.setText(`Fear: ${scoreObject.fear}`);
  }

  turnOff() {
    this.active = false;
    this.visible = false;
  }
}

export default GameScoreBoard;