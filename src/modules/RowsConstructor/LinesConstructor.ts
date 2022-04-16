import { cropToLength } from '../../utils/common';

import { BORDERS } from './constants';
import { LinePartial, LinePartialGenerationProps } from './types';

abstract class LinesConstructor {
    private static buildLinePartial = (linePartial: LinePartial, lineIndex: number) => {
        const subLine = Array.from(Array(linePartial.colsSizes.length))
            .map((_, index) => {
                return linePartial.values && linePartial.values[index]
                    ? cropToLength(
                          linePartial.values[index]?.[lineIndex] || '',
                          linePartial.colsSizes[index]
                      )
                    : linePartial.partial.repeat(linePartial.colsSizes[index] || 0);
            })
            .join(linePartial.separatedBy);

        return subLine;
    };

    private static constructLine = (params: {
        lineParts: (string | LinePartial)[];
        maxAllowedLength?: number | undefined;
        rowSize?: number;
    }): string[] => {
        // TODO - 5 - use maxAllowedLength ;)

        const rowSize = params.rowSize || 1;

        const rowLines: string[] = [];

        for (let lineIndex = 0; lineIndex < rowSize; lineIndex++) {
            const line = params.lineParts
                .map((linePart) =>
                    typeof linePart === 'string'
                        ? linePart
                        : this.buildLinePartial(linePart, lineIndex)
                )
                .join('');

            rowLines.push(line);
        }

        return rowLines;
    };

    protected static generateLine = {
        TopLine: (params: LinePartialGenerationProps) =>
            this.constructLine({
                lineParts: [
                    BORDERS.topLeft,
                    {
                        partial: BORDERS.horizontal,
                        separatedBy: BORDERS.topCenter,
                        colsSizes: params.colsSizes,
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
                        colsSizes: params.colsSizes,
                        values: params.values,
                        partial: ' ',
                    },
                    BORDERS.vertical,
                ],
                rowSize: params.rowSize,
                maxAllowedLength: params.maxAllowedLength,
            }),

        BottomLine: (params: LinePartialGenerationProps) =>
            this.constructLine({
                lineParts: [
                    BORDERS.bottomLeft,
                    {
                        separatedBy: BORDERS.bottomCenter,
                        colsSizes: params.colsSizes,
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
                        colsSizes: params.colsSizes,
                        partial: BORDERS.horizontal,
                    },
                    BORDERS.middleRight,
                ],
                maxAllowedLength: params.maxAllowedLength,
            }),
    };
}

export { LinesConstructor };
