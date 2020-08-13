import { InitScene } from '../scenes/initscene';
import { WorldMapScene } from '../scenes/mapscene';
import { HeroProfile } from '../components/herobject'
import { DeamonProfile } from '../components/deamonobject'

let heroInstanceObject;
let deamInstanceObject;

let initGameScore = {
    skill: 10,
    courage: 20,
    motivation: 30,
    fear: 20,
    level: 'student'
};

let initHitPower = {
    sword: 0,
    knife: 0,
    punch: 0
}

let firstHitPower = {
    sword: 3,
    knife: 2,
    punch: 1
}


beforeAll(() => {
    heroInstanceObject = new HeroProfile;
    deamInstanceObject = new DeamonProfile(0);
});


describe('Player Scoring Logic - Initialization', () => {

    test('it defines the correct base score for new player', () => {
        expect(heroInstanceObject.gameScore).toMatchObject(initGameScore)
    });

    test('it verifies .haveILost flag is false at instantiation', () => {
        expect(heroInstanceObject.haveILost()).toEqual(false);
    })

    test('it gets challenge lost on pow=0 at instantiation ', () => {
        expect(heroInstanceObject.challengeLost()).toEqual(true);
    })

});

describe('Player Scoring Logic - Challenge Initiation', () => {
    test('it verifies hitPower {0,0,0} before replentish on first match', () => {
        expect(heroInstanceObject.hitPower()).toMatchObject(initHitPower);
    })

    test('it replentish hitPower object {sword,knife,punch} levels before challenge', () => {
        heroInstanceObject.resetChallengePow()
        expect(heroInstanceObject.hitPower()).toMatchObject(firstHitPower)
    });
});

describe('Player Scoring Logic - Full Challenge', () => {
    test('it attacks enemy and verify hit impact', () => {
        //init battle
        heroInstanceObject.resetChallengePow();
        deamInstanceObject.resetChallengePow()

        //hero attacks
        heroInstanceObject.attackEnemy(heroInstanceObject.hitPower().sword, deamInstanceObject);
        expect(deamInstanceObject.challengePow).toEqual(6);
    })

    test('it replentish hitPower object {sword,knife,punch} levels before challenge', () => {
        heroInstanceObject.resetChallengePow()
        expect(heroInstanceObject.hitPower()).toMatchObject(firstHitPower)
    });
}); 