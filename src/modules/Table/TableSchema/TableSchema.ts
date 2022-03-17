import { TableBorders } from './TableBorders/TableBorders';

import { TableResizer } from './TableResizer/TableResizer';
import { ExpansionType } from './TableResizer/constants';

// TODO I'm not sure about this
type CellsOptions = {
    sizes: number[];
    count: number;
};

class TableSchema {
    protected content: string[][];
    protected bordersStructure: Array<
        (sizes: { height: number; cols: number[] }) => string
    >[];
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
            if (row.length > this.cells.cols.count) {
                this.cells.cols.count = row.length;
            }
        });

        for (let i = 0; i < this.cells.rows.count; i++) {
            this.content[i] = [];

            for (let j = 0; j < this.cells.cols.count; j++) {
                this.content[i][j] = contentRows[i][j] || '';
            }
        }

        this.setCellsSize();
    }

    private setCellsSize() {
        const type = ExpansionType.Auto;

        const sizes = TableResizer.getCellsSizes<typeof type>({
            type,
            content: this.content,
            marginHorizontal: 8,
        });

        this.cells.rows.sizes = sizes.rows;
        this.cells.cols.sizes = sizes.cols;
    }
}

export { TableSchema };
