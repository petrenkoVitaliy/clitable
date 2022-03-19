import { CellCenteringType } from './constants';

class TableStylist {
    private cellCentering: CellCenteringType;

    constructor(params: { cellCentering: CellCenteringType }) {
        this.cellCentering = params.cellCentering;
    }

    private getSpacesCounts() {
        return {
            leftSpacesCount: 0,
            rightSpacesCount: 0,
        };
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
            const spacesCounts = this.getSpacesCounts();
            const spacesCount = cellSize - cellValue.length;

            spacesCounts.leftSpacesCount = Math.floor(spacesCount / 2);
            spacesCounts.rightSpacesCount = spacesCount - spacesCounts.leftSpacesCount;

            return spacesCounts;
        },

        [CellCenteringType.Left]: (cellSize: number, cellValue: string) => {
            const spacesCounts = this.getSpacesCounts();

            spacesCounts.leftSpacesCount = 0;
            spacesCounts.rightSpacesCount = cellSize - cellValue.length;

            return spacesCounts;
        },

        [CellCenteringType.Right]: (cellSize: number, cellValue: string) => {
            const spacesCounts = this.getSpacesCounts();

            spacesCounts.leftSpacesCount = cellSize - cellValue.length;
            spacesCounts.rightSpacesCount = 0;

            return spacesCounts;
        },
    };

    private getSpacesRow(count: number) {
        return ' '.repeat(count);
    }

    public styleCellValue(cellSize: number, cellValue: string) {
        if (cellSize < cellValue.length) {
            return cellValue.slice(0, cellSize);
        }

        const { leftSpacesCount, rightSpacesCount } = this.cellCenteringStrategies[
            this.cellCentering
        ](cellSize, cellValue);

        return (
            this.getSpacesRow(leftSpacesCount) +
            cellValue +
            this.getSpacesRow(rightSpacesCount)
        );
    }
}

export { TableStylist };
