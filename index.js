const yargs = require("yargs");
const fs = require("fs");
const glob = require("glob");
const util = require("util");
const globPromise = util.promisify(glob);
// const REGEX_PATTERN = "-(.*).jpg";
const REGEX_PATTERN = "-(.*).(jpg|mp4)";

const argv = yargs
  .option("inputDir", {
    alias: "i",
    demandOption: true,
    describe: "input directory for the screenshots",
  })
  .option("outputDir", {
    alias: "o",
    describe: "output directory for the screenshots",
    default: "./screenshotsOutput",
  }).argv;

async function main(argv) {
  const regexPattern = new RegExp(REGEX_PATTERN);
  const inputDir = argv.inputDir;
  const outputDir = argv.outputDir;
  console.log(`Attempting to organize Sreenshots in ${inputDir}`);
  try {
    const stat = await fs.promises.lstat(inputDir);
    if (!stat.isDirectory()) throw new Error("Not a directory");
  } catch (error) {
    console.log(error);
    console.log(`The input "${inputDir}" is not a directory. Exiting.`);
    process.exit(-1);
  }
  try {
    fs.mkdirSync(outputDir);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
  try {
    // read all the files
    const files = await globPromise(`${inputDir}/**/*.{jpg,mp4}`);
    console.log(`Reading ${files.length} files`);
    // make a map of the possible directories
    const dirSet = new Set();
    files.map((file) => {
      // do regex match
      const gameCode = regexPattern.exec(file)[1]; // The second element of the array is the capture group
      // Check if element in set already
      if (!dirSet.has(gameCode)) {
        // create directory
        try {
          fs.mkdirSync(`${outputDir}/${gameCode}`);
        } catch (error) {
          if (error.code !== "EEXIST") throw error;
        }
        // add to set
        dirSet.add(gameCode);
      }
      // fs.chmodSync(gameCode, 777);
      const newFilename = file.replace(/^.*[\\\/]/, "");
      fs.copyFileSync(
        file,
        `${outputDir}/${gameCode}/${newFilename}`,
        fs.constants.COPYFILE_FICLONE
      );
      // move file to directory
    });
    console.log(`Processed ${files.length} files.`);
  } catch (error) {
    console.log(error);
    console.log(`Error processing files. Exiting`);
    process.exit(-1);
  }
  process.exit(0);
}

main(argv);
