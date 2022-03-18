import { TableBorders } from './TableBorders/TableBorders';
import { TableResizer } from './TableResizer/TableResizer';

import { ExpansionType } from './TableResizer/constants';
import { BORDER_SIZE } from '../constants';
import { TableSchemaProps } from './types';
import { CellCenteringType } from '../TableRenderer/TableStylist/constants';

class TableSchema {
    protected expansionType: ExpansionType = ExpansionType.Auto;

    protected cellCenteringType: CellCenteringType = CellCenteringType.CENTER;

    protected content: string[][] = [];

    protected bordersStructure: Array<
        (sizes: { height: number; cols: number[] }) => string
    >[] = [];

    protected cellsSizes: {
        cols: number[];
        rows: number[];
    } = {
        cols: [],
        rows: [],
    };

    protected size = {
        rows: 0,
        cols: 0,
    };

    protected tableHeight = 0;

    constructor(props: TableSchemaProps) {
        this.initTable(props.contentRows);

        this.cellCenteringType = props.cellCenteringType;

        // this.expansionType = props.expansionType || ExpansionType.Auto;
    }

    public initTable(contentRows: string[][] = []) {
        this.parseContent(contentRows);
        this.setCellsSize();

        this.bordersStructure = TableBorders.getBordersStructure(this.size.rows);
    }

    private parseContent(contentRows: string[][]) {
        this.size.rows = contentRows.length;
        this.size.cols = 0;

        contentRows.forEach((row) => {
            if (row.length > this.size.cols) {
                this.size.cols = row.length;
            }
        });

        for (let i = 0; i < this.size.rows; i++) {
            this.content[i] = [];

            for (let j = 0; j < this.size.cols; j++) {
                this.content[i][j] = contentRows[i][j] || '';
            }
        }
    }

    private setCellsSize() {
        const sizes = TableResizer.getCellsSizes({
            type: ExpansionType.Auto,
            content: this.content,
            marginHorizontal: 10,
        });

        this.cellsSizes = { ...sizes };

        this.tableHeight =
            BORDER_SIZE +
            this.cellsSizes.rows.reduce(
                (acc, rowSize) => (acc += rowSize + BORDER_SIZE),
                0
            );
    }
}

export { TableSchema };
