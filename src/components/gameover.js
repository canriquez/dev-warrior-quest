import Phaser from 'phaser';
import { Weapon } from './weapons';

export class GameOverScreen extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 240, 100);
    this.scene = scene;
    console.log('I got to gameover screen !');
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.7);
    graphics.strokeRect(-150, -45, 290, 240);
    graphics.fillRect(-150, -45, 290, 240);

    graphics.setScrollFactor(0);
    this.text1 = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      color: '#FFCC00', align: 'center', fontSize: 24, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text1);
    this.text2 = new Phaser.GameObjects.Text(scene, 0, 30, '', {
      color: '#ffffff', align: 'left', fontSize: 14, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text2);
    this.text3 = new Phaser.GameObjects.Text(scene, 0, 60, '', {
      color: '#ffffff', align: 'left', fontSize: 14, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text3);
    this.text4 = new Phaser.GameObjects.Text(scene, 0, 90, '', {
      color: '#ffffff', align: 'left', fontSize: 14, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text4);
    this.text5 = new Phaser.GameObjects.Text(scene, 0, 115, '', {
      color: '#ffffff', align: 'left', fontSize: 14, wordWrap: { width: 280, useAdvancedWrap: true },
    });
    this.add(this.text5);
    this.text7 = new Phaser.GameObjects.Text(scene, 0, 140, '', {
      color: '#d81e5b', align: 'left', fontSize: 14, wordWrap: { width: 280, useAdvancedWrap: true },
    });
    this.add(this.text7);

    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.text3.setScrollFactor(0);
    this.text4.setScrollFactor(0);
    this.text5.setScrollFactor(0);
    this.text7.setScrollFactor(0);


    this.exitButton = new Weapon(this.scene, 0, 460, 'bluebtn', 'exit', (text) => {
      this.hideEvent = null;
      this.visible = false;
      console.log(`from endchallenge group :${text}`);
      this.scene.backToParent();
    });
    this.exitButton.alpha = 1;
    this.exitButton.scale = 0.3;
    this.add(this.exitButton);

    // this.exitButton.setScrollFactor(0);

    this.text6 = new Phaser.GameObjects.Text(scene, 0, 175, '', {
      color: '#ffffff', align: 'left', fontSize: 18, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text6);
    this.text1.setOrigin(0.5);
    this.text2.setOrigin(0.5);
    this.text3.setOrigin(0.5);
    this.text4.setOrigin(0.5);
    this.text5.setOrigin(0.5);
    this.text6.setOrigin(0.5);
    this.text7.setOrigin(0.5);
    this.text6.setScrollFactor(0);


    // Add a back button., this will fire the callback that will enable you to come back to the mai
    this.visible = false;
  }

  showMessage(text) {
    this.text1.setText(text.r1);
    this.text2.setText(text.r2);
    this.text3.setText(text.r3);
    this.text4.setText(text.r4);
    this.text5.setText(text.r5);
    this.text7.setText(text.r6);
    this.text6.setText('Go Back');
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}

export default GameOverScreen;