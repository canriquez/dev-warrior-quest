import Phaser from 'phaser';
import { CONST } from '../components/const';
import MenuItem from '../components/menuitems';
import Help from '../components/helpers';
import Weapon from '../components/weapons';
import Menus from '../components/menus';

export class UIChallScene extends Phaser.Scene {
    constructor() {
        super(CONST.SCENES.UICHALL);
    }

    init(data) {
        console.log(data);
    }

    preload() {

    }

    create() {

        this.box1 = new MenuItem({
            scene: this,
            a: 28,
            b: 298,
            c: 40,
            d: 40,
            c1: 0xFFFFFF,
            c2: 0x000000,
            name: 'item1'
        });

        this.box1.select();
        console.log(this.box1);


        // Play Game Button
        this.sword = new Weapon(this,
            Help.posFixLeftX(0.100),
            Help.posFixBottomY(0.11),
            'sword',
            'sword',
            'theSword',
            (weapon) => {
                console.log("From the UI, I got clicked :" + weapon);
            }
        );

        this.knife = new Weapon(this,
            Help.posFixLeftX(0.235),
            Help.posFixBottomY(0.11),
            'knife',
            'knife',
            'theKnife'
        );

        this.punch = new Weapon(this,
            Help.posFixLeftX(0.365),
            Help.posFixBottomY(0.11),
            'punch',
            'punch',
            'thePunch'
        );

        this.menus = this.add.container();
        this.heroMenu = new Menus(100, 100, this);
        this.currentMenu = this.heroMenu;

        // add menu to the container
        this.menus.add(this.heroMenu);
        this.battleScene = this.scene.get(CONST.SCENES.CHALLENGE);

    };

    weaponSelected(weapon) {

    }

};

export default UIChallScene;