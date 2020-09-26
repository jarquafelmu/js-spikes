const myFs = require('../master.json');
const chalk = require('chalk');
const fsz = require('filesize');
const dir = chalk.keyword('cyan');

const threshold = 2e4;
const useMetric = false;
console.log(`Threshold is set to ${fsz(threshold)}`);
function display(json, parent = '') {
    const name = `${json.name}`;
    // const name = `${parent ? `${parent}\\${json.name}` : json.name}`;
    const size = useMetric ? json.size.metric : json.size.pretty;
    let line = `(${size}) ${name}`;
    line = json.isDir ? `${line}\\` : line;

    if (json.size.raw >= threshold)
        if (json.isDir) console.log(dir(line));
        else console.log(line);

    console.group();
    if (json.isDir)
        json.children.forEach(element => {
            display(element, json.name);
        });
    console.groupEnd();
}

display(myFs);
