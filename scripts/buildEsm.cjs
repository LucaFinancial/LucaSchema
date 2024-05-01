const fs = require('fs-extra');

const config = require('./config.cjs');

const {
  schemasSrc,
  constantsSrc,
  indexSrc,
  validatorSrc,
  esmConstantsDst,
  esmIndexDst,
  esmValidatorDst,
  esmSchemasDst
} = config;

const copyConstants = async () => {
  return fs
    .copy(constantsSrc, esmConstantsDst)
    .then(() => console.log('Copy constants.js completed!'))
    .catch(err =>
      console.error('An error occurred while copying constants.js', err)
    );
};

const copyIndex = async () => {
  return fs
    .copy(indexSrc, esmIndexDst)
    .then(() => console.log('Copy index.js completed!'))
    .catch(err =>
      console.error('An error occurred while copying index.js', err)
    );
};

const copyValidator = async () => {
  return fs
    .copy(validatorSrc, esmValidatorDst)
    .then(() => console.log('Copy validators.js completed!'))
    .catch(err =>
      console.error('An error occurred while copying validators.js', err)
    );
};

const copySchemas = async () => {
  return fs
    .copy(schemasSrc, esmSchemasDst, { overwrite: true })
    .then(() => console.log('Copy schemas/ to cjs/ completed!'))
    .catch(err =>
      console.error('An error occurred while copying the schemas/ folder.', err)
    );
};

const buildEsm = async () => {
  await copyConstants();
  await copyIndex();
  await copyValidator();
  await copySchemas();
};

module.exports = buildEsm;
