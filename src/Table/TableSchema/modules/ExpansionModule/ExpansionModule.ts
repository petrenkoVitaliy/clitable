import { ExpansionStrategies } from './ExpansionStrategies/ExpansionStrategies';
import { ExpansionParams } from '../../../../types/ExpansionModule.types';
import { CellsSizes, TerminalSize } from '../../../../types/TableSchema.types';
import { BORDER_SIZE } from '../../../../constants/common';

class ExpansionModule {
    public cellsSizes: CellsSizes = {
        cols: [],
        rows: [],
    };
    public tableHeight: number = 0;
    public tableWidth: number = 0;

    public calculateCellsSizes(params: {
        terminalSize: TerminalSize;
        expansionParams: ExpansionParams;
        content: string[][];
    }) {
        const { terminalSize, expansionParams, content } = params;

        this.cellsSizes = ExpansionStrategies.getCellsSizes({
            ...expansionParams,
            content,
            terminalSize,
        });

        this.tableHeight =
            BORDER_SIZE +
            this.cellsSizes.rows.reduce(
                (acc, rowSize) => (acc += rowSize + BORDER_SIZE),
                0
            );

        this.tableWidth =
            BORDER_SIZE +
            this.cellsSizes.cols.reduce(
                (acc, colSize) => (acc += colSize + BORDER_SIZE),
                0
            );
    }
}

export { ExpansionModule };
