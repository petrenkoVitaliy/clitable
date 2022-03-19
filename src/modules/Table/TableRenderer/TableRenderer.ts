import { ConsoleCanvas } from './ConsoleCanvas/ConsoleCanvas';
import { BORDER_SIZE, END_LINE, RenderType } from '../constants';

import { TableStylist } from './TableStylist/TableStylist';

import { RendererProps } from './types';
import { getCharsCount } from '../../../utils/common';

class TableRenderer {
    private isRendered = false;

    private positions = {
        tableEnd: { x: 0, y: 0 },
    };

    private renderedHeight = 0;

    private renderBorders(params: RendererProps) {
        if (this.isRendered) {
            const terminalWidth = ConsoleCanvas.getTerminalWidth();

            const eraseLine = ' '.repeat(terminalWidth);

            process.stdout.cursorTo(0);
            process.stdout.moveCursor(0, -this.renderedHeight);

            for (let i = 0; i < this.renderedHeight; i++) {
                ConsoleCanvas.print(eraseLine);
            }

            process.stdout.cursorTo(0);
            process.stdout.moveCursor(0, -this.renderedHeight + BORDER_SIZE);
        }

        const output = params.bordersStructure.reduce((acc, rowConfig, index) => {
            rowConfig.forEach((rowPartial) => {
                acc +=
                    rowPartial({
                        height: params.cellsSizes.rows[index],
                        cols: params.cellsSizes.cols,
                    }) + END_LINE;
            });

            return acc;
        }, '');

        this.renderedHeight = getCharsCount(output, END_LINE);

        ConsoleCanvas.print(output);

        this.positions.tableEnd = ConsoleCanvas.getCursorPosition();
    }

    public renderContent(params: RendererProps) {
        // TODO
        const stylist = new TableStylist({
            cellCentering: params.cellCenteringType,
        });

        process.stdout.cursorTo(BORDER_SIZE);
        process.stdout.moveCursor(0, -this.renderedHeight + BORDER_SIZE);

        params.content.forEach((rowContent, rowIndex) => {
            process.stdout.cursorTo(BORDER_SIZE);

            rowContent.forEach((cellValue, colIndex) => {
                const cellRows = cellValue.split(END_LINE);

                cellRows.forEach((cellValueRow, index) => {
                    if (index) {
                        process.stdout.moveCursor(
                            -params.cellsSizes.cols[colIndex],
                            index
                        );
                    } else {
                        process.stdout.moveCursor(0, index);
                    }

                    const value = stylist.styleCellValue(
                        params.cellsSizes.cols[colIndex],
                        cellValueRow
                    );

                    ConsoleCanvas.print(value);
                });

                process.stdout.moveCursor(BORDER_SIZE, -cellRows.length + 1);
            });

            process.stdout.cursorTo(BORDER_SIZE);
            process.stdout.moveCursor(0, params.cellsSizes.rows[rowIndex] + BORDER_SIZE);
        });
    }

    public render(renderType: RenderType, params: RendererProps) {
        // ConsoleCanvas.hideCursor();

        if (!this.isRendered) {
            ConsoleCanvas.print(END_LINE);
        }

        if (renderType == RenderType.Full) {
            this.renderBorders(params);
        }

        this.renderContent(params);
        this.isRendered = true;

        ConsoleCanvas.showCursor();
    }
}

export { TableRenderer };
