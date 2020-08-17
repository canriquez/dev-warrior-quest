/* eslint-disable class-methods-use-this, no-unused-vars, max-len */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Player } from '../components/characters';
import { GameScoreBoard } from '../components/gamescoreboard';
import { GameOverScreen } from '../components/gameover';
import { MicroverseAPI } from '../components/leaderboardapi';

export class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONST.SCENES.WORLDMAP,
    });
    this.challenges = [false, false, false, false];
    this.endGame = false;
    this.savedScore = false;
  }

  init(data) {
  }

  onChallenge1(player, zone) {
    this.runChallenge(0);
  }

  onChallenge2(player, zone) {
    this.runChallenge(1);
  }

  onChallenge3(player, zone) {
    this.runChallenge(2);
  }

  onJobInterview(player, zone) {
    this.runChallenge(3);
  }

  onEndGame(player, zone) {
    if (this.endGame === true) { return; }
    this.endGame = true;
    this.finishGame();
  }

  preload() {
    // load resources here
  }

  create() {
    this.playerName = this.sys.game.globals.settings.playerName;
    // Stores all challenges configurations to be available on other scenes

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
    /*     const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
        }); */

    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: 'player',
      type: 'hero',
    });
    this.physics.add.existing(this.player);


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
    this.endGame.create(Help.adjXpos(gA[1]),
      Help.adjYpos(gA[1]), gA[1].width, gA[1].height);
    this.physics.add.overlap(this.player,
      this.endGame, this.onEndGame, false, this);

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

    // load score board
    this.scBoard = new GameScoreBoard(this, 180, 10);
    this.add.existing(this.scBoard);

    this.scBoard.updateScoreBoard(this);

    this.sys.events.on('wake', this.wake, this);

    // Game Over Screen Instance

    this.gameoverMessage = new GameOverScreen(this);
    this.add.existing(this.gameoverMessage);
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

  wake() {
    // this.scene.run(CONST.SCENES.WORLDMAP);
    this.cameras.main.fadeIn(1000);
    // reset coursor keys
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    // update player score variable from system

    Help.loadSysPlayerData(this, this.player);
    this.scBoard.updateScoreBoard(this);

    // On GAme Over sends message and saves score
    if (this.player.globals.corazon.haveILost()) {
      this.gameOver();
      this.saveScore(this.playerName, Help.playerScoreToSave(this));
    }
  }

  runChallenge(data) {
    if (Help.challengeDone(this, data)) { return; }
    this.cameras.main.shake(300);
    Help.updSysNextChallenge(this, data);
    // saving current player data on system before switing scenes
    Help.savePlayerDataSys(this, this.player);
    this.scene.switch(CONST.SCENES.CHALLENGE);
  }

  gameOver() {
    const msg = Help.gameOverMsg(1,
      this.player.globals.corazon.gameScore.skill,
      this.player.globals.corazon.gameScore.motivation,
      this.player.globals.corazon.gameScore.courage,
      this.player.globals.corazon.gameScore.fear,
      Help.playerScoreToSave(this));
    this.gameoverMessage.showMessage(msg);
  }

  backToParent() {
    this.scene.start(CONST.SCENES.TITLE, 'back to main menu');
  }

  finishGame() {
    const msg = Help.gameOverMsg(0,
      this.player.globals.corazon.gameScore.skill,
      this.player.globals.corazon.gameScore.motivation,
      this.player.globals.corazon.gameScore.courage,
      this.player.globals.corazon.gameScore.fear,
      Help.playerScoreToSave(this));
    this.gameoverMessage.showMessage(msg);
    this.saveScore(this.playerName, Help.playerScoreToSave(this));
  }

  saveScore(name, score) {
    if (this.saveScore === true) { return; }
    this.saveScore = true;
    const response = MicroverseAPI.setScore(name, score, 1);
  }
}

export default WorldMapScene;