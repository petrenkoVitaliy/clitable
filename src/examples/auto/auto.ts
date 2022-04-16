import { Table } from '../../Table/Table';
import { CellCenteringType } from '../../modules/CellStylist/constants';
import { ExpansionType } from '../../modules/ExpansionManager/constants';
import { sleep } from '../../utils/common';

async function autoExample() {
    const content = [
        ['A1', 'AA2', 'AAA3', 'AAAA4', 'AAAAA5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
    ];

    new Table({
        expansion: {
            expansionType: ExpansionType.Auto,
        },
        contentRows: content,
    }).render();

    new Table({
        horizontalCentering: CellCenteringType.Right,
        expansion: {
            expansionType: ExpansionType.Auto,
            marginVertical: 2,
            marginHorizontal: 2,
        },
        contentRows: content,
    }).render();

    new Table({
        horizontalCentering: CellCenteringType.Left,
        expansion: {
            expansionType: ExpansionType.Auto,
            marginVertical: 5,
            marginHorizontal: 7,
        },
        contentRows: content,
    }).render();

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
            expansionType: ExpansionType.Auto,
            marginHorizontal: 5,
        },
    });

    let i = 0;
    while (++i) {
        changingContent[0].forEach((_, colIndex) => {
            const index = Math.round(Math.random() * (words.length - 1));
            changingContent[0][colIndex] = words[index];
        });

        table.render({
            contentRows: changingContent,
        });

        await sleep(500);
    }
}

export default autoExample;
