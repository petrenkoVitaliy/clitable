import { CellValue } from '../CellStylist/types';

export type LinePartial = {
    partial: string;
    colsSizes: number[];
    separatedBy: string;
    rowSize?: number;
    values?: CellValue[] | undefined;
};

export type LinePartialGenerationProps = {
    colsSizes: number[];
    rowSize: number;
    maxAllowedLength?: number;
    values?: CellValue[];
};

export type RowsStructure = Array<(params: LinePartialGenerationProps) => string[]>;

export type RowsBuilder = (params: LinePartialGenerationProps) => string[];
