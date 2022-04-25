import {
    ExpansionTypeProps,
    PercentMeasure,
    ResizeParams,
} from '../../../../../types/ExpansionModule.types';
import { CellsSizes, TerminalSize } from '../../../../../types/TableSchema.types';
import {
    getCharsCount,
    getValueWidth,
    removeDeltaFromArray,
} from '../../../../../utils/common';
import { getMeasuresSum, parseMeasure } from '../../../../../utils/measure';
import { END_LINE, Expansion } from '../../../../../constants/common';

class ExpansionStrategies {
    private static getEmptySizes(): CellsSizes {
        return {
            rows: [],
            cols: [],
        };
    }

    private static expansionTypeStrategy: {
        [key in Expansion]: (params: ResizeParams<key>) => CellsSizes;
    } = {
        [Expansion.Auto]: (params: {
            type: Expansion.Auto;
            content: string[][];
            paddingVertical?: number | PercentMeasure;
            paddingHorizontal?: number | PercentMeasure;
            terminalSize: TerminalSize;
        }) => {
            const { terminalSize } = params;

            const paddingHorizontal = parseMeasure(
                params.paddingHorizontal || 0,
                terminalSize.cols
            );
            const paddingVertical = parseMeasure(
                params.paddingVertical || 0,
                terminalSize.rows
            );

            const sizes = this.getEmptySizes();

            for (let j = 0; j < params.content[0].length; j++) {
                sizes.cols[j] = 0;

                for (let i = 0; i < params.content.length; i++) {
                    if (sizes.rows[i] === undefined) {
                        sizes.rows[i] = 0;
                    }

                    if (params.content[i][j].length > sizes.cols[j]) {
                        sizes.cols[j] =
                            getValueWidth(params.content[i][j]) + paddingHorizontal;
                    }

                    const rowsInValue = getCharsCount(params.content[i][j], END_LINE) + 1;
                    if (rowsInValue > sizes.rows[i]) {
                        sizes.rows[i] = rowsInValue + paddingVertical;
                    }
                }
            }

            return sizes;
        },

        [Expansion.Fixed]: (params: {
            type: Expansion.Fixed;
            columnsSize: number | PercentMeasure;
            rowsSize: number | PercentMeasure;
            content: string[][];
            terminalSize: TerminalSize;
            marginVertical?: number;
            marginHorizontal?: number;
        }) => {
            const {
                content,
                terminalSize,
                marginHorizontal = 0,
                marginVertical = 0,
            } = params;

            const rowsSize = parseMeasure(params.rowsSize, terminalSize.cols);
            const columnsSize = parseMeasure(params.columnsSize, terminalSize.cols);

            const sizes = this.getEmptySizes();

            for (let j = 0; j < content[0].length; j++) {
                sizes.cols[j] = columnsSize;

                for (let i = 0; i < content.length; i++) {
                    sizes.rows[i] = rowsSize;
                }
            }

            sizes.cols = removeDeltaFromArray(sizes.cols, marginHorizontal);
            sizes.rows = removeDeltaFromArray(sizes.rows, marginVertical);

            return sizes;
        },

        [Expansion.Custom]: (params: {
            type: Expansion.Custom;
            columnsSizes: (number | PercentMeasure)[];
            rowsSizes?: (number | PercentMeasure)[];
            content: string[][];
            terminalSize: TerminalSize;
        }) => {
            const { content, terminalSize } = params;

            const qualitativeColsSize = terminalSize.cols - content[0].length - 1;
            const columnsSizes = parseMeasure(params.columnsSizes, qualitativeColsSize);

            // ( - 2) -> to leave empty line below for input
            const qualitativeRowsSize = terminalSize.rows - content.length - 2;
            const rowsSizes = parseMeasure(params.rowsSizes || [], qualitativeRowsSize);

            const sizesSum = {
                cols: getMeasuresSum(params.columnsSizes, qualitativeColsSize),
                rows: getMeasuresSum(params.rowsSizes || [], qualitativeRowsSize),
            };

            const sizes = this.getEmptySizes();
            const lengths = {
                cols: 0,
                rows: 0,
            };

            for (let j = 0; j < content[0].length; j++) {
                sizes.cols[j] = columnsSizes[j] || 1;
                lengths.cols += sizes.cols[j];
            }

            for (let i = 0; i < content.length; i++) {
                sizes.rows[i] = rowsSizes[i] || 1;
                lengths.rows += sizes.rows[i];
            }

            sizes.cols[0] += sizesSum.cols - lengths.cols;

            if (sizesSum.rows !== 0) {
                sizes.rows[0] += sizesSum.rows - lengths.rows;
            }

            return sizes;
        },

        [Expansion.Responsive]: (params: {
            type: Expansion.Responsive;
            content: string[][];
            terminalSize: TerminalSize;
            tableWidth: number | PercentMeasure;
            tableHeight?: number | PercentMeasure;
        }) => {
            const { content, terminalSize } = params;

            const tableWidth = parseMeasure(params.tableWidth, terminalSize.cols);
            let tableHeight: number | undefined = params.tableHeight
                ? parseMeasure(params.tableHeight, terminalSize.rows, {
                      percentMeasureMargin: 1, // ( - 1 from size) -> to leave empty line below for input
                  })
                : undefined;

            const autoSizes = this.expansionTypeStrategy[Expansion.Auto]({
                type: Expansion.Auto,
                content: content,
                terminalSize: terminalSize,
            });

            const sizesSum = {
                cols: autoSizes.cols.reduce((acc, colSize) => (acc += colSize), 0),
                rows: autoSizes.rows.reduce((acc, rowSize) => (acc += rowSize), 0),
            };

            if (!tableHeight) {
                tableHeight = sizesSum.rows + content.length + 1;
            }

            const multipliers = {
                rows: (tableHeight - params.content.length - 1) / sizesSum.rows,
                cols: (tableWidth - params.content[0].length - 1) / sizesSum.cols,
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

            sizes.cols[0] += tableWidth - params.content[0].length - 1 - lengths.cols;
            if (sizes.cols[0] < 0) {
                sizes.cols[0] = 0;
            }

            sizes.rows[0] += tableHeight - params.content.length - 1 - lengths.rows;
            if (sizes.rows[0] < 0) {
                sizes.rows[0] = 0;
            }

            return sizes;
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

export { ExpansionStrategies };
