import { config } from '../config/config';

export const Deamons = (() => {
  const nice = {
    skill: 20,
    courage: 10,
    motivation: 10,
    fear: 10,
    level: 'Nice Deamon',
  };

  const bad = {
    skill: 30,
    courage: 20,
    motivation: 20,
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