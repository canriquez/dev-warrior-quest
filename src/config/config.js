import Phaser from 'phaser';
import { InitScene } from '../scenes/InitScene';
import { PreloaderScene } from '../scenes/PreloaderScene';
import { WorldMapScene } from '../scenes/MapScene';

export const config = {
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
        PreloaderScene,
        WorldMapScene,
    ],
};

export default config;