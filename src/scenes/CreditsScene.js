import Phaser from 'phaser';
import { CONST } from '../components/const';

export class CreditsScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.CREDITS,
        });
    }

    preload() {
    }

    create() {
    }
};

export default CreditsScene;