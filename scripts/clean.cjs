const rimraf = require("rimraf");

const config = require("./config.cjs");

const { distPath } = config;

function clean() {
  console.log("Cleaning the dist directory:", distPath);
  rimraf.sync(distPath);
  console.log("Dist directory cleaned successfully!");
}

clean();
