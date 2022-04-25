import { Centering } from '../constants/common';
import { RowsStructure } from './RowsModule.types';
import { CellsSizes, StyleSchema, TerminalSize } from './TableSchema.types';

export type RendererProps = {
    cellsSizes: CellsSizes;
    content: string[][];
    rowsStructure: RowsStructure;
    tableHeight: number;
    horizontalCentering: Centering;
    verticalCentering: Centering;
    terminalSize: TerminalSize;
    styleSchema: StyleSchema;
};
