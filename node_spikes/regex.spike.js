const fs = require('fs');

let contents = fs.readFileSync('help.txt', 'utf-8');

// manually change ONE to one
contents = contents.replace(/ONE/g, 'one');

// take words that start with vowels and affix an 'ay' on the end
contents = contents.replace(/\b(?<!-)(?![A-Z]{2,})([aeiou]\w+)\b/g, '$1ay');

// takes words that start with consonants and puts all of the consonants up to the next
// vowel at the end and then appends 'ay'
contents = contents.replace(/\b(?<!-)(?![A-Z]{2,})([^\W\daeiou\s]+)(\w{1,})\b/g, '$2$1ay');

// fix case
contents = contents.replace(/\b([a-z])([a-z]*)([A-Z])([a-z]*)\b/g, (match, p1, p2, p3, p4, offset, string) => {
    return [p1.toUpperCase(), p2, p3.toLowerCase(), p4].join('');
});

// manually fix key words
contents = contents.replace(/odenay/g, 'node');
contents = contents.replace(/iskhogday/g, 'diskhog');
contents = contents.replace(/alphaay/g, 'alpha');
contents = contents.replace(/izesay/g, 'size');
contents = contents.replace(/ilesfay/g, 'files');
contents = contents.replace(/irsday/g, 'dirs');

fs.writeFileSync('help.lp.txt', contents);

console.log(contents);
