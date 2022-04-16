import { Table } from '../../Table/Table';
import { CellCenteringType } from '../../modules/CellStylist/constants';
import { ExpansionType } from '../../modules/ExpansionManager/constants';

import { sleep } from '../../utils/common';
import { getCurrentPosition } from './helpers';

async function spinnerExample() {
    const TABLE_SIZE = 7;

    const content = Array.from(Array(TABLE_SIZE)).map((_) =>
        Array.from(Array(TABLE_SIZE)).map(() => ':')
    );

    const table = new Table({
        horizontalCentering: CellCenteringType.Center,
        expansion: {
            expansionType: ExpansionType.Custom,
            columnsSizes: Array.from(Array(TABLE_SIZE)).map(() => 3),
        },
        contentRows: content,
    });

    const clearPositions = (
        positions: { x: number; y: number }[],
        contentPointer: string[][]
    ) => {
        positions.forEach((position) => {
            contentPointer[position.x][position.y] = '';
        });
    };

    let i = 0;

    while (++i) {
        await sleep(100);

        const positionA = getCurrentPosition(i, 3, true, 1, 1);
        const positionB = getCurrentPosition(i, 3, false, 3, 3);
        const positionC = getCurrentPosition(i, 5, false, 1, 1);
        const positionD = getCurrentPosition(i, 7, true);

        content[positionA.x][positionA.y] = '[ᗣ]';
        content[positionB.x][positionB.y] = '[ᗣ]';
        content[positionC.x][positionC.y] = '^_^';
        content[positionD.x][positionD.y] = '0_0';

        table.render({ contentRows: content });

        clearPositions([positionA, positionB, positionC, positionD], content);
    }
}

export default spinnerExample;
