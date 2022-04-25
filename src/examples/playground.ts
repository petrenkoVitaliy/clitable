import { Table } from '../Table/Table';
import { sleep } from '../utils/common';
import { Centering, ColorCodes, Expansion, ModeCodes } from '../constants/common';

async function playground() {
    const content = [
        ['A1\nA11\nA22', 'A2', 'A3', 'A4', 'A5'],
        ['A1', 'A2', 'A3', 'B4', 'A5'],
        ['A1', 'A2', 'A3', 'B4', 'A5'],
    ];

    const table = new Table({
        horizontalCentering: Centering.Right,
        verticalCentering: Centering.Right,
        expansion: {
            type: Expansion.Auto,
            paddingHorizontal: '10%',
            paddingVertical: 6,
        },
        content,
        style: {
            rows: {
                1: {
                    color: ColorCodes.BLUE,
                    mode: ModeCodes.BACKGROUND,
                    border: {
                        top: {
                            color: ColorCodes.BLACK,
                            mode: ModeCodes.BACKGROUND,
                        },
                        left: {
                            color: ColorCodes.YELLOW,
                            mode: ModeCodes.BACKGROUND,
                        },
                        right: {
                            color: ColorCodes.CYAN,
                            mode: ModeCodes.BACKGROUND,
                        },
                        bottom: {
                            color: ColorCodes.GREEN,
                            mode: ModeCodes.BACKGROUND,
                        },
                    },
                },
                2: {
                    color: ColorCodes.YELLOW,
                    mode: ModeCodes.BACKGROUND,
                    border: {
                        color: ColorCodes.RED,
                        mode: ModeCodes.BACKGROUND,
                    },
                },
            },
        },
    });

    let i = 1;
    while (i++) {
        await sleep(100);

        content[0][0] = String(i % 10);

        table.update({
            verticalCentering: Centering.Center,
            horizontalCentering: Centering.Center,
            content,
        });
    }
}

export default playground;
