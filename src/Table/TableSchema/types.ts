import { CellCenteringType } from '../../modules/CellStylist/constants';
import { ExpansionParams } from '../../modules/ExpansionManager/types';

export type TableSchemaProps = {
    contentRows?: (string | number)[][];
    horizontalCentering?: CellCenteringType;
    verticalCentering?: CellCenteringType;
    expansion?: ExpansionParams;
    forceRerender?: boolean;
    rerenderOnResize?: boolean;
};

export type CellsSizes = {
    cols: number[];
    rows: number[];
};

export type TerminalSize = { cols: number; rows: number };
