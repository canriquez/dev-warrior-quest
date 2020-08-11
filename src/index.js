import './style.css';
import Phaser from 'phaser';
import { InitScene } from './scenes/initscene';
import { WorldMapScene } from './scenes/mapscene';

const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scene: [
        InitScene,
        WorldMapScene,
    ],
};

const devGame = new Phaser.Game(config);