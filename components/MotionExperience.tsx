"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// One persistent, scroll-scrubbed sculpture. All motion is decorative: content
// and native anchor navigation still work without canvas or JavaScript.
export default function MotionExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      curtain.dataset.active = "true";
      if (labelRef.current) labelRef.current.textContent = url.pathname.includes("projects") ? "ENTERING SYSTEM" : url.pathname.includes("resume") ? "LANGUAGE CONSTELLATION" : "RETURNING TO ORBIT";
      timer = setTimeout(() => router.push(url.pathname + url.search + url.hash), 460);
      // A failed route must never leave the interface blocked.
      fallback = setTimeout(() => { curtain.dataset.active = "false"; }, 2200);
    };
    document.addEventListener("click", click, true);
    return () => { document.removeEventListener("click", click, true); clearTimeout(timer); clearTimeout(fallback); };
  }, [pathname, router]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const home = pathname === "/";
    document.documentElement.dataset.motionPage = home ? "home" : "detail";
    let width = 0, height = 0, frame = 0, last = 0, scene = 0, pointer = 0;
    let sections: HTMLElement[] = [];
    let offsets: number[] = [];
    const measure = () => {
      width = innerWidth; height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
      offsets = sections.map(s => s.getBoundingClientRect().top + scrollY);
    };
    const shapes = ["ORBIT", "SIGNAL", "NEURAL", "IDENTITY", "CONSTELLATION", "CAPABILITY", "SYSTEMS", "TIMELINE", "LEARNING", "EVIDENCE", "CONNECTION"];
    const point = (i: number, shape: number, count: number): [number, number, number] => {
      const t = i / count, a = i * 2.39996323, y = 1 - t * 2, r = Math.sqrt(1 - y * y);
      switch (shape % 6) {
        case 0: return [Math.cos(a) * r, y, Math.sin(a) * r];
        case 1: { const angle = t * Math.PI * 12; return [Math.cos(angle) * .7, y * 1.25, Math.sin(angle) * .7]; }
        case 2: return [(i % 7 - 3) / 3, (Math.floor(i / 7) % 7 - 3) / 3, (Math.floor(i / 49) - 2) / 3];
        case 3: { const angle = t * Math.PI * 2; const twist = a; return [(1 + .28 * Math.cos(twist)) * Math.cos(angle), (1 + .28 * Math.cos(twist)) * Math.sin(angle), .28 * Math.sin(twist)]; }
        case 4: return [Math.cos(a) * (t * .85 + .2), Math.sin(a) * (t * .85 + .2), Math.sin(t * Math.PI * 6) * .6];
        default: return [Math.sin(t * Math.PI * 8) * .85, y, Math.cos(t * Math.PI * 8) * Math.sin(a)];
      }
    };
    const render = (now: number) => {
      if (document.hidden) { frame = 0; return; }
      if (now - last < 30 && !media.matches) { frame = requestAnimationFrame(render); return; }
      last = now;
      const scroll = scrollY;
      let index = 0;
      for (let i = 0; i < offsets.length; i++) if (scroll + height * .38 >= offsets[i]) index = i;
      const start = offsets[index] || 0, end = offsets[index + 1] || start + height;
      const within = Math.max(0, Math.min(1, (scroll + height * .38 - start) / Math.max(end - start, 1)));
      const target = media.matches ? 0 : index + Math.max(0, (within - .45) / .55);
      scene += (target - scene) * .1;
      if (media.matches) scene = 0;
      const chapter = shapes[Math.min(index, shapes.length - 1)];
      const caption = document.getElementById("motion-chapter");
      if (caption) caption.textContent = `${String(index + 1).padStart(2, "0")} / ${home ? chapter : "SYSTEM TRACE"}`;
      const hue = home ? 155 + Math.sin(scene * .85) * 48 : 210;
      canvas.style.opacity = home ? (index === 0 ? "1" : ".32") : ".22";
      ctx.clearRect(0, 0, width, height);
      const small = width < 760;
      const cx = width * (small ? .7 : .74), cy = height * (small ? .36 : .5);
      const size = Math.min(width * (small ? .42 : .25), height * .36);
      const turn = media.matches ? .25 : scroll * .0007 + now * .000055 + pointer;
      const tilt = .24 + Math.sin(scene) * .25;
      const count = small ? 180 : 300;
      const projected: {x:number;y:number;z:number}[] = [];
      const base = Math.floor(scene), mix = scene - base;
      for (let i = 0; i < count; i++) {
        const a = point(i, base, count), b = point(i, base + 1, count);
        const x = a[0] + (b[0] - a[0]) * mix, y = a[1] + (b[1] - a[1]) * mix, z = a[2] + (b[2] - a[2]) * mix;
        const rx = x * Math.cos(turn) + z * Math.sin(turn), rz = z * Math.cos(turn) - x * Math.sin(turn);
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt), depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
        const perspective = 3 / (3 - depth * .5);
        projected.push({x:cx + rx * size * perspective, y:cy + ry * size * perspective, z:depth});
      }
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.5);
      glow.addColorStop(0, `hsla(${hue},80%,55%,.075)`); glow.addColorStop(1, `hsla(${hue},80%,55%,0)`);
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      projected.forEach((p, i) => {
        for (let step = 1; step <= 2; step++) {
          const q = projected[(i + (base % 6 === 2 ? step : step * 13)) % count];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < size * .31) {
            ctx.strokeStyle = `hsla(${hue},65%,72%,${Math.max(0, .18 - distance / size * .45)})`;
            ctx.lineWidth = .65; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `hsla(${hue},75%,${70 + p.z * 12}%,${.45 + p.z * .18})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.7, 1.3 + p.z * .55), 0, Math.PI * 2); ctx.fill();
      });
      // Orbital contour follows scroll rather than an independent video loop.
      ctx.strokeStyle = `hsla(${hue},70%,74%,.22)`; ctx.lineWidth = .7;
      ctx.beginPath(); ctx.ellipse(cx, cy, size * 1.25, size * (.22 + .12 * Math.sin(scene)), turn * .4, 0, Math.PI * 2); ctx.stroke();
      if (!media.matches) frame = requestAnimationFrame(render); else frame = 0;
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(render); };
    const resize = () => { measure(); wake(); };
    const move = (event: PointerEvent) => { if (!media.matches) pointer = (event.clientX / width - .5) * .18; };
    measure(); wake();
    const observer = new ResizeObserver(measure); observer.observe(document.body);
    window.addEventListener("resize", resize); window.addEventListener("scroll", wake, {passive:true});
    window.addEventListener("pointermove", move, {passive:true}); document.addEventListener("visibilitychange", wake); media.addEventListener("change", wake);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("scroll", wake); window.removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", wake); media.removeEventListener("change", wake); };
  }, [pathname]);

  return <>
    <canvas ref={canvasRef} className="motion-canvas" aria-hidden="true" />
    <div className="motion-caption" aria-hidden="true"><span className="motion-caption-dot" /><span id="motion-chapter">01 / ORBIT</span><span>SCROLL-DRIVEN EXPLORATION</span></div>
    <div className="route-curtain" ref={curtainRef} data-active="false" aria-hidden="true"><div className="curtain-grid" /><b>AA<span>↗</span></b><span ref={labelRef}>ENTERING SYSTEM</span></div>
  </>;
}
