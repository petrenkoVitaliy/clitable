import { Table } from '../../Table/Table';
import { ExpansionType } from '../../modules/ExpansionManager/constants';

async function customExample() {
    const content = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5\nB6\nB7'],
    ];

    new Table({
        expansion: {
            expansionType: ExpansionType.Custom,
            columnsSizes: [2, 6, 7, 6, 2],
            rowsSizes: [3, 5],
        },
        contentRows: content,
    }).render();

    new Table({
        expansion: {
            expansionType: ExpansionType.Custom,
            columnsSizes: [1, 2, 3, 5, 8],
            rowsSizes: [1, 3],
        },
        contentRows: content,
    }).render();
}

export default customExample;
