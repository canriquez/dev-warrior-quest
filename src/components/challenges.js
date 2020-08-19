export const ChallengeConfig = (() => {
  const challenges = [
    {
      challengeName: 'HTML/CSS Capstone!',
      challscene: 'chall01sm',
      deamons: 2,
      badness: [0, 1], // Should be badness defined on deamontypes.
      htextures: ['h2idle'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, // Affects deamons damage on hero 0-1. 0 easy
      extraPower: 0.9, // increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Demon-1', 'Demon-2', 'Pepe'],
      dPBars: [[260, 20], [380, 20], [380, 60]],
      prize: {
        skills: 10.0,
        motivation: 20.0,
        courage: 20.0,
        deamonx: 30.0,
      },
      penalty: {
        skills: -2.0,
        motivation: -10.0,
        courage: -10.0,
        fear: 10.0,
      },
    },
    {
      challengeName: 'Ruby - Ruby on Rails',
      challscene: 'chall02sm',
      deamons: 2,
      badness: [1, 1, 2],
      htextures: ['h2idle'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, // Affects deamons damage on hero 0-1. 0 easy
      extraPower: 0.5, // increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Demon-1', 'Demon-2', 'Demon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60]],
      prize: {
        skills: 20,
        motivation: 20,
        courage: 20,
        deamonx: 40,
      },
      penalty: {
        skills: -5,
        motivation: -10,
        courage: -20,
        fear: 15,
      },
    },
    {
      challengeName: 'Javascript! - Ract',
      challscene: 'chall03sm',
      deamons: 3,
      badness: [1, 2, 2],
      htextures: ['h2idle'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, // Affects deamons damage on hero 0-1. 0 easy
      extraPower: 2, // increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Demon-1', 'Demon-2', 'Demon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60]],
      prize: {
        skills: 30,
        motivation: 30,
        courage: 30,
        deamonx: 50,
      },
      penalty: {
        skills: -5,
        motivation: -10,
        courage: -20,
        fear: 20,
      },
    },
    {
      challengeName: 'Job Offer Challenge',
      challscene: 'chall04sm',
      deamons: 3,
      badness: [2, 2, 2],
      htextures: ['h2idle'],
      dtextures: ['hero01', 'hero01', 'hero01'],
      positions: [290, 365, 450],
      winFactor: 1, // Affects deamons damage on hero 0-1. 0 easy
      extraPower: 1, // increses player power for the match
      hnames: ['dev Warrior'],
      dnames: ['Demon-1', 'Demon-2', 'Demon-3'],
      dPBars: [[260, 20], [380, 20], [380, 60]],
      prize: {
        skills: 40,
        motivation: 40,
        courage: 40,
        deamonx: 50,
      },
      penalty: {
        skills: -5,
        motivation: -10,
        courage: -20,
        fear: 30,
      },
    },
  ];

  const getChallenge = (data) => challenges[data];
  const getAllChallenges = () => challenges;

  return {
    getChallenge,
    getAllChallenges,
  };
})();

export default ChallengeConfig;