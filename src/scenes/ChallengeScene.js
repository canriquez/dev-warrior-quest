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
        this.data = this.sys.game.globals.settings.nextChallenge
        console.log('i am on challenge scene...')
        console.log(this.sys.game.globals.settings.nextChallenge);
        //retrieve map scene
        this.mapScene = this.scene.get(CONST.SCENES.WORLDMAP);
        this.playerData = this.mapScene.player.globals.corazon

        //Obtain challenge data object from Module challenges
        this.challengeData = ChallengeConfig.getChallenge(this.data.index);

        console.log("Player's extra score is :" +
            this.mapScene.player.globals.corazon.extraScore);



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

        console.log('here just before dev warrior creation');
        // Create Player Characters
        const devWarrior = new Player({
            scene: this,
            x: 100,
            y: 100,
            texture: this.challengeData.htextures[0],
            type: 'hero',
            name: this.challengeData.hnames[0],
        });


        console.log('here just before inheriting data from player');
        // Inherits score values from mapscene 

        devWarrior.globals.corazon.gameScore = this.playerData.gameScore;
        devWarrior.globals.corazon.extraScore = this.playerData.extraScore;
        devWarrior.globals.corazon.playerName = this.playerData.playerName;


        //initializes power for challenge
        devWarrior.globals.corazon.resetChallengePow();


        // Build Deamons Array
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


        //Final message instance ready
        this.endChallengeMsg = new EndChallenge(this);
        this.add.existing(this.endChallengeMsg);

        // Launch in parallel UI Challenge Scene
        this.scene.launch(CONST.SCENES.UICHALL, 'and so... game starts');
        this.UiChallScene = this.scene.get(CONST.SCENES.UICHALL);
        this.UiChallScene.events.on("demonAttacked", this.onDeamonAtacked, this);
        this.UiChallScene.events.on('selectWeapon', this.onweaponMsg, this);
        this.UiChallScene.events.on('notYourself', this.notYourself, this);
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

    onHeroAttacked() {
        let deamon = this.characters[this.index].globals.corazon;
        let hero = this.heroes[0].globals.corazon;
        let power = Math.ceil(deamon.hitPower()[Help.rndHit()] * this.challengeData.winFactor);
        deamon.attackEnemy(power, hero);
        if (power > 0) {
            console.log('HERO POW after attack? :' + hero.challengePow);
            this.heroEB.updateEnergyLevel(hero.powBar());
            this.events.emit("Message", this.characters[this.index].name +
                " attacks DevWarrior for " + power + " damage");
            this.checkHealth(this.heroes[0], 0);
        }
    }

    onDeamonAtacked(data) {
        console.log('HEHEH: Hero ATTACKS Demon :' + data);
        let sDeamon = this.enemies[data.id].globals.corazon;
        let hero = this.heroes[0].globals.corazon;
        let power = Math.ceil(hero.hitPower()[data.weapon]) * this.challengeData.extraPower;

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
        if (this.heroes[0].alive) {
            this.challengeResult = true;
            console.log("challenge success");
            let msg = Help.ecMsg(0,
                this.challengeData.prize.skills,
                this.challengeData.prize.motivation,
                this.challengeData.prize.courage,
                this.challengeData.prize.deamonx * this.challengeData.deamons
            );
            this.endChallengeMsg.showMessage(msg);
            this.updateHeroResults(0);
            //Update the current score object with new results.
            this.heroes[0].globals.corazon.gameScore = {}
        } else {
            this.challengeResult = false;
            console.log("challenge lost")
            let msg = Help.ecMsg(1,
                this.challengeData.penalty.skills,
                this.challengeData.penalty.motivation,
                this.challengeData.penalty.courage,
                this.challengeData.penalty.fear
            );
            this.endChallengeMsg.showMessage(msg);
            this.updateHeroResults(1);
        }
        //go back to map scene
        //put to sleep this scene.
    }

    backToParent() {
        console.log('heading back to map scene');
        this.cameras.main.fade(1000);
        //this.scene.sleep(CONST.SCENES.CHALLENGE);
        this.scene.switch(CONST.SCENES.WORLDMAP, 'back from challenge');
        this.scene.destroy(CONST.SCENES.CHALLENGE);
    }

    updateHeroResults(data) {
        console.log('i am about to update hero data with : ' + data);
        let old = this.heroes[0].globals.corazon.gameScore;
        let newD;
        console.log('old Score is');
        console.log(old);
        if (data == 0) {
            //win
            newD = {
                skill: old.skill + this.challengeData.prize.skills,
                motivation: old.motivation + this.challengeData.prize.motivation,
                courage: old.courage + this.challengeData.prize.courage,
                fear: old.fear, //fear does not change.
                level: old.level,
            }
            this.heroes[0].globals.corazon.gameScore = newD;
            this.heroes[0].globals.corazon.extraScore = this.challengeData.prize.deamonx * this.challengeData.deamons;
        } else {
            //lost
            console.log('I am updating a loss score ..');
            newD = {
                skill: (old.skill + this.challengeData.penalty.skills),
                motivation: (old.motivation + this.challengeData.penalty.motivation),
                courage: (old.courage + this.challengeData.penalty.courage),
                fear: (old.fear + this.challengeData.penalty.fear), //fear does count on penalty.
                level: old.level,
            }
            console.log('in a loss, end skills on penalty is :');
            console.log(old.skill);
            this.heroes[0].globals.corazon.gameScore = newD;
            console.log(newD);
        }

        console.log('new Player data is now ');
        console.log(newD);
        //Storing back challenge results to the player object at map scene
        /*         this.playerData.gameScore = this.heroes[0].globals.corazon.gameScore;
                this.playerData.extraScore = this.heroes[0].globals.corazon.extraScore;
                this.playerData.playerName = this.heroes[0].globals.corazon.playerName;
                console.log('this is how the player looks like after :');
                console.log(this.mapScene.player.globals.corazon.gameScore);
                console.log('extra score :' + this.playerData.extraScore);
                console.log('name: ' + this.playerData.playerName) */
        console.log(this.sys.game.globals.settings.nextChallenge);

        this.sys.game.globals.settings.chScore = {
            ['c' + this.data.index]: this.heroes[0].globals.corazon.gameScore,
        };
        this.sys.game.globals.settings.extras = {
            ['c' + this.data.index]: this.heroes[0].globals.corazon.extraScore,
        };
        this.sys.game.globals.
            settings.last = 'c' + this.data.index;
        console.log('stored on system storage (Challenge Side): ');
        console.log(this.sys.game.globals.settings.chScore);
        console.log(this.sys.game.globals.settings.last);

    }
}

export default ChallengeScene;