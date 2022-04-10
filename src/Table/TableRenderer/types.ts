import { BordersStructure } from '../../modules/BorderManager/types';
import { CellCenteringType } from '../../modules/CellStylist/constants';

type RendererProps = {
    cellsSizes: {
        rows: number[];
        cols: number[];
    };
    content: string[][];
    bordersStructure: BordersStructure;
    tableHeight: number;
    cellCenteringType: CellCenteringType;
    terminalSize: { cols: number; rows: number };
};

export { RendererProps };
