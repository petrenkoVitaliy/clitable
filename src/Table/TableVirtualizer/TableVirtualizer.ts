import { CellStylist } from '../../modules/CellStylist/CellStylist';
import { RendererProps } from '../TableRenderer/types';

class TableVirtualizer {
    private cellStylist: CellStylist;

    private isCropping = false;

    constructor() {
        this.cellStylist = new CellStylist();
    }

    // TODO name
    public updateVirtualTable(params: RendererProps): string[] {
        return this.createVirtualTable(params);
    }

    private getTableValues(params: RendererProps): string[][] {
        // TODO check entities vs instance
        this.cellStylist.updateStyle({ cellCentering: params.cellCenteringType });

        return params.content.reduce((acc, contentRow) => {
            const tableValuesRow: string[] = [];

            contentRow.forEach((cellValue, columnIndex) => {
                const value = this.cellStylist.styleCellValue({
                    cellSize: params.cellsSizes.cols[columnIndex],
                    cellValue,
                });

                tableValuesRow.push(value);
            });

            acc.push(tableValuesRow);

            return acc;
        }, [] as string[][]);
    }

    private createVirtualTable(params: RendererProps): string[] {
        const tableValues = this.getTableValues(params);

        const virtualTable = params.bordersStructure.reduce(
            (acc, borderRowConfig, index) => {
                const rowLines = borderRowConfig({
                    cols: params.cellsSizes.cols,
                    values: tableValues[index],

                    ...(this.isCropping
                        ? { maxAllowedLength: params.terminalSize.cols }
                        : null),
                });

                acc.push(...rowLines);

                return acc;
            },
            [] as string[]
        );

        return virtualTable;
    }
}

export { TableVirtualizer };
