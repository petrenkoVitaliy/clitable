import { TableRow } from './Row/TableRow';
import { ConsoleCanvas } from './ConsoleCanvas';

class Table {
    private content: string[][];
    private rowsConfig: Array<(colSizes: number[]) => string>[];

    private props: {
        cols: number;
        rows: number;
        colsSizes: number[];
        rowSizes: number[];
    } = {
        cols: 0,
        rows: 0,
        colsSizes: [],
        rowSizes: [],
    };

    // TODO labels
    private positions = {
        tableStart: { x: 0, y: 0 },
        tableEnd: { x: 0, y: 0 },
    };

    constructor(contentRows: string[][] = []) {
        this.props.rows = contentRows.length;
        this.props.cols = 0;
        this.content = [];

        contentRows.forEach((row) => {
            this.content.push([...row]);

            if (row.length > this.props.cols) {
                this.props.cols = row.length;
            }
        });

        this.setCellsSize();
        this.rowsConfig = TableRow.getTableRowsConfig(this.props.rows);
    }

    private setCellsSize() {
        // TODO
        for (let i = 0; i < this.props.rows; i++) {
            this.props.rowSizes[i] = 1;
        }
        for (let i = 0; i < this.props.cols; i++) {
            this.props.colsSizes[i] = 30;
        }
    }

    private getCellCoordinates(params: { row: number; col: number }) {}

    private renderContent() {
        // TODO not 2
        const BORDER_SIZE = 1;

        const tableHeight =
            this.props.rowSizes.reduce((acc, rowSize) => {
                return (acc += rowSize + BORDER_SIZE);
            }, 0) + BORDER_SIZE;

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
                    x: BORDER_SIZE + this.props.colsSizes[colIndex] - 1,
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

    private renderTable() {
        const output = this.rowsConfig.reduce((acc, rowConfig) => {
            rowConfig.forEach((rowPartial) => {
                acc += rowPartial(this.props.colsSizes) + '\n';
            });

            return acc;
        }, '');

        ConsoleCanvas.print(output);
        this.positions.tableEnd = ConsoleCanvas.getCursorPosition();
    }

    public render() {
        this.renderTable();
        this.renderContent();
    }
}

export { Table };
