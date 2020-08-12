import Phaser from 'phaser';
import { CONST } from '../components/const';

export class OptionsScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.OPTIONS,
        });
    }

    preload() {
    }

    create() {
    }
};

export default OptionsScene;