export const Deamons = (() => {
  const nice = {
    skill: 5,
    courage: 5,
    motivation: 10,
    fear: 10,
    level: 'Nice Deamon',
  };

  const bad = {
    skill: 10,
    courage: 10,
    motivation: 10,
    fear: 20,
    level: 'Bad Deamon',
  };

  const realBad = {
    skill: 30,
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