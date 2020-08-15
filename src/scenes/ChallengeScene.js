import Phaser from 'phaser';
import { CONST } from '../components/const';
import { Help } from '../components/helpers';
import { Player } from '../components/characters';
import { HeroEnergyBar } from '../components/energybars'

export class ChallengeScene extends Phaser.Scene {
    constructor() {
        super({ key: CONST.SCENES.CHALLENGE });
    }

    init(data) {
        console.log('data');
        this.challengeData = {
            challengeName: 'HTML/CSS Capstone!',
            deamons: 3,
            badness: [1, 1, 1],
            htextures: ['hero01'],
            dtextures: ['hero01', 'hero01', 'hero01'],
            positions: [290, 365, 450],
            winFactor: 2, //Affects deamons damage on hero 0-1. 0 easy
            hnames: ['dev Warrior'],
            dnames: ['Deamon-1', 'Deamon-2', 'Deamon-3'],
            dPBars: [[260, 20], [380, 20], [380, 60],],
            prize: {
                skills: 50,
                motivation: 50,
                courage: 50,
                deamonx: 90
            }
        }
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
            texture: this.challengeData.htextures[0],
            type: 'hero',
            name: this.challengeData.hnames[0],
        });
        //initializes power for challenge
        devWarrior.globals.corazon.resetChallengePow();


        // Build Deamons Array
        //this.enemies = [deamon1, deamon2];
        this.enemies = [];
        for (let i = 0; i < this.challengeData.badness.length; i += 1) {
            let deamon = new Player({
                scene: this,
                x: this.challengeData.positions[i],
                y: 100,
                texture: this.challengeData.dtextures[i],
                type: 'deamon',
                name: this.challengeData.dnames[i],
                deamon: this.challengeData.badness[i],
                deamonId: i,
            });
            deamon.globals.corazon.resetChallengePow();
            this.enemies.push(deamon);
        }


        /*         this.enemies[0].globals.corazon.resetChallengePow();
                this.enemies[1].globals.corazon.resetChallengePow();
                this.heroes[0].globals.corazon.resetChallengePow();
         */

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

        devWarrior.body.setBounce(0.2);
        devWarrior.body.setCollideWorldBounds(true);
        devWarrior.body.setGravityY(300);

        this.physics.add.collider(devWarrior, this.ground);

        //add physics to deamons
        for (let i = 0; i < this.enemies.length; i += 1) {
            this.enemies[i].body.setBounce(0.2);
            this.enemies[i].body.setCollideWorldBounds(true);
            this.enemies[i].body.setGravityY(300);
            this.physics.add.collider(this.enemies[i], this.ground);
        }

        console.log('this enemies array: ');
        console.log(this.enemies);

        // prepares scene-game variables

        this.heroes = [devWarrior];

        // single array of characters at play in the scene
        this.characters = this.heroes.concat(this.enemies);

        //GAME STARTS 
        console.log('##### CHALLENGE STARTS #### :round index is :' + this.index)

        // Launch in parallel UI Challenge Scene
        this.scene.launch(CONST.SCENES.UICHALL, 'and so... game starts');
        this.UiChallScene = this.scene.get(CONST.SCENES.UICHALL);
        this.UiChallScene.events.on("demonAttacked", this.onDeamonAtacked, this);
        this.UiChallScene.events.on('selectWeapon', this.onweaponMsg, this);
        this.UiChallScene.events.on('notYourself', this.notYourself, this);

        this.heroEB = new HeroEnergyBar(this, 30, 20, 100, this.challengeData.hnames[0]);
        this.add.existing(this.heroEB);
        this.heroEB.updateEnergyLevel(100);

        // generates deamons bars

        this.dPowBars = []

        for (let i = 0; i < this.challengeData.dnames.length; i += 1) {
            let deamonPW = new HeroEnergyBar(this,
                this.challengeData.dPBars[i][0],
                this.challengeData.dPBars[i][1],
                100,
                this.challengeData.dnames[i]
            );
            deamonPW.updateEnergyLevel(100);
            this.dPowBars.push(deamonPW);
            this.add.existing(deamonPW);  //if I dont add them, they wont show
        }

    };

    nextTurn() {
        console.log('this index : ' + this.index);
        console.log('challenge started? :' + this.challengeStarted);
        if (this.index == -1 && this.challengeStarted == false) {
            console.log('hey I go in!');
            this.challengeStarted = true
            this.initialInstructions();
        }

        //increments index until next character is alive.
        //it also checks for match finished

        do {
            if (this.checkEndChallenge()) {
                this.endChallenge();
                return;
            }

            this.index += 1;
            console.log('round index is :' + this.index)
            if (this.index > this.characters.length - 1) {
                this.index = 0;
            }

        } while (!this.characters[this.index].alive);

        if (this.characters[this.index]) {

            this.checkHealth(this.characters[this.index], this.index);
            //if it is the hero's turn
            if (this.characters[this.index].type == 'hero' && this.characters[this.index].alive) {
                this.events.emit('HeroSelect', this.index);
            } else { // if it is a demon then... attack hero
                if (this.characters[0].alive) {// deamons attack only if hero is alive
                    this.onHeroAttacked();
                    // add timer 
                    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
                }
            };
        };

    }

    /*     rndHit() {
            let options = {
                1: 'sword',
                2: 'knife',
                3: 'punch'
            }
    
            let r = Math.floor(Math.random() * 2);
            return options[r];
        } */

    onHeroAttacked() {
        let deamon = this.characters[this.index].globals.corazon;
        let hero = this.heroes[0].globals.corazon;
        let power = Math.ceil(deamon.hitPower()[Help.rndHit()] * this.challengeData.winFactor);
        deamon.attackEnemy(power, hero);
        console.log('HERO POW after attack? :' + hero.challengePow);
        this.heroEB.updateEnergyLevel(hero.powBar());
        this.events.emit("Message", this.characters[this.index].name +
            " attacks DevWarrior for " + power + " damage");
        this.checkHealth(this.heroes[0], 0);
    }

    onDeamonAtacked(data) {
        console.log('HEHEH: Hero ATTACKS Demon :' + data);
        let sDeamon = this.enemies[data.id].globals.corazon;
        let hero = this.heroes[0].globals.corazon;
        let power = Math.ceil(hero.hitPower()[data.weapon]) * 1; //erase this 20 -  only for test

        console.log('data coming from ui | hero hit is: ');
        console.log(data.weapon)
        console.log('Hero hit power : ');
        console.log(power);
        console.log('deamon is: ');
        console.log(sDeamon);

        hero.attackEnemy(power, sDeamon);
        console.log('deamon pow after attack :' + sDeamon.challengePow);
        console.log('deamon powBar after attack :' + sDeamon.powBar());

        this.dPowBars[data.id].updateEnergyLevel(sDeamon.powBar());

        console.log(sDeamon.gameScore.level);
        this.events.emit("Message", this.characters[this.index].name + " attacks  for " + power + " damage");
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        console.log('general match index is :' + this.index);
    }

    checkHealth(character, index) {

        console.log('####- Checking Health:');
        console.log('character Name ' + character.name);
        console.log('character type ' + character.type);
        console.log('Index is ' + index);
        console.log('Is IT alive?:' + character.alive);
        console.log('####- End Checking Health ####');

        if (character.globals.corazon.challengePow == 0) {
            character.alive = false;
            character.die();
            console.log(character.name + ': has died ## <<<=======');
            if ((index - 1) >= 0) {
                this.dPowBars[index - 1].turnOff();
            }
            /*             if (this.characters[index].type == 'hero') {
                            this.endChallenge();
                        } */
        }
    }

    onweaponMsg(data) {
        console.log('I got the warning message');
        this.events.emit("Message", data);
    }

    notYourself(data) {
        console.log('I got the warning message');
        this.events.emit("Message", data);
    }

    initialInstructions() {
        console.log('intial instructions sent out');
        this.events.emit("Instruc", "Welcome to the challege: Fait will make one weapon dissaper on each round for you. \n Good luck!");
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
        console.log('Challenge ending...');
        //message on challsnge end - Game over or challenge success
        //go back to map scene
        //put to sleep this scene.
    }
}

export default ChallengeScene;