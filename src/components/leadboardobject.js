import Phaser from 'phaser';

export class LeadBoardObject extends Phaser.GameObjects.Container {
  constructor(scene, x, y, name, score) {
    super(scene, x, y);
    this.x = x;
    this.y = y;
    this.name = name;
    this.score = score;

    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-150, -40, 290, 25);
    graphics.fillRect(-150, -40, 290, 25);
    this.text1 = new Phaser.GameObjects.Text(scene, -110, -36, name, {
      color: '#ffffff', align: 'left', fontSize: 15, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text1);
    // this.text1.setOrigin(2);

    this.text2 = new Phaser.GameObjects.Text(scene, 65, -38, score, {
      color: '#ffffff', align: 'right', fontSize: 15, wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.add(this.text2);

    this.visible = true;
  }
}

export default LeadBoardObject;