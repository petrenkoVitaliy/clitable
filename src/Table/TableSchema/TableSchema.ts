import { ExpansionType } from '../../modules/ExpansionManager/constants';
import { RowsConstructor } from '../../modules/RowsConstructor/RowsConstructor';
import { ExpansionParams } from '../../modules/ExpansionManager/types';
import { ExpansionManager } from '../../modules/ExpansionManager/ExpansionManager';
import { CellCenteringType } from '../../modules/CellStylist/constants';

import { BORDER_SIZE } from '../constants';
import { CellsSizes, TableSchemaProps } from './types';
import { TerminalCanvas } from '../../modules/TerminalCanvas/TerminalCanvas';
import { RowsStructure } from '../../modules/RowsConstructor/types';

class TableSchema {
    protected content: string[][] = [];
    protected rowsStructure: RowsStructure = [];
    protected cellCenteringType: CellCenteringType = CellCenteringType.Center;
    protected terminalSize = { ...TerminalCanvas.getTerminalSize() };
    protected tableHeight: number = 0;
    protected rerenderOnResize: boolean = true;
    protected expansionParams: ExpansionParams = {
        expansionType: ExpansionType.Auto,
    };
    protected cellsSizes: CellsSizes = {
        cols: [],
        rows: [],
    };
    protected tableSize = {
        rows: 0,
        cols: 0,
    };

    constructor(props: TableSchemaProps) {
        this.parseTableProps(props);
    }

    protected updateProps(props: TableSchemaProps) {
        this.parseTableProps(props);

        return this.getRenderParams();
    }

    protected getRenderParams() {
        return {
            cellsSizes: this.cellsSizes,
            content: this.content,
            rowsStructure: this.rowsStructure,
            tableHeight: this.tableHeight,
            cellCenteringType: this.cellCenteringType,
            terminalSize: this.terminalSize,
        };
    }

    private parseTableProps(props: TableSchemaProps) {
        const terminalSize = { ...TerminalCanvas.getTerminalSize() };

        if (props.cellCenteringType) {
            this.cellCenteringType = props.cellCenteringType;
        }

        if (props.rerenderOnResize !== undefined) {
            this.rerenderOnResize = props.rerenderOnResize;
        }

        if (props.expansion) {
            this.expansionParams = props.expansion;
        }

        if (props.contentRows) {
            this.parseContent(props.contentRows);
        } else {
            const isTerminalSizeChanged =
                this.terminalSize.cols !== terminalSize.cols ||
                this.terminalSize.rows !== terminalSize.rows;

            if (isTerminalSizeChanged) {
                this.terminalSize = terminalSize;

                this.setCellsSize();
            }
        }
    }

    private setRowsStructure() {
        this.rowsStructure = RowsConstructor.getRowsStructure(this.tableSize.rows);
    }

    private parseContent(contentRows: string[][]) {
        this.tableSize.rows = contentRows.length;
        this.tableSize.cols = 0;

        contentRows.forEach((row) => {
            if (row.length > this.tableSize.cols) {
                this.tableSize.cols = row.length;
            }
        });

        this.content = [[]];

        for (let i = 0; i < this.tableSize.rows; i++) {
            this.content[i] = [];

            for (let j = 0; j < this.tableSize.cols; j++) {
                this.content[i]![j] = contentRows?.[i]?.[j] || '';
            }
        }

        this.setCellsSize();
        this.setRowsStructure();
    }

    private setCellsSize() {
        const sizes = ExpansionManager.getCellsSizes({
            ...this.expansionParams,
            content: this.content,
            terminalSize: this.terminalSize,
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
