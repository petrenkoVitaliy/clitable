import { getConsoleCursorPosition } from '../../../../utils/screenBuffer';
import * as ansiEscapes from 'sisteransi';

const ESC = '\u001B[';
const CSI = `${ESC}[`;

class ConsoleCanvas {
    public static print(str: string) {
        return process.stdout.write(str);
    }

    public static getCursorPosition() {
        return getConsoleCursorPosition();
    }

    public static getTerminalWidth() {
        return process.stdout.columns;
    }

    public static hideCursor() {
        this.print(`${ESC}?25l`);
    }

    public static showCursor() {
        this.print(`${ESC}?25h`);
    }

    public static control = ansiEscapes;

    // public static cursorTo = (params: { x: number; y: number }) => {
    //     process.stdout.cursorTo(params.x, params.y);
    // };
    // this.print(ESC + (params.y + 1) + ';' + (params.x + 1) + 'H');

    public static moveTo = (params: { x: number; y: number }) => {
        const { x, y } = params;

        let returnValue = '';

        if (x < 0) {
            returnValue += ESC + -x + 'D';
        } else if (x > 0) {
            returnValue += ESC + x + 'C';
        }

        if (y < 0) {
            returnValue += ESC + -y + 'A';
        } else if (y > 0) {
            returnValue += ESC + y + 'B';
        }

        this.print(returnValue);
    };
}

export { ConsoleCanvas };
