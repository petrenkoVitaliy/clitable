import { BORDERS } from './constants';
import { RowPartial } from './types';

abstract class BorderPartial {
    private static constructRow = (rowParts: (string | RowPartial)[]) => {
        return rowParts
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
    };

    protected static generateRowPartial = {
        TopLine: (colSizes: number[]) =>
            this.constructRow([
                BORDERS.topLeft,
                {
                    separatedBy: BORDERS.topCenter,
                    colSizes,
                    partial: BORDERS.horizontal,
                },
                BORDERS.topRight,
            ]),

        ContentLine: (colSizes: number[]) =>
            this.constructRow([
                BORDERS.vertical,
                {
                    separatedBy: BORDERS.vertical,
                    colSizes,
                    partial: ' ',
                },
                BORDERS.vertical,
            ]),

        BottomLine: (colSizes: number[]) =>
            this.constructRow([
                BORDERS.bottomLeft,
                {
                    separatedBy: BORDERS.bottomCenter,
                    colSizes,
                    partial: BORDERS.horizontal,
                },
                BORDERS.bottomRight,
            ]),

        SeparatorLine: (colSizes: number[]) =>
            this.constructRow([
                BORDERS.middleLeft,
                {
                    separatedBy: BORDERS.middleCenter,
                    colSizes,
                    partial: BORDERS.horizontal,
                },
                BORDERS.middleRight,
            ]),
    };
}

export { BorderPartial };
