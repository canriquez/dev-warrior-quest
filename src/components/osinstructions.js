import Phaser from 'phaser';

export class onScreenInstructions extends Phaser.GameObjects.Container {
  constructor(scene, events) {
    super(scene, 240, 80);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-150, -45, 290, 90);
    graphics.fillRect(-150, -45, 290, 90);
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      color: '#ffffff', align: 'center', fontSize: 15, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Instruc', this.showMessage, this);
    this.visible = false;
  }

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 10000,
      callback: this.hideMessage,
      callbackScope: this
    });
  }

  showInstruc(text) {
    console.log(`Inial OS Screen:  someone send instruc :${text}`);
    this.text.setText(text);
    console.log('Text was made visible..');
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 6000,
      callback: this.hideMessage,
      callbackScope: this
    });
    console.log(`FInishing displaying message:${text}`);
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}

export default onScreenInstructions;