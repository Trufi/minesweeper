import * as tf from '@tensorflow/tfjs';
import { TestData } from './generateData';

/**
 * 0 - 8
 * 9 - unknown
 * 10 - mine
 */
const typeNumber = 11;

export const dataToTensor = (data: TestData[], size: number[]) => {
    const buf = tf.buffer([data.length, size[1], size[0], typeNumber]);

    data.forEach((test, index) => {
        test.field.forEach((row) =>
            row.forEach((cell) => {
                if (cell.type === 'empty') {
                    buf.set(1, index, cell.y, cell.x, cell.number);
                } else if (cell.type === 'unknown') {
                    buf.set(1, index, cell.y, cell.x, 9);
                }

                // TODO: add mines
            }),
        );
    });

    return buf.toTensor().as2D(data.length, size[1] * size[0] * typeNumber);
};

export const dataToMinesTensor = (data: TestData[], size: number[]) => {
    const buf = tf.buffer([data.length, size[1], size[0], typeNumber]);

    data.forEach((test, index) => {
        test.mines.forEach((mine) => {
            buf.set(1, index, mine.y, mine.x, 10);
        });
    });

    return buf.toTensor().as2D(data.length, size[1] * size[0] * typeNumber);
};
