import { TableSize } from '../../../../types/TableSchema.types';

class ContentModule {
    public content: string[][] = [];
    public tableSize: TableSize = {
        rows: 0,
        cols: 0,
    };

    public parseContent(contentRows: (string | number)[][]) {
        this.tableSize.rows = contentRows.length;
        this.tableSize.cols = 0;

        contentRows.forEach((row) => {
            if (row.length > this.tableSize.cols) {
                this.tableSize.cols = row.length;
            }
        });

        this.content = [[]];

        for (let i = 0; i < this.tableSize.rows; i++) {
            this.content[i] = [];

            for (let j = 0; j < this.tableSize.cols; j++) {
                this.content[i]![j] = contentRows?.[i]?.[j]
                    ? String(contentRows[i][j])
                    : '';
            }
        }
    }
}

export { ContentModule };
