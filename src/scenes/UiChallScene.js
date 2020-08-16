import Phaser from 'phaser';
import { CONST } from '../components/const';
import MenuItem from '../components/menuitems';
import Help from '../components/helpers';
import Menus from '../components/menus';
import MessageChallenge from '../components/challmessages';
import onScreenInstructions from '../components/osinstructions';

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
        this.buildScene();
        this.sys.events.on('wake', this.wake, this);
    };

    buildScene() {
        console.log('#####- UI: Creating buttons');
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
        console.log('#####- UI: Add menu Items for buttons');
        this.heroMenu.addMenuItem(menuItemSword);
        this.heroMenu.addMenuItem(menuItemKnife);
        this.heroMenu.addMenuItem(menuItemPunch);


        console.log('#####- Loading challenge Scene to setup event listeners');
        //retrive Challange scene
        this.battleScene = this.scene.get(CONST.SCENES.CHALLENGE);


        console.log('#####- UI: Adding listeners for HeroSelect, attack and not yourslef');
        this.battleScene.events.on("HeroSelect", this.onHeroSelect, this);
        this.battleScene.events.on("attackDeamon", this.onDeamonSelect, this);
        this.battleScene.events.on("notYourself", this.notYourself, this);

        console.log('#####- UI: battle scene is here below');
        console.log(this.battleScene);

        //setup listeners for UI messages and Instructions
        this.message = new MessageChallenge(this, this.battleScene.events);
        this.instructions = new onScreenInstructions(this, this.battleScene.events);

        console.log('#####- UI: Add message listeners to to Scene');
        this.add.existing(this.message);
        this.add.existing(this.instructions);

        console.log('#####- Messages listeners done. Now attempt to request next turn');
        this.battleScene.nextTurn();
    }

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
    };

    onDeamonSelect(deamonId) {
        //only react if player has selected a strike in the current move.
        console.log('Hit selected? : ' + this.hitSelected + 'current hit : ' + this.currentHit);
        if (this.hitSelected == true) {
            let weapon = Help.hits()[this.currentHit];
            this.hitSelected = false;
            this.currentHit = null;
            console.log('this was recieved:');
            console.log('Deamon selected for attack :' + deamonId)
            this.heroMenu.disableMenu();
            this.events.emit('demonAttacked', { id: deamonId, weapon: weapon });

        } else {
            console.log('select a current hit');
            let msg = 'Select first a weapon and then a Demon to attack!'
            this.events.emit('selectWeapon', msg);
        }
    };

    notYourself() {
        if (this.hitSelected == true) {
            let msg = 'You can do this!. Attack the deamon, not yourself!'
            this.events.emit('notYourself', msg);
        };
    };

    wake() {
        console.log('|||###@@##||| weaking up challenge scene UI for the next challege')
        console.log(this.sys.game.globals.settings);
        this.battleScene.nextTurn();
    }
};

export default UIChallScene;