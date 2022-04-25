import { ColorCodes, ModeCodes } from '../../../../constants/common';
import {
    CellsSizes,
    CellStyle,
    ParsedCellStyle,
    ParsedStyleModel,
    SelectedCell,
    StyleModel,
    StyleSchema,
    TableSize,
} from '../../../../types/TableSchema.types';

const DEFAULT_STYLE = {
    color: ColorCodes.WHITE,
};

const DEFAULT_SELECTED_STYLE = {
    color: ColorCodes.RED,
    mode: ModeCodes.BACKGROUND,
};

class StyleModule {
    private styleCacheMap: { [key: string]: CellStyle } = {};

    private styleSchema: StyleSchema = [];
    private styleModel: ParsedStyleModel = { general: DEFAULT_STYLE };
    private selectedCellStyle: ParsedCellStyle = DEFAULT_SELECTED_STYLE;

    constructor() {
        this.cacheStyle(DEFAULT_STYLE);
        this.cacheStyle(DEFAULT_SELECTED_STYLE);
    }

    public get schema() {
        return this.styleSchema;
    }

    public parseStyleModel(params: {
        styleModel: StyleModel;
        tableSize: TableSize;
        cellsSizes: CellsSizes;
        selectedCell: SelectedCell | undefined;
    }) {
        const { styleModel, tableSize, cellsSizes, selectedCell } = params;

        if ('color' in styleModel) {
            this.styleModel = {
                general: this.parseStyle(styleModel),
            };
        } else {
            this.styleModel = {
                general: this.parseStyle(styleModel.general),
                rows: this.parseGenericStyle(styleModel.rows),
                columns: this.parseGenericStyle(styleModel.columns),
                cells: this.parseDeepGenericStyle(styleModel.cells),
            };

            if (styleModel.selected) {
                this.selectedCellStyle =
                    this.parseStyle(styleModel.selected) || DEFAULT_SELECTED_STYLE;
            }
        }

        this.buildStyleSchema({ tableSize, cellsSizes, selectedCell });
    }

    public buildStyleSchema(params: {
        tableSize: TableSize;
        cellsSizes: CellsSizes;
        selectedCell: SelectedCell | undefined;
    }) {
        const { tableSize, cellsSizes, selectedCell } = params;

        this.styleSchema = [];

        for (let rowIndex = 0; rowIndex < tableSize.rows; rowIndex++) {
            for (
                let lineIndex = -1;
                lineIndex <= cellsSizes.rows[rowIndex];
                lineIndex++
            ) {
                const styleRow: (CellStyle | undefined)[] = [];
                const isCellBorderMap = {
                    top: false,
                    bottom: false,
                    left: false,
                    right: false,
                };

                isCellBorderMap.top = lineIndex === -1;
                isCellBorderMap.bottom = lineIndex === cellsSizes.rows[rowIndex];

                for (let colIndex = 0; colIndex < tableSize.cols; colIndex++) {
                    const isSelected =
                        !!selectedCell &&
                        rowIndex === selectedCell.row &&
                        colIndex === selectedCell.column;

                    for (
                        let colLineIndex = -1;
                        colLineIndex <= cellsSizes.cols[colIndex];
                        colLineIndex++
                    ) {
                        isCellBorderMap.left = colLineIndex === -1;
                        isCellBorderMap.right =
                            colLineIndex === cellsSizes.cols[colIndex];

                        const colLineStyle = this.getCellStyle(
                            rowIndex,
                            colIndex,
                            isCellBorderMap,
                            isSelected
                        );

                        if (colLineIndex === -1 && colIndex > 0) {
                            if (colLineStyle) {
                                styleRow[styleRow.length - 1] = colLineStyle;
                            }
                        } else {
                            styleRow.push(colLineStyle);
                        }
                    }
                }

                if (lineIndex === -1 && this.styleSchema.at(-1)) {
                    this.styleSchema[this.styleSchema.length - 1] = styleRow.map(
                        (colStyle, index) =>
                            !colStyle
                                ? this.styleSchema.at(-1)?.[index] || DEFAULT_STYLE
                                : colStyle
                    );
                } else {
                    this.styleSchema.push(
                        styleRow.map((row) => (!row ? DEFAULT_STYLE : row))
                    );
                }
            }
        }
    }

