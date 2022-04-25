import { PercentMeasure } from '../types/ExpansionModule.types';

type Measure = number | PercentMeasure;
type Options = { percentMeasureMargin?: number };

function parseMeasure(value: Measure, totalValue: number, options?: Options): number;
function parseMeasure(value: Measure[], totalValue: number, options?: Options): number[];
function parseMeasure(
    value: Measure | Measure[],
    totalValue: number,
    options?: Options
): number | number[] {
    if (Array.isArray(value)) {
        return value.map((v) => parseMeasure(v, totalValue, options));
    }

    if (typeof value === 'string') {
        const size = convertPercentsToSize(value, totalValue);

        return options ? size - (options.percentMeasureMargin || 0) : size;
    }

    return value;
}
export { parseMeasure };

export function getMeasuresSum(value: Measure[], totalValue: number): number {
    let percents = 0;

    let sum = value.reduce((acc: number, v) => {
        if (typeof v === 'string') {
            percents += Number.parseFloat(v);
        } else {
            acc += v;
        }

        return acc;
    }, 0);

    const percentsSum = Math.round((percents * totalValue) / 100);

    return sum + percentsSum;
}

export function convertPercentsToSize(percent: PercentMeasure, value: number): number {
    return Math.round((Number.parseFloat(percent) * value) / 100);
}
