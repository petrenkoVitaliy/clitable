import { RowsConstructor } from './RowsConstructor/RowsConstructor';
import { RowsStructure } from '../../../../types/RowsModule.types';

class RowsModule {
    public rowsStructure: RowsStructure = [];

    public buildRowsStructure(rowsCount: number) {
        this.rowsStructure = RowsConstructor.getRowsStructure(rowsCount);
    }
}

export { RowsModule };
