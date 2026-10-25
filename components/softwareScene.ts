// Canvas projection preserves the 3D scroll sequence on browsers without WebGL.
type V = [number, number, number];
const add=(a:V,b:V):V=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const mul=(a:V,k:number):V=>[a[0]*k,a[1]*k,a[2]*k];
const sub=(a:V,b:V):V=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross=(a:V,b:V):V=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=(a:V):V=>mul(a,1/(Math.hypot(...a)||1));
const curve=(t:number):V=>[(2+Math.cos(3*t))*.48*Math.cos(2*t),(2+Math.cos(3*t))*.48*Math.sin(2*t),Math.sin(3*t)*.58];
export function createSoftwareScene(host:HTMLElement){
 const canvas=document.createElement("canvas");const ctx=canvas.getContext("2d");if(!ctx)throw new Error("Canvas unavailable");host.appendChild(canvas);
 let w=innerWidth,h=innerHeight;
 const resize=()=>{w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio,1.5);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);};resize();addEventListener("resize",resize);
 const faces:{vertices:V[];normal:V;direction:V;lime:boolean}[]=[];
 const rings=12,steps=24,sides=innerWidth<720?16:24;
 for(let segment=0;segment<rings;segment++){
  const direction=unit(curve((segment+.5)/rings*Math.PI*2));
  const surface=(s:number,j:number):V=>{const t=(segment+s/steps*.97)/rings*Math.PI*2;const center=curve(t);const tangent=unit(sub(curve(t+.001),center));const n=unit(cross(tangent,[0,0,1]));const b=unit(cross(tangent,n));const a=j/sides*Math.PI*2;return add(center,mul(add(mul(n,Math.cos(a)),mul(b,Math.sin(a))),.215));};
  for(let s=0;s<steps;s++)for(let j=0;j<sides;j++){
   const vertices=[surface(s,j),surface(s+1,j),surface(s+1,j+1),surface(s,j+1)];
   faces.push({vertices,normal:unit(cross(sub(vertices[1],vertices[0]),sub(vertices[3],vertices[0]))),direction,lime:segment%4===0});
  }
 }
 return {
  update(progress:number,time:number,px:number,py:number,reduced:boolean,detail=false){
   const p=reduced?0:progress;const explosion=Math.sin(Math.min(1,p/.88)*Math.PI)*1.85;
   const ax=.3+p*2.8+(reduced?0:py*.16),ay=-.35+p*5.5+(reduced?0:time*.13+px*.24),az=-.23+p*.9;
   const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az);
   const rotate=(v:V):V=>{const x=v[0]*cz-v[1]*sz,y=v[0]*sz+v[1]*cz,z=v[2];const xx=x*cy+z*sy,zz=z*cy-x*sy;return[xx,y*cx-zz*sx,y*sx+zz*cx];};
   const mobile=w<720;const size=Math.min(w*(mobile?.25:.15),h*.26)*(1+p*.48);const centerX=w*(mobile?.5:detail?.69:.62);const centerY=h*(mobile?.47:.48);
   ctx.clearRect(0,0,w,h);
   const sorted=faces.map(face=>{const vertices=face.vertices.map(v=>rotate(add(v,mul(face.direction,explosion))));return {...face,vertices,normal:rotate(face.normal),z:vertices.reduce((n,v)=>n+v[2],0)/4};}).sort((a,b)=>a.z-b.z);
   for(const face of sorted){
    const n=face.normal;const reflection=Math.abs(Math.sin(n[0]*3.2+n[1]*1.4+n[2]*2.8));
    const light=.12+.88*Math.pow(reflection,4);const spec=Math.pow(Math.max(0,n[0]*-.35+n[1]*-.5+n[2]*.8),24)*100;
    let r=24+light*203+spec,g=27+light*207+spec,b=35+light*214+spec;
    if(face.lime){r=74+light*143+spec;g=91+light*164+spec;b=8+light*38+spec;}
    const color=`rgb(${Math.min(255,r)},${Math.min(255,g)},${Math.min(255,b)})`;ctx.fillStyle=color;ctx.strokeStyle=color;ctx.lineWidth=.65;ctx.beginPath();
    face.vertices.forEach((v,i)=>{const k=7/(7-v[2]);const x=centerX+v[0]*size*k,y=centerY-v[1]*size*k;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.fill();ctx.stroke();
   }
   ctx.strokeStyle="#d9ff4355";ctx.lineWidth=.8;
   ctx.beginPath();ctx.ellipse(centerX,centerY,size*(2.1+explosion*.2),size*.43,az+time*.03,0,Math.PI*2);ctx.stroke();
  },
  dispose(){removeEventListener("resize",resize);canvas.remove();}
 };
}
