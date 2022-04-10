import { END_LINE } from '../../Table/constants';
import { cropToLength } from '../../utils/common';

import { BORDERS } from './constants';
import { RowPartial, RowPartialGenerationProps } from './types';

// TODO not partial anymore
abstract class BorderPartial {
    private static constructLine = (params: {
        rowParts: (string | RowPartial)[];
        maxAllowedLength?: number | undefined;
    }) => {
        let singleRow = params.rowParts
            .map((rowPart) =>
                typeof rowPart === 'string'
                    ? rowPart
                    : Array.from(Array(rowPart.colSizes.length))
                          .map((_, index) => {
                              return rowPart.values && rowPart.values[index]
                                  ? cropToLength(
                                        rowPart.values[index],
                                        rowPart.colSizes[index]
                                    )
                                  : rowPart.partial.repeat(rowPart.colSizes[index] || 1);
                          })
                          .join(rowPart.separatedBy)
            )
            .join('');

        if (params.maxAllowedLength && singleRow.length > params.maxAllowedLength) {
            singleRow = singleRow.slice(0, params.maxAllowedLength);
        }

        // TODO no!
        let row = singleRow;
        for (let i = 1; i < 1; i++) {
            row += `${END_LINE}${singleRow}`;
        }

        return row;
    };

    protected static generateRowPartial = {
        TopLine: (params: RowPartialGenerationProps) =>
            this.constructLine({
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
            this.constructLine({
                rowParts: [
                    BORDERS.vertical,
                    {
                        separatedBy: BORDERS.vertical,
                        colSizes: params.cols,
                        values: params.values,
                        partial: ' ',
                    },
                    BORDERS.vertical,
                ],
                maxAllowedLength: params.maxAllowedLength,
            }),

        BottomLine: (params: RowPartialGenerationProps) =>
            this.constructLine({
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
            this.constructLine({
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
