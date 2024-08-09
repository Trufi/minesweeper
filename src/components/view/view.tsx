import { OrthographicCamera, Text } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { Fragment, useCallback, useState } from 'react';
import { Cell, GameState } from '../../game/types';
import { Dispatch } from '../../types';
import { markCellAction, openCellAction } from '../../actions';

export const View = ({ game, dispatch }: { game: GameState; dispatch: Dispatch }) => {
    return (
        <div style={{ width: 500, height: 500, cursor: 'pointer' }}>
            <Canvas orthographic fallback={<div>Sorry no WebGL supported!</div>} legacy linear flat>
                <OrthographicCamera
                    makeDefault
                    left={0}
                    right={game.size[0]}
                    bottom={0}
                    top={game.size[1]}
                    near={0.001}
                    far={1000}
                    position={[0, 0, 1]}
                />
                {game.field.map((row, y) => (
                    <Fragment key={y}>
                        {row.map((cell) => (
                            <Cell
                                key={cell.x}
                                cell={cell}
                                dispatch={dispatch}
                                showAll={game.lose || game.win}
                            />
                        ))}
                    </Fragment>
                ))}
                <ambientLight color={0xffffff} intensity={1} />
            </Canvas>
        </div>
    );
};

const numberToColor: { [key: number]: number } = {
    1: 0x4781ff,
    2: 0x009113,
    3: 0xd82b00,
    4: 0x7b0ed4,
    5: 0xa80f0a,
    6: 0xa80f0a,
    7: 0xa80f0a,
    8: 0xa80f0a,
};

const Cell = ({
    cell,
    dispatch,
    showAll,
}: {
    cell: Cell;
    dispatch: Dispatch;
    showAll: boolean;
}) => {
    const [hover, setHover] = useState(false);

    const fontProps = {
        fontSize: 0.5,
        color: numberToColor[cell.number],
    };

    let opened = showAll || cell.opened;

    let background = 0xc4c4c4;
    if (opened) {
        background = 0xffffff;
    } else if (hover) {
        background = 0xbbbbbb;
    }

    if (cell.marked) {
        background = 0xff9900;
        if (hover) {
            background = 0xe68a00;
        }
    }

    return (
        <group
            position-x={cell.x + 0.5}
            position-y={cell.y + 0.5}
            onPointerOver={useCallback(() => setHover(true), [])}
            onPointerOut={useCallback(() => setHover(false), [])}
            onClick={useCallback(() => dispatch(openCellAction(cell.x, cell.y)), [])}
            onContextMenu={useCallback((ev: ThreeEvent<MouseEvent>) => {
                ev.nativeEvent.preventDefault();
                ev.stopPropagation();
                dispatch(markCellAction(cell.x, cell.y));
            }, [])}
        >
            <mesh scale-x={1} scale-y={1}>
                <planeGeometry />
                <meshBasicMaterial color={0xcccccc} depthTest={false} depthWrite={true} />
            </mesh>
            <mesh scale-x={0.95} scale-y={0.95}>
                <planeGeometry />
                <meshBasicMaterial color={background} depthTest={false} depthWrite={true} />
            </mesh>
            {opened && cell.number > 0 && cell.type !== 'mine' && (
                <Text {...fontProps}>{cell.number}</Text>
            )}
            {opened && cell.type === 'mine' && (
                <Text {...fontProps} color={0xff0000}>
                    x
                </Text>
            )}
        </group>
    );
};
