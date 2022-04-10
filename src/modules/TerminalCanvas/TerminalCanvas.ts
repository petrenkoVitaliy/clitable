// TODO rm
/* import * as ansiEscapes from 'sisteransi'; */

import { getConsoleCursorPosition } from '../../utils/screenBuffer';

const ESC = '\u001B[';

class TerminalCanvas {
    public static print(str: string) {
        return process.stdout.write(str);
    }

    public static save() {
        this.print(`\x1b7`);
    }

    public static restore() {
        this.print(`\x1b8`);
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

    public static moveCursor(x: number, y: number) {
        process.stdout.moveCursor(x, y);
    }

    public static cursorTo(x: number, y?: number) {
        process.stdout.cursorTo(x, y);
    }

    public static moveToRow(absoluteX: number, relativeY: number) {
        this.cursorTo(absoluteX);
        this.moveCursor(0, relativeY);
    }
}

export { TerminalCanvas };
