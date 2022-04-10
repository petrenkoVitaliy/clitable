import { RowsStructure } from '../../modules/RowsConstructor/types';
import { CellCenteringType } from '../../modules/CellStylist/constants';
import { CellsSizes, TerminalSize } from '../TableSchema/types';

export type RendererProps = {
    cellsSizes: CellsSizes;
    content: string[][];
    rowsStructure: RowsStructure;
    tableHeight: number;
    cellCenteringType: CellCenteringType;
    terminalSize: TerminalSize;
};
