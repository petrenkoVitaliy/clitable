type RowPartial = {
    partial: string;
    colSizes: number[];
    separatedBy: string;
    values?: string[] | undefined;
};

type RowPartialGenerationProps = {
    cols: number[];
    maxAllowedLength?: number;
    values?: string[];
};

type BordersStructure = Array<(params: RowPartialGenerationProps) => string[]>;

export { RowPartial, RowPartialGenerationProps, BordersStructure };
