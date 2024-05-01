const fs = require('fs-extra');

const config = require('./config.cjs');

const {
  schemasSrc,
  enumsSrc,
  indexSrc,
  validatorSrc,
  esmEnumsDst,
  esmIndexDst,
  esmValidatorDst,
  esmSchemasDst
} = config;

const copyEnums = async () => {
  return fs
    .copy(enumsSrc, esmEnumsDst)
    .then(() => console.log('Copy enums.js completed!'))
    .catch(err =>
      console.error('An error occurred while copying enums.js', err)
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
  await copyEnums();
  await copyIndex();
  await copyValidator();
  await copySchemas();
};

module.exports = buildEsm;
