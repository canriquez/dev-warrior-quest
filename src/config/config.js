import Phaser from 'phaser';
import { InitScene } from '../scenes/InitScene';
import { PreloaderScene } from '../scenes/PreloaderScene';
import { TitleScene } from '../scenes/TitleScene';
import { OptionsScene } from '../scenes/OptionsScene';
import { CreditsScene } from '../scenes/CreditsScene';
import { WorldMapScene } from '../scenes/MapScene';

export const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 480,
    height: 360,
    zoom: 1.5,
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
        TitleScene,
        OptionsScene,
        CreditsScene,
        WorldMapScene,
    ],
};

export default config;