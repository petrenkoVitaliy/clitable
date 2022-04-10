import { Table } from '../Table/Table';
import { CellCenteringType } from '../modules/CellStylist/constants';
import { ExpansionType } from '../modules/ExpansionManager/constants';
import { sleep } from '../utils/common';

const TABLE_SIZE = 5;

const content = Array.from(Array(TABLE_SIZE)).map((_) =>
    Array.from(Array(TABLE_SIZE)).map(() => '')
);

const table = new Table({
    cellCenteringType: CellCenteringType.Center,
    expansion: {
        expansionType: ExpansionType.Custom,
        columnsSizes: Array.from(Array(TABLE_SIZE)).map(() => 3),
    },
    contentRows: content,
});

const strategies = [
    (i: number) => ({ x: 0, y: i }),
    (i: number) => ({ x: i - TABLE_SIZE + 1, y: TABLE_SIZE - 1 }),
    (i: number) => ({
        x: TABLE_SIZE - 1,
        y: TABLE_SIZE * 3 - 3 - i,
    }),
    (i: number) => ({ x: TABLE_SIZE - 1 - i + TABLE_SIZE * 3 - 3, y: 0 }),
];

(async () => {
    let i = 0;

    while (1) {
        await sleep(5);

        const { x, y } = strategies[Math.floor(i / (TABLE_SIZE - 1))](i);

        content[x][y] = '(^)';
        table.render({ contentRows: content });
        content[x][y] = '';

        i++;
        i %= TABLE_SIZE * 4 - 4;
    }
})();
