import { END_LINE } from '../../Table/constants';

import { BORDERS } from './constants';
import { RowPartial, RowPartialGenerationProps } from './types';

abstract class BorderPartial {
    private static constructRow = (params: {
        rowParts: (string | RowPartial)[];
        height?: number;
        maxAllowedLength?: number | undefined;
    }) => {
        let singleRow = params.rowParts
            .map((rowPart) =>
                typeof rowPart === 'string'
                    ? rowPart
                    : Array.from(Array(rowPart.colSizes.length))
                          .map((_, index) =>
                              rowPart.partial.repeat(rowPart.colSizes[index] || 1)
                          )
                          .join(rowPart.separatedBy)
            )
            .join('');

        if (params.maxAllowedLength) {
            singleRow = singleRow.slice(0, params.maxAllowedLength);
        }

        let row = singleRow;
        for (let i = 1; i < (params.height || 1); i++) {
            row += `${END_LINE}${singleRow}`;
        }

        return row;
    };

    protected static generateRowPartial = {
        TopLine: (params: RowPartialGenerationProps) =>
            this.constructRow({
                rowParts: [
                    BORDERS.topLeft,
                    {
                        separatedBy: BORDERS.topCenter,
                        colSizes: params.cols,
                        partial: BORDERS.horizontal,
                    },
                    BORDERS.topRight,
                ],
                maxAllowedLength: params.maxAllowedLength,
            }),

        ContentLine: (params: RowPartialGenerationProps) =>
            this.constructRow({
                rowParts: [
                    BORDERS.vertical,
                    {
                        separatedBy: BORDERS.vertical,
                        colSizes: params.cols,
                        partial: ' ',
                    },
                    BORDERS.vertical,
                ],
                height: params.height,
                maxAllowedLength: params.maxAllowedLength,
            }),

        BottomLine: (params: RowPartialGenerationProps) =>
            this.constructRow({
                rowParts: [
                    BORDERS.bottomLeft,
                    {
                        separatedBy: BORDERS.bottomCenter,
                        colSizes: params.cols,
                        partial: BORDERS.horizontal,
                    },
                    BORDERS.bottomRight,
                ],
                maxAllowedLength: params.maxAllowedLength,
            }),

        SeparatorLine: (params: RowPartialGenerationProps) =>
            this.constructRow({
                rowParts: [
                    BORDERS.middleLeft,
                    {
                        separatedBy: BORDERS.middleCenter,
                        colSizes: params.cols,
                        partial: BORDERS.horizontal,
                    },
                    BORDERS.middleRight,
                ],
                maxAllowedLength: params.maxAllowedLength,
            }),
    };
}

export { BorderPartial };
