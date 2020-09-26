const chalk = require('chalk');
const log = console.log;

// combine style and normal string messags
log(chalk.blue('Hello') + ' World' + chalk.red('!'));
log(`${chalk.blue('Hello')} World${chalk.red('!')}`);

// compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));

// pass in multipe arguments
log(chalk.blue('Hello', "World!", 'Foo!', 'bar', 'biz', 'baz'));

// nest styles
log(`${chalk.red(`Hello ${chalk.underline.red.bgBlue('world')}!`)}`);

// nest styles of the same type even (color, underline, background)
log(chalk.green(`I am green line ${chalk.blue.underline.bold('with a blue substring!')} that becomes green again!`));

// ES2015 template literal
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

const cpu = {};
cpu.totalPercent = 20;

const ram = {};
ram.used = 300;
ram.total = 4000;

const disk = {};
disk.used = 33;
disk.total = 80;

// ES2015 tagged template literal
log(chalk`
CPU: {red ${cpu.totalPercent}%}
RAM {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);

// use RGB colors in terminal emulators that support it.
log(chalk.keyword('orange')('Yay for orange colored text!'));
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold grey!'));


// define your own themes
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

console.log(error('Error!'));
console.log(warning('Warning!'));

// take advantage of console.log string subtitution
const name = 'Sindre';
console.log(chalk.green('Hello %s'), name);
