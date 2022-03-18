const getCharsCount = (str: string, char: string): number => {
    return (str.match(new RegExp(char, 'g')) || []).length;
};

export { getCharsCount };
