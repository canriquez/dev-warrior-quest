import 'regenerator-runtime';

export const MicroverseAPI = (() => {
  const appURL = ['https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/76iZcjsds6vK8FEYOUkr/scores/',
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/uYI4G9Bt3H7ZY8R11dCa/scores/'];
  const BASEURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';


  const getAppId = async () => {
    // Game with ID: kZpOvzmDySnCTvoWMzBf added.
    const postObj = JSON.stringify({
      name: 'Dev Warrior Quest',
    });

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: postObj,
    };

    try {
      const response = await fetch(BASEURL, request);
      const gameId = await response.json();
      return gameId;
    } catch (err) {
      throw ('Something went wrong with API Game Id request:', err);
    }
  };

  // type: 0 test / 1 production
  const setScore = async (player, score, type) => {
    const postObj = JSON.stringify({
      user: player,
      score,
    });

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: postObj,
    };

    try {
      const response = await fetch(appURL[type], request);
      const result = await response.json();
      return result;
    } catch (err) {
      throw ('Something went wrong with API Game Id request - setScore:', err);
    }
  };

  const getScore = async (type) => {
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(appURL[type], request);
      const obj = await response.json();

      return obj.result;
      // return [].sort.call(response, (a, b) => b.score - a.score);
    } catch (err) {
      throw ('Something went wrong with API Game Id request - getScore:', err);
    }
  };

  /*     sortArgument = (arguments) => {
            return [].sort.call(arguments).sort(function (a, b) {
                return b - a;
            });
        } */

  return {
    getAppId,
    setScore,
    getScore,
  };
})();

export default MicroverseAPI;