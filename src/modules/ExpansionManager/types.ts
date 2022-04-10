import { ExpansionType } from './constants';

type RelativeMeasure<
    TMeasure extends string,
    TValue extends number = number
> = `${TValue}${TMeasure}`;

type PercentMeasure = RelativeMeasure<'%'>;

type ExpansionTypeProps = {
    [ExpansionType.Responsive]: {
        expansionType: ExpansionType.Responsive;
        tableWidth: number | PercentMeasure;
        tableHeight?: number;
    };
    [ExpansionType.Auto]: {
        expansionType: ExpansionType.Auto;
        marginVertical?: number;
        marginHorizontal?: number;
    };
    [ExpansionType.Custom]: {
        expansionType: ExpansionType.Custom;
        columnsSizes: (number | PercentMeasure)[];
        rowsSizes?: number[];
    };
    [ExpansionType.Fixed]: {
        expansionType: ExpansionType.Fixed;
        columnsSize: number;
        rowsSize: number;
    };
};

type ExpansionParams<T extends keyof ExpansionTypeProps = keyof ExpansionTypeProps> =
    ExpansionTypeProps[T];

type ResizeParams<T extends keyof ExpansionTypeProps> = ExpansionParams<T> & {
    content: string[][];
    terminalSize: { cols: number; rows: number };
};

type CellsSizes = {
    rows: number[];
    cols: number[];
};

export { ExpansionTypeProps, ResizeParams, CellsSizes, ExpansionParams, PercentMeasure };
