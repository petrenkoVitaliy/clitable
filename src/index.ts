// console.log(process.stdout.isTTY);
// process.stdout.on('resize', () => {
//     console.log(process.stdout.getWindowSize());
// });
// process.stdout.cursorTo(10, 0);
// process.stdout.write('10');

// process.stdin.resume();

import { Table } from './Table/Table';
import { CellCenteringType } from './modules/CellStylist/constants';
import { ExpansionType } from './modules/ExpansionManager/constants';

const sleep = async (delayMs: number) => new Promise((r) => setTimeout(r, delayMs));

const table = new Table({
    expansion: {
        expansionType: ExpansionType.Auto,
    },

    cellCenteringType: CellCenteringType.Center,

    contentRows: [],
});

const LOREM_IPSUM = [
    'Lorem ipsum dolor siWt amet,',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor',
    'incididunt ut labore',
    'Ut enim ad minim veniam,',
    'quis nostrud',
    'nisi ut aliquip ex',
    'ea commodo consequat.',
];

const main = async () => {
    table.render();
    // await sleep(1500);
    let i = 0;
    while (1) {
        await sleep(200);
        table.update({
            expansion: {
                expansionType: ExpansionType.Responsive,
                tableWidth: 100,
            },
            cellCenteringType: CellCenteringType.Center,

            contentRows: [
                [
                    LOREM_IPSUM[i % LOREM_IPSUM.length] || '',
                    'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    String(i),
                ],
                [String(i), String(i), LOREM_IPSUM[i % LOREM_IPSUM.length] || ''],
            ],
        });

        i++;
    }
};

main();
