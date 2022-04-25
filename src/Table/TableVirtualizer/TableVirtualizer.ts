import { CellCenteringModule } from './modules/CellCenteringModule/CellCenteringModule';
import { CellValue } from '../../types/CellCenteringModule.types';
import { StyleSchema } from '../../types/TableSchema.types';
import { RendererProps } from '../../types/TableRenderer.types';
import { RowDiff, VirtualTableDiff } from '../../types/TableVirtualizer.types';

class TableVirtualizer {
    private isCropping = true;

    private cellCenteringModule = new CellCenteringModule();

    private virtualTable: string[] = [];
    private virtualTableDiff: VirtualTableDiff = [];
    private styleSchema: StyleSchema = [];

    public updateVirtualTable(params: RendererProps): {
        virtualTable: string[];
        virtualTableDiff: VirtualTableDiff;
    } {
        const virtualTable = this.createVirtualTable(params);

        this.virtualTableDiff = this.getTableDifference({
            prevTable: this.virtualTable,
            table: virtualTable,
            prevStyleSchema: this.styleSchema,
            styleSchema: params.styleSchema,
        });
        this.virtualTable = virtualTable;
        this.styleSchema = params.styleSchema;

        return {
            virtualTable: this.virtualTable,
            virtualTableDiff: this.virtualTableDiff,
        };
    }

    private getTableDifference(params: {
        prevTable: string[];
        table: string[];
        prevStyleSchema: StyleSchema;
        styleSchema: StyleSchema;
    }) {
        const { prevTable, table, prevStyleSchema, styleSchema } = params;

        const rows = Math.max(prevTable.length, table.length);

        const virtualTableDiff: VirtualTableDiff = [];

        for (let i = 0; i < rows; i++) {
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

                    while (
                        (k < rowLength && prevTable[i][k] !== table[i][k]) ||
                        prevStyleSchema[i]?.[k] !== styleSchema[i]?.[k]
                    ) {
                        changedSubstring += table[i][k] || ' ';
                        k++;
                    }

                    if (changedSubstring) {
                        changedCols.push({ colIndex: j, value: changedSubstring });
                    }

                    j = k;
                }

                virtualTableDiff[i] =
                    changedCols && changedCols.length ? changedCols : undefined;
            }
        }

        return virtualTableDiff;
    }

    private getTableValues(params: RendererProps): CellValue[][] {
        this.cellCenteringModule.updateStyle({
            horizontalCentering: params.horizontalCentering,
            verticalCentering: params.verticalCentering,
        });

        return params.content.reduce((acc, contentRow, rowIndex) => {
            const tableValuesRow: CellValue[] = [];

            contentRow.forEach((cellValue, columnIndex) => {
                const value = this.cellCenteringModule.styleCellValue({
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
