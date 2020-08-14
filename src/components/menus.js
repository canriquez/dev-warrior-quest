import Phaser from 'phaser';
import MenuItem from './menuitems';

export class Menus {
    constructor() {
        this.menuItems = [];
        this.menuItemIndex = 0;
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
    }

    confirm() {
        // do the action when enemy to attack is confirmed.
    }

    cleanTheOthers(item) {
        for (let i = 0; i < this.menuItems.length; i += 1) {
            if (!(item == i)) {
                this.menuItems[i].deselect();
            };
        };
    };

    enableMenu() { //enables all but one option in the menu for an attack
        let r = Math.floor(Math.random() * 2);
        for (let i = 0; i < this.menuItems.length; i += 1) {
            if (!(r == i)) {
                this.menuItems[i].enable();
            };
        };
    };

    disableMenu() {
        for (let i = 0; i < this.menuItems.length; i += 1) {
            this.menuItems[i].disable();
        };
    };

};


export default Menus;