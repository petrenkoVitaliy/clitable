import { PercentMeasure } from '../modules/ExpansionManager/types';

type Measure = number | PercentMeasure;
function parseMeasure(value: Measure, totalValue: number): number;
function parseMeasure(value: Measure[], totalValue: number): number[];
function parseMeasure(value: Measure | Measure[], totalValue: number): number | number[] {
    if (Array.isArray(value)) {
        return value.map((v) => parseMeasure(v, totalValue));
    }

    if (typeof value === 'string') {
        return convertPercentsToSize(value, totalValue);
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
