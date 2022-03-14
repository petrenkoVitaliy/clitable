import { TableBorders } from './TableBorders/TableBorders';

// TODO

type CellsOptions = {
    sizes: number[];
    count: number;
};

class TableSchema {
    protected content: string[][];
    protected bordersStructure: Array<(colSizes: number[]) => string>[];
    protected cells: {
        cols: CellsOptions;
        rows: CellsOptions;
    } = {
        cols: {
            sizes: [],
            count: 0,
        },

        rows: {
            sizes: [],
            count: 0,
        },
    };

    // TODO labels
    protected positions = {
        tableStart: { x: 0, y: 0 },
        tableEnd: { x: 0, y: 0 },
    };

    constructor(contentRows: string[][] = []) {
        this.content = [];

        this.parseContent(contentRows);

        this.bordersStructure = TableBorders.getBordersStructure(this.cells.rows.count);
    }

    private parseContent(contentRows: string[][]) {
        this.cells.rows.count = contentRows.length;
        this.cells.cols.count = 0;

        contentRows.forEach((row) => {
            this.content.push([...row]);

            if (row.length > this.cells.cols.count) {
                this.cells.cols.count = row.length;
            }
        });

        this.setCellsSize();
    }

    private setCellsSize() {
        // TODO
        for (let i = 0; i < this.cells.rows.count; i++) {
            this.cells.rows.sizes[i] = 1;
        }

        for (let i = 0; i < this.cells.cols.count; i++) {
            this.cells.cols.sizes[i] = 1;
        }
    }
}

export { TableSchema };
