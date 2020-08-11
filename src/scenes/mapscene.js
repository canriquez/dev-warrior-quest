import Phaser from 'phaser';
import { CONST } from '../components/const';

export class WorldMapScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.WORLDMAP,
        });
    }

    init(data) {
        console.log(data);
        console.log('I got it');
    }

    preload() {
        // load resources here
    }

    create() {
        console.log('Starting World Map Scene');

        const map = this.make.tilemap({ key: 'map' });

        const grassTileSet = map.addTilesetImage('[A]Grass1_pipo', 'tgrass');
        const dirtTileSet = map.addTilesetImage('[A]Grass1-Dirt2_pipo', 'tdirt');
        const baseTileSet = map.addTilesetImage('[Base]BaseChip_pipo', 'basemap');
        const pondTileSet = map.addTilesetImage('[A]Water7_pipo', 'pond');

        const grassLayer = map.createStaticLayer('grass', grassTileSet, 0, 0);
        const pathLayer = map.createStaticLayer('below_player', dirtTileSet, 0, 0);
        const worldLayer = map.createStaticLayer('worldaround', baseTileSet, 0, 0);
        const pondLayer = map.createStaticLayer('waterpond', pondTileSet, 0, 0);

        /*         const mPbombb = map.addTilesetImage('bombounce', 'basemap');
        
                
                const mPath = map.addTilesetImage('below_player', 't_below_player');
                const mPond = map.addTilesetImage('waterpond', 'tpond');
        
        
        
        
                const obstacles = map.createStaticLayer('worldaround', tiles, 0, 0);
                obstacles.setCollisionByExclusion([-1]); */

        this.player = this.physics.add.sprite(50, 100, 'player', 6);
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        // enable keystroke detection
        this.cursors = this.input.keyboard.createCursorKeys();

        // enable camara
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = false;
    }

    update() {
        // Horizontal movement
        this.player.body.setVelocity(0); // plsyer is normally standing still after one step

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(80);
        }
    }
}

export default WorldMapScene;