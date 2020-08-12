import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Button } from '../components/buttons';

export class OptionsScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.OPTIONS,
        });
    }

    preload() {
    }

    create() {
        //this.musicOn = true;
        //this.soundOn = true;

        this.config = this.sys.game.globals.settings

        this.text = this.add.text(Help.posFixLeftX(0.32), Help.posFixTopY(0.07), 'Options', { fontSize: 40 });
        this.musicButton = this.add.image(Help.posFixLeftX(0.19), Help.posFixTopY(0.30), 'checkedBox');
        this.musicText = this.add.text(Help.posFixLeftX(0.26), Help.posFixTopY(0.26), 'Music Enabled', { fontSize: 24 });

        this.soundButton = this.add.image(Help.posFixLeftX(0.19), Help.posFixTopY(0.45), 'checkedBox');
        this.soundText = this.add.text(Help.posFixLeftX(0.26), Help.posFixTopY(0.41), 'Sound Effects', { fontSize: 24 });

        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            this.config.musicOn = !this.config.musicOn;
            this.updateAudioSettings();
        }.bind(this));

        this.soundButton.on('pointerdown', function () {
            this.config.soundOn = !this.config.soundOn;
            this.updateAudioSettings();
        }.bind(this));

        this.updateAudioSettings();

        /*         this.menuButton = this.add.sprite(Help.posFixLeftX(0.5), Help.posFixBottomY(0.15), 'blueButton1').setInteractive();
                this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
                Phaser.Display.Align.In.Center(this.menuText, this.menuButton);
        
                this.menuButton.on('pointerdown', function (pointer) {
                    this.scene.start(CONST.SCENES.TITLE);
                }.bind(this)); */

        this.menuButton = new Button(this, Help.posFixLeftX(0.5), Help.posFixBottomY(0.15), 'blueButton1', 'blueButton2', 'Menu', CONST.SCENES.TITLE);

        this.updateAudioSettings();
    };

    updateAudioSettings() {
        if (this.config.musicOn === false) {
            this.musicButton.setTexture('box');
            this.sys.game.globals.bgMusic.stop();
            this.config.bgMusicPlaying = false;
        } else {
            this.musicButton.setTexture('checkedBox');
            if (this.config.bgMusicPlaying === false) {
                this.sys.game.globals.bgMusic.play();
                this.config.bgMusicPlaying = true;
            }
        }

        if (this.config.soundOn === false) {
            this.soundButton.setTexture('box');
        } else {
            this.soundButton.setTexture('checkedBox');
        }
    }
};

export default OptionsScene;