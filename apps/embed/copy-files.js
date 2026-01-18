import { copyFileSync, existsSync, mkdirSync } from 'fs';

// Ensure dist directory exists
if (!existsSync('dist')) {
  mkdirSync('dist');
}

// Copy HTML files to dist
copyFileSync('index.html', 'dist/index.html');
copyFileSync('demo.html', 'dist/demo.html');

console.log('✅ HTML files copied to dist/');
