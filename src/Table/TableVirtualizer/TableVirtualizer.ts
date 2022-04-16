import { CellStylist } from '../../modules/CellStylist/CellStylist';
import { CellValue } from '../../modules/CellStylist/types';
import { RendererProps } from '../TableRenderer/types';
import { RowDiff, VirtualTableDiff } from './types';

class TableVirtualizer {
    private isCropping = true;

    private cellStylist: CellStylist;

    private virtualTable: string[] = [];

    private virtualTableDiff: VirtualTableDiff = [];

    constructor() {
        this.cellStylist = new CellStylist();
    }

    public updateVirtualTable(params: RendererProps): {
        virtualTable: string[];
        virtualTableDiff: VirtualTableDiff;
    } {
        const virtualTable = this.createVirtualTable(params);

        this.updateTableDifference(this.virtualTable, virtualTable);

        this.virtualTable = virtualTable;

        return {
            virtualTable: this.virtualTable,
            virtualTableDiff: this.virtualTableDiff,
        };
    }

    private updateTableDifference(prevTable: string[], table: string[]): void {
        const rows = Math.max(prevTable.length, table.length);

        const virtualTableDiff: VirtualTableDiff = [];

        for (let i = 0; i < rows; i++) {
            if (prevTable[i] !== table[i]) {
                virtualTableDiff[i] = [];

                if (!prevTable[i] && table[i]) {
                    virtualTableDiff[i]?.push({
                        colIndex: 0,
                        value: table[i],
                    });
                }

                if (!table[i] && prevTable[i]) {
                    virtualTableDiff[i] = null;
                }

                if (table[i] && prevTable[i]) {
                    const changedCols: RowDiff = [];

                    const rowLength = Math.max(prevTable[i].length, table[i].length);

                    for (let j = 0; j < rowLength; j++) {
                        let changedSubstring = '';
                        let k = j;

                        while (k < rowLength && prevTable[i][k] !== table[i][k]) {
                            changedSubstring += table[i][k] || ' ';
                            k++;
                        }

                        if (changedSubstring) {
                            changedCols.push({ colIndex: j, value: changedSubstring });
                        }

                        j = k;
                    }

                    virtualTableDiff[i] = changedCols;
                }
            } else {
                virtualTableDiff[i] = undefined;
            }
        }

        this.virtualTableDiff = virtualTableDiff;
    }

    private getTableValues(params: RendererProps): CellValue[][] {
        // TODO - 2 - check entities vs instance
        this.cellStylist.updateStyle({
            horizontalCentering: params.horizontalCentering,
            verticalCentering: params.verticalCentering,
        });

        return params.content.reduce((acc, contentRow, rowIndex) => {
            const tableValuesRow: CellValue[] = [];

            contentRow.forEach((cellValue, columnIndex) => {
                const value = this.cellStylist.styleCellValue({
                    cellWidth: params.cellsSizes.cols[columnIndex],
                    cellHeight: params.cellsSizes.rows[rowIndex],
                    cellValue,
                });

                tableValuesRow.push(value);
            });

            acc.push(tableValuesRow);

            return acc;
        }, [] as CellValue[][]);
    }

    private createVirtualTable(params: RendererProps): string[] {
        const tableValues = this.getTableValues(params);

        const virtualTable = params.rowsStructure.reduce((acc, rowStructure, index) => {
            const rowLines = rowStructure({
                colsSizes: params.cellsSizes.cols,
                rowSize: params.cellsSizes.rows[index],
                values: tableValues[index],

                ...(this.isCropping
                    ? { maxAllowedLength: params.terminalSize.cols }
                    : null),
            });

            acc.push(...rowLines);

            return acc;
        }, [] as string[]);

        return virtualTable;
    }
}

export { TableVirtualizer };
