"use client";

import { useState } from "react";

export default function CaseExplorer({ steps }: { steps: {label: string; detail: string}[] }) {
  const [selected, setSelected] = useState(0);
  const step = steps[selected];
  return (
    <div className="ed-case-process">
      <div className="ed-process-buttons" role="tablist" aria-label="Project workflow stages">
        {steps.map((item, index) => (
          <button key={item.label} id={"process-tab-"+index} role="tab" type="button" aria-selected={selected===index} aria-controls="process-panel"
            className={selected===index?"selected":""} onClick={() => setSelected(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="ed-process-detail" role="tabpanel" id="process-panel" aria-labelledby={"process-tab-"+selected} tabIndex={0}>
        <span>WORKFLOW / {String(selected+1).padStart(2,"0")} OF {String(steps.length).padStart(2,"0")}</span>
        <h3>{step.label}</h3>
        <p>{step.detail}</p>
      </div>
    </div>
  );
}
