const fs = require('fs');

fs.readdir('.', (err, contents) => {
    contents.forEach((file) => {
        console.log(file);
    });
})
