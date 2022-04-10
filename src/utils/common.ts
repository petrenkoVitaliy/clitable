// TODO split later
import { PercentMeasure } from '../modules/ExpansionManager/types';

export function cropToLength(str: string, length: number): string {
    return str.length > length ? str.slice(0, length) : str;
}

export function getCharsCount(str: string, char: string): number {
    return (str.match(new RegExp(char, 'g')) || []).length;
}

export function convertPercentsToSize(percent: PercentMeasure, value: number): number {
    return Math.round((Number.parseFloat(percent) * value) / 100);
}

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
        }

        return acc;
    }, 0);

    const percentsSum = Math.round((percents * totalValue) / 100);

    return sum + percentsSum;
}

export function debounce(cb: (...args: any) => any, timeout: number) {
    let timer: NodeJS.Timeout | undefined;

    return (...args: any) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            cb(args);
        }, timeout);
    };
}
