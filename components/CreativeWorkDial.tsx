"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

function Artwork({kind}: {kind:string}) {
  if (kind === "freezoneb2b") return <div className="cw-art cw-art-trade" aria-hidden="true">
    <div className="cw-trade-circle">
      <svg viewBox="0 0 640 560" fill="none" aria-hidden="true">
        <circle cx="320" cy="280" r="207" stroke="currentColor" strokeWidth=".7" opacity=".4"/>
        <circle cx="320" cy="280" r="163" stroke="currentColor" strokeWidth=".7" opacity=".35"/>
        <circle cx="320" cy="280" r="113" stroke="currentColor" strokeWidth=".7" opacity=".28"/>
        <ellipse cx="320" cy="280" rx="208" ry="77" stroke="currentColor" strokeWidth=".9" opacity=".65"/>
        <ellipse cx="320" cy="280" rx="206" ry="77" stroke="currentColor" strokeWidth=".7" transform="rotate(53 320 280)" opacity=".6"/>
        <ellipse cx="320" cy="280" rx="206" ry="77" stroke="currentColor" strokeWidth=".7" transform="rotate(124 320 280)" opacity=".6"/>
        <path d="M120 340Q315 80 520 330" stroke="currentColor" opacity=".42" strokeDasharray="4 9"/>
        <path d="M140 221Q290 488 511 178" stroke="currentColor" opacity=".5" strokeDasharray="4 9"/>
        <circle cx="126" cy="220" r="5" fill="#E1ECAC"/><circle cx="510" cy="178" r="5" fill="#E1ECAC"/>
        <circle cx="350" cy="454" r="5" fill="#E1ECAC"/><circle cx="433" cy="105" r="5" fill="#E1ECAC"/>
        <path d="M312 280h16M320 272v16" stroke="#E1ECAC"/>
      </svg>
      <div className="cw-trade-stamp">GLOBAL SOURCING <span>×</span> MARKETPLACE</div>
    </div>
    <div className="cw-floating-label cw-label-a"><span>01 / DISCOVER</span><b>69 regions</b></div>
    <div className="cw-floating-label cw-label-b"><span>02 / REQUEST</span><b>RFQs & quotes</b></div>
    <div className="cw-floating-label cw-label-c"><span>03 / COMMERCE</span><b>Verified workflows</b></div>
  </div>;
  if (kind === "opsassist-ai") return <div className="cw-art cw-art-incident" aria-hidden="true">
    <div className="cw-incident-rows">{Array.from({length:11},(_,i)=><div key={i} className="cw-incident-row"><span>{String(11-i).padStart(2,"0")}</span><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>)}</div>
    <div className="cw-incident-panel"><span>INCIDENT DETECTED <i/></span><strong>Signal / context / action.</strong><p>Evidence before remediation.</p><div className="cw-pulse-line"><svg viewBox="0 0 340 80" fill="none" aria-hidden="true"><path d="M0 39h49l15-19 18 39 25-47 28 51 19-24h54l11-12 17 26 20-31 18 17h66" stroke="currentColor" strokeWidth="1.5"/></svg></div></div>
    <span className="cw-incident-corner">HUMAN APPROVAL REQUIRED / 001</span>
  </div>;
  return <div className="cw-art cw-art-workflow" aria-hidden="true">
    <div className="cw-workflow-grid"/>
    <div className="cw-workflow-title">INTENT <span>→</span> ACTION</div>
    <div className="cw-flow-path">
      <div className="cw-flow-node"><span>01</span><b>Prompt</b><small>Natural language</small></div>
      <i/>
      <div className="cw-flow-node"><span>02</span><b>Validate</b><small>Typed schema</small></div>
      <i/>
      <div className="cw-flow-node"><span>03</span><b>Execute</b><small>Recoverable tasks</small></div>
    </div>
    <div className="cw-workflow-bottom">CONNECTED SYSTEMS / TRACEABLE OUTCOMES</div>
  </div>;
}

