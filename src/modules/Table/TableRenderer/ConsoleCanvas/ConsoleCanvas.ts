import { getConsoleCursorPosition } from '../../../../utils/screenBuffer';
import * as ansiEscapes from 'sisteransi';

const ESC = '\u001B[';

class ConsoleCanvas {
    public static print(str: string) {
        return process.stdout.write(str);
    }

    public static getCursorPosition() {
        return getConsoleCursorPosition();
    }

    public static control = ansiEscapes;

    public static cursorTo = (params: { x: number; y: number }) =>
        this.print(ESC + (params.y + 1) + ';' + (params.x + 1) + 'H');

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
