import { TerminalSize } from '../../Table/TableSchema/types';
import { ExpansionType } from './constants';

type RelativeMeasure<
    TMeasure extends string,
    TValue extends number = number
> = `${TValue}${TMeasure}`;

export type PercentMeasure = RelativeMeasure<'%'>;

export type ExpansionTypeProps = {
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

export type ExpansionParams<
    T extends keyof ExpansionTypeProps = keyof ExpansionTypeProps
> = ExpansionTypeProps[T];

export type ResizeParams<T extends keyof ExpansionTypeProps> = ExpansionParams<T> & {
    content: string[][];
    terminalSize: TerminalSize;
};
