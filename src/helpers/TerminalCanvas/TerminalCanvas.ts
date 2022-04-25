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

    public static hideCursor() {
        this.print(`${ESC}?25l`);
    }

    public static showCursor() {
        this.print(`${ESC}?25h`);
    }

    // relative
    private static moveCursor(x: number, y?: number) {
        process.stdout.moveCursor(x, y || 0);
    }

    // absolute
    public static cursorTo(x: number, y?: number) {
        process.stdout.cursorTo(x, y);
    }

    public static moveToRow(absoluteX: number, relativeY: number) {
        this.cursorTo(absoluteX);
        this.moveCursor(0, relativeY);
    }

    public static clearLine(dir: -1 | 0 | 1) {
        process.stdout.clearLine(dir);
    }
}

export { TerminalCanvas };
