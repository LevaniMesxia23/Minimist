#!/usr/bin/env node
import minimist from "minimist";
const args = minimist(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
});

if (args.help) {
  printHelp();
} else {
  error("Incorrect usage", true)
}

function printHelp() {
  console.log("index usage:");
  console.log("");
  console.log("--help          print the help");
  console.log("");
}
console.log(args);

function error(msg, includeHelp = false){
  console.error(msg);
  if(includeHelp){
    console.log("");
    printHelp()
  }
}