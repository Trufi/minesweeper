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

    return buf.toTensor().as4D(data.length, size[1], size[0], typeNumber);
};

export const testToTensor = (test: TestData, size: number[]) => {
    const buf = tf.buffer([size[1], size[0], typeNumber]);

    test.field.forEach((row) =>
        row.forEach((cell) => {
            if (cell.type === 'empty') {
                buf.set(1, cell.y, cell.x, cell.number);
            } else if (cell.type === 'unknown') {
                buf.set(1, cell.y, cell.x, 9);
            }

            // TODO: add mines
        }),
    );

    return buf.toTensor().as3D(size[1], size[0], typeNumber);
};

export const dataToMinesTensor = (data: TestData[], size: number[]) => {
    const buf = tf.buffer([data.length, size[1], size[0], typeNumber]);

    data.forEach((test, index) => {
        test.mines.forEach((mine) => {
            buf.set(1, index, mine.y, mine.x, 10);
        });
    });

    return buf.toTensor().as4D(data.length, size[1], size[0], typeNumber);
};

export const tensorToData = (tensor: tf.Tensor3D, size: number[]) => {
    // const data = tensor.dataSync();

    // const indexTensor = tensor.argMax(2);
    // console.log('indexTensor', indexTensor.dataSync());

    const scores = tensor
        .slice([0, 0, 10], [tensor.shape[0], tensor.shape[1], 1])
        .as2D(tensor.shape[0], tensor.shape[1]);

    // console.log('sliced', scores.dataSync());

    return scores;
};
