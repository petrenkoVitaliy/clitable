import { Table } from '../../Table/Table';
import { CellCenteringType } from '../../modules/CellStylist/constants';
import { ExpansionType } from '../../modules/ExpansionManager/constants';
import { sleep } from '../../utils/common';

async function responsiveExample() {
    const content = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
    ];

    new Table({
        horizontalCentering: CellCenteringType.Right,
        expansion: {
            expansionType: ExpansionType.Responsive,
            tableWidth: '30%',
        },
        contentRows: content,
    }).render();

    new Table({
        horizontalCentering: CellCenteringType.Left,
        expansion: {
            expansionType: ExpansionType.Responsive,
            tableWidth: '50%',
            tableHeight: 11,
        },
        contentRows: content,
    }).render();

    new Table({
        expansion: {
            expansionType: ExpansionType.Responsive,
            tableWidth: '100%',
        },
        contentRows: content,
    }).render();

    const widthSizes: Array<number | `${number}%`> = [
        '100%',
        '90%',
        '80%',
        '70%',
        '60%',
        '50%',
        '40%',
        '30%',
        '20%',
        '10%',
        '8%',
    ];

    const heightSizes: Array<number> = [5, 7, 9];

    const table = new Table({});

    let i = 0;
    while (++i) {
        table.render({
            expansion: {
                expansionType: ExpansionType.Responsive,
                tableWidth: widthSizes[i % widthSizes.length],
                tableHeight: heightSizes[i % heightSizes.length],
            },
            contentRows: content,
        });

        await sleep(300);
    }
}

export default responsiveExample;
