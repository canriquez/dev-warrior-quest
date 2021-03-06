/* eslint-disable class-methods-use-this, no-lonely-if */
import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Player } from '../components/characters';
import { HeroEnergyBar } from '../components/energybars';
import { EndChallenge } from '../components/endchallenge';
import { ChallengeConfig } from '../components/challenges';

export class ChallengeScene extends Phaser.Scene {
  constructor() {
    super({ key: CONST.SCENES.CHALLENGE });
  }

  init() {
    this.resetScene();
  }

  preload() {
  }

  create() {
    this.playerName = this.sys.game.globals.settings.playerName;

    this.buildScene();

    // Launch in parallel UI Challenge Scene
    this.scene.launch(CONST.SCENES.UICHALL, 'and so... game starts');

    this.UiChallScene = this.scene.get(CONST.SCENES.UICHALL);

    this.UiChallScene.events.on('demonAttacked', this.waitAndAttackDeamon, this);

    this.UiChallScene.events.on('selectWeapon', this.onweaponMsg, this);
    this.UiChallScene.events.on('notYourself', this.notYourself, this);

    this.sys.events.on('wake', this.wake, this);

    // add html for battle log element
    this.blogElement = this.add.dom(220, 190).createFromCache('b-log');
    this.add.existing(this.blogElement);
  }

  buildScene() {
    this.challengeStarted = false;

    this.index = -1;
    this.add.image(240, 175, this.challengeData.challscene);
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0x000000);
    this.graphics.fillStyle(0x000000, 1);

    this.graphics.strokeRect(7, 282, 465, 345);
    this.graphics.fillRect(7, 282, 465, 345);

    this.add.image(Help.posFixLeftX(0.498), Help.posFixBottomY(0.116), 'board');

    this.ground = this.physics.add.staticGroup();
    this.ground.create(240, 265, 'ground');


