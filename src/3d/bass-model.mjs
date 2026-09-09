import * as THREE from 'three';

// Original, unbranded four-string bass study. Dimensions are visual proportions.
export function createBass() {
  const bass = new THREE.Group();
  bass.name = 'Four-string bass';
  const wood = new THREE.MeshPhysicalMaterial({name:'Smoked amber lacquer',color:0x763918,roughness:.28,metalness:.05,clearcoat:1,clearcoatRoughness:.17});
  const maple = new THREE.MeshStandardMaterial({name:'Maple neck',color:0xbf9962,roughness:.48});
  const rosewood = new THREE.MeshStandardMaterial({name:'Rosewood fingerboard',color:0x261a15,roughness:.45});
  const nickel = new THREE.MeshStandardMaterial({name:'Nickel hardware',color:0xc6c8c7,metalness:1,roughness:.22});
  const dark = new THREE.MeshStandardMaterial({name:'Black pickup covers',color:0x141612,roughness:.35});
  const ivory = new THREE.MeshStandardMaterial({name:'Ivory inlays',color:0xede3c4,roughness:.4});
  const screw = new THREE.MeshStandardMaterial({name:'Screw slots',color:0x353831,metalness:.75,roughness:.3});
  function mesh(geometry,material,x=0,y=0,z=0,name='') {
    const part=new THREE.Mesh(geometry,material); part.position.set(x,y,z); part.name=name; bass.add(part); return part;
  }
  function box(w,h,d,mat,x,y,z,name) {return mesh(new THREE.BoxGeometry(w,h,d),mat,x,y,z,name);}
  function cylinder(r,h,mat,x,y,z,name) {
    const part=mesh(new THREE.CylinderGeometry(r,r,h,24),mat,x,y,z,name);part.rotation.x=Math.PI/2;return part;
  }
  function wire(start,end,r,material,name) {
    const a=new THREE.Vector3(...start),b=new THREE.Vector3(...end),v=b.clone().sub(a);
    const p=mesh(new THREE.CylinderGeometry(r,r,v.length(),8),material,...a.clone().add(b).multiplyScalar(.5).toArray(),name);
    p.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return p;
  }
  function extrude(shape,depth,bevel,material,z,name) {
    return mesh(new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelSegments:4,bevelSize:bevel,bevelThickness:bevel,curveSegments:40}),material,0,0,z,name);
  }
  const body=new THREE.Shape();
  body.moveTo(-.18,.44);
  body.bezierCurveTo(-.30,.20,-.40,.18,-.46,.43);
  body.bezierCurveTo(-.59,.77,-.52,1.10,-.67,1.09);
  body.bezierCurveTo(-.95,.96,-1.03,.38,-.95,.02);
  body.bezierCurveTo(-.91,-.38,-.82,-.58,-1.02,-.94);
  body.bezierCurveTo(-1.29,-1.44,-1.08,-2.07,-.59,-2.25);
  body.bezierCurveTo(-.13,-2.43,.43,-2.38,.81,-2.12);
  body.bezierCurveTo(1.19,-1.84,1.25,-1.20,.98,-.83);
  body.bezierCurveTo(.69,-.43,.48,-.24,.60,.09);
  body.bezierCurveTo(.68,.42,.75,.57,.66,.66);
  body.bezierCurveTo(.48,.84,.36,.41,.28,.17);
  body.bezierCurveTo(.21,.02,.18,.01,.18,.12);
  body.lineTo(.18,.44);body.closePath();
  extrude(body,.26,.075,wood,-.085,'Contoured double-cutaway body');

  const neck=new THREE.Shape();neck.moveTo(-.215,-.6);neck.lineTo(.215,-.6);neck.lineTo(.145,3.1);neck.lineTo(-.145,3.1);neck.closePath();
  extrude(neck,.19,.035,maple,.075,'Maple neck');
  const board=new THREE.Shape();board.moveTo(-.218,-.50);board.lineTo(.218,-.50);board.lineTo(.147,3.04);board.lineTo(-.147,3.04);board.closePath();
  extrude(board,.036,.007,rosewood,.30,'Rosewood fingerboard');
  const head=new THREE.Shape();head.moveTo(-.14,3.01);head.lineTo(.14,3.01);
  head.bezierCurveTo(.15,3.22,.36,3.25,.37,3.50);head.bezierCurveTo(.40,3.79,.23,3.98,-.06,3.91);
  head.bezierCurveTo(-.25,3.86,-.18,3.61,-.17,3.37);head.lineTo(-.14,3.01);head.closePath();
  extrude(head,.15,.025,maple,.08,'Unbranded headstock');
  box(.308,.046,.045,ivory,0,3.015,.368,'Nut');
  for(let fret=1;fret<=22;fret++) {
    const y=3.015-4.59*(1-Math.pow(2,-fret/12));
    const width=.294+(3.015-y)/3.515*.142;
    wire([-width/2,y,.355],[width/2,y,.355],.009,nickel,`Fret ${fret}`);
    if([3,5,7,9,12,15,17,19,21].includes(fret)) {
      const prior=3.015-4.59*(1-Math.pow(2,-(fret-1)/12));
      for(const x of fret===12?[-.072,.072]:[0]) cylinder(.020,.003,ivory,x,(y+prior)/2,.352,'Fingerboard inlay');
    }
  }
  for(const [y,w] of [[-.72,.53],[-1.15,.57]]) {
    box(w,.14,.075,dark,0,y,.29,'Single-coil pickup');
    for(let i=0;i<4;i++)for(const delta of [-.017,.017]) cylinder(.012,.006,nickel,(i-1.5)*.102+delta,y,.331,'Pickup pole');
    for(const x of [-w/2+.04,w/2-.04])cylinder(.018,.006,nickel,x,y,.334,'Pickup screw');
  }
  box(.59,.34,.05,nickel,0,-1.66,.28,'Bridge plate');
  box(.59,.045,.10,nickel,0,-1.83,.326,'Bridge tail');
  for(let i=0;i<4;i++) {
    const x=(i-1.5)*.119;
    box(.10,.11,.065,nickel,x,-1.62+i*.01,.331,'Individual bridge saddle');
    wire([x,-1.82,.333],[x,-1.60,.333],.011,screw,'Intonation screw');
    const nutX=(i-1.5)*.079;
    const radius=.0049-i*.0008;
    wire([x,-1.69,.379],[nutX,3.04,.397],radius,nickel,`String ${i+1}`);
    const pegX=-.12,pegY=3.20+i*.19;
    wire([nutX,3.04,.397],[pegX,pegY,.30],radius,nickel,'Headstock string');
    cylinder(.037,.11,nickel,pegX,pegY,.285,'String post');
    cylinder(.054,.015,nickel,pegX,pegY,.24,'Tuner washer');
    box(.13,.12,.07,nickel,pegX,pegY,.075,'Tuning machine');
    wire([pegX,pegY,.09],[-.28,pegY,.09],.024,nickel,'Tuner shaft');
    const key=mesh(new THREE.SphereGeometry(1,20,12),nickel,-.33,pegY,.09,'Tuning key');key.scale.set(.075,.06,.022);
  }
  for(const [x,y] of [[.64,-1.16],[.73,-1.43],[.64,-1.72]]) {
    cylinder(.075,.10,nickel,x,y,.29,'Control knob');
    cylinder(.055,.005,dark,x,y,.342,'Knob top');
    box(.01,.032,.006,ivory,x,y+.024,.348,'Knob indicator');
  }
  cylinder(.07,.025,nickel,.47,-1.97,.242,'Output jack');
  cylinder(.037,.028,dark,.47,-1.97,.26,'Jack socket');
  box(.30,.34,.024,nickel,0,.08,-.173,'Rear neck plate');
  for(const x of [-.11,.11])for(const y of [-.04,.20])cylinder(.019,.007,nickel,x,y,-.188,'Neck plate screw');
  cylinder(.055,.08,nickel,0,-2.36,0,'Strap button');
  bass.position.y=-.75;
  return bass;
}
