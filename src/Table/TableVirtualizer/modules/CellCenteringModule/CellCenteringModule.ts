import { cropToLength, getCharsCount } from '../../../../utils/common';
import { Centering, END_LINE } from '../../../../constants/common';
import { CellValue } from '../../../../types/CellCenteringModule.types';

class CellCenteringModule {
    private horizontalCentering: Centering = Centering.Center;
    private verticalCentering: Centering = Centering.Center;

    constructor(params?: {
        verticalCentering: Centering;
        horizontalCentering: Centering;
    }) {
        if (params) {
            this.updateStyle(params);
        }
    }

    public updateStyle(params: {
        verticalCentering: Centering;
        horizontalCentering: Centering;
    }) {
        this.horizontalCentering = params?.horizontalCentering || Centering.Center;
        this.verticalCentering = params?.verticalCentering || Centering.Center;
    }

    public styleCellValue(params: {
        cellWidth: number;
        cellHeight: number;
        cellValue: string;
    }): CellValue {
        const { spacesBefore } = this.cellCenteringStrategies[this.verticalCentering](
            params.cellHeight,
            getCharsCount(params.cellValue, END_LINE) + 1
        );

        const cellValueByLines = this.centerValueVertically(
            params.cellValue,
            spacesBefore
        );

        return Array.from(Array(params.cellHeight)).reduce((acc, _, lineIndex) => {
            const valueLine: string | undefined = cellValueByLines[lineIndex];

            if (!valueLine) {
                acc[lineIndex] = this.getSpacesRow(params.cellWidth);

                return acc;
            }

            if (valueLine.length >= params.cellWidth) {
                acc[lineIndex] = cropToLength(valueLine, params.cellWidth);

                return acc;
            }

            const { spacesAfter, spacesBefore } = this.cellCenteringStrategies[
                this.horizontalCentering
            ](params.cellWidth, valueLine.length);

            acc[lineIndex] = this.centerValueHorizontally(
                valueLine,
                spacesBefore,
                spacesAfter
            );

            return acc;
        }, {} as CellValue);
    }

    private centerValueHorizontally(
        value: string,
        spacesBefore: number,
        spacesAfter: number
    ): string {
        return this.getSpacesRow(spacesBefore) + value + this.getSpacesRow(spacesAfter);
    }

    private centerValueVertically(
        value: string,
        spacesBefore: number
    ): (string | undefined)[] {
        const valueLines: (string | undefined)[] = [];

        const splittedValue = value.split(END_LINE);

        let lineIndex = 0;

        while (lineIndex++ < spacesBefore) {
            valueLines.push(undefined);
        }

        valueLines.push(...splittedValue);

        return valueLines;
    }

    private getSpacesCountsMap() {
        return {
            spacesBefore: 0,
            spacesAfter: 0,
        };
    }

    private getSpacesRow(count: number) {
        return ' '.repeat(count);
    }

    private cellCenteringStrategies: {
        [key in Centering]: (
            cellSize: number,
            valueLength: number
        ) => {
            spacesBefore: number;
            spacesAfter: number;
        };
    } = {
        [Centering.Center]: (cellSize: number, valueLength: number) => {
            const spacesCountsMap = this.getSpacesCountsMap();
            const spacesCount = cellSize - valueLength;

            spacesCountsMap.spacesBefore = Math.floor(spacesCount / 2);
            spacesCountsMap.spacesAfter = spacesCount - spacesCountsMap.spacesBefore;

            return spacesCountsMap;
        },

        [Centering.Left]: (cellSize: number, valueLength: number) => {
            const spacesCountsMap = this.getSpacesCountsMap();

            spacesCountsMap.spacesBefore = 0;
            spacesCountsMap.spacesAfter = cellSize - valueLength;

            return spacesCountsMap;
        },

        [Centering.Right]: (cellSize: number, valueLength: number) => {
            const spacesCountsMap = this.getSpacesCountsMap();

            spacesCountsMap.spacesBefore = cellSize - valueLength;
            spacesCountsMap.spacesAfter = 0;

            return spacesCountsMap;
        },
    };
}

export { CellCenteringModule };
