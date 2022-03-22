import { CellCenteringType } from '../CellStylist/constants';
import { ExpansionParams } from '../ExpansionManager/types';
import { UpdateTableSchemaProps } from '../../Table/TableSchema/types';

import { ComparisonResult } from './types';

class Comparator {
    public compareTableProps(
        newProps: UpdateTableSchemaProps,
        currentProps: {
            contentRows: string[][];
            cellCenteringType: CellCenteringType;
            expansion: ExpansionParams;
        }
    ): ComparisonResult {
        const comparisonResult: ComparisonResult = {
            cellCenteringType: false,
            expansion: false,
            contentRows: false,
        };

        comparisonResult.cellCenteringType = [
            newProps.cellCenteringType !== currentProps.cellCenteringType,
        ].some(Boolean);

        comparisonResult.expansion =
            !!newProps.expansion &&
            [
                newProps.expansion.expansionType !== currentProps.expansion.expansionType,
                newProps.expansion.expansionType ===
                    currentProps.expansion.expansionType &&
                    Object.keys(newProps.expansion).some((key) => {
                        const typedKey = key as keyof typeof newProps.expansion;

                        return (
                            !!newProps?.expansion?.[typedKey] &&
                            newProps.expansion[typedKey] !==
                                currentProps.expansion[typedKey]
                        );
                    }),
            ].some(Boolean);

        if (newProps.contentRows) {
            if (newProps?.contentRows?.length !== currentProps.contentRows.length) {
                comparisonResult.contentRows = true;
            } else {
                newProps.contentRows.forEach((newRow, rowIndex) => {
                    if (newRow.length !== currentProps.contentRows[rowIndex].length) {
                        comparisonResult.contentRows = true;
                    } else {
                        newRow.forEach((cell, colIndex) => {
                            if (cell !== currentProps.contentRows[rowIndex][colIndex]) {
                                comparisonResult.contentRows = true;
                            }
                        });
                    }
                });
            }
        }

        return comparisonResult;
    }
}

export { Comparator };
