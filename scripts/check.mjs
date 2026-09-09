import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const html = readFileSync('index.html','utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'HTML IDs must be unique');
for(const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]),`Missing anchor ${match[1]}`);
for(const match of html.matchAll(/(?:src|href)="((?:assets\/|styles\.css|app\.js|favicon\.svg)[^"]*)"/g)) assert(existsSync(match[1]),`Missing asset ${match[1]}`);
for(const release of JSON.parse(readFileSync('music.json','utf8'))){
 assert(existsSync(release.image));assert(release.tracks.length>0);
 for(const track of release.tracks){assert(track.title);assert(track.duration>0);assert(new URL(track.preview).hostname==='audio-ssl.itunes.apple.com');assert(new URL(track.url).protocol==='https:');}
}
assert(html.includes('type="application/ld+json"'));
console.log('Passed: local assets, unique IDs, navigation targets, release data and preview sources.');
