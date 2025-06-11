import { mkdir, cp, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function build(): Promise<void> {
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

    // Copy TypeScript definitions
    await cp(join(root, 'dist/cjs'), join(root, 'dist/esm'), {
      recursive: true,
      filter: (src: string) => src.endsWith('.d.ts')
    });

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