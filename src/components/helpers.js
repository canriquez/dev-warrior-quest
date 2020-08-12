import { config } from '../config/config'

export const Help = (() => {

    const adjXpos = (obj) => {
        return obj.x + obj.width / 2;
    };

    const adjYpos = (obj) => {
        return obj.y + obj.height / 2;
    };

    const posFixBottomY = (val) => {
        return config.height * (1 - val);
    }
    const posFixTopY = (val) => {
        return config.height * val;
    }
    const posFixLeftX = (val) => {
        return config.width * val;
    }
    const posFixRightX = (val) => {
        return config.width * (1 - val);
    }

    return {
        adjXpos,
        adjYpos,
        posFixBottomY,
        posFixTopY,
        posFixLeftX,
        posFixRightX
    };
})();

export default Help;