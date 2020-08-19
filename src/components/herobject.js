/* eslint-disable no-underscore-dangle */
export class HeroProfile {
  constructor() {
    this._gameScore = {
      skill: 10,
      courage: 20,
      motivation: 30,
      fear: 15,
      level: 'student',
    };

    this._extraScore = 0;

    this._playerName = 'N.N.';

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
  }

  set gameScore(obj) {
    this._gameScore = obj;
  }

  get extraScore() {
    return this._extraScore;
  }

  set extraScore(data) {
    this._extraScore += data;
  }

  get playerName() {
    return this._playerName;
  }

  set playerName(data) {
    this._playerName = data;
  }


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

  resetChallengePow() {
    let pow = this.gameScore.skill * this.challengeMultiplier.skill;
    pow += this.gameScore.courage * this.challengeMultiplier.courage;
    pow += this.gameScore.motivation * this.challengeMultiplier.motiv;
    pow += this.gameScore.fear * this.challengeMultiplier.fear;
    this.challengePow = Math.ceil(pow);
  }

  challengeLost() {
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
    console.log('||||=>  HEro attacking ' + target.name)
    target.takeHit(hitPower);
  }

  takeHit(strikePower) {
    this.challengePow -= Math.ceil((strikePower) * 0.7);
    if (this.challengePow <= 0) {
      this.challengePow = 0;
    }
  }

  powBar() {
    let maxPow = this.gameScore.skill * this.challengeMultiplier.skill;
    maxPow += this.gameScore.courage * this.challengeMultiplier.courage;
    maxPow += this.gameScore.motivation * this.challengeMultiplier.motiv;
    maxPow += this.gameScore.fear * this.challengeMultiplier.fear;
    return Math.ceil((this.challengePow / maxPow) * 100);
  }
}

export default HeroProfile;