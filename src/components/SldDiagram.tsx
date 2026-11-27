"use client";

import { useState } from "react";
import { cx } from "@/lib/ui";
import { Icon } from "./Icons";

type NodeId = "grid" | "sf6" | "tx" | "vcb" | "crt" | "dg" | "prot";
type View = NodeId | "tw";

const NODES: Record<NodeId, { chip: string; title: string; specs: [string, string][] }> = {
  grid: {
    chip: "132 kV line",
    title: "132 kV LILO interconnection",
    specs: [
      ["Grid", "PGCB 132 kV line, line-in / line-out"],
      ["Coordination", "PGCB & NLDC — shutdowns, clearances"],
      ["Commissioned", "2018–2020 project"],
    ],
  },
  sf6: {
    chip: "SF6 breakers",
    title: "132 kV SF6 circuit breakers",
    specs: [
      ["Fleet", "4 × 132 kV SF6 CB"],
      ["Testing", "Annual program covering 17 breakers"],
    ],
  },
  tx: {
    chip: "Power transformer",
    title: "Main power transformer",
    specs: [
      ["Rating", "30/35 MVA · 132/11 kV"],
      ["Fleet", "2 power transformers maintained"],
      ["OLTC", "Tap-changer operations reduced 40%"],
    ],
  },
  vcb: {
    chip: "11 kV VCBs",
    title: "11 kV switchboard",
    specs: [
      ["Fleet", "13 × 11 kV vacuum CB"],
      ["Network", "11 kV underground across the plant"],
    ],
  },
  crt: {
    chip: "Cast-resin TX",
    title: "Cast-resin transformer",
    specs: [
      ["Rating", "500 kVA · 11/0.415 kV"],
      ["Scope", "Installed, tested, commissioned"],
    ],
  },
  dg: {
    chip: "Standby gen",
    title: "Standby generation",
    specs: [
      ["Units", "2 × 1,250 kVA diesel generators"],
      ["Transfer", "Automatic transfer switch (ATS)"],
      ["Diagram", "Shown on LV side — illustrative"],
    ],
  },
  prot: {
    chip: "Protection & DC",
    title: "Protection & DC system",
    specs: [
      ["Relays", "13 × MiCOM OC/EF · 9 × SEL"],
      ["Busbar", "4 × MiCOM busbar relays"],
      ["DC", "192-unit NiCd bank + charger"],
      ["Calibration", "Triennial relay calibration"],
    ],
  },
};

const TW_VIEW = {
  title: "Travelling-wave principle — illustration",
  specs: [
    ["Shown", "Generic double-ended TW location"],
    ["Distance", "d = (L + v·(tA − tB)) / 2"],
    ["Thesis", "200 km, 230 kV line · 3,600 EMT cases"],
  ] as [string, string][],
};

// Geometry: fault on the right line section; terminal A = substation tap, B = remote end.
const FAULT_X = 476;
const A_X = 320;
const B_X = 536;
const SPEED = 110; // svg units per second — identical in both directions

