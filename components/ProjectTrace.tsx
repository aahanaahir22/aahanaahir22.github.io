"use client";

import { useState } from "react";
import { RotateCcw, Signal } from "lucide-react";

type Step = { label: string; detail: string };

export default function ProjectTrace({ steps, project }: { steps: Step[]; project: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="trace-console">
      <div className="trace-toolbar">
        <span><Signal size={15} /> LIVE SYSTEM TRACE / SIMULATED</span>
        <button onClick={() => setActive(0)} aria-label="Reset trace"><RotateCcw size={14} /> Reset</button>
      </div>
      <div className="trace-stage">
        <div className="trace-visual" aria-hidden="true">
          {steps.map((step, index) => (
            <div key={step.label} className={`trace-node ${index <= active ? "is-active" : ""}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {index < steps.length - 1 && <i />}
            </div>
          ))}
        </div>
        <p className="trace-kicker">{project.toUpperCase()} / EVENT {String(active + 1).padStart(2, "0")}</p>
        <h3>{steps[active].label}</h3>
        <p>{steps[active].detail}</p>
        <div className="trace-controls">
          {steps.map((step, index) => (
            <button key={step.label} onClick={() => setActive(index)} className={index === active ? "is-active" : ""} aria-label={`Show trace step ${index + 1}: ${step.label}`}>{String(index + 1).padStart(2, "0")}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
