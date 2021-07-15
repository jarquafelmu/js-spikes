const fs = require("fs");
const es = require("event-stream");

let lineNr = 0;
const file = "sample.js";
const regex = /;$/;
const report = [];

// asynchronous call
let s = fs
  .createReadStream(file)
  .pipe(es.split()) // splits on newlines
  .pipe(
    es.mapSync((line) => {
      // pause readstream
      s.pause();
      let detected = regex.test(line);
      lineNr += 1;

      if (detected)
        report.push({
          lineNr: lineNr,
          line: line.trim(),
        });

      // process line here and call s.resume() when ready
      console.log(`${lineNr} ${line}`);
      console.log(`semicolon detected? ${regex.test(line)}`);

      s.resume();
    })
  )
  .on("error", (err) => console.log(`Error while reading file. ${err}`))
  .on("end", () => {
    console.log("Read entire file.");
    console.log(report);
  });
