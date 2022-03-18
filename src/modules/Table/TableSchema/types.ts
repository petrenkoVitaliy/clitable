import { ExpansionType } from './TableResizer/constants';
import { CellCenteringType } from '../TableRenderer/TableStylist/constants';

type TableSchemaProps = {
    contentRows: string[][];
    // TODO
    // expansionType?: ExpansionType;
    cellCenteringType: CellCenteringType;
};

export { TableSchemaProps };
