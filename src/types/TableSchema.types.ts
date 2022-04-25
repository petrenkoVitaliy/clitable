import { Centering, ColorCodes, ModeCodes } from '../constants/common';
import { ExpansionParams } from './ExpansionModule.types';

type Style = {
    color: ColorCodes;
    mode?: ModeCodes;
};

export type ParsedCellStyle = Style & {
    border?:
        | {
              top?: Style;
              bottom?: Style;
              right?: Style;
              left?: Style;
          }
        | undefined;
};

export type CellStyle = Style & {
    border?: Style | ParsedCellStyle['border'] | undefined;
};

type GenericStyleModel<T> = {
    general?: T | undefined;
    rows?:
        | {
              [rowIndex: number]: T | undefined;
          }
        | undefined;
    columns?:
        | {
              [colIndex: number]: T | undefined;
          }
        | undefined;
    cells?:
        | {
              [rowIndex: number]: {
                  [colIndex: number]: T | undefined;
              };
          }
        | undefined;
};

export type ParsedStyleModel = GenericStyleModel<ParsedCellStyle>;

export type StyleModel = GenericStyleModel<CellStyle> | CellStyle;

export type StyleSchema = CellStyle[][];

export type TableSchemaProps = {
    content?: (string | number)[][];

    horizontalCentering?: Centering;
    verticalCentering?: Centering;
    expansion?: ExpansionParams;
    style?: StyleModel;

    forceRerender?: boolean;
    rerenderOnResize?: boolean;
};

export type CellsSizes = {
    cols: number[];
    rows: number[];
};

export type TableSize = {
    cols: number;
    rows: number;
};

export type TerminalSize = { cols: number; rows: number };
