import './render-pages.mjs';
import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','motion.css','app.js','motion.js','music.json','favicon.svg','robots.txt','sitemap.xml','.nojekyll']) await copyFile(file,`dist/${file}`);
for(const dir of ['music','live','about','contact']) await cp(dir,`dist/${dir}`,{recursive:true});
await cp('assets','dist/assets',{recursive:true,filter:file=>!file.endsWith('.jpg')});
console.log('Built five-page portfolio in dist/.');
