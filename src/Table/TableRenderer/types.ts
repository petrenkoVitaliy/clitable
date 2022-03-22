import { CellCenteringType } from '../../modules/CellStylist/constants';

type RendererProps = {
    cellsSizes: {
        rows: number[];
        cols: number[];
    };
    content: string[][];
    bordersStructure: Array<
        (sizes: { height: number; cols: number[]; maxAllowedLength?: number }) => string
    >[];
    tableHeight: number;
    cellCenteringType: CellCenteringType;
};

export { RendererProps };