export default function CreativeWorkDial() {
  const [current,setCurrent]=useState(0);
  const [autoMotion,setAutoMotion]=useState(true);
  const stageRef=useRef<HTMLDivElement>(null);
  const pointerStart=useRef<number|null>(null);
  const active=projects[current];
  const jump=(value:number)=>setCurrent((value+projects.length)%projects.length);

  useEffect(()=>{
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAutoMotion(!motion);
  },[]);

  const pointerMove=(e:React.PointerEvent<HTMLDivElement>)=>{
    if(!autoMotion||!stageRef.current||e.pointerType==="touch")return;
    const rect=stageRef.current.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    const y=(e.clientY-rect.top)/rect.height-.5;
    stageRef.current.style.setProperty("--mx",String(x));
    stageRef.current.style.setProperty("--my",String(y));
  };
  const down=(e:React.PointerEvent<HTMLDivElement>)=>{
    if((e.target as HTMLElement).closest("a,button"))return;
    pointerStart.current=e.clientX;
  };
  const up=(e:React.PointerEvent<HTMLDivElement>)=>{
    if(pointerStart.current===null)return;
    const dx=e.clientX-pointerStart.current;
    pointerStart.current=null;
    if(Math.abs(dx)>55)jump(current+(dx<0?1:-1));
  };
  return <section className="cw-section" id="work" aria-labelledby="cw-heading">
    <div className="cw-section-top"><span>01 / SELECTED WORK</span><span>THREE PROJECTS · DIFFERENT PROBLEMS</span></div>
    <div className="cw-heading-row">
      <h2 id="cw-heading">A different kind <em>of work.</em></h2>
      <p>Choose a project. Look closer. Follow the engineering behind it.</p>
    </div>
    <div className="cw-frame">
      <div className="cw-stage" ref={stageRef} onPointerMove={pointerMove} onPointerLeave={()=>{if(stageRef.current){stageRef.current.style.setProperty("--mx","0");stageRef.current.style.setProperty("--my","0")}}}
        onPointerDown={down} onPointerUp={up} onPointerCancel={()=>pointerStart.current=null}
        tabIndex={0} role="group" aria-label="Project reel. Use the left and right arrow keys to change projects."
        onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();jump(current+1)}if(e.key==="ArrowLeft"){e.preventDefault();jump(current-1)}}}
        data-project={active.slug} data-motion={autoMotion?"on":"off"}>
        <div className="cw-stage-top"><span>WORK / {String(current+1).padStart(2,"0")}</span><span className="cw-stage-top-right">{active.status}</span></div>
        <div className="cw-stage-art" key={active.slug}><Artwork kind={active.slug}/></div>
        <div className="cw-stage-foot"><span>DRAG OR USE ← → TO EXPLORE</span><span>ENGINEERING NOTES / 2026</span></div>
      </div>
      <aside className="cw-details" aria-live="polite">
        <div className="cw-details-intro"><span className="cw-details-label">PROJECT {String(current+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</span><span className="cw-details-status">● {active.status}</span></div>
        <h3 key={active.slug}>{active.shortName}</h3>
        <p className="cw-details-tagline">{active.tagline}</p>
        <p className="cw-details-description">{active.solution}</p>
        <div className="cw-detail-tech">{active.stack.slice(0,6).map(x=><span key={x}>{x}</span>)}</div>
        <div className="cw-detail-links"><Link href={"/projects/"+active.slug}>Explore case study <ArrowUpRight size={19}/></Link>{active.demoUrl&&<a target="_blank" rel="noreferrer" href={active.demoUrl}>Live demo <ExternalLink size={17}/></a>}</div>
        <div className="cw-controls">
          <button type="button" onClick={()=>jump(current-1)} aria-label="Previous project"><ArrowLeft size={18}/></button>
          <div className="cw-pager">{projects.map((p,i)=><button aria-label={"Show "+p.shortName} aria-pressed={i===current} type="button" key={p.slug} onClick={()=>jump(i)} className={i===current?"selected":""}>{String(i+1).padStart(2,"0")}</button>)}</div>
          <button type="button" onClick={()=>jump(current+1)} aria-label="Next project"><ArrowRight size={18}/></button>
        </div>
      </aside>
    </div>
    <div className="cw-project-index">{projects.map((p,i)=><button className={i===current?"is-active":""} onClick={()=>jump(i)} key={p.slug} aria-pressed={i===current}><span>{String(i+1).padStart(2,"0")}</span><strong>{p.shortName}</strong><small>{p.title}</small><ArrowUpRight size={17}/></button>)}</div>
  </section>;
}
