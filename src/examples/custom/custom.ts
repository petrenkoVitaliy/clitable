import { Expansion } from '../../constants/common';
import { Table } from '../../Table/Table';

async function customExample() {
    const content = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5\nB6\nB7'],
    ];

    new Table({
        expansion: {
            type: Expansion.Custom,
            columnsSizes: [2, 6, 7, 6, 2],
            rowsSizes: [3, 5],
        },
        content,
    }).update();

    new Table({
        expansion: {
            type: Expansion.Custom,
            columnsSizes: [1, 2, 3, 5, 8],
            rowsSizes: [1, 3],
        },
        content,
    }).update();
}

export default customExample;
