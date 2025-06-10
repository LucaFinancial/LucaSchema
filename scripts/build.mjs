import { mkdir, cp, writeFile, copyFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function build() {
  console.log('🏗️  Building LucaSchema...');

  try {
    await mkdir(join(root, 'dist/cjs'), { recursive: true });
    await mkdir(join(root, 'dist/esm'), { recursive: true });

    // Copy schemas to both destinations
    await cp(join(root, 'src/schemas'), join(root, 'dist/cjs/schemas'), {
      recursive: true
    });
    await cp(join(root, 'src/schemas'), join(root, 'dist/esm/schemas'), {
      recursive: true
    });

    // Copy TypeScript definitions to both
    await copyFile(
      join(root, 'src/types/index.d.ts'),
      join(root, 'dist/cjs/index.d.ts')
    );
    await copyFile(
      join(root, 'src/types/index.d.ts'),
      join(root, 'dist/esm/index.d.ts')
    );

    // Copy source files to ESM
    await copyFile(
      join(root, 'src/lucaValidator.js'),
      join(root, 'dist/esm/lucaValidator.js')
    );
    await copyFile(join(root, 'src/enums.js'), join(root, 'dist/esm/enums.js'));
    await copyFile(join(root, 'src/index.js'), join(root, 'dist/esm/index.js'));

    // Create package.json files
    await writeFile(
      join(root, 'dist/cjs/package.json'),
      JSON.stringify({ type: 'commonjs' }, null, 2)
    );

    await writeFile(
      join(root, 'dist/esm/package.json'),
      JSON.stringify({ type: 'module' }, null, 2)
    );

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
