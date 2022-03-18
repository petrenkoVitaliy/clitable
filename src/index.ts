import { Table } from './modules/Table/Table';
import { CellCenteringType } from './modules/Table/TableRenderer/TableStylist/constants';

const table = new Table({
    cellCenteringType: CellCenteringType.RIGHT,
    contentRows: [
        ['abc', 'a', 'aasdasdasdasd'],
        ['a', 'a', 'abc', 'l'],
        ['b', 'c', 'abc', 'basdasdasdasda'],
    ],
});

table.render();
