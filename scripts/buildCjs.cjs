const fs = require('fs-extra');

const config = require('./config.cjs');

const { examplesSrc, schemasSrc, cjsExamplesDst, cjsSchemasDst } = config;

const copyExamples = async () => {
  return fs
    .copy(examplesSrc, cjsExamplesDst)
    .then(() => console.log('Copy examples/ completed!'))
    .catch(err =>
      console.error(
        'An error occurred while copying the examples/ folder.',
        err
      )
    );
};

const copySchemas = async () => {
  return fs
    .copy(schemasSrc, cjsSchemasDst, { overwrite: true })
    .then(() => console.log('Copy schemas/ to cjs/ completed!'))
    .catch(err =>
      console.error('An error occurred while copying the schemas/ folder.', err)
    );
};

const buildCjs = async () => {
  await copyExamples();
  await copySchemas();
};

module.exports = buildCjs;
