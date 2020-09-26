const fsz = require('filesize');
const fs = require('fs');
const myFs = require('./../master.json');
let args = process.argv.slice(2);

const sortFlags = {
    file: 'files',
    dir: 'dirs',
    name: 'name',
    size: 'size'
};

const globals = {
    path: '.',
    sort: {
        'type': '',
        'criteria': ''
    },
    metric: false,
    threshold: 0
};

let outFile = '';
while (args.length) {
    const cmd = args.shift();
    const params = getParams(args);
    console.log(`cmd: ${cmd}, params: [${params}]`);

    switch (cmd) {
        case '--sort':
        case '-s':
            // if there are no options then quit
            if (!params.length)
                break;
            // set search for either type flags and set type if we find one;
            const type = params.find((element) => {
                return element === sortFlags.dir || element === sortFlags.file
            }) || '';
            // set search for either criteria flags and set criteria if we find one;
            const criteria = params.find((element) => {
                return element === sortFlags.name || element === sortFlags.size
            }) || '';

            outFile = `sort-${type}-${criteria}.json`;

            globals.sort.type = type;
            globals.sort.criteria = criteria;
            break;
        default:
            console.log(`Sorry, argument '${arg}', is not something I know how to do.`);
        // process.exit(1);
    }
}

/**
 * Gets the parameters associated with the previous attained command
 * @param {*} myArray
 */
function getParams(myArray) {
    if (!myArray.length)
        return false;

    const subArray = [];
    // peek at the first element, if it's not a command then
    // we want to record it, otherwise we are done
    while (myArray.length && !(myArray[0].toString().startsWith('-'))) {
        subArray.push(myArray.shift());
    }
    return subArray;
}

/**
 * Compares the isDir properties of a and b
 * @param {*} a
 * @param {*} b
 */
function compDir(a, b) {
    if (a.isDir < b.isDir) return 1;
    if (a.isDir > b.isDir) return -1;
    return 0;
}

/**
 * Compares the name properties of a and b
 * @param {*} a
 * @param {*} b
 */
function compName(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB)
        return -1;  // nameA comes first
    if (nameA > nameB)
        return 1;   // nameB comes first
    return 0;       // names must be equal
}

/**
 * Compares the file size properties of a and b
 * @param {*} a
 * @param {*} b
 */
function compSize(a, b) {
    const sizeA = a.size.raw;
    const sizeB = b.size.raw;
    if (sizeA > sizeB)
        return -1;  // sizeA comes first
    if (sizeA < sizeB)
        return 1;   // sizeB comes first
    return 0;       // sizes must be equal
}

/**
 * Sorts the json object according to the options chosen
 * @param {*} json
 */
function sort(json) { // kick out if json is falsey or if json isn't a directory
    if (!json || !json.isDir || (!globals.sort.type && !globals.sort.criteria))
        return;

    // sort on criteria flag
    const criteria = globals.sort.criteria || '';
    if (criteria) {
        if (criteria === sortFlags.name) { // sort by file name
            json.children.sort(compName);
        } else if (criteria === sortFlags.size) // sort by file size
            json.children.sort(compSize);
    }

    // sort on type flag
    const type = globals.sort.type || '';
    if (type) {
        if (type === sortFlags.dir) { // sort directories first
            json.children.sort(compDir);
        } else if (type === sortFlags.file) // sort files first
            json.children.sort((a, b) => { return compDir(b, a); });
    }

    // do the same for each of the child directories now
    json.children.forEach(child => sort(child));
}
// console.log(JSON.stringify(jsonObj, null, 4));

/**
 * Gets JSON ready to be displayed to the console in a nice readable format
 * @param {Object} json
 */
function show(json) {
    return JSON.stringify(json, null, 4);
}

let run1 = show(myFs);
// console.log(run1);
sort(myFs);

let run2 = show(myFs)
// console.log(run2);

console.log(`Was FS mutated? ${run1 !== run2}`);

fs.writeFile(`trials/${outFile}`, run2, 'utf-8', (err) => {
    if (err) throw err;
})
