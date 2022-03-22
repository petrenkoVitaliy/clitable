import { getCharsCount } from '../../utils/common';

import { ExpansionType } from './constants';
import { ExpansionTypeProps, ResizeParams, CellsSizes } from './types';

class ExpansionManager {
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
            expansionType: ExpansionType.Auto;
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
            expansionType: ExpansionType.Fixed;
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
            expansionType: ExpansionType.Custom;
            columnsSizes: number[];
            rowsSizes?: number[];
            content: string[][];
        }) => {
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
            expansionType: ExpansionType.Responsive;
            content: string[][];
            tableWidth: number;
            tableHeight?: number;
        }) => {
            const autoSizes = this.expansionTypeStrategy[ExpansionType.Auto]({
                expansionType: ExpansionType.Auto,
                content: params.content,
            });

            const sizesSum = {
                cols: autoSizes.cols.reduce((acc, colSize) => (acc += colSize), 0),
                rows: autoSizes.rows.reduce((acc, rowSize) => (acc += rowSize), 0),
            };

            if (!params.tableHeight) {
                params.tableHeight = sizesSum.rows + params.content.length + 1;
            }

            const multipliers = {
                rows: (params.tableHeight - params.content.length - 1) / sizesSum.rows,
                cols: (params.tableWidth - params.content[0].length - 1) / sizesSum.cols,
            };

            const lengths = {
                cols: 0,
                rows: 0,
            };

            const sizes = {
                cols: autoSizes.cols.reduce((acc, colSize) => {
                    acc.push(Math.round(colSize * multipliers.cols));
                    lengths.cols += acc.at(-1) || 0;

                    return acc;
                }, [] as number[]),
                rows: autoSizes.rows.reduce((acc, rowSize) => {
                    acc.push(Math.round(rowSize * multipliers.rows));
                    lengths.rows += acc.at(-1) || 0;

                    return acc;
                }, [] as number[]),
            };

            sizes.cols[0] += Math.abs(params.tableWidth - lengths.cols);
            sizes.rows[0] += Math.abs(params.tableHeight - lengths.rows);

            return sizes;
        },
    };

    private static getExpansionTypeByStrategy<T extends keyof ExpansionTypeProps>(
        params: ResizeParams<T>
    ): CellsSizes {
        const strategy = this.expansionTypeStrategy[
            params.expansionType
        ] as typeof this.expansionTypeStrategy[T]; // ¯\_(ツ)_/¯

        return strategy(params);
    }

    public static getCellsSizes<T extends keyof ExpansionTypeProps>(
        params: ResizeParams<T>
    ): CellsSizes {
        return this.getExpansionTypeByStrategy<T>(params);
    }
}

export { ExpansionManager };
