export default function IdeaObservatory() {
  return <div className="idea-observatory" aria-hidden="true">
    <div className="dream-orbits"><i/><i/><i/></div>
    <svg className="observatory-art" viewBox="0 0 1200 700" fill="none">
      <defs><pattern id="paper-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#303023" opacity=".18"/></pattern><linearGradient id="portal-light" x2="0" y2="1"><stop stopColor="#f4e6ad"/><stop offset="1" stopColor="#c5b3e8"/></linearGradient></defs>
      <g className="dream-landscape" stroke="#292b27" strokeWidth="2">
        <path d="M0 604 Q180 500 370 599 Q550 670 720 570 Q1000 480 1200 610 L1200 700H0Z" fill="#b8bd8b"/>
        <path d="M0 645 Q300 560 620 650 Q950 555 1200 636"/>
        <path d="M100 630l45-110 32 110M145 520v-80m-27 40 27 20 27-20"/>
        <path d="M1040 630v-140m-45 45 45 30 45-30m-78-28 33 25 33-25"/>
        <ellipse cx="600" cy="661" rx="280" ry="23" fill="#292b27" opacity=".12" stroke="none"/>
      </g>
      <g className="observatory-building" stroke="#292b27" strokeWidth="3">
        <path d="M385 620V356a215 215 0 0 1 430 0v264Z" fill="#e8dcb8"/>
        <path d="M385 620V356a215 215 0 0 1 430 0v264Z" fill="url(#paper-dots)"/>
        <path d="M412 619V357a188 188 0 0 1 376 0v262Z" fill="#c4b6dc"/>
        <path d="M444 620V360a156 156 0 0 1 312 0v260Z" fill="#292b27"/>
        <path className="portal-interior" d="M460 620V362a140 140 0 0 1 280 0v258Z" fill="url(#portal-light)"/>
        <g className="portal-stars" stroke="#f7f1dd"><path d="M600 285v60m-30-30h60m-170 80h280M480 470h240M470 550h260"/><ellipse cx="600" cy="448" rx="94" ry="133"/><ellipse cx="600" cy="448" rx="45" ry="133"/></g>
        <path d="M370 621h460v17H370zM350 638h500v17H350zM326 655h548v17H326z" fill="#e8dcb8"/>
        <path d="M600 140V88m-14 15 14-15 14 15"/>
        <circle cx="600" cy="74" r="12" fill="#e8dcb8"/>
        <path d="M422 264l-24-10m49-39-21-17m63-23-15-24m70 7-7-27m114 27 7-27m48 44 15-24m27 64 21-17m4 66 24-10"/>
      </g>
      <g className="floating-idea idea-one" stroke="#292b27" strokeWidth="2.5"><path d="m234 300 57-30 58 30-58 33Z" fill="#e8dcb8"/><path d="m234 300v65l57 34v-66m58-33v65l-58 34" fill="#b8bd8b"/><path d="m253 321 20 12m38-1 20-12"/></g>
      <g className="floating-idea idea-two" stroke="#292b27" strokeWidth="2.5"><ellipse cx="949" cy="308" rx="52" ry="52" fill="#e8dcb8"/><ellipse cx="949" cy="308" rx="84" ry="18" transform="rotate(-25 949 308)"/><path d="m923 295 14-10m35 38 8-11"/></g>
      <g className="floating-idea idea-three" stroke="#292b27" strokeWidth="2.5"><path d="M244 470q-35-55 0-68 35-13 39 25 3 25-39 43Z" fill="#d7b1a2"/><path d="m244 470-15 31 29-15Z" fill="#e8dcb8"/></g>
      <g fill="#292b27"><path d="m845 138 5 15 15 5-15 5-5 15-5-15-15-5 15-5ZM329 158l4 11 11 4-11 4-4 11-4-11-11-4 11-4Z"/><circle cx="194" cy="217" r="3"/><circle cx="1018" cy="423" r="3"/></g>
      <g className="idea-labels" fill="#292b27" fontFamily="monospace" fontSize="13" letterSpacing="2"><text x="215" y="430">BUILD.</text><text x="908" y="395">CONNECT.</text><text x="535" y="692">IDEAS → SYSTEMS</text></g>
    </svg>
    <span className="dream-note note-left">A little curiosity.<br/><em>Infinite possibilities.</em></span><span className="dream-note note-right">Thoughtfully imagined.<br/><em>Deliberately engineered.</em></span>
  </div>;
}
