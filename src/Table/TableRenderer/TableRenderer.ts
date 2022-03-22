import { ConsoleCanvas } from '../../modules/TerminalCanvas/TerminalCanvas';
import { CellStylist } from '../../modules/CellStylist/CellStylist';
import { getCharsCount } from '../../utils/common';
import { BORDER_SIZE, END_LINE, RenderType } from '../constants';

import { RendererProps } from './types';

class TableRenderer {
    private isCropping = true;

    private isRendered = false;
    private renderedHeight = 0;

    private terminalSize: { cols: number; rows: number };

    constructor() {
        this.terminalSize = { ...ConsoleCanvas.getTerminalSize() };

        ConsoleCanvas.addResizeListener(this.terminalResizeHandler);
    }

    private terminalResizeHandler() {
        this.terminalSize = { ...ConsoleCanvas.getTerminalSize() };
    }

    private renderBorders(params: RendererProps) {
        if (this.isRendered) {
            const eraseLine = ' '.repeat(this.terminalSize.cols);

            // TODO move to ConsoleCanvas -> TerminalCanvas
            process.stdout.cursorTo(0);
            process.stdout.moveCursor(0, -this.renderedHeight);

            for (let i = 0; i < this.renderedHeight; i++) {
                ConsoleCanvas.print(eraseLine);
            }

            process.stdout.cursorTo(0);
            process.stdout.moveCursor(0, -this.renderedHeight + BORDER_SIZE);
        }

        const output = params.bordersStructure.reduce((acc, borderRowConfig, index) => {
            borderRowConfig.forEach((borderPartial) => {
                acc +=
                    borderPartial({
                        height: params.cellsSizes.rows[index],
                        cols: params.cellsSizes.cols,
                        ...(this.isCropping
                            ? { maxAllowedLength: this.terminalSize.cols }
                            : null),
                    }) + END_LINE;
            });

            return acc;
        }, '');

        this.renderedHeight = getCharsCount(output, END_LINE);

        ConsoleCanvas.print(output);
    }

    private renderContent(params: RendererProps) {
        // TODO move to prop WIP
        const stylist = new CellStylist({
            cellCentering: params.cellCenteringType,
        });

        process.stdout.cursorTo(BORDER_SIZE);
        process.stdout.moveCursor(0, -this.renderedHeight + BORDER_SIZE);

        params.content.forEach((rowContent, rowIndex) => {
            let cursorXPosition = BORDER_SIZE;
            process.stdout.cursorTo(BORDER_SIZE);

            rowContent.forEach((cellValue, colIndex) => {
                const cellRows = cellValue.split(END_LINE);

                cellRows.forEach((cellValue, index) => {
                    if (index) {
                        process.stdout.moveCursor(
                            -params.cellsSizes.cols[colIndex],
                            index
                        );
                    } else {
                        // Not needed?
                        process.stdout.moveCursor(0, index);
                    }

                    const value = stylist.styleCellValue({
                        cellSize: params.cellsSizes.cols[colIndex],
                        cellValue,
                        ...(this.isCropping
                            ? {
                                  maxAllowedLength:
                                      this.terminalSize.cols - cursorXPosition,
                              }
                            : null),
                    });

                    ConsoleCanvas.print(value);
                });

                cursorXPosition += params.cellsSizes.cols[colIndex] + BORDER_SIZE;
                process.stdout.moveCursor(BORDER_SIZE, -cellRows.length + BORDER_SIZE);
            });

            process.stdout.cursorTo(BORDER_SIZE);
            process.stdout.moveCursor(0, params.cellsSizes.rows[rowIndex] + BORDER_SIZE);
        });
    }

    public render(renderType: RenderType, params: RendererProps) {
        ConsoleCanvas.hideCursor();

        if (!this.isRendered) {
            ConsoleCanvas.print(END_LINE);
        }

        if (renderType === RenderType.Full) {
            this.renderBorders(params);
        }

        this.renderContent(params);
        this.isRendered = true;

        ConsoleCanvas.showCursor();
    }
}

export { TableRenderer };
