import { mkdir, cp, writeFile, copyFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function build() {
  console.log('🏗️  Building LucaSchema...');

  try {
    // Create dist directories
    await mkdir(join(root, 'dist/cjs'), { recursive: true });
    await mkdir(join(root, 'dist/esm'), { recursive: true });

    // Copy schemas to both destinations
    await cp(join(root, 'src/schemas'), join(root, 'dist/cjs/schemas'), {
      recursive: true
    });
    await cp(join(root, 'src/schemas'), join(root, 'dist/esm/schemas'), {
      recursive: true
    });

    // Copy examples for CJS
    await cp(join(root, 'src/examples'), join(root, 'dist/cjs/examples'), {
      recursive: true
    });

    // Copy main library files
    await copyFile(
      join(root, 'src/lucaValidator.js'),
      join(root, 'dist/cjs/lucaValidator.js')
    );
    await copyFile(join(root, 'src/enums.js'), join(root, 'dist/cjs/enums.js'));
    await copyFile(join(root, 'src/index.js'), join(root, 'dist/cjs/index.js'));
    await copyFile(join(root, 'src/index.js'), join(root, 'dist/esm/index.js'));

    // Create CJS package.json to mark as CommonJS
    await writeFile(
      join(root, 'dist/cjs/package.json'),
      JSON.stringify({ type: 'commonjs' }, null, 2)
    );

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
