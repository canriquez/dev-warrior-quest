import './style.css';
import { showMessage } from './messager';


import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
    width: 680,
    height: 400,
    scene: SimpleScene
};

new Phaser.Game(gameConfig);

document.addEventListener('DOMContentLoaded', () => {

});
