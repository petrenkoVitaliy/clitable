import { TerminalCanvas } from '../../modules/TerminalCanvas/TerminalCanvas';
import { BORDER_SIZE, END_LINE } from '../constants';
import { VirtualTableDiff } from '../TableVirtualizer/types';

class TableRenderer {
    private isRendered = false;
    private renderedHeight = 0;

    public clearTable() {
        if (!this.isRendered) return;

        TerminalCanvas.moveToRow(0, -this.renderedHeight);
        for (let i = 0; i < this.renderedHeight; i++) {
            TerminalCanvas.clearLine(0);
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
            (acc, tableRow) => (acc += tableRow + END_LINE),
            ''
        );

        this.renderedHeight = virtualTable.length;
        TerminalCanvas.print(output);
    }

    private updateTable(virtualTableDiff: VirtualTableDiff) {
        if (this.isRendered) {
            TerminalCanvas.moveToRow(0, -this.renderedHeight);
        }

        this.renderedHeight = 0;

        for (let i = 0; i < virtualTableDiff.length; i++) {
            const colDiff = virtualTableDiff[i];

            if (colDiff) {
                // TODO - 3 - optimize
                Object.keys(virtualTableDiff[i] || {}).forEach((_colIndex) => {
                    const colIndex = Number(_colIndex);

                    TerminalCanvas.cursorTo(Number(colIndex));
                    TerminalCanvas.print(colDiff[colIndex]);
                });

                TerminalCanvas.print(END_LINE);
            }
            if (colDiff === null) {
                TerminalCanvas.clearLine(0);
                TerminalCanvas.moveToRow(0, 1);
            }
            if (colDiff === undefined) {
                TerminalCanvas.moveToRow(0, 1);
            }

            this.renderedHeight++;
        }
    }

    public render(
        params: {
            virtualTable: string[];
            virtualTableDiff: VirtualTableDiff;
        },
        options?: { forceRerender?: boolean }
    ) {
        TerminalCanvas.hideCursor();

        if (!this.isRendered) {
            TerminalCanvas.print(END_LINE);
        }

        if (options?.forceRerender || !this.isRendered) {
            this.renderTable(params.virtualTable);
        } else {
            this.updateTable(params.virtualTableDiff);
        }

        this.isRendered = true;

        TerminalCanvas.showCursor();
    }
}

export { TableRenderer };
