// console.log(process.stdout.isTTY);
// process.stdout.on('resize', () => {
//     console.log(process.stdout.getWindowSize());
// });
// process.stdout.cursorTo(10, 0);
// process.stdout.write('10');

// process.stdin.resume();

import { Table } from './modules/Table/Table';
import { CellCenteringType } from './modules/Table/TableRenderer/TableStylist/constants';
import { ExpansionType } from './modules/Table/TableSchema/TableResizer/constants';

const sleep = async (delayMs: number) => new Promise((r) => setTimeout(r, delayMs));

const table = new Table({
    expansion: {
        expansionType: ExpansionType.Auto,
        marginHorizontal: 5,
        // columnsSizes: [30, 30, 30],
    },

    cellCenteringType: CellCenteringType.Center,

    contentRows: [
        ['aa\na', 'x\nx', 'xxxx'],
        ['a', 'a', 'bbb', 'a'],
        ['a', 'a', 'ccc', 'aaaaaaaaaaaa'],
    ],
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

process.stdout.on('resize', () => {
    console.log('screen size has changed!');
});

const main = async () => {
    table.render();
    await sleep(1500);

    for (let i = 0; i < 100; i++) {
        await sleep(500);
        table.update({
            cellCenteringType: CellCenteringType.Center,

            contentRows: [
                [
                    LOREM_IPSUM[i % LOREM_IPSUM.length],
                    'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    String(i),
                ],
                [String(i), String(i), LOREM_IPSUM[i % LOREM_IPSUM.length]],
            ],
        });
    }
};

main();
