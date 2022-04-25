import { Expansion } from '../../constants/common';
import { Table } from '../../Table/Table';

async function fixedExample() {
    const content = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5\nB6\nB7'],
    ];

    new Table({
        expansion: {
            type: Expansion.Fixed,
            columnsSize: 6,
            rowsSize: 6,
        },
        content,
    }).update();

    new Table({
        expansion: {
            type: Expansion.Fixed,
            columnsSize: 2,
            rowsSize: 2,
        },
        content,
    }).update();
}

export default fixedExample;
