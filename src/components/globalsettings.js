/* eslint-disable no-underscore-dangle */
export class GlobalSettings {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._globalScore = {};
    this._nextChallenge = {
      message: '',
      done: [],
    };
    this._playerName = '';
    this._last = null;
    this._chScore = {
    };
    this._extras = {
    };
  }

  set playerName(value) {
    this._playerName = value;
  }

  get playerName() {
    return this._playerName;
  }

  set last(value) {
    this._last = value;
  }

  get last() {
    return this._last;
  }

  set extras(value) {
    this._extras = value;
  }

  get extras() {
    return this._extras;
  }

  set chScore(value) {
    this._chScore = value;
  }

  get chScore() {
    return this._chScore;
  }

  set nextChallenge(value) {
    this._nextChallenge = value;
  }

  get nextChallenge() {
    return this._nextChallenge;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}

export default GlobalSettings;