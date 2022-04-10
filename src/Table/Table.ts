import { TableSchema } from './TableSchema/TableSchema';
import { TableRenderer } from './TableRenderer/TableRenderer';

import { TableSchemaProps, UpdateTableSchemaProps } from './TableSchema/types';
import { TerminalCanvas } from '../modules/TerminalCanvas/TerminalCanvas';
import { debounce } from '../utils/common';
import { TableVirtualizer } from './TableVirtualizer/TableVirtualizer';

const DEBOUNCE_DELAY = 1000;

class Table extends TableSchema {
    private tableRenderer = new TableRenderer();
    private tableVirtualizer = new TableVirtualizer();

    constructor(props: TableSchemaProps) {
        super(props);

        this.addResizeListener();
    }

    public clear() {
        this.tableRenderer.clearTable();
    }

    public render(props?: UpdateTableSchemaProps) {
        // TerminalCanvas.save();

        if (props) {
            this.updateProps(props);
        }

        const params = this.getRenderParams();
        const virtualTable = this.tableVirtualizer.updateVirtualTable(params);

        this.tableRenderer.render(virtualTable);

        // TerminalCanvas.restore();
    }

    private addResizeListener() {
        const updateTable = debounce(this.render.bind(this), DEBOUNCE_DELAY);

        TerminalCanvas.addResizeListener(() => {
            // TODO add boolean flag here
            this.tableRenderer.clearTable();

            updateTable();
        });
    }
}

export { Table };
