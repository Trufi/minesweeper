import React from 'react';
import cn from 'classnames';
import { ViewCell } from '../../game/types';
import style from './index.module.css';

export interface CellProps {
    cell: ViewCell;
    size: number;
    onClick?: () => void;
    onMarked?: () => void;
}

export const Cell = ({ size, cell, onClick, onMarked }: CellProps) => {
    const onContextMenu = (ev: React.MouseEvent) => {
        ev.preventDefault();
        if (onMarked) {
            onMarked();
        }
    };

    const styles = {
        fontSize: Math.round(size * 0.5),
        lineHeight: `${size}px`,
        width: size,
        height: size,
    };

    if (cell.type === 'empty') {
        const classNumber = Math.min(cell.number, 5);
        return (
            <div
                className={cn(style.cell, style.empty, style[`number-${classNumber}`])}
                style={styles}
                onContextMenu={onContextMenu}
            >
                {cell.number !== 0 ? cell.number : ''}
            </div>
        );
    }

    if (cell.type === 'mine') {
        return (
            <div
                className={cn(style.cell, style.mine)}
                style={styles}
                onContextMenu={onContextMenu}
            >
                X
            </div>
        );
    }

    if (cell.marked) {
        return (
            <div
                className={cn(style.cell, style.unknown, style.marked)}
                style={styles}
                onClick={onClick}
                onContextMenu={onContextMenu}
            ></div>
        );
    }

    return (
        <div
            className={cn(style.cell, style.unknown)}
            style={styles}
            onClick={onClick}
            onContextMenu={onContextMenu}
        ></div>
    );
};
