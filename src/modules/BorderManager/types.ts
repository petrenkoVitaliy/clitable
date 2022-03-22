type RowPartial = {
    partial: string;
    colSizes: number[];
    separatedBy: string;
};

type RowPartialGenerationProps = {
    height: number;
    cols: number[];
    maxAllowedLength?: number;
};

export { RowPartial, RowPartialGenerationProps };
