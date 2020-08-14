import Phaser from 'phaser';
import { Help } from './helpers';

export class HeroEnergyBar extends Phaser.GameObjects.Container {

    constructor(scene, x, y, total, text) {
        super(scene, x, y);
        //this.scale = 0.2;
        this.energy = total
        // display progress bar
        let pBox = this.scene.add.graphics();
        this.add(pBox);
        let pBar = this.scene.add.graphics();
        this.add(pBar);
        this.text = new Phaser.GameObjects.Text(scene, 0, -15, text,
            {
                color: '#ffffff',
                align: 'left',
                fontSize: 13,
                wordWrap:
                {
                    width: 120,
                    useAdvancedWrap: true
                }
            });
        this.add(this.text);
        pBar.fillStyle(0xFCF787, 0.8);
        pBar.fillRect(2, 2, 75, 12);
        pBox.fillStyle(0x031f4c, 0.8);
        pBox.fillRect(0, 0, 80, 17);
        this.pbox = pBox;
        this.pbar = pBar;
    };


    updateEnergyLevel(level) {
        if (level < 0) { level = 0 };
        console.log('Energy Bar Class: this is the level I got');
        console.log(level);
        let max = 80;
        let lvl = level * max / 100;
        this.pbar.clear();
        if (level >= 80) {
            this.pbar.fillStyle(0x4cd964, 0.8);
        } else if (level < 80 && level > 40) {
            this.pbar.fillStyle(0xffcc00, 0.8);
        } else {
            this.pbar.fillStyle(0xff3b30, 0.8);
        }
        this.pbar.fillRect(0, 0, lvl, 17);
    }
};

export default HeroEnergyBar;