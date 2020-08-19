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

describe('Player Scoring Logic - HERO PowBar Calculation check', () => {
  test('it replentish hitPower object, checks pow bar to 100%', () => {
    heroInstanceObject.resetChallengePow();
    expect(heroInstanceObject.powBar()).toBe(104);
  });

  test('it replentish hitPower object, get 1x hit and verifies pow bar reduction', () => {
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // demon attacks hero
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    expect(heroInstanceObject.powBar()).toBe(88);
  });

  test('it replentish hitPower object, get 2 hits and verifies pow bar reduction', () => {
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // demon attacks hero
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);
    deamInstanceObject.attackEnemy(deamInstanceObject.hitPower().punch, heroInstanceObject);

    expect(heroInstanceObject.powBar()).toBe(72);
  });
});

describe('Player Scoring Logic - DEMON PowBar Calculation check', () => {
  test('it replentish hitPower object, checks pow bar to 100%', () => {
    deamInstanceObject.resetChallengePow();
    expect(deamInstanceObject.powBar()).toBe(108);
  });

  test('it replentish hitPower object, get 1x hit and verifies pow bar reduction', () => {
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // demon attacks hero
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
    expect(deamInstanceObject.powBar()).toBe(47);
  });

  test('it replentish hitPower object, get 2x hit and verifies pow bar reduction', () => {
    heroInstanceObject.resetChallengePow();
    deamInstanceObject.resetChallengePow();

    // demon attacks hero
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
    heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
    expect(deamInstanceObject.powBar()).toBe(0);
  });
});