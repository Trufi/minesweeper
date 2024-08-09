import { OrthographicCamera } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Color,
    InstancedMesh,
    LinearFilter,
    LinearMipmapNearestFilter,
    Object3D,
    SRGBColorSpace,
} from 'three';
import { markCellAction, openCellAction } from '../../actions';
import { GameState } from '../../game/types';
import { Dispatch } from '../../types';

const tempObject = new Object3D();
const tempColor = new Color();

export const View = ({ game, dispatch }: { game: GameState; dispatch: Dispatch }) => {
    return (
        <div
            style={{ width: 500, height: 500, cursor: 'pointer' }}
            onContextMenu={(ev) => ev.preventDefault()}
        >
            <Canvas orthographic fallback={<div>Sorry no WebGL supported!</div>}>
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
                <Field game={game} dispatch={dispatch} />
                <ambientLight color={0xffffff} intensity={1} />
            </Canvas>
        </div>
    );
};

const numberToColor: { [key: number]: string } = {
    1: '#4781ff',
    2: '#009113',
    3: '#d82b00',
    4: '#7b0ed4',
    5: '#a80f0a',
    6: '#a80f0a',
    7: '#a80f0a',
    8: '#a80f0a',
};

const Field = ({ game, dispatch }: { game: GameState; dispatch: Dispatch }) => {
    const [hover, setHover] = useState<number>();

    const meshRef = useRef<InstancedMesh>(null);
    const meshRef2 = useRef<InstancedMesh>(null);

    const count = game.size[0] * game.size[1];

    const colorArray = useMemo(() => {
        const colors = new Float32Array(game.size[0] * game.size[1] * 3);

        for (let y = 0; y < game.size[1]; y++) {
            for (let x = 0; x < game.size[0]; x++) {
                const cell = game.field[y][x];
                const id = y * game.size[0] + x;

                let opened = game.lose || game.win || cell.opened;

                let background = 0xc4c4c4;
                if (opened) {
                    background = 0xffffff;
                } else if (hover === id) {
                    background = 0xbbbbbb;
                }

                if (cell.marked) {
                    background = 0xff9900;
                    if (hover === id) {
                        background = 0xe68a00;
                    }
                }

                tempColor.set(background);

                colors[id * 3] = tempColor.r;
                colors[id * 3 + 1] = tempColor.g;
                colors[id * 3 + 2] = tempColor.b;
            }
        }

        return colors;
    }, [hover, game.revision]);

    useEffect(() => {
        if (!meshRef.current || !meshRef2.current) {
            return;
        }

        for (let y = 0; y < game.size[1]; y++) {
            for (let x = 0; x < game.size[0]; x++) {
                const cell = game.field[y][x];
                let opened = game.lose || game.win || cell.opened;
                const id = y * game.size[0] + x;
                if (opened) {
                    tempObject.position.set(0, 0, 10000);
                } else {
                    tempObject.position.set(cell.x + 0.5, cell.y + 0.5, 0);
                }
                tempObject.updateMatrix();
                meshRef.current.setMatrixAt(id, tempObject.matrix);
                meshRef2.current.setMatrixAt(id, tempObject.matrix);
            }
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef2.current.instanceMatrix.needsUpdate = true;
    }, [game.revision]);

    return (
        <>
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, count]}
                onPointerOver={(ev) => setHover(ev.instanceId)}
                onPointerOut={(ev) => setHover((id) => (ev.instanceId === id ? undefined : id))}
                onClick={(ev) => {
                    if (ev.instanceId) {
                        const x = ev.instanceId % game.size[0];
                        const y = (ev.instanceId - x) / game.size[0];
                        dispatch(openCellAction(x, y));
                    }
                }}
                onContextMenu={(ev: ThreeEvent<MouseEvent>) => {
                    ev.nativeEvent.preventDefault();
                    ev.stopPropagation();
                    if (ev.instanceId) {
                        const x = ev.instanceId % game.size[0];
                        const y = (ev.instanceId - x) / game.size[0];
                        dispatch(markCellAction(x, y));
                    }
                }}
            >
                <planeGeometry />
                <meshBasicMaterial toneMapped={false} color={0xcccccc} />
            </instancedMesh>

            <instancedMesh ref={meshRef2} args={[undefined, undefined, count]}>
                <planeGeometry args={[0.95, 0.95]}>
                    <instancedBufferAttribute attach='attributes-color' args={[colorArray, 3]} />
                </planeGeometry>
                <meshBasicMaterial toneMapped={false} vertexColors />
            </instancedMesh>

            <OpenedCells game={game} n={0} />
            <OpenedCells game={game} n={1} />
            <OpenedCells game={game} n={2} />
            <OpenedCells game={game} n={3} />
            <OpenedCells game={game} n={4} />
            <OpenedCells game={game} n={5} />
            <OpenedCells game={game} n={6} />
            <OpenedCells game={game} n={7} />
            <OpenedCells game={game} n={8} />
            <OpenedCells game={game} n={8} mine />
        </>
    );
};

const OpenedCells = ({ game, n, mine }: { game: GameState; n: number; mine?: boolean }) => {
    const meshRef = useRef<InstancedMesh>(null);
    const meshRef2 = useRef<InstancedMesh>(null);

    const count = game.size[0] * game.size[1];

    useEffect(() => {
        if (!meshRef.current || !meshRef2.current) {
            return;
        }

        for (let y = 0; y < game.size[1]; y++) {
            for (let x = 0; x < game.size[0]; x++) {
                const cell = game.field[y][x];
                let opened = game.lose || game.win || cell.opened;
                const id = y * game.size[0] + x;
                if (
                    opened &&
                    ((mine && cell.type === 'mine') || (cell.type !== 'mine' && cell.number === n))
                ) {
                    tempObject.position.set(cell.x + 0.5, cell.y + 0.5, 0);
                } else {
                    tempObject.position.set(0, 0, 10000);
                }
                tempObject.updateMatrix();
                meshRef.current.setMatrixAt(id, tempObject.matrix);
                meshRef2.current.setMatrixAt(id, tempObject.matrix);
            }
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.boundingSphere = null;
        meshRef2.current.instanceMatrix.needsUpdate = true;
        meshRef2.current.boundingSphere = null;
    }, [game.revision]);

    const image = useMemo(() => {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, size, size);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '40px Menlo, Monaco, Consolas, Courier New, monospace';

        if (mine) {
            ctx.fillStyle = '#ff0000';
            ctx.fillText('X', size / 2, size / 2);
        } else {
            ctx.fillStyle = numberToColor[n];
            ctx.fillText(String(n), size / 2, size / 2);
        }
        return canvas;
    }, []);

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <planeGeometry />
                <meshBasicMaterial toneMapped={false} color={0xcccccc} />
            </instancedMesh>

            <instancedMesh ref={meshRef2} args={[undefined, undefined, count]}>
                <planeGeometry args={[0.95, 0.95]} />
                <meshBasicMaterial toneMapped={false}>
                    {n > 0 && (
                        <canvasTexture
                            attach='map'
                            image={image}
                            minFilter={LinearMipmapNearestFilter}
                            magFilter={LinearFilter}
                            colorSpace={SRGBColorSpace}
                        />
                    )}
                </meshBasicMaterial>
            </instancedMesh>
        </>
    );
};
