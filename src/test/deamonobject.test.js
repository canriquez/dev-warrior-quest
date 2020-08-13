import { InitScene } from '../scenes/initscene';
import { WorldMapScene } from '../scenes/mapscene';
import { HeroProfile } from '../components/herobject'
import { DeamonProfile } from '../components/deamonobject'

let deamInstanceObject;

let initGameScore = {
    skill: 20,
    courage: 10,
    motivation: 10,
    fear: 10,
    level: 'nice'
};

let initHitPower = {
    sword: 0,
    knife: 0,
    punch: 0
}

let firstHitPower = {
    sword: 0.99,
    knife: 0.99,
    punch: 2.52
}

beforeAll(() => {
    deamInstanceObject = new DeamonProfile(0);
});

afterAll(() => {
    deamInstanceObject = null;
});



describe('Deamon Scoring Logic - Initialization', () => {

    test('it defines the correct base score for new player', () => {
        expect(deamInstanceObject.gameScore).toMatchObject(initGameScore)
    });

    test('it gets challenge lost on pow=0 at instantiation ', () => {
        expect(deamInstanceObject.challengeLost()).toEqual(true);
    })

});

describe('Deamon Scoring Logic - Challenge Initiation', () => {
    test('it verifies hitPower {0,0,0} before replentish on first match', () => {
        expect(deamInstanceObject.hitPower()).toMatchObject(initHitPower);
    })

    test('it replentish hitPower object {sword,knife,punch} levels before challenge', () => {
        deamInstanceObject.resetChallengePow()
        expect(deamInstanceObject.hitPower().sword).toBeCloseTo(firstHitPower.sword);
        expect(deamInstanceObject.hitPower().knife).toBeCloseTo(firstHitPower.knife);
        expect(deamInstanceObject.hitPower().punch).toBeCloseTo(firstHitPower.punch);

    });
});
