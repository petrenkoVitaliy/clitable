import { TableSchema } from './TableSchema/TableSchema';
import { ConsoleCanvas } from '../../services/ConsoleCanvas';

const BORDER_SIZE = 1;

class Table extends TableSchema {
    constructor(contentRows: string[][] = []) {
        super(contentRows);
    }

    private renderContent() {
        // TODO move higher
        const tableHeight =
            BORDER_SIZE +
            this.cells.rows.sizes.reduce(
                (acc, rowSize) => (acc += rowSize + BORDER_SIZE),
                0
            );

        const initPosY = this.positions.tableEnd.y - tableHeight + BORDER_SIZE;
        const initPosX = BORDER_SIZE;

        let posX = initPosX;
        let posY = initPosY;

        this.content.forEach((rowContent, rowIndex) => {
            posX = initPosX;

            rowContent.forEach((cellValue, colIndex) => {
                cellValue.split('\n').forEach((cellValueRow, index) => {
                    ConsoleCanvas.cursorTo({
                        x: posX,
                        y: posY + index,
                    });

                    ConsoleCanvas.print(cellValueRow);
                });

                posX += this.cells.cols.sizes[colIndex] + BORDER_SIZE;
            });

            posY += this.cells.rows.sizes[rowIndex] + BORDER_SIZE;
        });

        ConsoleCanvas.cursorTo(this.positions.tableEnd);
    }

    private renderBorders() {
        const output = this.bordersStructure.reduce((acc, rowConfig, index) => {
            rowConfig.forEach((rowPartial) => {
                acc +=
                    rowPartial({
                        height: this.cells.rows.sizes[index],
                        cols: this.cells.cols.sizes,
                    }) + '\n';
            });

            return acc;
        }, '');

        ConsoleCanvas.print(output);
        this.positions.tableEnd = ConsoleCanvas.getCursorPosition();
    }

    public render() {
        ConsoleCanvas.print('\n');

        this.renderBorders();
        this.renderContent();
    }
}

export { Table };
