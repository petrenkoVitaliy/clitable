import { CellStyle } from '../types/TableSchema.types';

export const getStyledString = (value: string, style?: CellStyle) => {
    return style
        ? `\x1b[${style.color}${style.mode ? ';' + style.mode : ''}m${value}\x1b[0m`
        : value;
};
