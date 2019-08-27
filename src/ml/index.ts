import * as tf from '@tensorflow/tfjs';
import { createData, TestData } from './generateData';
import { dataToTensor, dataToMinesTensor } from './dataToTensor';

const size = [10, 10];
const minesCount = 10;

const model = tf.sequential();

model.add(
    tf.layers.dense({
        units: 2500,
        activation: 'relu',
        inputShape: [size[1] * size[0] * 11],
    }),
);

model.add(tf.layers.dense({ units: 2000, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1500, activation: 'relu' }));
// model.add(tf.layers.reshape({ targetShape: [size[1], size[0]] }));
// model.add(tf.layers.timeDistributed({ layer: tf.layers.dense({ units: 11 }) }));
model.add(tf.layers.dense({ units: size[0] * size[1], activation: 'softmax' }));

model.summary();

model.compile({
    optimizer: 'rmsprop', // tf.train.adam(),

    loss: 'categoricalCrossentropy',
    // loss: 'sparseCategoricalCrossentropy', // нужно использовать oneHot
    metrics: ['accuracy'],

    // loss: tf.losses.meanSquaredError,
    // metrics: ['mse'],
});

const getHtml = (array: number[]) => {
    return array
        .map((x, i) => {
            if (i % 10 === 0) {
                return `\n${x.toFixed(1)}`;
            } else {
                return `${x.toFixed(1)}`;
            }
        })
        .join(' ');
};

const createTestData = (n: number) => {
    const data: TestData[] = [];
    for (let i = 0; i < n; i++) {
        data.push(createData(size, minesCount));
    }

    console.log(`Created ${n} data`);

    const x = dataToTensor(data, size);
    const y = dataToMinesTensor(data, size);

    console.log(`Converted ${n} data`);

    return [x, y] as [tf.Tensor2D, tf.Tensor2D];
};

export const train = async () => {
    const validationData = createTestData(2048);
    const [x, y] = createTestData(2048 * 2);

    const history = await model.fit(x, y, {
        epochs: 1,
        batchSize: 32,
        validationData,
        yieldEvery: 'epoch',
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

    validationData[0].dispose();
    validationData[1].dispose();
    x.dispose();
    y.dispose();

    return history;
};

export const predict = (): { data: TestData } => {
    return tf.tidy(() => {
        const data = createData(size, minesCount);
        const logData = [data];

        const newX = dataToTensor(logData, size);

        const newY = dataToMinesTensor(logData, size);

        const predictOut = model.predict(newX) as tf.Tensor2D;

        // console.log('RealX', getHtml(Array.from(shape(newX, 1).dataSync())));
        console.log('RealY', getHtml(Array.from(shape(newY, 0).dataSync())));

        const pred = Array.from(shape(predictOut, 0).dataSync());
        console.log(
            'Predict',
            getHtml(pred), //.map((x) => Math.round(x))),
        );

        let max = 0;
        let index = 0;
        pred.forEach((x, i) => {
            if (x > max) {
                max = x;
                index = i;
            }
        });

        const y = Math.floor(index / size[0]);
        const x = index - y * size[1];

        data.field[y][x].predicted = true;

        return { data } as any;
    });
};

const shape = (t2: tf.Tensor2D, param: number) => {
    return tf.tidy(() => {
        const t4 = t2.as4D(t2.shape[0], size[1], size[0], 1);

        const t3 = t4
            .slice([0, 0, 0, 0], [1, t4.shape[1], t4.shape[2], t4.shape[3]])
            .as3D(t4.shape[1], t4.shape[2], t4.shape[3]);

        return t3
            .slice([0, 0, param], [t3.shape[0], t3.shape[1], 1])
            .as2D(t3.shape[0], t3.shape[1]);
    });
};
