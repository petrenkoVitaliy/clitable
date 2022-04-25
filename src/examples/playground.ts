import { Table } from '../Table/Table';
import { sleep } from '../utils/common';
import { Centering, ColorCodes, Expansion } from '../constants/common';

async function playground() {
    const content = [
        ['A1\nA11\nA22', 'A2', 'A3', 'A4', 'A5'],
        ['A1', 'A2', 'A3', 'B4', 'A5'],
        ['A1', 'A2', 'A3', 'B4', 'A5'],
    ];

    const table = new Table({
        hideCursor: true,
        horizontalCentering: Centering.Right,
        verticalCentering: Centering.Right,
        expansion: {
            type: Expansion.Auto,
            paddingHorizontal: 2,
        },
        content,
        style: {
            selected: {
                color: ColorCodes.RED,
                border: {
                    color: ColorCodes.RED,
                },
            },
        },
    });

    let i = 1;
    while (i++) {
        content[0][0] = String(i % 10);

        table.update({
            verticalCentering: Centering.Center,
            horizontalCentering: Centering.Center,
            content,
        });

        await sleep(100);
    }
}

export default playground;