    // Create Player Characters
    const devWarrior = new Player({
      scene: this,
      x: 100,
      y: 100,
      texture: this.challengeData.htextures[0],
      type: 'hero',
      name: this.playerName,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('h2idle', {
        start: 0,
        end: 9,
        zeroPad: 0,
        prefix: '',
        suffix: '.png',
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('h2attack', {
        start: 0,
        end: 9,
        zeroPad: 0,
        prefix: '',
        suffix: '.png',
      }),
      frameRate: 8,
      repeat: 1,
    });

    devWarrior.play('idle');


    // loads player info: scores, points, into devWarrior object for this challenge
    Help.loadSysPlayerData(this, devWarrior);

    // initializes power for challenge
    devWarrior.globals.corazon.resetChallengePow();

    // Build Deamons Array
    this.enemies = [];
    for (let i = 0; i < this.challengeData.badness.length; i += 1) {
      const deamon = new Player({
        scene: this,
        x: this.challengeData.positions[i],
        y: 100,
        texture: this.challengeData.dtextures[i],
        type: 'deamon',
        name: this.challengeData.dnames[i],
        deamon: this.challengeData.badness[i], // defines deamon badness on deamontypes.js
        deamonId: i,
      });
      deamon.globals.corazon.resetChallengePow();
      this.enemies.push(deamon);
    }


    devWarrior.body.setBounce(0.2);
    devWarrior.body.setCollideWorldBounds(true);
    devWarrior.body.setGravityY(300);

    this.physics.add.existing(devWarrior);
    this.physics.add.collider(devWarrior, this.ground);


    // add physics to deamons
    for (let i = 0; i < this.enemies.length; i += 1) {
      this.enemies[i].body.setBounce(0.2);
      this.enemies[i].body.setCollideWorldBounds(true);
      this.enemies[i].body.setGravityY(300);
      this.physics.add.collider(this.enemies[i], this.ground);
    }


    // prepares scene-game variables

    this.heroes = [devWarrior];

    // single array of characters at play in the scene
    this.characters = this.heroes.concat(this.enemies);

    // GAME STARTS


    // build hero Energy Bar
    this.heroEB = new HeroEnergyBar(this, 30, 20, 100, this.challengeData.hnames[0]);
    this.add.existing(this.heroEB);
    this.heroEB.updateEnergyLevel(100);

    // generates deamons bars

    this.dPowBars = [];

    for (let i = 0; i < this.enemies.length; i += 1) {
      const deamonPW = new HeroEnergyBar(this,
        this.challengeData.dPBars[i][0],
        this.challengeData.dPBars[i][1],
        100,
        this.challengeData.dnames[i]);
      deamonPW.updateEnergyLevel(100);
      this.dPowBars.push(deamonPW);
      this.add.existing(deamonPW); // if I dont add them, they wont show
    }

    // Final message instance ready
    this.endChallengeMsg = new EndChallenge(this);
    this.add.existing(this.endChallengeMsg);
  }

  nextTurn() {
    if (this.index === -1 && this.challengeStarted === false) {
      this.challengeStarted = true;
      this.initialInstructions();
    }

    // increments index until next character is alive.
    // it also checks for match finished

    do {
      if (this.checkEndChallenge()) {
        this.endChallenge();
        return;
      }

      this.index += 1;
      if (this.index > this.characters.length - 1) {
        this.index = 0;
      }
    } while (!this.characters[this.index].alive);

    if (this.characters[this.index]) {
      this.checkHealth(this.characters[this.index], this.index);
      // if it is the hero's turn
      if (this.characters[this.index].type === 'hero' && this.characters[this.index].alive) {
        this.events.emit('HeroSelect', this.index);
      } else { // if it is a demon then... attack hero
        if (this.characters[0].alive) { // deamons attack only if hero is alive
          this.onHeroAttacked();
          // add timer
          this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
      }
    }
  }

  onHeroAttacked() {
    const demon = this.characters[this.index].globals.corazon;
    const hero = this.heroes[0].globals.corazon;
    const power = Math.ceil(demon.hitPower()[Help.rndHit()] * this.challengeData.winFactor);

    demon.attackEnemy(power, hero);

    if (power > 0) {
      this.heroEB.updateEnergyLevel(hero.powBar());

      // handling messages to player
      const logString = ` <-- ${this.enemies[this.index - 1].name} attacks ${this.playerName} (pow left:${hero.powBar()}%)`;
      this.blogArray.push(logString);
      Help.battleLog(this.blogArray);
      this.checkHealth(this.heroes[0], 0);
    }
  }

  waitAndAttackDeamon(data) {
    this.time.addEvent({ delay: 4000, callback: this.onDeamonAtacked(data), callbackScope: this });
  }

  onDeamonAtacked(data) {
    // We get corazon methods with data.id from UIscene
    const sDemon = this.enemies[data.id].globals.corazon;
    const demonName = this.enemies[data.id].name;
    const hero = this.heroes[0].globals.corazon;
    const power = Math.ceil(hero.hitPower()[data.weapon]) * this.challengeData.extraPower;

    hero.attackEnemy(power, sDemon);
    this.dPowBars[data.id].updateEnergyLevel(sDemon.powBar());

    // handling messages to player
    const logString = ` --> ${this.playerName} attacks ${demonName} (pow left:${sDemon.powBar()}%)`;
    this.blogArray.push(logString);
    Help.battleLog(this.blogArray);
    this.checkHealth(this.heroes[0], 0);

    this.time.addEvent({ delay: 5000, callback: this.nextTurn, callbackScope: this });
  }

  checkHealth(character, index) {
    if (character.globals.corazon.challengePow === 0) {
      character.alive = false;
      character.die();
      if ((index - 1) >= 0) {
        this.dPowBars[index - 1].turnOff();
      }
    }
  }

  onweaponMsg(data) {
    this.blogArray.push(data);
    Help.battleLog(this.blogArray);
  }

  notYourself(data) {
    this.blogArray.push(data);
    Help.battleLog(this.blogArray);
  }

  initialInstructions() {
    this.events.emit('Instruc',
      'Welcome to the challege: On each round, select a weapon and click a demon to attack. Then wait for next turn. \n Good luck!');
  }

  checkEndChallenge() {
    let success = true;
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].alive) {
        success = false;
      }
    }
    let challengeLost = true;
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].alive) {
        challengeLost = false;
      }
    }
    return success || challengeLost;
  }

  endChallenge() {
    if (this.heroes[0].alive) {
      this.challengeResult = true;
      const msg = Help.ecMsg(0,
        this.challengeData.prize.skills,
        this.challengeData.prize.motivation,
        this.challengeData.prize.courage,
        this.challengeData.prize.deamonx * this.challengeData.deamons);
      this.endChallengeMsg.showMessage(msg);
      this.updateHeroResults(0);
      // Update the current score object with new results.
      this.heroes[0].globals.corazon.gameScore = {};
    } else {
      this.challengeResult = false;
      const msg = Help.ecMsg(1,
        this.challengeData.penalty.skills,
        this.challengeData.penalty.motivation,
        this.challengeData.penalty.courage,
        this.challengeData.penalty.fear);
      this.endChallengeMsg.showMessage(msg);
      this.updateHeroResults(1);
    }
    // go back to map scene
    // put to sleep this scene.
  }

  backToParent() {
    this.scene.sleep(CONST.SCENES.UICHALL);
    this.scene.switch(CONST.SCENES.WORLDMAP, 'back from challenge');
  }

  updateHeroResults(data) {
    const old = this.heroes[0].globals.corazon.gameScore;
    let newD;
    if (data === 0) {
      // win
      newD = {
        skill: old.skill + this.challengeData.prize.skills,
        motivation: old.motivation + this.challengeData.prize.motivation,
        courage: old.courage + this.challengeData.prize.courage,
        fear: old.fear, // fear does not change.
        level: old.level,
      };
      this.heroes[0].globals.corazon.gameScore = newD;
      this.heroes[0].globals.corazon
        .extraScore = this.challengeData.prize.deamonx * this.challengeData.deamons;
    } else {
      // lost
      newD = {
        skill: (old.skill + this.challengeData.penalty.skills),
        motivation: (old.motivation + this.challengeData.penalty.motivation),
        courage: (old.courage + this.challengeData.penalty.courage),
        fear: (old.fear + this.challengeData.penalty.fear), // fear does count on penalty.
        level: old.level,
      };
      this.heroes[0].globals.corazon.gameScore = newD;
    }

    // Storing back challenge results to the sys variables
    Help.savePlayerDataSys(this, this.heroes[0]);
  }

  resetScene() {
    this.data = this.sys.game.globals.settings.nextChallenge;
    this.blogArray = [];

    // gets the last challengeId added to the done array
    const lastRequestedChallengeIndex = this.data.done.length - 1;

    this.challengeId = this.data.done[lastRequestedChallengeIndex];

    // retrieve map scene
    this.mapScene = this.scene.get(CONST.SCENES.WORLDMAP);

    this.playerData = this.mapScene.player.globals.corazon;

    // Obtain challenge data object from Module challenges
    this.challengeData = ChallengeConfig.getChallenge(this.challengeId);
  }

  wake() {
    this.resetScene();
    this.buildScene();
    this.scene.run(CONST.SCENES.UICHALL, '####: And so... game starts AGAIN');
  }
}

export default ChallengeScene;