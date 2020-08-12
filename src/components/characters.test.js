import Phaser from 'phaser'
import Player from './characters';

var game;
var scene;
var player;

/* beforeAll(() => {
    game = new Phaser.Game({
        type: Phaser.HEADLESS,
        scene: {
            init: function () {
                scene = new Phaser.scene({ key: 'test' });
                done();
            }
        },
        callbacks: {
            postBoot: function () {
                game.loop.stop();
                testScene = game.scene.getScene('test');
                player = new Player({
                    scene: testScene,
                    x: 50,
                    y: 100,
                    texture: 'player',
                    type: 'hero'
                });
            }
        }
    });
}); */

/* afterAll(() => {
    game.destroy(true, true);
    game.runDestroy();
});
 */
/* beforeEach(() => {
    player = new Player({
        scene: scene,
        x: 50,
        y: 100,
        texture: 'player',
        type: 'hero'
    });
}); */

let initGameScore = {
    skill: 20,
    courage: 30,
    fear: 30,
    level: 'student'
};

console.log('here the score');
console.log(player);

test('it defines the correct base score for new player', () => {
    expect(initGameScore).toMatchObject(initGameScore)
});

