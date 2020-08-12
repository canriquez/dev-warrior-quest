import Phaser from 'phaser'
import Player from './characters';
import { InitScene } from '../scenes/initscene';
import { WorldMapScene } from '../scenes/mapscene';
import './setupTest.js';

var player;

//THIS TEST NOT WORKING

beforeAll(async (done) => {
    console.log('init game creation');
    const testGame = new Phaser.Game({
        type: Phaser.HEADLESS,
        parent: 'content',
        width: 320,
        height: 240,
        scene: [InitScene, WorldMapScene],
        callbacks: {
            postBoot: function () {
                game.loop.stop();
                player = game.scene.getScene('WORLDMAP').player;
            }
        }
    });
    done();
});



let initGameScore = {
    skill: 20,
    courage: 30,
    fear: 30,
    level: 'student'
};


test('it defines the correct base score for new player', async () => {
    await new Promise((r) => setTimeout(r, 2000));
    console.log('here the score');
    console.log(player);
    expect(player.gameScore).toMatchObject(initGameScore)
});

