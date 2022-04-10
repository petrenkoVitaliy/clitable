import { ExpansionType } from '../../modules/ExpansionManager/constants';
import { BorderManager } from '../../modules/BorderManager/BorderManager';
import { ExpansionParams } from '../../modules/ExpansionManager/types';
import { ExpansionManager } from '../../modules/ExpansionManager/ExpansionManager';
import { CellCenteringType } from '../../modules/CellStylist/constants';

import { BORDER_SIZE } from '../constants';
import { TableSchemaProps, UpdateTableSchemaProps } from './types';
import { TerminalCanvas } from '../../modules/TerminalCanvas/TerminalCanvas';
import { BordersStructure } from '../../modules/BorderManager/types';

class TableSchema {
    protected expansionParams: ExpansionParams = {
        expansionType: ExpansionType.Auto,
    };

    protected cellCenteringType: CellCenteringType = CellCenteringType.Center;

    protected content: string[][] = [];

    protected bordersStructure: BordersStructure = [];

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

    protected terminalSize = { ...TerminalCanvas.getTerminalSize() };

    protected tableHeight = 0;

    constructor(props: TableSchemaProps) {
        this.initTable(props);
    }

    public initTable(props: UpdateTableSchemaProps) {
        const terminalSize = { ...TerminalCanvas.getTerminalSize() };

        if (props.cellCenteringType) {
            this.cellCenteringType = props.cellCenteringType;
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

    public updateProps(props: UpdateTableSchemaProps) {
        this.initTable(props);

        return this.getRenderParams();
    }

    protected getRenderParams() {
        return {
            cellsSizes: this.cellsSizes,
            content: this.content,
            bordersStructure: this.bordersStructure,
            tableHeight: this.tableHeight,
            cellCenteringType: this.cellCenteringType,
            terminalSize: this.terminalSize,
        };
    }

    private setBordersStructure() {
        this.bordersStructure = BorderManager.getBordersStructure(this.size.rows);
    }

    private parseContent(contentRows: string[][]) {
        this.size.rows = contentRows.length;
        this.size.cols = 0;

        contentRows.forEach((row) => {
            if (row.length > this.size.cols) {
                this.size.cols = row.length;
            }
        });

        this.content = [[]];

        for (let i = 0; i < this.size.rows; i++) {
            this.content[i] = [];

            for (let j = 0; j < this.size.cols; j++) {
                this.content[i]![j] = contentRows?.[i]?.[j] || '';
            }
        }

        this.setCellsSize();
        this.setBordersStructure();
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
