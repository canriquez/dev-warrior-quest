export const Correct = (() => {

    const x = (obj) => {
        return obj.x + obj.width / 2;
    };

    const y = (obj) => {
        return obj.y + obj.height / 2;
    }

    return {
        x,
        y,
    };
})();

export default Correct;