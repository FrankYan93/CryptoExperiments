import request from "request";
import { createGunzip } from "zlib";
import csv from "csv-streamify";

let counter = 0;
const parser = csv();

// emits each line as a buffer or as a string representing an array of fields
parser.on("data", function (line) {
  console.log(line);
  process.exit(0);
});

// HTTP GET Request
request("http://api.bitcoincharts.com/v1/csv/coinbaseUSD.csv.gz")
  // Un-Gzip
  .pipe(createGunzip())
  // Parse CSV as Object
  .pipe(parser);
//    // Wrap Strings
//    .pipe(processData);
