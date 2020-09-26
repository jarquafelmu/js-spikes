// Searches the array for an entry that begins with '-'
// flags that point and adds it to a new array

const args = ['-fred', 'ham', 'cheese', '-potato', 'milk', 'bread'];
while (args.length) {
    const cmd = args.shift();
    const params = getParams(args);
    console.log(`cmd: ${cmd}, params: [${params}]`);
}

/**
 * Gets the parameters associated with the previous attained command
 * @param {*} myArray
 */
function getParams(myArray) {
    if (!myArray.length) return false;
    const subArray = [];
    // peek at the first element, if it's not a command then
    // we want to record it, otherwise we are done
    while (myArray.length && !(myArray[0].toString().startsWith('-'))) {
        subArray.push(myArray.shift());
    }
    return subArray;
}
