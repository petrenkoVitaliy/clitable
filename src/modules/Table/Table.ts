import { TableSchema } from './TableSchema/TableSchema';
import { ConsoleCanvas } from '../../services/ConsoleCanvas';

const BORDER_SIZE = 1;

class Table extends TableSchema {
    constructor(contentRows: string[][] = []) {
        super(contentRows);
    }

    private renderContent() {
        const tableHeight =
            BORDER_SIZE +
            this.cells.rows.sizes.reduce(
                (acc, rowSize) => (acc += rowSize + BORDER_SIZE),
                0
            );

        const initPosY = this.positions.tableEnd.y - tableHeight + BORDER_SIZE;
        const initPosX = BORDER_SIZE;

        ConsoleCanvas.cursorTo({
            x: initPosX,
            y: initPosY,
        });

        this.content.forEach((rowContent, rowIndex) => {
            rowContent.forEach((cellValue, colIndex) => {
                ConsoleCanvas.print(String(cellValue));
                ConsoleCanvas.moveTo({
                    x: BORDER_SIZE + this.cells.cols.sizes[colIndex] - 1,
                    y: 0,
                });
            });

            ConsoleCanvas.cursorTo({
                x: initPosX,
                y: initPosY + (BORDER_SIZE + 1) * (rowIndex + 1),
            });
        });

        ConsoleCanvas.cursorTo(this.positions.tableEnd);
    }

    private renderBorders() {
        const output = this.bordersStructure.reduce((acc, rowConfig) => {
            rowConfig.forEach((rowPartial) => {
                acc += rowPartial(this.cells.cols.sizes) + '\n';
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
