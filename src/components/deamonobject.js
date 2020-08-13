/* eslint-disable no-underscore-dangle */
import { Deamons } from './deamontypes'
export class DeamonProfile {
    constructor(type) {

        this._gameScore = Deamons.badness()[type];

        this._challengePow = 0.0;

        this.weaponFactor = {
            sword: 0.11,
            knife: 0.11,
            punch: 0.28,
        };
        this.challengeMultiplier = {
            skill: 0.1,
            courage: 0.2,
            motiv: 0.5,
            fear: -1,
        };
    }

    get challengePow() {
        return this._challengePow;
    };

    get gameScore() {
        return this._gameScore;
    };


    resetChallengePow() {
        let pow = this.gameScore.skill * this.challengeMultiplier.skill;
        pow += this.gameScore.courage * this.challengeMultiplier.courage;
        pow += this.gameScore.motivation * this.challengeMultiplier.motiv;
        this._challengePow = pow;
    }

    challengeLost() {
        return this.challengePow <= 0;
    }

    haveILost() {
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
        this._challengePow -= strikePower;
    }
}


export default DeamonProfile;