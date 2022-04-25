import { Table } from '../../Table/Table';
import { sleep } from '../../utils/common';
import { Centering, Expansion } from '../../constants/common';

async function autoExample() {
    const content = [
        ['A1', 'AA2', 'AAA3', 'AAAA4', 'AAAAA5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
    ];

    new Table({
        expansion: {
            type: Expansion.Auto,
        },
        content,
    }).update();

    new Table({
        horizontalCentering: Centering.Right,
        expansion: {
            type: Expansion.Auto,
            paddingHorizontal: 2,
            paddingVertical: 2,
        },
        content,
    }).update();

    new Table({
        horizontalCentering: Centering.Left,
        expansion: {
            type: Expansion.Auto,
            paddingHorizontal: 5,
            paddingVertical: 7,
        },
        content,
    }).update();

    const words = [
        'Lorem ipsum\ndolor sit amet, consectetur ',
        'adipiscing elit.',
        'Nulla imperdiet, magna \neu convallis tempus,',
        'arcu nisi efficitur',
        'dui,',
        'quis luctus arcu magna \nEtiam ante tortor,',
        'vehicula',
        'sit amet malesuada eu, gravida ',
    ];

    const changingContent = [['', '', '', '', '']];
    const table = new Table({
        expansion: {
            type: Expansion.Auto,
            paddingHorizontal: 5,
        },
    });

    let i = 0;
    while (++i) {
        changingContent[0].forEach((_, colIndex) => {
            const index = Math.round(Math.random() * (words.length - 1));
            changingContent[0][colIndex] = words[index];
        });

        table.update({
            content: changingContent,
        });

        await sleep(500);
    }
}

export default autoExample;
