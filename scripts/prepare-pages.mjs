import {cp,rm} from 'node:fs/promises';
import './build.mjs';
await rm('docs',{recursive:true,force:true});
await cp('dist','docs',{recursive:true});
console.log('GitHub Pages /docs updated.');
