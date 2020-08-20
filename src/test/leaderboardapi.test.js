import { MicroverseAPI } from '../components/leaderboardapi';


const setMessage = { result: 'Leaderboard score created correctly.' };
const emptySetError = { message: 'You need to provide a valid user for the score' };


it('it set a current score and gets a confirmation message', () => {
  expect.assertions(1);
  return expect(MicroverseAPI.setScore('test', 100, 0)).resolves.toEqual(setMessage);
});

it('it recieve error when trying to save an record with empt name', () => {
  expect.assertions(1);
  return expect(MicroverseAPI.setScore('', 100, 0)).resolves.toEqual(emptySetError);
});


it('it get scores and retrieve an array object', () => {
  expect.assertions(1);
  return expect(MicroverseAPI.getScore(0)).resolves.toBeInstanceOf(Array);
});

it('it get scores and retrieve an array object', () => {
  expect.assertions(1);
  return expect(MicroverseAPI.getScore(0)).resolves.toBeInstanceOf(Array);
});
