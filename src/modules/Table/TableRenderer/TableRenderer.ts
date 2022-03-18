import { ConsoleCanvas } from './ConsoleCanvas/ConsoleCanvas';
import { BORDER_SIZE, END_LINE } from '../constants';

import { TableStylist } from './TableStylist/TableStylist';

import { RendererProps } from './types';

class TableRenderer {
    // TODO labels ?
    private positions = {
        tableEnd: { x: 0, y: 0 },
    };

    private renderContent(params: RendererProps) {
        const stylist = new TableStylist({
            cellCentering: params.cellCenteringType,
        });

        const initPosY = this.positions.tableEnd.y - params.tableHeight + BORDER_SIZE;
        const initPosX = BORDER_SIZE;

        let posX = initPosX;
        let posY = initPosY;

        params.content.forEach((rowContent, rowIndex) => {
            posX = initPosX;

            rowContent.forEach((cellValue, colIndex) => {
                cellValue.split(END_LINE).forEach((cellValueRow, index) => {
                    ConsoleCanvas.cursorTo({
                        x: posX,
                        y: posY + index,
                    });

                    const value = stylist.styleCellValue(
                        params.cellsSizes.cols[colIndex],
                        cellValueRow
                    );

                    ConsoleCanvas.print(value);
                });

                posX += params.cellsSizes.cols[colIndex] + BORDER_SIZE;
            });

            posY += params.cellsSizes.rows[rowIndex] + BORDER_SIZE;
        });

        ConsoleCanvas.cursorTo(this.positions.tableEnd);
    }

    private renderBorders(params: RendererProps) {
        const output = params.bordersStructure.reduce((acc, rowConfig, index) => {
            rowConfig.forEach((rowPartial) => {
                acc +=
                    rowPartial({
                        height: params.cellsSizes.rows[index],
                        cols: params.cellsSizes.cols,
                    }) + END_LINE;
            });

            return acc;
        }, '');

        ConsoleCanvas.print(output);

        return ConsoleCanvas.getCursorPosition();
    }

    public render(params: RendererProps) {
        ConsoleCanvas.print(END_LINE);

        this.positions.tableEnd = this.renderBorders(params);
        this.renderContent(params);
    }
}

export { TableRenderer };
