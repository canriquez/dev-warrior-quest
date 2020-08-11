import Phaser from 'phaser';
import { CONST } from '../components/const';

export class InitScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.INIT,
        });
    }

    preload() {
        // load resources here
        // map tiles
        this.load.image('tgrass', './src/assets/questmap/grass.png');
        this.load.image('tdirt', './src/assets/questmap/dirth.png');
        this.load.image('base', './src/assets/questmap/base.png');
        this.load.image('pond', './src/assets/questmap/water.png');

        // map in json format
        this.load.tilemapTiledJSON('map', './src/assets/questmap/devquestmap.json');

        // our two characters
        this.load.spritesheet('player', './src/assets/items/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.scene.start(CONST.SCENES.WORLDMAP, 'hello from BootScene');
    }
}

export default InitScene;
