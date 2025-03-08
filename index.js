#!/usr/bin/env node
import path from "path";
import fs from "fs";
import getStdin from "get-stdin";
import minimist from "minimist";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = minimist(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname)

if (args.help) {
  printHelp();
} else if (args.in) {
  getStdin().then(processFile).catch(error)
} else if (args.file) {
  fs.readFile(path.join(BASE_PATH, args.file), "utf-8", function onContents(err, contents) {
    if(err){
      error(err.toString(), true)
    } else {
      processFile(contents)
    }
  })
}
 else {
  error("Incorrect usage", true)
}

function processFile(content){
  content = content.toUpperCase()
  console.log(content);
}

function printHelp() {
  console.log("index usage:");
  console.log(" index.js --file={FILENAME}");
  console.log("");
  console.log("--help          print the help");
  console.log("--file          file to process");
  console.log("");
}

function error(msg, includeHelp = false){
  console.error(msg);
  if(includeHelp){
    console.log("");
    printHelp()
  }
}