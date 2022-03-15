import { getCharsCount } from '../../../../utils/common';
import { ExpansionType } from './constants';
import { ExpansionTypeProps } from './types';

class TableResizer {
    private static getEmptySizes(): {
        rows: number[];
        cols: number[];
    } {
        return {
            rows: [],
            cols: [],
        };
    }

    // y: {
    //     [key in ExpansionType]: (
    //         params: Omit<ExpansionTypeProps, 'type'> & {
    //             content: string[][];
    //         }
    //     ) => any;
    // }

    private static expansionTypeStrategy = {
        [ExpansionType.Auto]: (params: {
            type: ExpansionType.Auto;
            // content: string[][];
            marginVertical?: number;
            marginHorizontal?: number;
        }) => {
            const sizes = this.getEmptySizes();
            // const { marginHorizontal = 0, marginVertical = 0 } = params;

            // for (let j = 0; j < params.content[0].length; j++) {
            //     sizes.cols[j] = 0;

            //     for (let i = 0; i < params.content.length; i++) {
            //         if (sizes.rows[i] === undefined) {
            //             sizes.rows[i] = 0;
            //         }

            //         if (params.content[i][j].length > sizes.cols[j]) {
            //             sizes.cols[j] = params.content[i][j].length + marginHorizontal;
            //         }

            //         // TODO '\n' to consts
            //         const rowsInValue = getCharsCount(params.content[i][j], '\n') + 1;
            //         if (rowsInValue > sizes.rows[i]) {
            //             sizes.rows[i] = rowsInValue + marginVertical;
            //         }
            //     }
            // }

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
            const sizes = this.getEmptySizes();
            // TODO
            return sizes;
        },
    };

    public static getCellsSizes(
        params: ExpansionTypeProps & {
            content: string[][];
        }
    ) {
        // TODO
        return this.expansionTypeStrategy[params.type](params as any);
    }
}

export { TableResizer };
