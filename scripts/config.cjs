const path = require("path");

const srcPath = path.join(__dirname, "..", "src");
const examplesSrc = path.join(srcPath, "examples");
const indexSrc = path.join(srcPath, "index.js");
const schemasSrc = path.join(srcPath, "schemas");
const validatorsSrc = path.join(srcPath, "validators.js");

const distPath = path.join(__dirname, "..", "dist");

const cjsPath = path.join(distPath, "cjs");
const cjsExamplesDst = path.join(cjsPath, "examples");
const cjsSchemasDst = path.join(cjsPath, "schemas");

const esmPath = path.join(distPath, "esm");
const esmIndexDst = path.join(esmPath, "index.js");
const esmSchemasDst = path.join(esmPath, "schemas");
const esmValidatorsDst = path.join(esmPath, "validators.js");

module.exports = {
  distPath,
  cjsPath,
  esmPath,
  cjsExamplesDst,
  cjsSchemasDst,
  esmIndexDst,
  esmValidatorsDst,
  esmSchemasDst,
  srcPath,
  examplesSrc,
  indexSrc,
  schemasSrc,
  validatorsSrc,
};
