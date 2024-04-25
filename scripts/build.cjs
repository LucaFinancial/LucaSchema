const fs = require("fs");

const config = require("./config.cjs");
const buildCjs = require("./buildCjs.cjs");
const buildEsm = require("./buildEsm.cjs");

const { distPath, cjsPath, esmPath } = config;

const main = async () => {
  fs.mkdirSync(distPath);
  fs.mkdirSync(cjsPath);
  fs.mkdirSync(esmPath);

  await buildCjs();
  await buildEsm();

  console.log("Build completed successfully!");
};

main();
