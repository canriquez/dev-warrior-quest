import Phaser from 'phaser';
import { CONST } from '../components/const';
import MenuItem from '../components/menuitems';
import Help from '../components/helpers';
import Weapon from '../components/weapons';
import Menus from '../components/menus';
import MessageChallenge from '../components/challmessages';

export class UIChallScene extends Phaser.Scene {
    constructor() {
        super(CONST.SCENES.UICHALL);
        this.heroMenu = new Menus();
        this.currentHit = null;
        this.hitSelected = false;
    }

    init(data) {
        console.log(data);
    }

    preload() {

    }

    create() {

        let menuItemSword = new MenuItem({
            scene: this,
            item: 0,
            name: 'theSword',
            weapon: 'sword',
            callback: (name, item) => {
                console.log('catching menu item selected at UICHallenge: ' + name);
                this.menuItemSelected(this.heroMenu, item);
            },
        });
        let menuItemKnife = new MenuItem({
            scene: this,
            item: 1,
            name: 'theKnife',
            weapon: 'knife',
            callback: (name, item) => {
                console.log('catching menu item selected at UICHallenge: ' + name);
                this.menuItemSelected(this.heroMenu, item);
            },
        });
        let menuItemPunch = new MenuItem({
            scene: this,
            item: 2,
            name: 'thePunch',
            weapon: 'punch',
            callback: (name, item) => {
                console.log('catching menu item selected at UICHallenge: ' + name);
                this.menuItemSelected(this.heroMenu, item);
            },
        });

        this.heroMenu.addMenuItem(menuItemSword);
        this.heroMenu.addMenuItem(menuItemKnife);
        this.heroMenu.addMenuItem(menuItemPunch);

        //retrive Challange scene
        this.battleScene = this.scene.get(CONST.SCENES.CHALLENGE);

        this.battleScene.events.on("HeroSelect", this.onHeroSelect, this);

        this.battleScene.events.on("attackDeamon", this.onDeamonSelect, this);
        console.log(this.battleScene);

        this.battleScene.nextTurn();

        this.message = new MessageChallenge(this, this.battleScene.events);
        this.add.existing(this.message);
    };

    menuItemSelected(menus, item) {
        menus.cleanTheOthers(item);
        this.currentHit = item;
        this.hitSelected = true;
        console.log('this item selected :' + this.currentHit);
        //show message on the hit selected.
        //show message to clock on deamos to attack.
    };

    onHeroSelect(id) {
        console.log('hero index recieved :' + id);
        this.heroMenu.enableMenu(); //this will enable all but one weapon randomly
        /*         this.actionsMenu((data) => {
                    console.log(data) //prints deamon selected
                })
                this.currentMenu = this.actionsMenu; */
    };

    onDeamonSelect(deamonId) {
        //only react if player has selected a strike in the current move.
        console.log('current hit ' + this.currentHit);
        if (this.hitSelected == true) {
            this.hitSelected == false;
            console.log('this was recieved:');
            console.log('Deamon selected for attack :' + deamonId)
            this.heroMenu.disableMenu();
            this.events.emit('demonAttacked', deamonId);

        } else {
            console.log('select a current hit');
            let msg = 'Select first a weapon and then a Demon to attack!'
            this.events.emit('selectWeapon', msg);
        }
    };
}

export default UIChallScene;