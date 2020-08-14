import Phaser from 'phaser';
import MenuItem from './menuitems';

export class Menus extends Phaser.GameObjects.Container {

    constructor(x, y, scene, heroes) {
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    };

    addMenuItem() {
        let menuItem = new MenuItem({
            scene: this,
            a: (28 * this.menuItems.length),
            b: 298,
            c: 40,
            d: 40,
            c1: 0xFFFFFF,
            c2: 0x000000,
            name: ('item1' + this.menuItems.length)
        });
        this.menuItems.push(menuItem);
        this.add(menuItem); //adding item into the container
    };
    select(index) {
        if (!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    };

    deselect() {
        this.menuItems[this.menuItemIndex].deselct();
        this.menuItemIndex = 0;
    };
    confirm() {
        //do the action when enemy to attack is confirmed.
    }

    clear() {
        for (var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    };
    remap(units) {
        this.clear();
        for (var i = 0; i < units.length; i++) {
            var unit = units[i];
            this.addMenuItem(unit.type);
        }
    }
}

export default Menus;