import { TerminalCanvas } from '../../modules/TerminalCanvas/TerminalCanvas';
import { BORDER_SIZE, END_LINE } from '../constants';

class TableRenderer {
    private isRendered = false;
    private renderedHeight = 0;

    public clearTable() {
        if (!this.isRendered) return;

        TerminalCanvas.moveToRow(0, -this.renderedHeight);
        for (let i = 0; i < this.renderedHeight; i++) {
            process.stdout.clearLine(0);
            TerminalCanvas.moveToRow(0, 1);
        }

        TerminalCanvas.moveToRow(0, -this.renderedHeight + BORDER_SIZE - 2);

        this.isRendered = false;
    }

    private renderTable(virtualTable: string[]) {
        if (this.isRendered) {
            this.clearTable();
            TerminalCanvas.moveToRow(0, 1);
        }

        const output = virtualTable.reduce(
            (acc, tableRow) => (acc += tableRow + END_LINE)
        );

        this.renderedHeight = virtualTable.length;
        TerminalCanvas.print(output);
    }

    public render(virtualTable: string[]) {
        TerminalCanvas.hideCursor();

        if (!this.isRendered) {
            TerminalCanvas.print(END_LINE);
        }

        this.renderTable(virtualTable);
        this.isRendered = true;

        TerminalCanvas.showCursor();
    }
}

export { TableRenderer };
