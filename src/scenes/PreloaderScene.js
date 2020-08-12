import Phaser from 'phaser';
import { CONST } from '../components/const';

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONST.SCENES.PRELOAD,
        });
    }

    init(data) {
        this.readyCount = 0;
        console.log(data);
    }

    ready() {
        this.scene.start(CONST.SCENES.TITLE, "hello from Preloader Scene");
        this.readyCount++;
        if (this.readyCount === 2) {
            this.scene.start('Title');
        }
    }

    preload() {
        // add logo image
        this.add.image(176, 50, 'logo');

        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        // load assets needed in our game
        this.load.image('tgrass', './src/assets/questmap/grass.png');
        this.load.image('tdirt', './src/assets/questmap/dirth.png');
        this.load.image('base', './src/assets/questmap/base.png');
        this.load.image('pond', './src/assets/questmap/water.png');

        // map in json format
        this.load.tilemapTiledJSON('map', './src/assets/questmap/devquestmap.json');

        // our two characters
        this.load.spritesheet('player', './src/assets/items/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

        //tuto assets
        this.load.image('blueButton1', './src/assets/ui/blue_button02.png');
        this.load.image('blueButton2', './src/assets/ui/blue_button03.png');
        this.load.image('box', './src/assets/ui/grey_box.png');
        this.load.image('checkedBox', './src/assets/ui/blue_boxCheckmark.png');
        this.load.audio('bgMusic', ['./src/assets/music/TownTheme.mp3']);

    }

    create() {
    }
};

export default PreloaderScene;