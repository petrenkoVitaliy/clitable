import { RowsModule } from './modules/RowsModule/RowsModule';
import { StyleModule } from './modules/StyleModule/StyleModule';
import { ContentModule } from './modules/ContentModule/ContentModule';
import { ExpansionModule } from './modules/ExpansionModule/ExpansionModule';
import { TerminalCanvas } from '../../helpers/TerminalCanvas/TerminalCanvas';
import { Centering, Expansion } from '../../constants/common';
import { SelectedCell, TableSchemaProps } from '../../types/TableSchema.types';
import { ExpansionParams } from '../../types/ExpansionModule.types';

class TableSchema {
    private styleModule = new StyleModule();
    private contentModule = new ContentModule();
    private expansionModule = new ExpansionModule();
    private rowsModule = new RowsModule();

    protected rerenderOnResize: boolean = true;
    protected hideCursor: boolean = false;
    protected keyControl: boolean = false;

    private selectedCell: SelectedCell | undefined = undefined;
    private terminalSize = { ...TerminalCanvas.getTerminalSize() };
    private horizontalCentering: Centering = Centering.Center;
    private verticalCentering: Centering = Centering.Center;
    private expansionParams: ExpansionParams = {
        type: Expansion.Auto,
    };

    constructor(props: TableSchemaProps) {
        this.parseTableProps(props);
    }

    protected updateProps(props: TableSchemaProps) {
        this.parseTableProps(props);

        return this.getRenderParams();
    }

    protected getRenderParams() {
        return {
            tableHeight: this.expansionModule.tableHeight,
            horizontalCentering: this.horizontalCentering,
            verticalCentering: this.verticalCentering,
            terminalSize: this.terminalSize,

            rowsStructure: this.rowsModule.rowsStructure,
            cellsSizes: this.expansionModule.cellsSizes,
            content: this.contentModule.content,
            styleSchema: this.styleModule.schema,
        };
    }

    private parseTableProps(props: TableSchemaProps) {
        const terminalSize = { ...TerminalCanvas.getTerminalSize() };
        const isTerminalSizeChanged =
            this.terminalSize.cols !== terminalSize.cols ||
            this.terminalSize.rows !== terminalSize.rows;

        if (isTerminalSizeChanged) {
            this.terminalSize = terminalSize;
        }

        if (props.horizontalCentering) {
            this.horizontalCentering = props.horizontalCentering;
        }

        if (props.verticalCentering) {
            this.verticalCentering = props.verticalCentering;
        }

        if (props.rerenderOnResize !== undefined) {
            this.rerenderOnResize = props.rerenderOnResize;
        }

        if (props.keyControl !== undefined) {
            this.keyControl = props.keyControl;
        }

        if (props.hideCursor !== undefined) {
            this.hideCursor = props.hideCursor;
            if (this.hideCursor) {
                TerminalCanvas.hideCursor();
            }
        }

        if (props.expansion) {
            this.expansionParams = props.expansion;
        }

        if (props.content) {
            this.contentModule.parseContent(props.content);
            this.setRowsStructure();
            this.setCellsSize();
        }

        if (!props.content && isTerminalSizeChanged) {
            this.setCellsSize();
        }

        if (props.selectedCell) {
            this.selectedCell = props.selectedCell;
        }

        if (props.style) {
            this.styleModule.parseStyleModel({
                styleModel: props.style,

                tableSize: this.contentModule.tableSize,
                cellsSizes: this.expansionModule.cellsSizes,
                selectedCell: this.selectedCell,
            });
        }

        if (props.selectedCell && !props.style) {
            this.styleModule.buildStyleSchema({
                tableSize: this.contentModule.tableSize,
                cellsSizes: this.expansionModule.cellsSizes,
                selectedCell: this.selectedCell,
            });
        }
    }

    private setRowsStructure() {
        this.rowsModule.buildRowsStructure(this.contentModule.tableSize.rows);
    }

    private setCellsSize() {
        this.expansionModule.calculateCellsSizes({
            expansionParams: this.expansionParams,
            content: this.contentModule.content,
            terminalSize: this.terminalSize,
        });

        this.styleModule.buildStyleSchema({
            tableSize: this.contentModule.tableSize,
            cellsSizes: this.expansionModule.cellsSizes,
            selectedCell: this.selectedCell,
        });
    }
}

export { TableSchema };
