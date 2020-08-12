import Phaser from 'phaser';
import { CONST } from '../components/const';
import { config } from '../config/config'
import { Button } from '../components/buttons';

export class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.TITLE,
        });
    }

    init(data) {
        console.log(data);
    }

    preload() {
    }

    create() {
        // Play Game Button
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);

        this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start(CONST.SCENES.WORLDMAP);
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton2');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton1');
        });

        // Options button
        this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.optionsButton);

        this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);

        this.optionsButton.on('pointerdown', function (pointer) {
            this.scene.start(CONST.SCENES.OPTIONS);
        }.bind(this));

        // Credits button
        this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.creditsButton, -1);

        this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);

        this.creditsButton.on('pointerdown', function (pointer) {
            this.scene.start(CONST.SCENES.CREDITS);
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton2');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton1');
        });

        this.config = this.sys.game.globals.settings;
        if (this.config.musicOn === true && this.config.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.config.bgMusicPlaying = true;
            this.sys.game.globals.bgMusic = this.bgMusic;
        }
    };

    centerButton(gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height)
        );
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }
};

export default TitleScene;