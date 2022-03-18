import { CellCenteringType } from './TableStylist/constants';

type RendererProps = {
    cellsSizes: {
        rows: number[];
        cols: number[];
    };
    content: string[][];
    bordersStructure: Array<(sizes: { height: number; cols: number[] }) => string>[];
    tableHeight: number;
    cellCenteringType: CellCenteringType;
};

export { RendererProps };
