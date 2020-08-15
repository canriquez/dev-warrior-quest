/* eslint-disable class-methods-use-this, no-unused-vars */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Player } from '../components/characters';
import { GameScoreBoard } from '../components/gamescoreboard';

export class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.WORLDMAP,
    });
  }

  init(data) {
    console.log(data);
    console.log('I got it');
  }

  onChallenge1(player, zone) {
    console.log('I am here in the on this area method');
    this.cameras.main.shake(300);
    console.log('starting challenge 1');
  }

  onChallenge2(player, zone) {
    console.log('I am here in the on this area method');
    this.cameras.main.shake(300);
    console.log('starting challenge 2');
    this.cameras.main.fade(1000);
    this.cameras.main.fadeIn(1000);
  }

  onChallenge3(player, zone) {
    console.log('I am here in the on this area method');
    this.cameras.main.shake(300);
    console.log('starting challenge 3');
    this.cameras.main.fade(1000);
    this.cameras.main.fadeIn(1000);
  }

  onJobInterview(player, zone) {
    console.log('I am here in the on this area method');
    this.cameras.main.shake(300);
    console.log('starting JobInterview');
    this.cameras.main.fade(1000);
    this.cameras.main.fadeIn(1000);
  }

  onEndGame(player, zone) {
    console.log('I am here in the on this area method');
    this.cameras.main.shake(300);
    console.log('starting EngGame');
    this.cameras.main.fade(1000);
    this.cameras.main.fadeIn(1000);
  }

  preload() {
    // load resources here
  }

  create() {
    console.log('Starting World Map Scene');

    const map = this.make.tilemap({ key: 'map' });

    const grassTileSet = map.addTilesetImage('[A]Grass1_pipo', 'tgrass');
    const dirtTileSet = map.addTilesetImage('[A]Grass1-Dirt2_pipo', 'tdirt');
    const baseTileSet = map.addTilesetImage('[Base]BaseChip_pipo', 'base');
    const pondTileSet = map.addTilesetImage('[A]Water7_pipo', 'pond');
    const bombTileSet = map.addTilesetImage('[Base]BaseChip_pipo', 'base');

    const grassLayer = map.createStaticLayer('grass', grassTileSet, 0, 0);
    const pathLayer = map.createStaticLayer('below_player', dirtTileSet, 0, 0);
    const worldLayer = map.createStaticLayer('worldaround', baseTileSet, 0, 0);
    const pondLayer = map.createStaticLayer('waterpond', pondTileSet, 0, 0);
    const bombLayer = map.createStaticLayer('bombounce', bombTileSet, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    bombLayer.setCollisionByProperty({ collides: true });


    /* Check debug rendering for collide assets in layer */
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });

    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: 'player',
      type: 'hero',
    });

    console.log('this player initial score');
    console.log(this.player.globals.corazon.gameScore);


    console.log('Have I lost?');
    console.log(this.player.globals.corazon.haveILost());


    this.physics.add.existing(this.player);


    // this.player = this.physics.add.sprite(50, 100, 'player', 6);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    // enables collide on worldLayer with player

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.player, bombLayer);


    // capture main game area map objects
    const gA = map.objects[0].objects;

    // Player starting point
    this.player.setPosition(Help.adjXpos(gA[0]), Help.adjYpos(gA[0]));


    // defines game locations listeners from map objects - End Of the Game
    this.endGame = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.endGame.create(Help.adjXpos(gA[1]), Help.adjYpos(gA[1]), gA[1].width, gA[1].height);
    this.physics.add.overlap(this.player, this.endGame, this.onEndGame, false, this);

    // defines game locations listeners from map objects - Challenge 1 Area Listener
    this.ch1 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.ch1.name = gA[2].name;
    this.ch1.create(Help.adjXpos(gA[2]), Help.adjYpos(gA[2]), gA[2].width, gA[2].height);
    this.physics.add.overlap(this.player, this.ch1, this.onChallenge1, false, this);

    // defines game locations listeners from map objects - Challenge 2 Area Listener
    this.ch2 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.ch2.create(Help.adjXpos(gA[3]), Help.adjYpos(gA[3]), gA[3].width, gA[3].height);
    this.physics.add.overlap(this.player, this.ch2, this.onChallenge2, false, this);

    // defines game locations listeners from map objects - Challenge 3 Area Listener
    this.ch3 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.ch3.create(Help.adjXpos(gA[4]), Help.adjYpos(gA[4]), gA[4].width, gA[4].height);
    this.physics.add.overlap(this.player, this.ch3, this.onChallenge3, false, this);

    // defines game locations listeners from map objects - Job Interview Area Listener
    this.ji1 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.ji1.create(Help.adjXpos(gA[5]), Help.adjYpos(gA[5]), gA[5].width, gA[5].height);
    this.physics.add.overlap(this.player, this.ji1, this.onJobInterview, false, this);

    // enable keystroke detection
    this.cursors = this.input.keyboard.createCursorKeys();

    // enable camara
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = false;





    this.scoreObj = {
      score: ('NAME - Score : ' + 300),
      skill: 20,
      motiv: 90,
      coura: 20,
      fear: 130
    }

    //load score board
    this.scBoard = new GameScoreBoard(this, 180, 10, this.scoreObj);
    this.add.existing(this.scBoard);

    this.scBoard.updateScoreBoard(this.scoreObj);


  }

  update() {
    // Horizontal movement
    this.player.body.setVelocity(0); // plsyer is normally standing still after one step

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }
  }
}

export default WorldMapScene;