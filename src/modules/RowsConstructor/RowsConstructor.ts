import { LinesConstructor } from './LinesConstructor';

import { ROW_TYPES } from './constants';
import { RowsStructure, LinePartialGenerationProps } from './types';

class RowsConstructor extends LinesConstructor {
    private static rowTypes: {
        [key in ROW_TYPES]: Array<(params: LinePartialGenerationProps) => string>;
    } = {
        Header: [
            this.generateLine.TopLine,
            this.generateLine.ContentLine,
            this.generateLine.SeparatorLine,
        ],

        Footer: [this.generateLine.ContentLine, this.generateLine.BottomLine],

        Body: [this.generateLine.ContentLine, this.generateLine.SeparatorLine],

        Single: [
            this.generateLine.TopLine,
            this.generateLine.ContentLine,
            this.generateLine.BottomLine,
        ],
    };

    private static buildRow(
        rowBuilders: Array<(params: LinePartialGenerationProps) => string>
    ) {
        return (params: LinePartialGenerationProps) =>
            rowBuilders.reduce((acc, rowBuilder) => {
                acc.push(rowBuilder(params));

                return acc;
            }, [] as string[]);
    }

    public static getRowsStructure(rowsCount: number): RowsStructure {
        if (rowsCount === 1) {
            return [this.buildRow(this.rowTypes.Single)];
        }

        return Array.from(Array(rowsCount)).map((_, index) => {
            switch (index) {
                case 0:
                    return this.buildRow(this.rowTypes.Header);
                case rowsCount - 1:
                    return this.buildRow(this.rowTypes.Footer);
                default:
                    return this.buildRow(this.rowTypes.Body);
            }
        });
    }
}

export { RowsConstructor };
