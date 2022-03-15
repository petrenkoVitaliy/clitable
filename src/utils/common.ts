const getCharsCount = (str: string, char: string): number => {
    return (str.match(/\n/g) || []).length;
};

export { getCharsCount };
