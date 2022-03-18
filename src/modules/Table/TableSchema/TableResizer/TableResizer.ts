import { getCharsCount } from '../../../../utils/common';
import { ExpansionType } from './constants';
import { ExpansionTypeProps, ResizeParams, CellsSizes } from './types';

class TableResizer {
    private static getEmptySizes(): CellsSizes {
        return {
            rows: [],
            cols: [],
        };
    }

    private static expansionTypeStrategy: {
        [key in ExpansionType]: (params: ResizeParams<key>) => CellsSizes;
    } = {
        [ExpansionType.Auto]: (params: {
            type: ExpansionType.Auto;
            content: string[][];
            marginVertical?: number;
            marginHorizontal?: number;
        }) => {
            const sizes = this.getEmptySizes();
            const { marginHorizontal = 0, marginVertical = 0 } = params;

            for (let j = 0; j < params.content[0].length; j++) {
                sizes.cols[j] = 0;

                for (let i = 0; i < params.content.length; i++) {
                    if (sizes.rows[i] === undefined) {
                        sizes.rows[i] = 0;
                    }

                    if (params.content[i][j].length > sizes.cols[j]) {
                        sizes.cols[j] = params.content[i][j].length + marginHorizontal;
                    }

                    const rowsInValue = getCharsCount(params.content[i][j], '\n') + 1;
                    if (rowsInValue > sizes.rows[i]) {
                        sizes.rows[i] = rowsInValue + marginVertical;
                    }
                }
            }

            return sizes;
        },

        [ExpansionType.Fixed]: (params: {
            type: ExpansionType.Fixed;
            columnsSize: number;
            rowsSize: number;
            content: string[][];
        }) => {
            const sizes = this.getEmptySizes();

            for (let j = 0; j < params.content[0].length; j++) {
                sizes.cols[j] = params.columnsSize;

                for (let i = 0; i < params.content.length; i++) {
                    sizes.rows[i] = params.rowsSize;
                }
            }

            return sizes;
        },

        [ExpansionType.Custom]: (params: {
            type: ExpansionType.Custom;
            columnsSizes: number[];
            rowsSizes?: number[];
            content: string[][];
        }) => {
            // TODO validate length
            const sizes = this.getEmptySizes();

            for (let j = 0; j < params.content[0].length; j++) {
                sizes.cols[j] = params.columnsSizes[j] || 1;

                for (let i = 0; i < params.content.length; i++) {
                    sizes.rows[i] = params.rowsSizes?.[i] || 1;
                }
            }

            return sizes;
        },

        [ExpansionType.Responsive]: (params: {
            type: ExpansionType.Responsive;
            content: string[][];
            tableWidth: number;
            tableHeight: number;
        }) => {
            const autoSizes = this.expansionTypeStrategy[ExpansionType.Auto]({
                type: ExpansionType.Auto,
                content: params.content,
            });

            const colSizesSum = autoSizes.cols.reduce(
                (acc, colSize) => (acc += colSize),
                0
            );
            const rowSizesSum = autoSizes.rows.reduce(
                (acc, rowSize) => (acc += rowSize),
                0
            );

            const colMult = Math.floor(params.tableWidth / colSizesSum);
            const rowMult = Math.floor(params.tableHeight / rowSizesSum);

            return {
                cols: autoSizes.cols.map((colSize) => colSize * colMult),
                rows: autoSizes.rows.map((rowSize) => rowSize * rowMult),
            };
        },
    };

    private static getExpansionTypeByStrategy<T extends keyof ExpansionTypeProps>(
        params: ResizeParams<T>
    ): CellsSizes {
        const strategy = this.expansionTypeStrategy[
            params.type
        ] as typeof this.expansionTypeStrategy[T]; // ¯\_(ツ)_/¯

        return strategy(params);
    }

    public static getCellsSizes<T extends keyof ExpansionTypeProps>(
        params: ResizeParams<T>
    ): CellsSizes {
        return this.getExpansionTypeByStrategy<T>(params);
    }
}

export { TableResizer };
