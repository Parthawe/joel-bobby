import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createBass } from './bass-model.mjs';

export function mountGuitar(host) {
  const stage=host.querySelector('.guitar-stage');
  const status=host.querySelector('.guitar-status');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
  catch { status.textContent='Interactive view unavailable in this browser.'; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.0;
  stage.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,40);
  const environment=new RoomEnvironment();
  const pmrem=new THREE.PMREMGenerator(renderer);
  const lighting=pmrem.fromScene(environment,.04);
  scene.environment=lighting.texture;
  scene.environmentIntensity=1.15;
  environment.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfff2dc,0x626e7c,1.2));
  const key=new THREE.DirectionalLight(0xffe2b7,3);key.position.set(-4,6,8);scene.add(key);
  const rim=new THREE.DirectionalLight(0xc7dcff,3);rim.position.set(4,1,-3);scene.add(rim);
  const bass=createBass();
  const pivot=new THREE.Group();pivot.add(bass);scene.add(pivot);
  const grainCanvas=document.createElement('canvas');grainCanvas.width=256;grainCanvas.height=512;
  const ctx=grainCanvas.getContext('2d');const grain=ctx.createImageData(256,512);
  for(let y=0;y<512;y++)for(let x=0;x<256;x++){
    const strand=Math.sin(x*.24+Math.sin(y*.009)*2+Math.sin(y*.031+x*.008));
    const figure=Math.sin(y*.13+Math.sin(x*.018)*4)*.5;
    const tone=228+strand*5+figure*4;
    const i=(y*256+x)*4;grain.data[i]=tone;grain.data[i+1]=tone;grain.data[i+2]=tone;grain.data[i+3]=255;
  }
  ctx.putImageData(grain,0,0);
  const texture=new THREE.CanvasTexture(grainCanvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(.44,.34);
  bass.traverse(part=>{if(part.material?.name==='Smoked amber lacquer'){part.material.map=texture;part.material.needsUpdate=true;}});
  const initial={yaw:-.32,pitch:.10,roll:-.48};
  let yaw=initial.yaw,pitch=initial.pitch,visible=false,spinning=false,frame=0,last=0;
  function render(){
    pivot.rotation.set(pitch,yaw,initial.roll,'YXZ');
    renderer.render(scene,camera);
    host.dataset.rotation=Math.round(yaw*180/Math.PI);
  }
  function resize(){
    const {width,height}=stage.getBoundingClientRect();if(!width||!height)return;
    camera.aspect=width/height;
    camera.position.set(0,0,camera.aspect<.8?15:12.5);
    camera.updateProjectionMatrix();renderer.setSize(width,height,false);render();
  }
  function tick(now){
    if(!visible||document.hidden||!spinning||reduced.matches){frame=0;return;}
    const delta=Math.min((now-last)/1000,.05);last=now;yaw+=delta*.24;render();frame=requestAnimationFrame(tick);
  }
  function sync(){if(frame)cancelAnimationFrame(frame);frame=0;if(visible&&!document.hidden&&spinning&&!reduced.matches){last=performance.now();frame=requestAnimationFrame(tick);}}
  function stop(){spinning=false;host.querySelector('[data-guitar-spin]').setAttribute('aria-pressed','false');host.querySelector('[data-guitar-spin]').textContent='Auto rotate';sync();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05});observer.observe(stage);
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
  let drag=null;
  stage.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;stop();drag={x:event.clientX,y:event.clientY,yaw,pitch,touch:event.pointerType==='touch'};stage.setPointerCapture(event.pointerId);stage.classList.add('dragging');
  });
  stage.addEventListener('pointermove',event=>{
    if(!drag)return;yaw=drag.yaw+(event.clientX-drag.x)*.009;
    if(!drag.touch)pitch=THREE.MathUtils.clamp(drag.pitch+(event.clientY-drag.y)*.006,-.65,.65);
    render();
  });
  for(const event of ['pointerup','pointercancel','lostpointercapture'])stage.addEventListener(event,()=>{drag=null;stage.classList.remove('dragging');});
  stage.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','r','R'].includes(event.key))return;
    event.preventDefault();stop();
    if(event.key==='ArrowLeft')yaw-=.2;if(event.key==='ArrowRight')yaw+=.2;
    if(event.key==='ArrowUp')pitch=Math.max(-.65,pitch-.15);if(event.key==='ArrowDown')pitch=Math.min(.65,pitch+.15);
    if(event.key.toLowerCase()==='r'){yaw=initial.yaw;pitch=initial.pitch;}render();
  });
  host.querySelector('[data-guitar-left]').addEventListener('click',()=>{stop();yaw-=.35;render();});
  host.querySelector('[data-guitar-right]').addEventListener('click',()=>{stop();yaw+=.35;render();});
  host.querySelector('[data-guitar-reset]').addEventListener('click',()=>{stop();yaw=initial.yaw;pitch=initial.pitch;render();});
  host.querySelector('[data-guitar-spin]').addEventListener('click',event=>{
    if(reduced.matches){status.textContent='Auto rotation is off while reduced motion is enabled. Use the rotation controls to explore.';return;}
    spinning=!spinning;event.currentTarget.setAttribute('aria-pressed',String(spinning));event.currentTarget.textContent=spinning?'Stop rotation':'Auto rotate';sync();
  });
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();stop();host.classList.remove('guitar-ready');host.querySelectorAll('.guitar-controls button').forEach(button=>button.disabled=true);status.textContent='3D view paused. Reload this page to restore it.';});
  host.classList.add('guitar-ready');host.querySelectorAll('.guitar-controls button').forEach(button=>button.disabled=false);
  status.textContent='Drag to rotate · Arrow keys also work';
  resize();
}
