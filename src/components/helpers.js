import { config } from '../config/config';

export const Help = (() => {
  const hOptions = {
    0: 'sword',
    1: 'knife',
    2: 'punch',
  };
  const adjXpos = (obj) => obj.x + obj.width / 2;

  const adjYpos = (obj) => obj.y + obj.height / 2;

  const posFixBottomY = (val) => config.height * (1 - val);
  const posFixTopY = (val) => config.height * val;
  const posFixLeftX = (val) => config.width * val;
  const posFixRightX = (val) => config.width * (1 - val);
  const hits = () => hOptions;

  const rndHit = () => {
    const r = Math.floor(Math.random() * 2);
    return hOptions[r];
  };

  // eslint-disable-next-line no-unused-vars
  const ecMsg = (type, a, b, c, d, f) => {
    const result = ['WON', 'LOST', 'Challenge success :', 'FEAR      :'];
    const text = {
      r1: `YOU HAVE ${result[type]}`,
      r2: `Skills    : ${(a >= 0) ? `+ ${a}` : a}`,
      r3: `Motivation: ${(b >= 0) ? `+ ${b}` : b}`,
      r4: `Courage   : ${(c >= 0) ? `+ ${c}` : c}`,
      r5: `${result[type + 2]} ${(d >= 0) ? `+ ${d}` : d} points.`,
    };
    return text;
  };

  const gameOverMsg = (type, a, b, c, d, f) => {
    const result = ['CONGRATULATIONS', 'GAME IS OVER', 'Challenge success :', 'FEAR      :'];
    const text = {
      r1: `${result[type]}`,
      r2: `Skills    : ${(a >= 0) ? `+ ${a}` : a}`,
      r3: `Motivation: ${(b >= 0) ? `+ ${b}` : b}`,
      r4: `Courage   : ${(c >= 0) ? `+ ${c}` : c}`,
      r5: `${result[type + 2]} ${(d >= 0) ? `+ ${d}` : d} points.`,
      r6: (type === 0) ? (`Final Score : ${f}`) : 'Your fear cannot let you continue. Take a rest!',
    };
    return text;
  };

  const updSysNextChallenge = (scene, callChallenge = 0) => {
    const oldD = scene.sys.game.globals.settings.nextChallenge;

    console.log('updNExtCHallenge : #before update nextChallenge object');
    console.log(oldD);
    // let oldD = obj
    const doneArray = oldD.done;
    doneArray.push(+callChallenge);

    console.log('done array is now : ');
    console.log(doneArray);
    const newD = {
      message: oldD.message,
      done: (doneArray),
    };
    console.log('updNExtCHallenge : #Pushing this onto nextChallenge object');
    console.log(newD);
    return newD;
  };

  const challengeDone = (scene, challenge) => {
    const sysNextChallenge = scene.sys.game.globals.settings.nextChallenge;
    const challengeDone = sysNextChallenge.done;
    return challengeDone[challenge] === challenge;
  };

  const savePlayerDataSys = (scene, obj) => {
    const playerData = obj.globals.corazon;
    const sysPlayerScore = scene.sys.game.globals.settings;
    sysPlayerScore.chScore = playerData.gameScore;
    sysPlayerScore.extras = playerData.extraScore;
    sysPlayerScore.playerName = playerData.playerName;


    console.log('####|| Saving player data on syste...');
    console.log('####|| Current Player data score..');
    console.log(playerData);
    console.log('####|| Data score on system after saving it...');
    console.log(sysPlayerScore);
  };
  const loadSysPlayerData = (scene, obj) => {
    const playerData = obj.globals.corazon;
    const sysPlayerScore = scene.sys.game.globals.settings;

    console.log('####|| Loading player data from system...');
    console.log('####|| Current System data score..');
    console.log(sysPlayerScore);

    playerData.gameScore = sysPlayerScore.chScore;
    playerData.extraScore = sysPlayerScore.extras;
    playerData.playerName = sysPlayerScore.playerName;


    console.log('####|| Data score on Player Obj after saving it...');
    console.log(playerData);
  };

  const playerScoreToSave = (obj) => {
    const { extraScore } = obj.player.globals.corazon;
    const scoreObject = obj.player.globals.corazon.gameScore;
    const totalScore = scoreObject.skill
      + scoreObject.courage
      + scoreObject.motivation
      + extraScore;
    return totalScore;
  };


  return {
    adjXpos,
    adjYpos,
    posFixBottomY,
    posFixTopY,
    posFixLeftX,
    posFixRightX,
    rndHit,
    hits,
    ecMsg,
    updSysNextChallenge,
    challengeDone,
    savePlayerDataSys,
    loadSysPlayerData,
    gameOverMsg,
    playerScoreToSave,
  };
})();

export default Help;