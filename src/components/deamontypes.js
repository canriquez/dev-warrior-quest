import { config } from '../config/config';

export const Deamons = (() => {
  const nice = {
    skill: 200,
    courage: 100,
    motivation: 100,
    fear: 10,
    level: 'Nice Deamon',
  };

  const bad = {
    skill: 300,
    courage: 200,
    motivation: 200,
    fear: 20,
    level: 'Bad Deamon',
  };

  const realBad = {
    skill: 40,
    courage: 30,
    motivation: 30,
    fear: 30,
    level: 'RealBad Deamon',
  };
  const badness = () => [nice, bad, realBad];

  return {
    badness,
  };
})();

export default Deamons;