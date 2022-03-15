import { BorderPartial } from './BorderPartial';
import { ROW_TYPES } from './constants';

class TableBorders extends BorderPartial {
    private static rowTypes: {
        [key in ROW_TYPES]: Array<(sizes: { height: number; cols: number[] }) => string>;
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

    public static getBordersStructure(
        rowsCount: number
    ): Array<(sizes: { height: number; cols: number[] }) => string>[] {
        if (rowsCount === 1) {
            return [this.rowTypes.Single];
        }

        return Array.from(Array(rowsCount)).map((_, index) => {
            switch (index) {
                case 0:
                    return this.rowTypes.Header;
                case rowsCount - 1:
                    return this.rowTypes.Footer;
                default:
                    return this.rowTypes.Body;
            }
        });
    }
}

export { TableBorders };
