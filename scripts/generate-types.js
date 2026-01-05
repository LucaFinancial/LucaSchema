import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { compile } from 'json-schema-to-typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const schemasDir = join(root, 'src', 'schemas');
const distDir = join(root, 'dist');

async function loadSchema(filePath, cache) {
  if (cache.has(filePath)) return cache.get(filePath);
  const raw = JSON.parse(await readFile(filePath, 'utf8'));
  raw.$id = filePath; // anchor locally
  cache.set(filePath, raw);
  return raw;
}

async function inlineRefs(node, baseDir, cache) {
  if (Array.isArray(node)) {
    const next = await Promise.all(
      node.map(item => inlineRefs(item, baseDir, cache))
    );
    return next;
  }
  if (node && typeof node === 'object') {
    if (typeof node.$ref === 'string' && node.$ref.startsWith('./')) {
      const [refPath, fragment] = node.$ref.split('#');
      const targetPath = join(baseDir, refPath);
      const target = await loadSchema(targetPath, cache);
      let selected = structuredClone(target);

      if (fragment) {
        const parts = fragment.split('/').filter(Boolean);
        for (const part of parts) {
          if (selected && typeof selected === 'object' && part in selected) {
            selected = selected[part];
          } else {
            throw new Error(
              `Unable to resolve fragment ${fragment} in ${targetPath}`
            );
          }
        }
      }

      const inlined = await inlineRefs(selected, dirname(targetPath), cache);
      const keys = Object.keys(node);
      for (const k of keys) delete node[k];
      Object.assign(node, inlined);
      return node;
    }
    for (const [key, value] of Object.entries(node)) {
      node[key] = await inlineRefs(value, baseDir, cache);
    }
  }
  return node;
}

async function generate() {
  console.log('🧬 Generating TypeScript definitions from JSON Schemas...');
  await mkdir(distDir, { recursive: true });

  const files = await readdir(schemasDir);
  const schemaFiles = files.filter(f => extname(f) === '.json');
  const cache = new Map();

  const outputs = [];
  for (const file of schemaFiles) {
    const filepath = join(schemasDir, file);
    const typeName = basename(file, '.json');
    const schemaJson = await loadSchema(filepath, cache);
    const inlined = await inlineRefs(
      structuredClone(schemaJson),
      dirname(filepath),
      cache
    );

    try {
      const ts = await compile(inlined, typeName, {
        bannerComment: '',
        style: {
          singleQuote: true
        },
        additionalProperties: false,
        unreachableDefinitions: true,
        ignoreMinAndMaxItems: true,
        declareExternallyReferenced: true,
        cwd: schemasDir,
        $refOptions: {
          resolve: {
            file: true,
            http: false
          }
        },
        unknownAny: true,
        format: true,
        topRef: true,
        strictIndexSignatures: true,
        enableConstEnums: false
      });
      outputs.push(ts.trim());
    } catch (err) {
      console.error(
        `Failed to generate types for ${file}:`,
        err?.message ?? err
      );
      throw err;
    }
  }

  const merged = outputs.join('\n\n');
  const outFile = join(distDir, 'index.d.ts');
  await writeFile(outFile, merged + '\n');
  console.log(`✅ Wrote definitions to ${outFile}`);
}

generate().catch(err => {
  console.error('❌ Failed to generate types', err);
  process.exit(1);
});
