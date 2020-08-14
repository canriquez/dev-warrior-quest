import { config } from '../config/config';

export const Help = (() => {

  let hOptions = {
    0: 'sword',
    1: 'knife',
    2: 'punch'
  }
  const adjXpos = (obj) => obj.x + obj.width / 2;

  const adjYpos = (obj) => obj.y + obj.height / 2;

  const posFixBottomY = (val) => config.height * (1 - val);
  const posFixTopY = (val) => config.height * val;
  const posFixLeftX = (val) => config.width * val;
  const posFixRightX = (val) => config.width * (1 - val);
  const hits = () => hOptions;

  const rndHit = () => {
    let r = Math.floor(Math.random() * 2);
    return hOptions[r];
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
  };
})();

export default Help;