import { TableSchema } from './TableSchema/TableSchema';
import { TableRenderer } from './TableRenderer/TableRenderer';
import { TableVirtualizer } from './TableVirtualizer/TableVirtualizer';
import { TerminalCanvas } from '../helpers/TerminalCanvas/TerminalCanvas';
import { ParamsMemorizer } from '../helpers/ParamsMemorizer/ParamsMemorizer';
import { debounce } from '../utils/common';
import { TableSchemaProps } from '../types/TableSchema.types';

const DEBOUNCE_DELAY = 1000;

class Table extends TableSchema {
    private tableRenderer = new TableRenderer();
    private tableVirtualizer = new TableVirtualizer();
    private paramsMemorizer = new ParamsMemorizer<TableSchemaProps>();

    constructor(props: TableSchemaProps) {
        super(props);

        this.addResizeListener();
    }

    public clear() {
        this.tableRenderer.clearTable();
    }

    public update(props?: TableSchemaProps) {
        if (this.paramsMemorizer.isQueuing) {
            this.paramsMemorizer.pushParams(props);
        } else {
            this.render(props);
        }
    }

    public render(props?: TableSchemaProps) {
        this.paramsMemorizer.stopQueuing();

        if (this.tableRenderer.isRendered) {
            TerminalCanvas.restore();
        }

        let tableProps = props;
        const queuedProps = this.paramsMemorizer.popParams();

        if (queuedProps) {
            tableProps = { ...queuedProps, forceRerender: true };
        }

        if (tableProps) {
            this.updateProps(tableProps);
        }

        const params = this.getRenderParams();
        const virtualParams = this.tableVirtualizer.updateVirtualTable(params);

        this.tableRenderer.render(
            {
                ...virtualParams,
                styleSchema: params.styleSchema,
                cellsSizes: params.cellsSizes,
            },
            {
                forceRerender: !!tableProps?.forceRerender,
            }
        );

        TerminalCanvas.save();
    }

    private addResizeListener() {
        const updateTable = debounce(this.render.bind(this), DEBOUNCE_DELAY);

        TerminalCanvas.addResizeListener(() => {
            this.paramsMemorizer.startQueuing();

            if (this.rerenderOnResize) {
                this.tableRenderer.clearTable();
            }

            updateTable();
        });
    }
}

export { Table };
