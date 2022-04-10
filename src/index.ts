import { Table } from './Table/Table';
import { CellCenteringType } from './modules/CellStylist/constants';
import { ExpansionType } from './modules/ExpansionManager/constants';
// import * as readline from 'readline';

const sleep = async (delayMs: number) => new Promise((r) => setTimeout(r, delayMs));

const table = new Table({
    expansion: {
        expansionType: ExpansionType.Custom,
        columnsSizes: ['33.3%', '33.3%', '33.3%'],
    },

    cellCenteringType: CellCenteringType.Center,

    contentRows: [
        [
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        ],
        [
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        ],
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

const main = async () => {
    let i = 0;
    while (1) {
        table.render({
            contentRows: [
                [
                    LOREM_IPSUM[i % LOREM_IPSUM.length] || '',
                    'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    String(i),
                ],
                [String(i), String(i), LOREM_IPSUM[i % LOREM_IPSUM.length] || ''],
                ['asd'],
            ],
        });

        await sleep(200);

        i++;
    }
};

// readline.emitKeypressEvents(process.stdin);

// if (process.stdin.isTTY) process.stdin.setRawMode(true);

// process.stdin.on('keypress', (_chunk, key) => {
//     if (key && key.name == 'q') process.exit();
//     process.stdout.write(key.name);
// });

main();
