export type LinePartial = {
    partial: string;
    colSizes: number[];
    separatedBy: string;
    values?: string[] | undefined;
};

export type LinePartialGenerationProps = {
    cols: number[];
    maxAllowedLength?: number;
    values?: string[];
};

export type RowsStructure = Array<(params: LinePartialGenerationProps) => string[]>;
