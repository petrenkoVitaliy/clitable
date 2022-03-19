import { CellCenteringType } from '../TableRenderer/TableStylist/constants';
import { ExpansionParams } from './TableResizer/types';

type TableSchemaProps = {
    contentRows: string[][];
    cellCenteringType: CellCenteringType;
    expansion: ExpansionParams;
};

type UpdateTableSchemaProps = {
    contentRows?: string[][];
    cellCenteringType?: CellCenteringType;
    expansion?: ExpansionParams;
};

export { TableSchemaProps, UpdateTableSchemaProps };
