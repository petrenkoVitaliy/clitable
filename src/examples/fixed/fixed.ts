import { Table } from '../../Table/Table';
import { ExpansionType } from '../../modules/ExpansionManager/constants';

async function fixedExample() {
    const content = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5\nB6\nB7'],
    ];

    new Table({
        expansion: {
            expansionType: ExpansionType.Fixed,
            columnsSize: 6,
            rowsSize: 6,
        },
        contentRows: content,
    }).render();

    new Table({
        expansion: {
            expansionType: ExpansionType.Fixed,
            columnsSize: 2,
            rowsSize: 2,
        },
        contentRows: content,
    }).render();
}

export default fixedExample;
