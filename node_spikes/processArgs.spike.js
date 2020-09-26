// Explores getting command line arguments and reacting to them
const args = process.argv.slice(2);
console.log(`args: ${args}`);

let i = 0;

while (i < args.length) {
    switch(args[i]) {
        case '--insult':
        case '-i':
            console.log(args[++i], 'smells quite badly.');
            break;
        case '--compliment':
        case '-c':
            console.log(args[++i], 'is really cool.');
            break;
        case '--help':
        case '-h':
            // display help
            // exit program
        default:
            console.log('Sorry, that is not something I know how to do.');
    }
    // go to the next arg set
    ++i;
}

// node .\processArgsSpike.js -i sam -c greg
