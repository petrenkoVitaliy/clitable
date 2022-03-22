import { TableSchema } from './TableSchema/TableSchema';
import { TableRenderer } from './TableRenderer/TableRenderer';

import { TableSchemaProps, UpdateTableSchemaProps } from './TableSchema/types';
import { RenderType } from './constants';

class Table extends TableSchema {
    private tableRenderer = new TableRenderer();

    constructor(props: TableSchemaProps) {
        super(props);
    }

    private getRenderParams() {
        return {
            cellsSizes: this.cellsSizes,
            content: this.content,
            bordersStructure: this.bordersStructure,
            tableHeight: this.tableHeight,
            cellCenteringType: this.cellCenteringType,
        };
    }

    public update(props: UpdateTableSchemaProps) {
        const changedProps = this.updateProps(props);

        switch (true) {
            case changedProps.contentRows:
            case changedProps.expansion:
                this.render(RenderType.Full);

                return;

            case changedProps.cellCenteringType:
                this.render(RenderType.Content);

                return;
        }
    }

    public render(renderType?: RenderType) {
        const params = this.getRenderParams();

        this.tableRenderer.render(renderType || RenderType.Full, params);
    }
}

export { Table };
