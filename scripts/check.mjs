import './render-pages.mjs';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
const pages=['index.html','music/index.html','live/index.html','about/index.html','contact/index.html'];
const titles=[];
for(const page of pages){
 const html=readFileSync(page,'utf8'); const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${page}: duplicate IDs`);
 assert.equal([...html.matchAll(/<h1[\s>]/g)].length,1,`${page}: exactly one main heading`);
 titles.push(html.match(/<title>(.*?)<\/title>/)[1]);
 assert.equal([...html.matchAll(/aria-current="page"/g)].length,2,`${page}: header and footer active links`);
 for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(ref))continue;
  if(ref.startsWith('#')){assert(ids.includes(ref.slice(1)),`${page}: anchor ${ref}`);continue;}
  const target=path.resolve(path.dirname(page),ref.split(/[?#]/)[0]);
  assert(existsSync(target),`${page}: missing ${ref}`);
  if(statSync(target).isDirectory())assert(existsSync(path.join(target,'index.html')),`${page}: route ${ref} missing index`);
 }
 assert(html.includes('d209f56e'),`${page}: missing design contract`);
}
assert.equal(new Set(titles).size,5,'Every page needs a unique title');
for(const release of JSON.parse(readFileSync('music.json','utf8'))){assert(existsSync(release.image));for(const t of release.tracks){assert(t.title);assert(t.duration>0);assert.equal(new URL(t.preview).hostname,'audio-ssl.itunes.apple.com');}}
assert(readFileSync('sitemap.xml','utf8').match(/<url>/g).length===5);
console.log('Passed: 5 unique routes/titles, navigation, nested assets, active-page links, headings, release data, sitemap and design contracts.');
