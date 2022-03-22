// TODO rm
// import * as ansiEscapes from 'sisteransi';

import { getConsoleCursorPosition } from '../../utils/screenBuffer';

const ESC = '\u001B[';

class ConsoleCanvas {
    public static print(str: string) {
        return process.stdout.write(str);
    }

    public static getTerminalSize() {
        return {
            cols: process.stdout.columns,
            rows: process.stdout.rows,
        };
    }

    public static addResizeListener<T = void>(callback: () => T) {
        process.stdout.on('resize', callback);
    }

    public static getCursorPosition() {
        return getConsoleCursorPosition();
    }

    public static hideCursor() {
        this.print(`${ESC}?25l`);
    }

    public static showCursor() {
        this.print(`${ESC}?25h`);
    }
}

export { ConsoleCanvas };
