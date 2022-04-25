import { END_LINE } from '../constants/common';

export function cropToLength(str: string, length?: number): string {
    return length !== undefined && str.length > length ? str.slice(0, length) : str;
}

export function getCharsCount(str: string, char: string): number {
    return (str.match(new RegExp(char, 'g')) || []).length;
}

export function removeDeltaFromArray(values: number[], delta: number): number[] {
    const elementDifference = Math.round(delta / values.length);

    return values.map((value, index) => {
        if (index === values.length - 1) {
            return value - delta;
        }

        if (delta > elementDifference) {
            delta -= elementDifference;

            return value - elementDifference;
        }

        if (delta) {
            delta = 0;

            return value - delta;
        }

        return value;
    });
}

export function getValueWidth(str: string): number {
    return str.split(END_LINE).reduce((acc, valueLine) => {
        if (valueLine.length > acc) {
            acc = valueLine.length;
        }

        return acc;
    }, 0);
}

export function debounce<T extends (...args: any) => any>(cb: T, timeout: number) {
    let timer: NodeJS.Timeout | undefined;

    return (...args: Parameters<T>) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            cb(args);
        }, timeout);
    };
}

export const sleep = async (delayMs: number) =>
    new Promise((r) => setTimeout(r, delayMs));
