"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSoftwareScene } from "./softwareScene";

// One persistent, scroll-scrubbed sculpture. All motion is decorative: content
// and native anchor navigation still work without canvas or JavaScript.
export default function MotionExperience() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;
    curtain.dataset.active = "false";
    let timer: ReturnType<typeof setTimeout>;
    let fallback: ReturnType<typeof setTimeout>;
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "") || /\.[a-z0-9]+$/i.test(url.pathname)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      event.stopPropagation();
      if (curtain.dataset.active === "true") return;
      curtain.style.background = url.pathname.includes("integratex") ? "#d9ff43" : url.pathname.includes("healthbridge") ? "#ff845e" : "#b7a0f5";
      curtain.dataset.active = "true";
      if (labelRef.current) labelRef.current.textContent = url.pathname.includes("projects") ? "ENTERING SYSTEM" : url.pathname.includes("resume") ? "LANGUAGE CONSTELLATION" : "RETURNING TO ORBIT";
      timer = setTimeout(() => router.push(url.pathname + url.search + url.hash), 600);
      // A failed route must never leave the interface blocked.
      fallback = setTimeout(() => { curtain.dataset.active = "false"; }, 2600);
    };
    document.addEventListener("click", click, true);
    return () => { document.removeEventListener("click", click, true); clearTimeout(timer); clearTimeout(fallback); };
  }, [pathname, router]);

  useEffect(() => {
    const host = canvasRef.current;
    if (!host) return;
    let disposed = false;
    let scene: ReturnType<typeof import("./chromeScene").createChromeScene> | undefined;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const home = pathname === "/";
    document.documentElement.classList.add("immersive-ready");
    document.documentElement.dataset.motionPage = home ? "home" : "detail";
    let frame = 0, previous = 0, smoothHero = 0, pointerX = 0, pointerY = 0;
    const hero = document.querySelector<HTMLElement>(".hero-scene");
    const manifesto = document.querySelector<HTMLElement>(".manifesto-section");
    const work = document.querySelector<HTMLElement>(".work-universe");
    const track = document.querySelector<HTMLElement>(".project-index");
    const words = Array.from(document.querySelectorAll<HTMLElement>(".manifesto-word > span"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-row"));
    const titleA = document.querySelector<HTMLElement>(".hero-copy h1 span:first-child");
    const titleB = document.querySelector<HTMLElement>(".hero-copy h1 span:last-child");
    const copy = document.querySelector<HTMLElement>(".hero-copy");
    const refrain = document.querySelector<HTMLElement>(".hero-refrain");
    const meter = document.querySelector<HTMLElement>(".sequence-meter b");
    const neural = document.querySelector<HTMLElement>(".neural-stage");
    const strip = document.querySelector<HTMLElement>(".kinetic-strip > div");
    const count = document.querySelector<HTMLElement>(".gallery-count");
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".gallery-controls button"));
    const entries = Array.from(document.querySelectorAll<HTMLElement>(".experience-entry"));
    let heroTop=0,heroLength=1,manifestoTop=0,manifestoLength=1,workTop=0,workLength=1,trackTravel=0,neuralTop=0;
    const clamp = (v:number) => Math.max(0,Math.min(1,v));
    const measure = () => {
      heroTop=hero?.offsetTop || 0; heroLength=Math.max(1,(hero?.offsetHeight || innerHeight)-innerHeight);
      manifestoTop=manifesto?.offsetTop || 0;manifestoLength=Math.max(1,(manifesto?.offsetHeight || innerHeight)-innerHeight);
      workTop=work?.offsetTop || 0;workLength=Math.max(1,(work?.offsetHeight || innerHeight)-innerHeight);
      trackTravel=Math.max(0,(track?.scrollWidth || 0)-innerWidth+Math.min(innerWidth*.05,80)*2);
      neuralTop=neural?neural.getBoundingClientRect().top+scrollY:0;
    };
    import("./chromeScene").then(({createChromeScene})=>{
      if(disposed)return;
      try { scene=createChromeScene(host);host.dataset.webgl="ready";wake(); }
      catch { scene=createSoftwareScene(host);host.dataset.webgl="ready";host.dataset.renderer="canvas";wake(); }
    }).catch(()=>{if(!disposed){scene=createSoftwareScene(host);host.dataset.webgl="ready";host.dataset.renderer="canvas";wake();}});
    const render = (time:number) => {
      if(disposed||document.hidden){frame=0;return;}
      if(time-previous<30&&!media.matches){frame=requestAnimationFrame(render);return;}
      previous=time;
      const reduced=media.matches;
      const hp=reduced?0:home?clamp((scrollY-heroTop)/heroLength):clamp(scrollY/innerHeight);
      smoothHero=reduced?0:smoothHero+(hp-smoothHero)*.16;
      const p=smoothHero;
      host.style.opacity=home?String(scrollY<heroTop+heroLength+innerHeight?1-clamp((scrollY-heroLength)/innerHeight):0):String(1-clamp(scrollY/innerHeight));
      if(scene&&Number(host.style.opacity)>.005)scene.update(p,time*.001,pointerX,pointerY,reduced,!home);
      host.style.setProperty("--explode",String(p));
      if(titleA)titleA.style.opacity=String(1-clamp((p-.2)*3));
      if(titleB)titleB.style.opacity=String(1-clamp((p-.2)*3));
      if(titleA)titleA.style.transform=`translate3d(${-p*110}%,${-p*22}vh,0) rotate(${-p*9}deg)`;
      if(titleB)titleB.style.transform=`translate3d(${p*115}%,${p*12}vh,0) rotate(${p*9}deg)`;
      if(copy)copy.style.setProperty("--copy-fade",String(1-clamp(p*3)));
      if(refrain){refrain.style.opacity=String(clamp((p-.28)*4)*(1-clamp((p-.86)*7)));refrain.style.transform=`translate(-50%,-50%) scale(${.7+p*.35})`;}
      if(meter)meter.textContent=`${String(Math.round(p*99)+1).padStart(3,"0")} / 100`;
      if(hero)hero.style.setProperty("--sequence",String(p));
      const mp=reduced?1:clamp((scrollY-manifestoTop+innerHeight*.2)/(manifestoLength+innerHeight*.1));
      words.forEach((word,i)=>{const reveal=clamp(mp*1.4-i/words.length);word.style.opacity=String(reduced?1:.15+clamp(reveal*5)*.85);word.style.transform=`translateY(${reduced?0:(1-clamp(reveal*5))*18}px)`;});
      if(manifesto)manifesto.style.setProperty("--read-progress",String(mp));
      const wp=reduced?0:clamp((scrollY-workTop)/workLength);
      if(track)track.style.transform=reduced?"none":`translate3d(${-wp*trackTravel}px,0,0)`;
      const active=Math.round(wp*(cards.length-1));
      if(count)count.textContent=`${String(active+1).padStart(2,"0")} / 04`;
      cards.forEach((card,i)=>{card.style.setProperty("--card-turn",`${reduced?0:(i-wp*3)*-9}deg`);card.dataset.active=String(i===active);});
      buttons.forEach((button,i)=>button.setAttribute("aria-pressed",String(i===active)));
      if(strip)strip.style.transform=`translateX(${reduced?0:-(scrollY*.14)%700}px)`;
      if(neural&&!reduced){const n=clamp((scrollY-neuralTop+innerHeight)/innerHeight);neural.style.transform=`perspective(1200px) rotateY(${(n-.5)*32}deg) rotateX(${(n-.5)*-18}deg) scale(${.85+n*.15})`;}
      entries.forEach((entry,i)=>{if(reduced){entry.style.transform="none";return;}const rect=entry.getBoundingClientRect();const e=clamp((innerHeight-rect.top)/innerHeight);entry.style.transform=`translateX(${(1-e)*(i%2?1:-1)*80}px) rotate(${(1-e)*(i%2?2:-2)}deg)`;});
      const caption=document.getElementById("motion-chapter");if(caption)caption.textContent=home?(hp<1?"01 / DECONSTRUCT":scrollY<workTop?"02 / DISCOVER":"03 / EXPLORE"):"SYSTEM / OPEN";
      if(!reduced)frame=requestAnimationFrame(render);else frame=0;
    };
    const wake=()=>{if(!frame&&!disposed)frame=requestAnimationFrame(render);};
    const resize=()=>{measure();wake();};
    const move=(event:PointerEvent)=>{pointerX=event.clientX/innerWidth-.5;pointerY=event.clientY/innerHeight-.5;};
    // Move the pinned gallery to keyboard-focused cards as well as on scroll.
    const focus=(event:FocusEvent)=>{const i=cards.indexOf(event.target as HTMLElement);if(i>=0&&!media.matches)window.scrollTo({top:workTop+workLength*i/Math.max(1,cards.length-1),behavior:"instant"});};
    measure();wake();
    const observer=new ResizeObserver(resize);observer.observe(document.body);
    addEventListener("resize",resize);addEventListener("scroll",wake,{passive:true});addEventListener("pointermove",move,{passive:true});
    document.addEventListener("visibilitychange",wake);track?.addEventListener("focusin",focus);media.addEventListener("change",resize);
    return()=>{disposed=true;cancelAnimationFrame(frame);scene?.dispose();observer.disconnect();removeEventListener("resize",resize);removeEventListener("scroll",wake);removeEventListener("pointermove",move);document.removeEventListener("visibilitychange",wake);track?.removeEventListener("focusin",focus);media.removeEventListener("change",resize);document.documentElement.classList.remove("immersive-ready");};
  }, [pathname]);

  return <>
    <div ref={canvasRef} className="webgl-stage" aria-hidden="true"><div className="sculpture-fallback"><i/><i/><i/></div></div>
    <div className="motion-caption" aria-hidden="true"><span className="motion-caption-dot" /><span id="motion-chapter">01 / ORBIT</span><span>SCROLL-DRIVEN EXPLORATION</span></div>
    <div className="route-curtain" ref={curtainRef} data-active="false" aria-hidden="true"><div className="curtain-grid" /><div className="curtain-slices"><i/><i/><i/><i/><i/></div><b>AA<span>↗</span></b><span ref={labelRef}>ENTERING SYSTEM</span></div>
  </>;
}
