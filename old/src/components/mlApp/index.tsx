import React from 'react';
import { TestData } from '../../ml/generateData';
import { MlField } from '../mlField';

export interface MlAppProps {
    data: TestData[];
}

export const MlApp = ({ data }: MlAppProps) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, 205px)`,
            }}
        >
            {data.map((testData, index) => (
                <MlField key={index} data={testData} />
            ))}
        </div>
    );
};
