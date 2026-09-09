import { mkdir, copyFile, cp, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'music.json', 'favicon.svg', 'robots.txt', 'sitemap.xml', '.nojekyll']) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true, filter: file => !file.endsWith('.jpg') });
console.log('Static site built in dist/');
