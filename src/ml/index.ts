import * as tf from '@tensorflow/tfjs';
import { createData, TestData } from './generateData';
import { dataToTensor, dataToMinesTensor } from './dataToTensor';

const size = [10, 10];
const minesCount = 10;

const model = tf.sequential();

model.add(
    tf.layers.dense({
        units: 11,
        activation: 'relu',
        inputShape: [size[1], size[0], 11],
    }),
);

model.add(tf.layers.dense({ units: 11, activation: 'relu' }));
model.add(tf.layers.dense({ units: 11, activation: 'relu' }));
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

const createTestData = (n: number) => {
    const data: TestData[] = [];
    for (let i = 0; i < n; i++) {
        data.push(createData(size, minesCount));
    }

    console.log(`Created ${n} data`);

    const x = dataToTensor(data, size);
    const y = dataToMinesTensor(data, size);

    console.log(`Converted ${n} data`);

    return [x, y] as [tf.Tensor4D, tf.Tensor4D];
};

export const train = async () => {
    const validationData = createTestData(500);
    const [x, y] = createTestData(100);

    // const t = y;
    // const s = t
    //     .slice([0, 0, 0, 0], [1, t.shape[1], t.shape[2], t.shape[3]])
    //     .as3D(t.shape[1], t.shape[2], t.shape[3]);
    // console.log('y[0]', tensorToData(s, size).dataSync());

    const history = await model.fit(x, y, {
        epochs: 3,
        batchSize: 1,
        validationData,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                if (logs) {
                    console.log(
                        `Epoch: ${epoch}\nloss: ${logs.loss.toFixed(3)}\nacc: ${logs.acc.toFixed(
                            3,
                        )}\nval_loss: ${logs.val_loss.toFixed(3)}\nacc_loss: ${logs.val_acc.toFixed(
                            3,
                        )}`,
                    );
                }
            },
        },
    });

    console.log('history', history);

    const logData = [createData(size, minesCount)];

    const newX = dataToTensor(logData, size);

    const newY = dataToMinesTensor(logData, size);

    const predictOut = model.predict(newX) as tf.Tensor4D;

    console.log('Predict', shape(predictOut).dataSync());
    console.log('Real', shape(newY).dataSync());
};

const shape = (t4: tf.Tensor4D) => {
    const t3 = t4
        .slice([0, 0, 0, 0], [1, t4.shape[1], t4.shape[2], t4.shape[3]])
        .as3D(t4.shape[1], t4.shape[2], t4.shape[3]);

    return t3.slice([0, 0, 10], [t3.shape[0], t3.shape[1], 1]).as2D(t3.shape[0], t3.shape[1]);
};
