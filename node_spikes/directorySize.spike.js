// const fsz = require('filesize');
const fs = require('fs');
const myFs = require('./../master.json');

// Purpose: to determine the size of a directory by summing the sizes of it's children

/**
 * Calculates the raw size of a given directory,
 * if the directory has children, then get the total of their sizes
 * @param {*} directory
 */
function calcSize(directory) {
    if (!directory.children) return directory.size.raw;

    directory.size.raw = 0;
    directory.children.forEach(element => {
        let size = 0;
        if (element.children)
            // if this element has children then recurse into it to get it's total size
            size = calcSize(element);
        else // else get it's raw size
            size = element.size.raw;
        directory.size.raw += size;
    });
    return directory.size.raw;
}

/**
 * Gets JSON ready to be displayed to the console in a nice readable format
 * @param {Object} json
 */
function show(json) {
    return JSON.stringify(json, null, 4);
}

const totalSize = calcSize(myFs);

console.log(`Total size of the record is: ${totalSize.toLocaleString()}`);

fs.writeFile(`trials/calcSize.json`, show(myFs), 'utf-8', (err) => {
    if (err) throw err;
})
