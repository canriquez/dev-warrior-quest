import { config } from '../config/config';

export const Help = (() => {
  const adjXpos = (obj) => obj.x + obj.width / 2;

  const adjYpos = (obj) => obj.y + obj.height / 2;

  const posFixBottomY = (val) => config.height * (1 - val);
  const posFixTopY = (val) => config.height * val;
  const posFixLeftX = (val) => config.width * val;
  const posFixRightX = (val) => config.width * (1 - val);

  return {
    adjXpos,
    adjYpos,
    posFixBottomY,
    posFixTopY,
    posFixLeftX,
    posFixRightX,
  };
})();

export default Help;