import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function createChromeScene(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 720 ? 1.4 : 1.75));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.65;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);
  camera.position.set(0,0,8.5);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room,.03);
  scene.environment = environment.texture;
  room.dispose(); pmrem.dispose();
  const chrome = new THREE.MeshPhysicalMaterial({color:0xd8dde3,metalness:1,roughness:.13,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:2.5});
  const lime = new THREE.MeshPhysicalMaterial({color:0xd5ff38,metalness:.55,roughness:.2,clearcoat:1,emissive:0x4f6500,emissiveIntensity:.2});
  const dark = new THREE.MeshPhysicalMaterial({color:0x30343d,metalness:1,roughness:.17,envMapIntensity:3});
  const key = new THREE.DirectionalLight(0xffffff,5);key.position.set(-3,5,5);scene.add(key);
  const rim = new THREE.DirectionalLight(0xa29bff,6);rim.position.set(4,-1,-2);scene.add(rim);
  const fill = new THREE.DirectionalLight(0xe2ff76,3);fill.position.set(-4,-3,2);scene.add(fill);
  const group = new THREE.Group();scene.add(group);
  const parts: THREE.Mesh[] = [];
  const directions: THREE.Vector3[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  // Twelve independently moving chrome ribbons form a single closed knot.
  for(let segment=0;segment<12;segment++) {
    const points:THREE.Vector3[]=[];
    for(let j=0;j<=32;j++) {
      const t=(segment+(j/32)*.97)/12*Math.PI*2;
      points.push(new THREE.Vector3((2+Math.cos(3*t))*.48*Math.cos(2*t),(2+Math.cos(3*t))*.48*Math.sin(2*t),Math.sin(3*t)*.58));
    }
    const geometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),48,.215,16,false);geometries.push(geometry);
    const mesh=new THREE.Mesh(geometry,segment%4===0?lime:chrome);group.add(mesh);parts.push(mesh);
    directions.push(points[16].clone().normalize());
  }
  const coreGeometry=new THREE.IcosahedronGeometry(.57,1);geometries.push(coreGeometry);
  const core=new THREE.Mesh(coreGeometry,dark);group.add(core);
  const ringGeometry=new THREE.TorusGeometry(2.05,.018,8,160);geometries.push(ringGeometry);
  const rings=Array.from({length:3},(_,i)=>{const ring=new THREE.Mesh(ringGeometry,i===0?lime:chrome);ring.rotation.set(i*.8,.3+i*.6,.5);group.add(ring);return ring;});
  const shardGeometry=new THREE.OctahedronGeometry(.09,0);geometries.push(shardGeometry);
  const shards=Array.from({length:22},(_,i)=>{const m=new THREE.Mesh(shardGeometry,i%3===0?lime:chrome);group.add(m);return m;});
  const resize=()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();};
  window.addEventListener("resize",resize);
  return {
    update(progress:number,time:number,pointerX:number,pointerY:number,reduced:boolean,detail=false) {
      const p=reduced?0:progress;
      const explosion=Math.sin(Math.min(1,p/.88)*Math.PI)*1.85;
      const mobile=innerWidth<720;
      const scale=(mobile?.84:1.2)*(1+p*.48);
      group.scale.setScalar(scale);
      group.position.set(mobile?0:.85*(1-p),mobile?.12:0,0);
      group.rotation.set(.3+p*2.8+(reduced?0:pointerY*.16),-.35+p*5.5+(reduced?0:time*.13+pointerX*.24),-.23+p*.9);
      if(detail){group.scale.multiplyScalar(.8);group.position.x=mobile?0:1.5;}
      parts.forEach((part,i)=>{part.position.copy(directions[i]).multiplyScalar(explosion);part.rotation.set(explosion*.2*(i%2?1:-1),explosion*.13,0);});
      core.scale.setScalar(1+explosion*.4);core.rotation.set(p*4,time*.16,p);
      rings.forEach((ring,i)=>{ring.rotation.x=i*.8+p*3;ring.rotation.z=.5+(reduced?0:time*.09)*(i%2?1:-1)+p*2;ring.scale.setScalar(1+explosion*.25);});
      shards.forEach((shard,i)=>{const angle=i/22*Math.PI*2+(reduced?0:time*.05);const radius=2.45+explosion*.7;shard.position.set(Math.cos(angle)*radius,Math.sin(angle)*radius,Math.sin(i*7.1)*1.1);shard.rotation.set(time*.1+i,time*.2,i);});
      renderer.render(scene,camera);
    },
    dispose(){window.removeEventListener("resize",resize);geometries.forEach(g=>g.dispose());chrome.dispose();lime.dispose();dark.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();}
  };
}
