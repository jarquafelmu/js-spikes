const fs = require('fs');
const args = process.argv.slice(2);
const helpFile = 'help.txt';

if (args[0] === '-h' || args[0] === '--help') {
    PrintHelp();
}

function PrintHelp() {
    fs.readFile(helpFile, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}
