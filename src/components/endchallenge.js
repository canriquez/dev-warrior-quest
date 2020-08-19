import Phaser from 'phaser';

export class EndChallenge extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 240, 80);
    this.scene = scene;
    // this.callback = callback;
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.7);
    graphics.strokeRect(-150, -45, 290, 240);
    graphics.fillRect(-150, -45, 290, 240);
    this.text1 = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      color: '#FFCC00', align: 'center', fontSize: 24, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text1);
    this.text2 = new Phaser.GameObjects.Text(scene, 0, 40, '', {
      color: '#ffffff', align: 'left', fontSize: 14, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text2);
    this.text3 = new Phaser.GameObjects.Text(scene, 0, 65, '', {
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

    this.text6 = new Phaser.GameObjects.Text(scene, 0, 160, '', {
      color: '#ffffff', align: 'left', fontSize: 18, wordWrap: { width: 240, useAdvancedWrap: true },
    }).setInteractive();

    this.text6.on('pointerup', () => {
      this.scene.backToParent();
    });

    this.text6.on('pointerover', () => {
      // this.button.setTexture(key2);
      this.text6.setColor('#FFCC00');
    });

    this.text6.on('pointerout', () => {
      this.text6.setColor('#ffffff');
    });


    this.add(this.text6);
    this.text1.setOrigin(0.5);
    this.text2.setOrigin(0.5);
    this.text3.setOrigin(0.5);
    this.text4.setOrigin(0.5);
    this.text5.setOrigin(0.5);
    this.text6.setOrigin(0.5);


    // Add a back button., this will fire the callback that will enable you to come back to the mai
    this.visible = false;
  }

  showMessage(text) {
    this.text1.setText(text.r1);
    this.text2.setText(text.r2);
    this.text3.setText(text.r3);
    this.text4.setText(text.r4);
    this.text5.setText(text.r5);
    this.text6.setText('Go Back');
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    const blogTag = document.getElementById('b-log');
    blogTag.classList.remove('show');
    blogTag.classList.add('hide');
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}

export default EndChallenge;