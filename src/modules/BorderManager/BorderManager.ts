import { BorderPartial } from './BorderPartial';

import { ROW_TYPES } from './constants';
import { BordersStructure, RowPartialGenerationProps } from './types';

class BorderManager extends BorderPartial {
    private static rowTypes: {
        [key in ROW_TYPES]: Array<(params: RowPartialGenerationProps) => string>;
    } = {
        Header: [
            this.generateRowPartial.TopLine,
            this.generateRowPartial.ContentLine,
            this.generateRowPartial.SeparatorLine,
        ],

        Footer: [this.generateRowPartial.ContentLine, this.generateRowPartial.BottomLine],

        Body: [
            this.generateRowPartial.ContentLine,
            this.generateRowPartial.SeparatorLine,
        ],

        Single: [
            this.generateRowPartial.TopLine,
            this.generateRowPartial.ContentLine,
            this.generateRowPartial.BottomLine,
        ],
    };

    private static buildRow(
        rowBuilders: Array<(params: RowPartialGenerationProps) => string>
    ) {
        return (params: RowPartialGenerationProps) =>
            rowBuilders.reduce((acc, rowBuilder) => {
                acc.push(rowBuilder(params));

                return acc;
            }, [] as string[]);
    }

    public static getBordersStructure(rowsCount: number): BordersStructure {
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

export { BorderManager };
