import { TableSchema } from './TableSchema/TableSchema';
import { TableRenderer } from './TableRenderer/TableRenderer';

import { TableSchemaProps } from './TableSchema/types';

class Table extends TableSchema {
    // private tableSchema: TableSchema;
    private tableRenderer: TableRenderer;

    constructor(props: TableSchemaProps) {
        super(props);

        this.tableRenderer = new TableRenderer();
    }

    public render() {
        this.tableRenderer.render({
            cellsSizes: this.cellsSizes,
            content: this.content,
            bordersStructure: this.bordersStructure,
            tableHeight: this.tableHeight,
            cellCenteringType: this.cellCenteringType,
        });
    }
}

export { Table };
