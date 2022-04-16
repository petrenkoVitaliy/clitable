const strategies = [
    (i: number, _tableSize: number) => ({ x: 0, y: i }),
    (i: number, tableSize: number) => ({ x: i - tableSize + 1, y: tableSize - 1 }),
    (i: number, tableSize: number) => ({
        x: tableSize - 1,
        y: tableSize * 3 - 3 - i,
    }),
    (i: number, tableSize: number) => ({
        x: tableSize * 4 - 4 - i,
        y: 0,
    }),
];

export const getCurrentPosition = (
    i: number,
    tableSize: number,
    isClockwise: boolean,
    xShift?: number,
    yShift?: number
) => {
    const step = i % (tableSize * 4 - 4);

    let { x, y } = strategies[Math.floor(step / (tableSize - 1))](step, tableSize);

    x += xShift || 0;
    y += yShift || 0;

    if (!isClockwise) {
        [x, y] = [y, x];
    }

    return { x, y };
};
