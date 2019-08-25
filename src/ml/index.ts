import * as tf from '@tensorflow/tfjs';
import { createData, TestData } from './generateData';
import { dataToTensor, dataToMinesTensor, tensorToData } from './dataToTensor';

const size = [10, 10];
const minesCount = 10;

const model = tf.sequential();

model.add(
    tf.layers.dense({
        units: 250,
        activation: 'relu',
        inputShape: [size[1], size[0], 11],
    }),
);

model.add(tf.layers.dense({ units: 200, activation: 'relu' }));
model.add(tf.layers.dense({ units: 200, activation: 'relu' }));
// model.add(tf.layers.reshape({ targetShape: [size[1], size[0]] }));
// model.add(tf.layers.timeDistributed({ layer: tf.layers.dense({ units: 11 }) }));
model.add(tf.layers.dense({ units: 11, activation: 'softmax' }));

model.summary();

model.compile({
    optimizer: tf.train.adam(),

    loss: 'categoricalCrossentropy',
    // loss: 'sparseCategoricalCrossentropy', // нужно использовать oneHot
    metrics: ['accuracy'],

    // loss: tf.losses.meanSquaredError,
    // metrics: ['mse'],
});

export const train = async () => {
    const data: TestData[] = [];
    for (let i = 0; i < 100; i++) {
        data.push(createData(size, minesCount));
    }

    console.log(`Created test data`);

    const x = dataToTensor(data, size);
    const y = dataToMinesTensor(data, size);

    const t = y;
    const s = t
        .slice([0, 0, 0, 0], [1, t.shape[1], t.shape[2], t.shape[3]])
        .as3D(t.shape[1], t.shape[2], t.shape[3]);
    console.log('y[0]', tensorToData(s, size).dataSync());

    console.log(`Converted test data`);

    const history = await model.fit(x, y, {
        epochs: 3,
        batchSize: 1,
    });

    console.log('history', history);

    const newX = dataToTensor([createData(size, minesCount)], size);
    // const slicedX = newX.slice([0, 0, 0]);

    // const newX = testToTensor(createData(size, minesCount), size);

    // console.log(await slicedX.dataSync());
    const predictOut = model.predict(newX) as tf.Tensor4D;

    const scores = predictOut
        .slice([0, 0, 0, 0], [1, predictOut.shape[1], predictOut.shape[2], predictOut.shape[3]])
        .as3D(predictOut.shape[1], predictOut.shape[2], predictOut.shape[3]);

    console.log(tensorToData(scores, size).dataSync());
};
