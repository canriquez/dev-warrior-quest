import Phaser from 'phaser';

export class GameScoreBoard extends Phaser.GameObjects.Container {

    constructor(scene, x, y, sObj) {
        super(scene, x, y);
        this.scoreObject = sObj;
        // display progress bar


        //Background box

        let graphics = this.scene.add.graphics();
        graphics.setScrollFactor(0);
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.5);
        graphics.strokeRect(0, 0, 290, 65);
        graphics.fillRect(0, 0, 290, 65);

        this.ScoreText = new Phaser.GameObjects.Text(
            scene, 150, 0,
            this.scoreObject.score,
            {
                color: '#ffffff',
                align: 'left',
                fontSize: 13,
                wordWrap:
                {
                    width: 180,
                    useAdvancedWrap: true
                }
            });

        this.ScoreText.setScrollFactor(0);
        this.add(this.ScoreText);

        //Add fear box in the back
        this.fBox = this.scene.add.graphics();
        this.fBox.setScrollFactor(0);
        this.fBox.fillStyle(0xd81e5b, 1);
        this.fBox.fillRect(3, 63, 68, 0);
        this.add(this.fBox);

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
    };


    updateScoreBoard(sO) {
        let maxScale = 55;
        let scoreA = [sO.skill, sO.motiv, sO.coura];
        let fear = sO.fear;
        let maxScore = scoreA.reduce(function (a, b) {
            return Math.max(a, b);
        });
        let totScore = scoreA.reduce((a, b) => a + b, 0)

        let pixScore = [
            scoreA[0] / maxScore * maxScale * -1,
            scoreA[1] / maxScore * maxScale * -1,
            scoreA[2] / maxScore * maxScale * -1,
            fear / totScore * 60 * -1
        ]; //[skill, motivation, courage, fear]

        console.log('Score Board Class: this is the level I got');
        console.log(sO);

        //Update Fear
        this.fBox.clear();
        this.fBox.fillStyle(0xd81e5b, 1);
        this.fBox.fillRect(3, 63, 68, pixScore[3]);

        //Update Skill
        this.sBar.clear()
        this.sBar.fillStyle(0xF5EE9E, 1);
        this.sBar.fillRect(6, 60, 18, pixScore[0]);

        //Update Motivation
        this.mBox.clear();
        this.mBox.fillStyle(0xd78521, 1);
        this.mBox.fillRect(28, 60, 18, pixScore[1]);

        //Update Courage
        this.cBar.clear();
        this.cBar.fillStyle(0x2E933C, 1);
        this.cBar.fillRect(49, 60, 18, pixScore[2]);
        this.add(this.cBar);

        //Update score numbers


    };

    turnOff() {
        this.active = false;
        this.visible = false;
    }
};

export default GameScoreBoard;