import { CellCenteringType } from './constants';

class CellStylist {
    private cellCentering: CellCenteringType;

    constructor(params: { cellCentering: CellCenteringType }) {
        this.cellCentering = params.cellCentering;
    }

    private getSpacesCountsMap() {
        return {
            leftSpacesCount: 0,
            rightSpacesCount: 0,
        };
    }

    private getSpacesRow(count: number) {
        return ' '.repeat(count);
    }

    private cellCenteringStrategies: {
        [key in CellCenteringType]: (
            cellSize: number,
            cellValue: string
        ) => {
            leftSpacesCount: number;
            rightSpacesCount: number;
        };
    } = {
        [CellCenteringType.Center]: (cellSize: number, cellValue: string) => {
            const spacesCountsMap = this.getSpacesCountsMap();
            const spacesCount = cellSize - cellValue.length;

            spacesCountsMap.leftSpacesCount = Math.floor(spacesCount / 2);
            spacesCountsMap.rightSpacesCount =
                spacesCount - spacesCountsMap.leftSpacesCount;

            return spacesCountsMap;
        },

        [CellCenteringType.Left]: (cellSize: number, cellValue: string) => {
            const spacesCountsMap = this.getSpacesCountsMap();

            spacesCountsMap.leftSpacesCount = 0;
            spacesCountsMap.rightSpacesCount = cellSize - cellValue.length;

            return spacesCountsMap;
        },

        [CellCenteringType.Right]: (cellSize: number, cellValue: string) => {
            const spacesCountsMap = this.getSpacesCountsMap();

            spacesCountsMap.leftSpacesCount = cellSize - cellValue.length;
            spacesCountsMap.rightSpacesCount = 0;

            return spacesCountsMap;
        },
    };

    private cropCellValue(value: string, maxAllowedLength: number): string {
        if (maxAllowedLength <= 0) {
            return '';
        }

        return value.slice(0, maxAllowedLength);
    }

    public styleCellValue(params: {
        cellSize: number;
        cellValue: string;
        maxAllowedLength?: number;
    }): string {
        let value = '';

        if (params.cellValue.length >= params.cellSize) {
            value = params.cellValue.slice(0, params.cellSize);
        } else {
            const { leftSpacesCount, rightSpacesCount } = this.cellCenteringStrategies[
                this.cellCentering
            ](params.cellSize, params.cellValue);

            value =
                this.getSpacesRow(leftSpacesCount) +
                params.cellValue +
                this.getSpacesRow(rightSpacesCount);
        }

        if (params.maxAllowedLength) {
            value = this.cropCellValue(value, params.maxAllowedLength);
        }

        return value;
    }
}

export { CellStylist };
