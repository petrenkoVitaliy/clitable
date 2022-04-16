import { Table } from '../Table/Table';
import { CellCenteringType } from '../modules/CellStylist/constants';
import { ExpansionType } from '../modules/ExpansionManager/constants';
import { sleep } from '../utils/common';

async function playground() {
    const content = [
        ['A1\nA11\nA22', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5\nB6\nB7'],
    ];

    const table = new Table({
        horizontalCentering: CellCenteringType.Right,
        verticalCentering: CellCenteringType.Right,
        expansion: {
            expansionType: ExpansionType.Responsive,
            tableWidth: '30%',
            tableHeight: 20,
        },
        contentRows: content,
    });

    while (1) {
        await sleep(500);

        table.render({
            expansion: {
                expansionType: ExpansionType.Responsive,
                tableWidth: '30%',
                tableHeight: 20,
            },
            contentRows: content,
        });
    }
}

export default playground;
