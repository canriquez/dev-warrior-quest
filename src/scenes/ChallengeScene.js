import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Player } from '../components/characters';

export class ChallengeScene extends Phaser.Scene {
    constructor() {
        super({ key: CONST.SCENES.CHALLENGE });
    }

    init(data) {
        console.log('data');
    }

    preload() {

    }

    create() {
        console.log('here we are in challenge');
        this.challengeStarted = false;

        this.index = -1;

        this.add.image(240, 175, 'chall01sm');
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
            texture: 'hero01',
            type: 'hero',
        });

        //devWarrior.globals.corazon.resetChallengePow();

        const deamon1 = new Player({
            scene: this,
            x: 350,
            y: 100,
            texture: 'hero01',
            type: 'deamon',
            deamon: 1,
            deamonId: 0,
        });

        const deamon2 = new Player({
            scene: this,
            x: 450,
            y: 100,
            texture: 'hero01',
            type: 'deamon',
            deamon: 1,
            deamonId: 1,
        });

        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNames('hero01', {
                start: 0,
                end: 39,
                zeroPad: 3,
                prefix: 'Idle_',
                suffix: '.png',
            }),
            frameRate: 8,
            repeat: -1,
        });

        // devWarrior.play('Idle');

        devWarrior.body.setBounce(0.2);
        devWarrior.body.setCollideWorldBounds(true);
        devWarrior.body.setGravityY(300);

        this.physics.add.collider(devWarrior, this.ground);

        deamon1.body.setBounce(0.2);
        deamon1.body.setCollideWorldBounds(true);
        deamon1.body.setGravityY(300);

        this.physics.add.collider(deamon1, this.ground);

        deamon2.body.setBounce(0.2);
        deamon2.body.setCollideWorldBounds(true);
        deamon2.body.setGravityY(300);

        this.physics.add.collider(deamon2, this.ground);

        // prepares scene-game variables

        this.heroes = [devWarrior];
        this.enemies = [deamon1, deamon2];
        this.enemies[0].globals.corazon.resetChallengePow();
        this.enemies[1].globals.corazon.resetChallengePow();
        this.heroes[0].globals.corazon.resetChallengePow();

        // single array of characters at play in the scene
        this.characters = this.heroes.concat(this.enemies);

        //GAME STARTS 
        console.log('##### CHALLENGE STARTS #### :round index is :' + this.index)

        // Launch in parallel UI Challenge Scene
        this.scene.launch(CONST.SCENES.UICHALL, 'and so... game starts');
        this.UiChallScene = this.scene.get(CONST.SCENES.UICHALL);
        this.UiChallScene.events.on("demonAttacked", this.onDeamonAtacked, this);
        this.UiChallScene.events.on('selectWeapon', this.onweaponMsg, this)

    };

    nextTurn() {
        console.log('this index : ' + this.index);
        console.log('challenge started? :' + this.challengeStarted);
        if (this.index == -1 && this.challengeStarted == false) {
            console.log('hey I go in!');
            this.challengeStarted = true
            this.initialInstructions();
        }

        this.index += 1;
        console.log('round index is :' + this.index)
        if (this.index > this.characters.length - 1) {
            this.index = 0;
        }
        if (this.characters[this.index]) {
            //if it is the hero's turn
            if (this.characters[this.index].type == 'hero') {
                this.events.emit('HeroSelect', this.index);
            } else { // if it is a demon then...
                this.onHeroAttacked();
                // add timer 
                this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
            };
        };

    }

    rndHit() {
        let options = {
            1: 'sword',
            2: 'knife',
            3: 'punch'
        }

        let r = Math.floor(Math.random() * 2);
        return options[r];
    }

    onHeroAttacked() {
        let deamon = this.characters[this.index].globals.corazon;
        let hero = this.heroes[0].globals.corazon;
        let power = deamon.hitPower()[Help.rndHit()]
        deamon.attackEnemy(power, hero);
        console.log('HERO POW after attack? :' + hero.challengePow);
        this.events.emit("Message", deamon.gameScore.level +
            " attacks DevWarrior for " + power + " damage");
    }

    onDeamonAtacked(data) {
        console.log('HEHEH: Hero ATTACKS Demon :' + data);
        let sDeamon = this.enemies[data.id].globals.corazon;
        let hero = this.heroes[0].globals.corazon;
        let power = hero.hitPower()[data.weapon];

        console.log('data coming from ui | hero hit is: ');
        console.log(data.weapon)
        console.log('Hero hit power : ');
        console.log(power);
        console.log('deamon is: ');
        console.log(sDeamon);

        hero.attackEnemy(power, sDeamon);
        console.log('deamon pow after attack :' + sDeamon.challengePow);
        console.log(sDeamon.gameScore.level);
        this.events.emit("Message", " DevWarrior attacks  for " + power + " damage");
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        console.log('general match index is :' + this.index);
    }

    onweaponMsg(data) {
        console.log('I got the warning message');
        this.events.emit("Message", data);
    }

    initialInstructions() {
        console.log('intial instructions sent out');
        this.events.emit("Instruc", "Welcome to the challege: Fait will make one weapon dissaper on each round for you. \n Good luck!");
    }

}

export default ChallengeScene;