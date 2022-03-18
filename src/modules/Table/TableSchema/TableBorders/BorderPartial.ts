import { END_LINE } from '../../constants';
import { BORDERS } from './constants';
import { RowPartial } from './types';

abstract class BorderPartial {
    private static constructRow = (
        rowParts: (string | RowPartial)[],
        height: number = 1
    ) => {
        const singleRow = rowParts
            .map((rowPart) => {
                return typeof rowPart === 'string'
                    ? rowPart
                    : Array.from(Array(rowPart.colSizes.length))
                          .map((_, index) =>
                              rowPart.partial.repeat(rowPart.colSizes[index] || 1)
                          )
                          .join(rowPart.separatedBy);
            })
            .join('');

        let row = singleRow;
        for (let i = 1; i < height; i++) {
            row += `${END_LINE}${singleRow}`;
        }

        return row;
    };

    protected static generateRowPartial = {
        TopLine: (sizes: { height: number; cols: number[] }) =>
            this.constructRow([
                BORDERS.topLeft,
                {
                    separatedBy: BORDERS.topCenter,
                    colSizes: sizes.cols,
                    partial: BORDERS.horizontal,
                },
                BORDERS.topRight,
            ]),

        ContentLine: (sizes: { height: number; cols: number[] }) =>
            this.constructRow(
                [
                    BORDERS.vertical,
                    {
                        separatedBy: BORDERS.vertical,
                        colSizes: sizes.cols,
                        partial: ' ',
                    },
                    BORDERS.vertical,
                ],
                sizes.height
            ),

        BottomLine: (sizes: { height: number; cols: number[] }) =>
            this.constructRow([
                BORDERS.bottomLeft,
                {
                    separatedBy: BORDERS.bottomCenter,
                    colSizes: sizes.cols,
                    partial: BORDERS.horizontal,
                },
                BORDERS.bottomRight,
            ]),

        SeparatorLine: (sizes: { height: number; cols: number[] }) =>
            this.constructRow([
                BORDERS.middleLeft,
                {
                    separatedBy: BORDERS.middleCenter,
                    colSizes: sizes.cols,
                    partial: BORDERS.horizontal,
                },
                BORDERS.middleRight,
            ]),
    };
}

export { BorderPartial };
