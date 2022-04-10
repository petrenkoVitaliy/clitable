export function cropToLength(str: string, length: number): string {
    return str.length > length ? str.slice(0, length) : str;
}

export function getCharsCount(str: string, char: string): number {
    return (str.match(new RegExp(char, 'g')) || []).length;
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
