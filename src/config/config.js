import Phaser from 'phaser';

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
};

export default config;