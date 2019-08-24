export const randomSeed = () => Math.round(Math.random() * 2147483647);

export const random = (seed: number) => {
    seed = (seed * 16807) % 2147483647;
    return [seed, (seed - 1) / 2147483646];
};

export const insideField = (size: number[], x: number, y: number) => {
    return x >= 0 && x < size[0] && y >= 0 && y < size[1];
};
