import { Centering, Expansion } from '../../constants/common';
import { Table } from '../../Table/Table';
import { sleep } from '../../utils/common';

async function responsiveExample() {
    const content = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
    ];

    new Table({
        horizontalCentering: Centering.Right,
        expansion: {
            type: Expansion.Responsive,
            tableWidth: '30%',
        },
        content,
    }).update();

    new Table({
        horizontalCentering: Centering.Left,
        expansion: {
            type: Expansion.Responsive,
            tableWidth: '50%',
            tableHeight: 11,
        },
        content,
    }).update();

    new Table({
        expansion: {
            type: Expansion.Responsive,
            tableWidth: '100%',
        },
        content,
    }).update();

    const table = new Table({});

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

    let i = 0;
    while (++i) {
        table.update({
            expansion: {
                type: Expansion.Responsive,
                tableWidth: widthSizes[i % widthSizes.length],
                tableHeight: heightSizes[i % heightSizes.length],
            },
            content,
        });

        await sleep(300);
    }
}

export default responsiveExample;
