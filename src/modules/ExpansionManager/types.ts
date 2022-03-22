import { ExpansionType } from './constants';

type ExpansionTypeProps = {
    [ExpansionType.Responsive]: {
        expansionType: ExpansionType.Responsive;
        tableWidth: number;
        tableHeight?: number;
    };
    [ExpansionType.Auto]: {
        expansionType: ExpansionType.Auto;
        marginVertical?: number;
        marginHorizontal?: number;
    };
    [ExpansionType.Custom]: {
        expansionType: ExpansionType.Custom;
        columnsSizes: number[];
        rowsSizes?: number[];
    };
    [ExpansionType.Fixed]: {
        expansionType: ExpansionType.Fixed;
        columnsSize: number;
        rowsSize: number;
    };
};

// TODO unused
// type FullExpansionTypeProps = Omit<
//     ExpansionTypeProps[ExpansionType.Auto],
//     'expansionType'
// > &
//     Omit<ExpansionTypeProps[ExpansionType.Responsive], 'expansionType'> &
//     Omit<ExpansionTypeProps[ExpansionType.Custom], 'expansionType'> &
//     Omit<ExpansionTypeProps[ExpansionType.Fixed], 'expansionType'>;

type ExpansionParams<T extends keyof ExpansionTypeProps = keyof ExpansionTypeProps> =
    ExpansionTypeProps[T];

type ResizeParams<T extends keyof ExpansionTypeProps> = ExpansionParams<T> & {
    content: string[][];
};

type CellsSizes = {
    rows: number[];
    cols: number[];
};

export { ExpansionTypeProps, ResizeParams, CellsSizes, ExpansionParams };
