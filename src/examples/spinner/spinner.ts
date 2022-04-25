import { Table } from '../../Table/Table';

import { sleep } from '../../utils/common';
import { getCurrentPosition } from './helpers';
import { Centering, ColorCodes, Expansion } from '../../constants/common';

async function spinnerExample() {
    const TABLE_SIZE = 7;

    const content = Array.from(Array(TABLE_SIZE)).map((_) =>
        Array.from(Array(TABLE_SIZE)).map(() => ':')
    );

    const style = Array.from(Array(TABLE_SIZE)).map((_) => Array.from(Array(TABLE_SIZE)));

    const table = new Table({
        horizontalCentering: Centering.Center,
        expansion: {
            type: Expansion.Custom,
            columnsSizes: Array.from(Array(TABLE_SIZE)).map(() => 3),
        },
        content,
    });

    const clearPositions = (
        positions: { x: number; y: number }[],
        contentPointer: string[][]
    ) => {
        positions.forEach((position) => {
            contentPointer[position.x][position.y] = '';
            style[position.x][position.y] = undefined;
        });
    };

    let i = 0;

    while (++i) {
        await sleep(100);

        const positionA = getCurrentPosition(i, 3, true, 1, 1);
        const positionB = getCurrentPosition(i, 3, false, 3, 3);
        const positionC = getCurrentPosition(i, 5, false, 1, 1);
        const positionD = getCurrentPosition(i, 7, true);

        content[positionA.x][positionA.y] = '1-1';
        style[positionA.x][positionA.y] = {
            color: ColorCodes.RED,
        };

        content[positionB.x][positionB.y] = '[ᗣ]';
        style[positionB.x][positionB.y] = {
            color: ColorCodes.BLUE,
        };

        content[positionC.x][positionC.y] = '^_^';
        style[positionC.x][positionC.y] = {
            color: ColorCodes.YELLOW,
        };

        content[positionD.x][positionD.y] = '0_0';
        style[positionD.x][positionD.y] = {
            color: ColorCodes.GREEN,
        };

        table.update({
            content,
            // style,
        });

        clearPositions([positionA, positionB, positionC, positionD], content);
    }
}

export default spinnerExample;
