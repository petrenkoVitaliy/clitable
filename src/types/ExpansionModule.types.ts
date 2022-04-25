import { Expansion } from '../constants/common';
import { TerminalSize } from './TableSchema.types';

type RelativeMeasure<
    TMeasure extends string,
    TValue extends number = number
> = `${TValue}${TMeasure}`;

export type PercentMeasure = RelativeMeasure<'%'>;

export type ExpansionTypeProps = {
    [Expansion.Responsive]: {
        type: Expansion.Responsive;
        tableWidth: number | PercentMeasure;
        tableHeight?: number | PercentMeasure;
    };
    [Expansion.Auto]: {
        type: Expansion.Auto;
        paddingVertical?: number | PercentMeasure;
        paddingHorizontal?: number | PercentMeasure;
    };
    [Expansion.Custom]: {
        type: Expansion.Custom;
        columnsSizes: (number | PercentMeasure)[];
        rowsSizes?: (number | PercentMeasure)[];
    };
    [Expansion.Fixed]: {
        type: Expansion.Fixed;
        columnsSize: number | PercentMeasure;
        rowsSize: number | PercentMeasure;
        marginVertical?: number;
        marginHorizontal?: number;
    };
};

export type ExpansionParams<
    T extends keyof ExpansionTypeProps = keyof ExpansionTypeProps
> = ExpansionTypeProps[T];

export type ResizeParams<T extends keyof ExpansionTypeProps> = ExpansionParams<T> & {
    content: string[][];
    terminalSize: TerminalSize;
};
