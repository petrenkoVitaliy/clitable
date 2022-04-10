var readline = require('readline');

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

process.stdin.on('keypress', (chunk, key) => {
    if (key && key.name == 'q') process.exit();
    console.log('qq');
});
