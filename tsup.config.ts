import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/handlers/restAPI.ts'],
    tsconfig: 'tsconfig.json',
    outDir: './.build/src',
    bundle: true,
    treeshake: true,
    splitting: false,
    sourcemap: false,
    minify: true,
    clean: true,
    format: 'cjs',
    noExternal: [/(.*)/],
});
