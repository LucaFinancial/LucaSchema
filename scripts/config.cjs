const path = require('path');

const srcPath = path.join(__dirname, '..', 'src');
const constantsSrc = path.join(srcPath, 'constants.js');
const examplesSrc = path.join(srcPath, 'examples');
const indexSrc = path.join(srcPath, 'index.js');
const schemasSrc = path.join(srcPath, 'schemas');
const validatorSrc = path.join(srcPath, 'lucaValidator.js');

const distPath = path.join(__dirname, '..', 'dist');

const cjsPath = path.join(distPath, 'cjs');
const cjsExamplesDst = path.join(cjsPath, 'examples');
const cjsSchemasDst = path.join(cjsPath, 'schemas');

const esmPath = path.join(distPath, 'esm');
const esmConstantsDst = path.join(esmPath, 'constants.js');
const esmIndexDst = path.join(esmPath, 'index.js');
const esmSchemasDst = path.join(esmPath, 'schemas');
const esmValidatorDst = path.join(esmPath, 'lucaValidator.js');

module.exports = {
  distPath,
  cjsPath,
  esmPath,
  cjsExamplesDst,
  cjsSchemasDst,
  esmConstantsDst,
  esmIndexDst,
  esmValidatorDst,
  esmSchemasDst,
  srcPath,
  constantsSrc,
  examplesSrc,
  indexSrc,
  schemasSrc,
  validatorSrc
};
