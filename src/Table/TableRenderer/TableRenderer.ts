import { getStyledString } from '../../utils/colors';
import { TerminalCanvas } from '../../helpers/TerminalCanvas/TerminalCanvas';
import { BORDER_SIZE, END_LINE } from '../../constants/common';
import { VirtualTableDiff } from '../../types/TableVirtualizer.types';
import { CellsSizes, CellStyle, StyleSchema } from '../../types/TableSchema.types';

class TableRenderer {
    public isRendered = false;
    private renderedHeight = 0;

    private getStyledValue(
        value: string,
        styleSchema: StyleSchema,
        cellsSizes: CellsSizes,

        lineIndex: number,
        colLineIndex: number
    ): string {
        cellsSizes;
        let styledValue = '';
        let tmp = '';
        let previousStyle: CellStyle | undefined = undefined;

        const getStyle = (styleSchema: StyleSchema[number], colIndex: number) => {
            return Array.isArray(styleSchema) ? styleSchema[colIndex] : styleSchema;
        };

        for (let i = 0; i < value.length; i++) {
            const currentStyle = getStyle(styleSchema[lineIndex], i + colLineIndex);

            if (previousStyle !== currentStyle) {
                styledValue += getStyledString(tmp, previousStyle);

                previousStyle = currentStyle;
                tmp = '';
            }

            tmp += value[i];
        }

        styledValue += getStyledString(tmp, previousStyle);

        return styledValue;
    }

    private renderTable(
        virtualTable: string[],
        styleSchema: StyleSchema,
        cellsSizes: CellsSizes
    ) {
        if (this.isRendered) {
            this.clearTable();
            TerminalCanvas.moveToRow(0, 1);
        }

        const output = virtualTable.reduce(
            (acc, tableRow, lineIndex) =>
                (acc +=
                    this.getStyledValue(tableRow, styleSchema, cellsSizes, lineIndex, 0) +
                    END_LINE),
            ''
        );

        this.renderedHeight = virtualTable.length;
        TerminalCanvas.print(output);
    }

    private updateTable(
        virtualTableDiff: VirtualTableDiff,
        style: StyleSchema,
        cellsSizes: CellsSizes
    ) {
        if (this.isRendered) {
            TerminalCanvas.moveToRow(0, -this.renderedHeight);
        }

        this.renderedHeight = 0;

        for (let lineIndex = 0; lineIndex < virtualTableDiff.length; lineIndex++) {
            const colDifferences = virtualTableDiff[lineIndex];

            if (colDifferences) {
                colDifferences.forEach(({ colIndex, value }) => {
                    TerminalCanvas.cursorTo(colIndex);
                    TerminalCanvas.print(
                        this.getStyledValue(value, style, cellsSizes, lineIndex, colIndex)
                    );
                });

                TerminalCanvas.print(END_LINE);
            }

            if (colDifferences === null) {
                TerminalCanvas.clearLine(0);
                TerminalCanvas.moveToRow(0, 1);
            }

            if (colDifferences === undefined) {
                TerminalCanvas.moveToRow(0, 1);
            }

            this.renderedHeight++;
        }
    }

    public render(
        params: {
            virtualTable: string[];
            virtualTableDiff: VirtualTableDiff;
            styleSchema: StyleSchema;
            cellsSizes: CellsSizes;
        },
        options?: { forceRerender?: boolean }
    ) {
        const { virtualTable, virtualTableDiff, styleSchema, cellsSizes } = params;

        TerminalCanvas.hideCursor();

        if (!this.isRendered) {
            TerminalCanvas.print(END_LINE);
        }

        if (options?.forceRerender || !this.isRendered) {
            this.renderTable(virtualTable, styleSchema, cellsSizes);
        } else {
            this.updateTable(virtualTableDiff, styleSchema, cellsSizes);
        }

        this.isRendered = true;

        TerminalCanvas.showCursor();
    }

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
}

export { TableRenderer };
