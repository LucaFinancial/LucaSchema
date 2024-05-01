const path = require('path');

const srcPath = path.join(__dirname, '..', 'src');
const enumsSrc = path.join(srcPath, 'enums.js');
const examplesSrc = path.join(srcPath, 'examples');
const indexSrc = path.join(srcPath, 'index.js');
const schemasSrc = path.join(srcPath, 'schemas');
const validatorSrc = path.join(srcPath, 'lucaValidator.js');

const distPath = path.join(__dirname, '..', 'dist');

const cjsPath = path.join(distPath, 'cjs');
const cjsExamplesDst = path.join(cjsPath, 'examples');
const cjsSchemasDst = path.join(cjsPath, 'schemas');

const esmPath = path.join(distPath, 'esm');
const esmEnumsDst = path.join(esmPath, 'enums.js');
const esmIndexDst = path.join(esmPath, 'index.js');
const esmSchemasDst = path.join(esmPath, 'schemas');
const esmValidatorDst = path.join(esmPath, 'lucaValidator.js');

module.exports = {
  distPath,
  cjsPath,
  esmPath,
  cjsExamplesDst,
  cjsSchemasDst,
  esmEnumsDst,
  esmIndexDst,
  esmValidatorDst,
  esmSchemasDst,
  srcPath,
  enumsSrc,
  examplesSrc,
  indexSrc,
  schemasSrc,
  validatorSrc
};