    private cacheStyle(cellStyle: CellStyle) {
        const key = `${cellStyle.color}_${cellStyle.mode || 0}`;

        if (!this.styleCacheMap[key]) {
            this.styleCacheMap[key] = cellStyle;
        }

        return this.styleCacheMap[key];
    }

    /**
     * PRIORITIES:
     * 1. selected
     * 2. cells
     * 3. cols
     * 4. rows
     * 5. general
     * 6. default
     */
    private getCellStyle(
        rowIndex: number,
        colIndex: number,
        isCellBorderMap: {
            [key in 'top' | 'bottom' | 'left' | 'right']: boolean;
        },
        isSelected: boolean
    ) {
        const borderType = (
            Object.keys(isCellBorderMap) as Array<keyof typeof isCellBorderMap>
        ).find((key) => !!isCellBorderMap[key as keyof typeof isCellBorderMap]);

        if (isSelected) {
            const style = borderType
                ? this.selectedCellStyle?.border?.[borderType]
                : this.selectedCellStyle;

            if (style) {
                return this.cacheStyle(style);
            }
        }

        if (this.styleModel.cells) {
            const cellStyle = this.styleModel.cells[rowIndex]?.[colIndex];
            const style = borderType ? cellStyle?.border?.[borderType] : cellStyle;

            if (style) {
                return this.cacheStyle(style);
            }
        }

        if (this.styleModel.columns) {
            const cellStyle = this.styleModel.columns[colIndex];
            const style = borderType ? cellStyle?.border?.[borderType] : cellStyle;

            if (style) {
                return this.cacheStyle(style);
            }
        }

        if (this.styleModel.rows) {
            const cellStyle = this.styleModel.rows[rowIndex];
            const style = borderType ? cellStyle?.border?.[borderType] : cellStyle;

            if (style) {
                return this.cacheStyle(style);
            }
        }

        if (this.styleModel.general) {
            const cellStyle = this.styleModel.general;
            const style = borderType ? cellStyle?.border?.[borderType] : cellStyle;

            if (style) {
                return this.cacheStyle(style);
            }
        }

        return undefined;
    }

    private parseDeepGenericStyle(
        genericStyle:
            | {
                  [key: number]: {
                      [key: number]: CellStyle | undefined;
                  };
              }
            | undefined
    ) {
        return genericStyle
            ? Object.entries(genericStyle).reduce(
                  (acc, rowIndexString) => {
                      const rowIndex = Number(rowIndexString);

                      acc[rowIndex] = {};

                      Object.keys(genericStyle?.[rowIndex] || {}).forEach(
                          (colIndexString) => {
                              const colIndex = Number(colIndexString);

                              acc[rowIndex][colIndex] = this.parseStyle(
                                  genericStyle?.[rowIndex][colIndex]
                              );
                          }
                      );

                      return acc;
                  },
                  {} as {} as {
                      [key: number]: {
                          [key: number]: ParsedCellStyle | undefined;
                      };
                  }
              )
            : undefined;
    }

    private parseGenericStyle(
        genericStyle:
            | {
                  [key: number]: CellStyle | undefined;
              }
            | undefined
    ) {
        return genericStyle
            ? Object.entries(genericStyle).reduce(
                  (acc, [index, style]) => {
                      acc[Number(index)] = this.parseStyle(style);

                      return acc;
                  },
                  {} as {
                      [key: number]: ParsedCellStyle | undefined;
                  }
              )
            : undefined;
    }

    private parseStyle(style?: CellStyle): ParsedCellStyle | undefined {
        if (!style) {
            return undefined;
        }

        if (style.border) {
            if ('color' in style.border) {
                return {
                    ...style,
                    border: {
                        top: { ...style.border },
                        bottom: { ...style.border },
                        left: { ...style.border },
                        right: { ...style.border },
                    },
                };
            }

            return { ...style, border: style.border };
        }

        return { ...style, border: undefined };
    }
}

export { StyleModule };
