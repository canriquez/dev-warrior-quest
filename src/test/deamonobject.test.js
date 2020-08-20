import { DeamonProfile } from '../components/deamonobject';

let deamInstanceObject;

const initGameScore = {
  skill: 5,
  courage: 5,
  motivation: 10,
  fear: 10,
  level: 'Nice Deamon',
};

const initHitPower = {
  sword: 0,
  knife: 0,
  punch: 0,
};

const firstHitPower = {
  sword: 1,
  knife: 1,
  punch: 2,
};

beforeAll(() => {
  deamInstanceObject = new DeamonProfile(0);
});

afterAll(() => {
  deamInstanceObject = null;
});


describe('Deamon Scoring Logic - Initialization', () => {
  test('it defines the correct base score for new player', () => {
    expect(deamInstanceObject.gameScore).toMatchObject(initGameScore);
  });

  test('it gets challenge lost on pow=0 at instantiation ', () => {
    expect(deamInstanceObject.challengeLost()).toEqual(true);
  });
});

describe('Deamon Scoring Logic - Challenge Initiation', () => {
  test('it verifies hitPower {0,0,0} before replentish on first match', () => {
    expect(deamInstanceObject.hitPower()).toMatchObject(initHitPower);
  });

  test('it replentish hitPower object {sword,knife,punch} levels before challenge', () => {
    deamInstanceObject.resetChallengePow();
    expect(deamInstanceObject.hitPower().sword).toBeCloseTo(firstHitPower.sword);
    expect(deamInstanceObject.hitPower().knife).toBeCloseTo(firstHitPower.knife);
    expect(deamInstanceObject.hitPower().punch).toBeCloseTo(firstHitPower.punch);
  });
});
