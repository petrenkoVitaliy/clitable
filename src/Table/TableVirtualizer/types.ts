export type RowDiff = {
    [colIndex: number]: string;
};

export type VirtualTableDiff = Array<RowDiff | null | undefined>;
