const fs = require("fs-extra");

const config = require("./config.cjs");

const {
  schemasSrc,
  indexSrc,
  validatorsSrc,
  esmIndexDst,
  esmValidatorsDst,
  esmSchemasDst,
} = config;

const copyIndex = async () => {
  return fs
    .copy(indexSrc, esmIndexDst)
    .then(() => console.log("Copy index.js completed!"))
    .catch((err) =>
      console.error("An error occurred while copying index.js", err)
    );
};

const copyValidators = async () => {
  return fs
    .copy(validatorsSrc, esmValidatorsDst)
    .then(() => console.log("Copy validators.js completed!"))
    .catch((err) =>
      console.error("An error occurred while copying validators.js", err)
    );
};

const copySchemas = async () => {
  return fs
    .copy(schemasSrc, esmSchemasDst, { overwrite: true })
    .then(() => console.log("Copy schemas/ to cjs/ completed!"))
    .catch((err) =>
      console.error("An error occurred while copying the schemas/ folder.", err)
    );
};

const buildEsm = async () => {
  await copyIndex();
  await copyValidators();
  await copySchemas();
};

module.exports = buildEsm;
