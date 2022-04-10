import { END_LINE } from '../../Table/constants';
import { cropToLength } from '../../utils/common';

import { BORDERS } from './constants';
import { LinePartial, LinePartialGenerationProps } from './types';

abstract class LinesConstructor {
    private static constructLine = (params: {
        lineParts: (string | LinePartial)[];
        maxAllowedLength?: number | undefined;
    }) => {
        let singleRow = params.lineParts
            .map((linePart) =>
                typeof linePart === 'string'
                    ? linePart
                    : Array.from(Array(linePart.colSizes.length))
                          .map((_, index) => {
                              return linePart.values && linePart.values[index]
                                  ? cropToLength(
                                        linePart.values[index],
                                        linePart.colSizes[index]
                                    )
                                  : linePart.partial.repeat(
                                        linePart.colSizes[index] || 1
                                    );
                          })
                          .join(linePart.separatedBy)
            )
            .join('');

        if (params.maxAllowedLength && singleRow.length > params.maxAllowedLength) {
            singleRow = singleRow.slice(0, params.maxAllowedLength);
        }

        // TODO - 1 - handle multiline content
        let row = singleRow;
        for (let i = 1; i < 1; i++) {
            row += `${END_LINE}${singleRow}`;
        }

        return row;
    };

    protected static generateLine = {
        TopLine: (params: LinePartialGenerationProps) =>
            this.constructLine({
                lineParts: [
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

        ContentLine: (params: LinePartialGenerationProps) =>
            this.constructLine({
                lineParts: [
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

        BottomLine: (params: LinePartialGenerationProps) =>
            this.constructLine({
                lineParts: [
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

        SeparatorLine: (params: LinePartialGenerationProps) =>
            this.constructLine({
                lineParts: [
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

export { LinesConstructor };
