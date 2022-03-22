import { CellCenteringType } from '../../modules/CellStylist/constants';
import { ExpansionParams } from '../../modules/ExpansionManager/types';

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
