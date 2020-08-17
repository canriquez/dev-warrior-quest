import { config } from '../config/config';

export const ChallengeConfig = (() => {

  let challenges = [
    {
      challengeName: 'HTML/CSS Capstone!',
      deamons: 2,
      badness: [1, 1],
      htextures: ['hero01'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 0.5, //Affects deamons damage on hero 0-1. 0 easy
      extraPower: 2, //increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Deamon-1', 'Deamon-2', 'Deamon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60],],
      prize: {
        skills: 50.0,
        motivation: 50.0,
        courage: 50.0,
        deamonx: 90.0,
      },
      penalty: {
        skills: -2.0,
        motivation: -10.0,
        courage: -10.0,
        fear: 25.0,
      }
    }
    ,
    {
      challengeName: 'Ruby - Ruby on Rails',
      deamons: 3,
      badness: [1, 1, 1],
      htextures: ['hero01'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, //Affects deamons damage on hero 0-1. 0 easy
      extraPower: 2, //increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Deamon-1', 'Deamon-2', 'Deamon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60],],
      prize: {
        skills: 50,
        motivation: 50,
        courage: 50,
        deamonx: 90,
      },
      penalty: {
        skills: -5,
        motivation: -10,
        courage: -20,
        fear: 20,
      }
    }
    ,
    {
      challengeName: 'Javascript! - Ract',
      deamons: 3,
      badness: [1, 1, 1],
      htextures: ['hero01'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, //Affects deamons damage on hero 0-1. 0 easy
      extraPower: 2, //increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Deamon-1', 'Deamon-2', 'Deamon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60],],
      prize: {
        skills: 50,
        motivation: 50,
        courage: 50,
        deamonx: 90,
      },
      penalty: {
        skills: -5,
        motivation: -10,
        courage: -20,
        fear: 20,
      }
    }
    ,
    {
      challengeName: 'Job Offer Challenge',
      deamons: 3,
      badness: [1, 1, 1],
      htextures: ['hero01'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, //Affects deamons damage on hero 0-1. 0 easy
      extraPower: 2, //increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Deamon-1', 'Deamon-2', 'Deamon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60],],
      prize: {
        skills: 50,
        motivation: 50,
        courage: 50,
        deamonx: 90,
      },
      penalty: {
        skills: -5,
        motivation: -10,
        courage: -20,
        fear: 20,
      }
    }
  ];

  const getChallenge = (data) => challenges[data];
  const getAllChallenges = () => challenges;

  return {
    getChallenge,
    getAllChallenges,
  };
})();

export default ChallengeConfig;