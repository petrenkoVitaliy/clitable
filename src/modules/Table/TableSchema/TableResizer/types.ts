import { ExpansionType } from './constants';

type ExpansionTypeProps = {
    [ExpansionType.Responsive]: {
        type: ExpansionType.Responsive;
        tableWidth: number;
        tableHeight: number;
    };
    [ExpansionType.Auto]: {
        type: ExpansionType.Auto;
        marginVertical?: number;
        marginHorizontal?: number;
    };
    [ExpansionType.Custom]: {
        type: ExpansionType.Custom;
        columnsSizes: number[];
        rowsSizes?: number[];
    };
    [ExpansionType.Fixed]: {
        type: ExpansionType.Fixed;
        columnsSize: number;
        rowsSize: number;
    };
};

type ResizeParams<T extends keyof ExpansionTypeProps> = ExpansionTypeProps[T] & {
    content: string[][];
};

type CellsSizes = {
    rows: number[];
    cols: number[];
};

export { ExpansionTypeProps, ResizeParams, CellsSizes };
