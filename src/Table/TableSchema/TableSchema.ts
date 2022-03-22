import { Comparator } from '../../modules/Comparator/Comparator';
import { ExpansionType } from '../../modules/ExpansionManager/constants';
import { BorderManager } from '../../modules/BorderManager/BorderManager';
import { ExpansionParams } from '../../modules/ExpansionManager/types';
import { ExpansionManager } from '../../modules/ExpansionManager/ExpansionManager';
import { CellCenteringType } from '../../modules/CellStylist/constants';

import { BORDER_SIZE } from '../constants';
import { TableSchemaProps, UpdateTableSchemaProps } from './types';

class TableSchema {
    protected expansionParams: ExpansionParams = {
        expansionType: ExpansionType.Auto,
    };

    protected cellCenteringType: CellCenteringType = CellCenteringType.Center;

    protected content: string[][] = [];

    protected bordersStructure: Array<
        (sizes: { height: number; cols: number[]; maxAllowedLength?: number }) => string
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

    private comparator: Comparator = new Comparator();

    constructor(props: TableSchemaProps) {
        this.initTable(props);
    }

    public initTable(props: UpdateTableSchemaProps) {
        if (props.cellCenteringType) {
            this.cellCenteringType = props.cellCenteringType;
        }

        if (props.expansion) {
            this.expansionParams = props.expansion;
        }

        this.parseContent(props.contentRows || []);
    }

    public updateProps(props: UpdateTableSchemaProps) {
        const changedProps = this.comparator.compareTableProps(props, {
            contentRows: this.content,
            cellCenteringType: this.cellCenteringType,
            expansion: this.expansionParams,
        });

        this.initTable(props);

        return changedProps;
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
        // TODO move to prop
        const sizes = ExpansionManager.getCellsSizes({
            ...this.expansionParams,
            content: this.content,
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
