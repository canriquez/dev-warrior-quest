import { Help } from '../components/helpers.js';

const logPost = [
    '<-- Demon-2 Attacks Carlos (Pow Left:11)',
    'Demon-1 Attacks Carlos (Pow Left:12)',
    '--> Carlos Attacks Demon-1 (Pow Left:4)',
];

const endChallengeMsg = {
    r1: "YOU HAVE WON",
    r2: "Skills    : + 10",
    r3: "Motivation: + 10",
    r4: "Courage   : + 10",
    r5: "Challenge success : + 10 points."
}

const gameOverMsg = {
    r1: "CONGRATULATIONS",
    r2: "Skills    : + 10",
    r3: "Motivation: + 10",
    r4: "Courage   : + 10",
    r5: "Challenge success : + 10 points.",
    r6: "Final Score : 10"
}

let logHtlmTagExpected = "<p>--> Carlos Attacks Demon-1 (Pow Left:4)<p>"
logHtlmTagExpected += "<p>Demon-1 Attacks Carlos (Pow Left:12)<p>"
logHtlmTagExpected += "<p><-- Demon-2 Attacks Carlos (Pow Left:11)<p>";




describe('Builds post htmlTag for combat lot rendering', () => {
    test('it creates HTML from logPost array', () => {
        expect(Help.battleLog(logPost, true)).toEqual(logHtlmTagExpected);
    });
});

describe('Builds End of Challenge text object to display final message ', () => {
    test('it creates HTML from logPost array', () => {
        expect(Help.ecMsg(0, 10, 10, 10, 10)).toEqual(endChallengeMsg);
    });
});

describe('Builds Game Over text object to display Game Over Message ', () => {
    test('it creates HTML from logPost array', () => {
        expect(Help.gameOverMsg(0, 10, 10, 10, 10, 10)).toEqual(gameOverMsg);
    });
});
