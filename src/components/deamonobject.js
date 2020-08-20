/* eslint-disable no-underscore-dangle */
import { Deamons } from './deamontypes';

export class DeamonProfile {
  constructor(type) {
    this.gameScore = Deamons.badness()[type];

    this.challengePow = 0.0;

    this.alive = true;

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

  resetChallengePow() {
    let pow = this.gameScore.skill * this.challengeMultiplier.skill;
    pow += this.gameScore.courage * this.challengeMultiplier.courage;
    pow += this.gameScore.motivation * this.challengeMultiplier.motiv;
    this.challengePow = Math.ceil(pow);
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
      sword: Math.ceil(pow * this.weaponFactor.sword),
      knife: Math.ceil(pow * this.weaponFactor.knife),
      punch: Math.ceil(pow * this.weaponFactor.punch),
    };
  }

  // I plan to call thislike this gamePlayer.attackEnemy(game.Player.hitPower.sword, target);
  // eslint-disable-next-line class-methods-use-this
  attackEnemy(hitPower, target) {
    target.takeHit(hitPower);
  }

  takeHit(strikePower) {
    this.challengePow -= Math.ceil((strikePower));
    if (this.challengePow <= 0) {
      this.challengePow = 0;
    }
  }

  powBar() {
    let maxPow = (this.gameScore.skill * this.challengeMultiplier.skill);
    maxPow += (this.gameScore.courage * this.challengeMultiplier.courage);
    maxPow += (this.gameScore.motivation * this.challengeMultiplier.motiv);
    return Math.ceil((this.challengePow / maxPow) * 100);
  }
}


export default DeamonProfile;