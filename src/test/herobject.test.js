import { HeroProfile } from '../components/herobject';
import { DeamonProfile } from '../components/deamonobject';

let heroInstanceObject;
let deamInstanceObject;

const initGameScore = {
  skill: 10,
  courage: 20,
  motivation: 30,
  fear: 15,
  level: 'student',
};

const initHitPower = {
  sword: 0,
  knife: 0,
  punch: 0,
};

const firstHitPower = {
  sword: 4,
  knife: 3,
  punch: 2,
};


beforeEach(() => {
  heroInstanceObject = new HeroProfile();
  deamInstanceObject = new DeamonProfile(0);
});


describe('Player Scoring Logic - Initialization', () => {
  test('it defines the correct base score for new player', () => {
    expect(heroInstanceObject.gameScore).toMatchObject(initGameScore);
  });

  test('it verifies .haveILost flag is false at instantiation', () => {
    expect(heroInstanceObject.haveILost()).toEqual(false);
  });

  test('it gets challenge lost on pow=0 at instantiation ', () => {
    expect(heroInstanceObject.challengeLost()).toEqual(true);
  });
});

describe('Player Scoring Logic - Challenge Initiation', () => {
  test('it verifies hitPower {0,0,0} before replentish on first match', () => {
    expect(heroInstanceObject.hitPower()).toMatchObject(initHitPower);
  });

  test('it replentish hitPower object {sword,knife,punch} levels before challenge', () => {
    heroInstanceObject.resetChallengePow();
    expect(heroInstanceObject.hitPower()).toMatchObject(firstHitPower);
  });

});

describe('Player Scoring Logic - Full Challenge', () => {
  test('it attacks enemy and verify hit impact', () => {
    // init battle
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // hero attacks
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
    expect(deamInstanceObject.challengePow).toEqual(3);
  });

  test('it attacks and confirms deamon kill', () => {
    // init battle
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // hero attacks
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);

    expect(deamInstanceObject.challengeLost()).toEqual(true);
  });
});


describe('Deamon Scoring Logic - Full Challenge', () => {
  test('it attacks Hero and verify hit impact', () => {
    // init battle
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // hero attacks
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().sword, heroInstanceObject);
    expect(heroInstanceObject.challengePow).toEqual(12);
  });

  test('it attacks Hero and confirms hero kill', () => {
    // init battle
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // hero attacks
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);


    expect(heroInstanceObject.challengeLost()).toEqual(true);
  });
});

describe('Player Scoring Logic - PowBar Calculation check', () => {
  test.only('it replentish hitPower object, checks pow bar to 100%', () => {
    heroInstanceObject.resetChallengePow();
    console.log(heroInstanceObject.challengePow);
    console.log('example math Ceil :' + Math.ceil((12.5 / 13) * 100))
    expect(heroInstanceObject.powBar()).toBe(0);
  });

});