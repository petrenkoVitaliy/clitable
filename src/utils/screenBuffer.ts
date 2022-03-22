// type Modules = {
//     get_console_cursor_position: () => { x: number; y: number };
// };

// const modules: Modules = require('../../build/Release/modules.node');

// const { get_console_cursor_position: getConsoleCursorPosition } = modules;

const getConsoleCursorPosition = () => ({ x: 0, y: 0 });

export { getConsoleCursorPosition };
