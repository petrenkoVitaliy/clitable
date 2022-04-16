export type RowDiff = { colIndex: number; value: string }[];

export type VirtualTableDiff = Array<RowDiff | null | undefined>;
