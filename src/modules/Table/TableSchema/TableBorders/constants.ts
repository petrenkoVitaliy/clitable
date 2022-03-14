const BORDERS = {
    horizontal: '─',
    vertical: '│',

    topCenter: '┬',
    topLeft: '┌',
    topRight: '┐',

    middleCenter: '┼',
    middleLeft: '├',
    middleRight: '┤',

    bottomCenter: '┴',
    bottomRight: '┘',
    bottomLeft: '└',
};

enum ROW_TYPES {
    Header = 'Header',
    Footer = 'Footer',
    Body = 'Body',
    Single = 'Single',
}

export { BORDERS, ROW_TYPES };
