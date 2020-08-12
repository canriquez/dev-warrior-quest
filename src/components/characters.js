import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture, 1);
        config.scene.add.existing(this);
        //config.scene.physics.add.existing(this);
        this.setInteractive();

        //this.on('pointerdown'.this.clickMe, this);
        console.log('attempting to instantiate the player')
        this.type = config.type;


        console.log('this is the object');
        console.log(this);

        this.gameScore = {
            skill: 20,
            courage: 30,
            motivation: 40,
            fear: 30,
            level: 'student'
        };

        this.challengePow = 0;

        this.weaponFactor = {
            sword: 0.3,
            kife: 0.2,
            punch: 0.1,
        };
        this.challengeMultiplier = {
            skill: 0.1,
            courage: 0.2,
            motiv: 0.5,
            fear: 0.5
        };
    }

    updateWinGameScore(prize) {
        this.gameScore.skill += prize.skill;
        this.gameScore.courage += prize.courage;
        this.gameScore.motivation += prize.motivation;
        return;
    };

    updateLossGameScore(prize) {
        this.gameScore.skill -= prize.skill;
        this.gameScore.courage -= prize.courage;
        this.gameScore.motivation -= prize.motivation;
        return
    };

    haveILost() {
        let brave = this.gameScore.skill + this.gameScore.courage + this.gameScore.motivation;
        return brave >= this.fear ? false : true;
    };

    clickMe() {
        console.log('you clicked the sprite :' + this.type);
    };

    resetChallengePow() {
        let pow = this.gameScore.skill * this.challengeMultiplier.skill;
        pow += this.gameScore.courage * this.challengeMultiplier.courage;
        pow += this.gameScore.motiv * this.challengeMultiplier.motiv;
        pow -= this.gameScore.fear * this.challengeMultiplier.fear;
        this.challengePow = pow;
        return
    };

    challengeLost() {
        return this.challengePow <= 0 ? true : false
    };

    hitPower() {
        let pow = this.challengePow;
        return {
            sword: (pow * this.weaponFactor.sword),
            knife: (pow * this.weaponFactor.knife),
            punch: (pow * this.weaponFactor.punch)
        }
    };

    //I plan to call thislike this gamePlayer.attackEnemy(game.Player.hitPower.sword, target);
    attackEnemy(hitPower, target) {
        target.takeHit(hitPower);
    };

    takeHit(strikePower) {
        this.challengePow -= strikePower;

    };

};

export default Player;