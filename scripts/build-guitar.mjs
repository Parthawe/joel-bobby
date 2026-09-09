import {build} from 'esbuild';
import {mkdir,writeFile,copyFile} from 'node:fs/promises';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {createBass} from '../src/3d/bass-model.mjs';
await mkdir('assets/3d',{recursive:true});
await build({entryPoints:['src/3d/guitar-scene.mjs'],outfile:'assets/3d/guitar-scene.js',bundle:true,minify:true,format:'esm',target:['es2022'],legalComments:'eof'});
globalThis.FileReader=class {
  async readAsArrayBuffer(blob){this.result=await blob.arrayBuffer();this.onloadend?.();}
};
const bass=createBass();bass.position.y=0;
const glb=await new GLTFExporter().parseAsync(bass,{binary:true});
await writeFile('assets/3d/bass-guitar.glb',Buffer.from(glb));
await copyFile('node_modules/three/LICENSE','assets/3d/THREE-LICENSE.txt');
console.log(`Built 3D viewer and original bass asset (${Math.round(glb.byteLength/1024)} KB).`);
