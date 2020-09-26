const fs = require('fs');
const fsz = require('filesize');
const path = require('path');
const filename = path.basename(__filename);

console.log(`Starting ${filename}`);

/**
 * Examines the contents of this directory and gets the information of the files within
 */
function examineDir() {
    let results = [];
    const dir = '.';

    // const contents = fs.readdirSync(dir, {withFileTypes: true});
    const contents = fs.readdirSync(dir);
    let pending = contents.length;
    if (!--pending)
        return results;

    contents.forEach((file) => {
        file = path.resolve(dir, file);

        const stat = fs.statSync(file);
        const fileInfo = createInformationObject(stat, path.basename(file), file);
        results.push(fileInfo);
    });

    return results;
}

/**
 * Returns an information object which holds the wanted information for a file or directory
 * @param {fs.stat} file
 */
function createInformationObject(file, name, path) {
    if (!file)  // just record the name and path of the file
        return { 'name': name, 'path': path };

    // record all of the wanted information for the file
    const infoObject = {
        'name': name,
        'path': path,
        'size': {
            'raw': file.size,
            'pretty': `${file.size.toLocaleString()} B`,
            'metric': `${
                fsz(file.size)
                }`
        },
        'blockInfo': {
            'blksize': file.blksize,
            'blocks': file.blocks
        }
    };
    if (file.isDirectory())
        infoObject.children = [];


    return infoObject;
}

/**
 * Gets JSON ready to be displayed to the console in a nice readable format
 * @param {Object} json
 */
function consolifyJSON(json) {
    return JSON.stringify(json, null, 4);
}

console.dir('results:', consolifyJSON(examineDir()));
console.log(`Finshed ${filename}`);
