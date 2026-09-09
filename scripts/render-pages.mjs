import {writeFile,mkdir} from 'node:fs/promises';
import {shell,routes} from '../src/shared.mjs';
import * as pages from '../src/pages.mjs';
for(const page of routes){
 if(page!=='home') await mkdir(page,{recursive:true});
 await writeFile(page==='home'?'index.html':`${page}/index.html`,shell(page,pages[page]));
}
await writeFile('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(p=>`<url><loc>https://parthawe.github.io/joel-bobby/${p==='home'?'':p+'/'}</loc></url>`).join('')}</urlset>\n`);
console.log('Rendered five static pages.');