export function SldDiagram() {
  const [view, setView] = useState<View>("tx");
  const [run, setRun] = useState(0);

  const select = (id: NodeId) => setView(id);
  const simulate = () => {
    setRun((r) => r + 1);
    setView("tw");
  };

  const node = (id: NodeId) => ({
    className: cx("sld-node", view === id && "is-active"),
    onClick: () => select(id),
  });

  const content = view === "tw" ? TW_VIEW : NODES[view];
  const faultActive = run > 0;

  return (
    <figure className="relative rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <figcaption className="eyebrow">Simplified SLD · illustrative</figcaption>
        <button
          type="button"
          onClick={simulate}
          className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-line px-3 text-xs font-medium text-ink transition-colors duration-150 hover:border-accent-line hover:bg-accent-soft md:h-8"
        >
          <Icon name="zap" size={14} className="text-accent" />
          {faultActive ? "Replay demo" : "Fault-location demo"}
        </button>
      </div>

      <svg
        viewBox="0 0 560 420"
        className="sld block h-auto w-full"
        role="img"
        aria-label="Simplified, illustrative single-line diagram of a 132/11 kV LILO air-insulated substation — not the as-built drawing: 132 kV line taps with SF6 breakers, a 30/35 MVA 132/11 kV transformer, 11 kV vacuum-breaker feeders, a 500 kVA 11/0.415 kV cast-resin transformer, two 1,250 kVA standby generators with ATS on the low-voltage side, and MiCOM/SEL protection."
      >
        {/* ---- 132 kV line (LILO) ---- */}
        <g {...node("grid")}>
          <rect className="hit" x="14" y="14" width="532" height="40" rx="6" />
          <path className="cond live" d="M24 36 H240 M320 36 H536" />
          <text className="lbl" x="24" y="27">◂ PGCB 132 kV</text>
          <text className="lbl" x="536" y="27" textAnchor="end">PGCB ▸</text>
          <text className="lbl lbl-strong" x="280" y="27" textAnchor="middle">LILO</text>
        </g>

        {/* line taps down to 132 kV bus */}
        <path className="cond live" d="M240 36 V69 M240 87 V140 M320 36 V69 M320 87 V140" />

        {/* ---- SF6 breakers ---- */}
        <g {...node("sf6")}>
          <rect className="hit" x="224" y="62" width="32" height="32" rx="6" />
          <rect className="hit" x="304" y="62" width="32" height="32" rx="6" />
          <rect className="hit" x="264" y="152" width="32" height="32" rx="6" />
          <rect className="sym" x="231" y="69" width="18" height="18" rx="2" />
          <rect className="sym" x="311" y="69" width="18" height="18" rx="2" />
          <rect className="sym" x="271" y="159" width="18" height="18" rx="2" />
          <text className="lbl" x="200" y="82" textAnchor="end">SF6 CB</text>
        </g>

        {/* 132 kV bus */}
        <path className="bus live" d="M180 140 H380" />
        <text className="lbl lbl-strong" x="388" y="144">132 kV</text>

        {/* transformer bay */}
        <path className="cond live" d="M280 140 V159 M280 177 V197" />

        {/* ---- Protection & DC ---- */}
        <g {...node("prot")}>
          <rect className="hit" x="320" y="170" width="70" height="72" rx="6" />
          <circle className="sym" cx="280" cy="188" r="4" />
          <path className="cond" d="M284 188 H334" strokeDasharray="3 3" />
          <rect className="sym" x="334" y="178" width="26" height="20" rx="3" />
          <text className="lbl lbl-strong" x="347" y="191.5" textAnchor="middle">R</text>
          <path className="cond" d="M341 214 V230 M347 218 V226 M353 214 V230 M359 218 V226" />
          <text className="lbl" x="366" y="191.5">MiCOM / SEL</text>
          <text className="lbl" x="366" y="226">DC</text>
        </g>

        {/* ---- Power transformer ---- */}
        <g {...node("tx")}>
          <rect className="hit" x="244" y="194" width="72" height="62" rx="6" />
          <circle className="sym" cx="280" cy="212" r="14" style={{ fill: "transparent" }} />
          <circle className="sym" cx="280" cy="236" r="14" style={{ fill: "transparent" }} />
          <text className="lbl lbl-strong" x="236" y="218" textAnchor="end">30/35 MVA</text>
          <text className="lbl" x="236" y="232" textAnchor="end">132/11 kV</text>
        </g>

        <path className="cond" d="M280 250 V266 M280 280 V300" />
        <rect className="sym" x="273" y="266" width="14" height="14" rx="2" />

        {/* 11 kV bus */}
        <path className="bus" d="M60 300 H470" />
        <text className="lbl lbl-strong" x="478" y="304">11 kV</text>

        {/* ---- 11 kV VCB feeders ---- */}
        <g {...node("vcb")}>
          <rect className="hit" x="312" y="306" width="142" height="64" rx="6" />
          {[330, 365, 400, 435].map((x) => (
            <g key={x}>
              <path className="cond" d={`M${x} 300 V314 M${x} 324 V346`} />
              <rect className="sym" x={x - 5} y="314" width="10" height="10" rx="1.5" />
              <path className="cond" d={`M${x - 4} 342 L${x} 348 L${x + 4} 342`} />
            </g>
          ))}
          <text className="lbl" x="382" y="364" textAnchor="middle">11 kV VCB feeders</text>
        </g>

        {/* ---- Cast-resin transformer 11/0.415 kV ---- */}
        <g {...node("crt")}>
          <rect className="hit" x="40" y="306" width="96" height="46" rx="6" />
          <path className="cond" d="M110 300 V313 M110 345 V362" />
          <circle className="sym" cx="110" cy="322" r="9" style={{ fill: "transparent" }} />
          <circle className="sym" cx="110" cy="336" r="9" style={{ fill: "transparent" }} />
          <text className="lbl" x="95" y="333" textAnchor="end">500 kVA</text>
        </g>

        {/* 0.415 kV LV bus — standby generation connects at low voltage */}
        <path className="bus" d="M70 362 H210" style={{ strokeWidth: 2 }} />
        <text className="lbl lbl-strong" x="216" y="366">0.415 kV</text>

        {/* ---- Standby generation (LV side, via ATS) ---- */}
        <g {...node("dg")}>
          <rect className="hit" x="30" y="366" width="182" height="50" rx="6" />
          <path className="cond" d="M170 362 V370 M170 384 V390 M150 390 H190 M150 390 V395 M190 390 V395" />
          <rect className="sym" x="156" y="370" width="28" height="14" rx="2" />
          <text className="lbl lbl-strong" x="170" y="380.5" textAnchor="middle" style={{ fontSize: 8 }}>ATS</text>
          <circle className="sym" cx="150" cy="404" r="9" />
          <circle className="sym" cx="190" cy="404" r="9" />
          <text className="lbl lbl-strong" x="150" y="407.5" textAnchor="middle">G</text>
          <text className="lbl lbl-strong" x="190" y="407.5" textAnchor="middle">G</text>
          <text className="lbl" x="136" y="408" textAnchor="end">2 × 1,250 kVA</text>
        </g>

        {/* ---- Travelling-wave fault simulation ---- */}
        {faultActive && (
          <g key={run} aria-hidden="true">
            <text className="lbl lbl-strong" x={A_X + 6} y="52">A</text>
            <text className="lbl lbl-strong" x={B_X - 6} y="52" textAnchor="end">B</text>
            <circle className="tw-ripple" cx={FAULT_X} cy="36" r="8" />
            <path d={`M${FAULT_X + 3} 22 l-7 11 h6 l-6 11`} fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <circle
              className="tw-pulse"
              cx={FAULT_X}
              cy="36"
              r="4.5"
              style={{ ["--dx" as string]: `${A_X - FAULT_X}px`, ["--dur" as string]: `${(FAULT_X - A_X) / SPEED}s` }}
            />
            <circle
              className="tw-pulse"
              cx={FAULT_X}
              cy="36"
              r="4.5"
              style={{ ["--dx" as string]: `${B_X - FAULT_X}px`, ["--dur" as string]: `${(B_X - FAULT_X) / SPEED}s` }}
            />
            <path className="cond live" d={`M${FAULT_X - 14} 46 H${A_X + 18}`} strokeDasharray="2 4" />
            <path className="cond live" d={`M${FAULT_X + 14} 46 H${B_X - 16}`} strokeDasharray="2 4" />
          </g>
        )}
      </svg>

      <div className="border-t border-line px-4 py-3">
        <p className="sr-only">Select a component to see its specifications.</p>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Substation components">
          {(Object.keys(NODES) as NodeId[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => select(id)}
              className={cx(
                "inline-flex h-11 items-center rounded-md border px-2.5 font-mono text-xs transition-colors duration-150 md:h-8",
                view === id
                  ? "border-accent-line bg-accent-soft text-ink"
                  : "border-line text-ink-subtle hover:border-line-strong hover:text-ink",
              )}
            >
              {NODES[id].chip}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-3 min-h-[104px]">
          <p className="text-sm font-semibold text-ink">{content.title}</p>
          <dl className="mt-1.5 grid gap-x-4 gap-y-1 text-[13px] sm:grid-cols-[auto_1fr]">
            {content.specs.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-mono text-ink-subtle">{k}</dt>
                <dd className="font-mono tabular-nums text-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </figure>
  );
}
