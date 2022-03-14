import { ExpansionType } from './constants';

type ExpansionTypeProps =
    | {
          type: ExpansionType.Auto;
      }
    | {
          type: ExpansionType.Custom;
          columnsSizes: number[];
          rowsSizes?: number[];
      }
    | {
          type: ExpansionType.Fixed;
          columnsSize: number;
          rowsSize: number;
      }
    | {
          type: ExpansionType.Responsive;
          tableWidth: number;
          tableHeight: number;
      };

export { ExpansionTypeProps };
