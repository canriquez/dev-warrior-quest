/* eslint-disable no-underscore-dangle */
export class HeroProfile {
    constructor() {
        this._gameScore = {
            skill: 10,
            courage: 20,
            motivation: 30,
            fear: 20,
            level: 'student',
        };

        this.challengePow = 0.0;

        this.weaponFactor = {
            sword: 0.3,
            knife: 0.2,
            punch: 0.1,
        };
        this.challengeMultiplier = {
            skill: 0.1,
            courage: 0.2,
            motiv: 0.5,
            fear: -0.5,
        };
    }

    get gameScore() {
        return this._gameScore;
    };


    updateWinGameScore(prize) { // prize will be an object with the match score elements
        this.gameScore.skill += prize.skill;
        this.gameScore.courage += prize.courage;
        this.gameScore.motivation += prize.motivation;
    }

    updateLossGameScore(prize) {
        this.gameScore.skill -= prize.skill;
        this.gameScore.courage -= prize.courage;
        this.gameScore.motivation -= prize.motivation;
    }

    haveILost() {
        const brave = this.gameScore.skill + this.gameScore.courage + this.gameScore.motivation;
        return !(brave >= this.gameScore.fear);
    }

    clickMe() {
        console.log(`you clicked the sprite :${this.type}`);
        console.log(`Have I lost ?${this.haveILost()}`);

        console.log(`my challenge Pow before :${this.challengePow}`);
        this.resetChallengePow();
        console.log(`my challenge pow after :${this.challengePow}`);
        console.log(this.hitPower().sword);
        console.log(this.hitPower().knife);
        console.log(this.hitPower().punch);
    }

    resetChallengePow() {
        let pow = this.gameScore.skill * this.challengeMultiplier.skill;
        pow += this.gameScore.courage * this.challengeMultiplier.courage;
        pow += this.gameScore.motivation * this.challengeMultiplier.motiv;
        pow += this.gameScore.fear * this.challengeMultiplier.fear;
        this.challengePow = pow;
    }

    challengeLost() {
        return this.challengePow <= 0;
    }

    hitPower() {
        const pow = this.challengePow;
        return {
            sword: (pow * this.weaponFactor.sword),
            knife: (pow * this.weaponFactor.knife),
            punch: (pow * this.weaponFactor.punch),
        };
    }

    // I plan to call thislike this gamePlayer.attackEnemy(game.Player.hitPower.sword, target);
    // eslint-disable-next-line class-methods-use-this
    attackEnemy(hitPower, target) {
        target.takeHit(hitPower);
    }

    takeHit(strikePower) {
        this.challengePow -= strikePower;
    }
}


export default HeroProfile;