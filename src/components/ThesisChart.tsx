"use client";

import { useState } from "react";
import { thesis } from "@/data/profile";
import { cx } from "@/lib/ui";

type View = "error" | "accuracy";

const AXIS_MAX_KM = 2.5;
const ticks = [0, 0.5, 1, 1.5, 2, 2.5];

export function ThesisChart() {
  const [view, setView] = useState<View>("error");
  const twKm = thesis.twMedianErrorM / 1000;
  const ratio = Math.round(thesis.takagiMedianErrorKm / twKm);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Results · {thesis.scenarios} simulated scenarios</p>
        <div className="inline-flex rounded-lg border border-line bg-canvas p-0.5" role="group" aria-label="Chart view">
          {(
            [
              ["error", "Location error"],
              ["accuracy", "Detection & accuracy"],
            ] as [View, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => setView(id)}
              className={cx(
                "h-11 rounded-md px-3 text-xs font-medium transition-colors duration-150 md:h-8",
                view === id ? "bg-surface-2 text-ink shadow-[inset_0_0_0_1px_var(--line)]" : "text-ink-subtle hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "error" ? (
        <figure className="mt-6" key="error">
          <figcaption className="text-sm text-ink-muted">
            Median fault-location error, km — lower is better.
          </figcaption>

          <div className="relative mt-5">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute top-0 bottom-6 w-px bg-line"
                  style={{ left: `${(t / AXIS_MAX_KM) * 100}%` }}
                />
              ))}
            </div>

            <div className="relative grid gap-5 pb-6">
              <Bar label="Travelling-wave (TW)" value={`${thesis.twMedianErrorM} m`} pct={(twKm / AXIS_MAX_KM) * 100} kind="tw" />
              <Bar
                label="Impedance-based (Takagi)"
                value={`${thesis.takagiMedianErrorKm.toFixed(2)} km`}
                pct={(thesis.takagiMedianErrorKm / AXIS_MAX_KM) * 100}
                kind="takagi"
              />
            </div>

            <div aria-hidden="true" className="relative h-4 font-mono text-xs text-ink-subtle tabular-nums">
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
                  style={{ left: `${(t / AXIS_MAX_KM) * 100}%` }}
                >
                  {t === 0 ? "0" : t.toFixed(1)}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm text-ink-muted">
            TW&apos;s median error was roughly <strong className="font-semibold text-ink tabular-nums">{ratio}×</strong> smaller
            than the impedance-based Takagi method.
          </p>
        </figure>
      ) : (
        <figure className="mt-6" key="accuracy">
          <figcaption className="text-sm text-ink-muted">Share of simulated faults — higher is better.</figcaption>
          <div className="mt-5 grid gap-6">
            <Meter label="TW detection rate" value={thesis.twDetection} />
            <Meter label="Combined accuracy within 2 km" value={thesis.combinedWithin2km} />
          </div>
        </figure>
      )}

      <div className="sr-only">
      <table>
        <caption>Thesis results across {thesis.scenarios} simulated fault scenarios</caption>
        <tbody>
          <tr>
            <th scope="row">TW detection rate</th>
            <td>{thesis.twDetection}%</td>
          </tr>
          <tr>
            <th scope="row">TW median location error</th>
            <td>{thesis.twMedianErrorM} m</td>
          </tr>
          <tr>
            <th scope="row">Takagi median location error</th>
            <td>{thesis.takagiMedianErrorKm.toFixed(2)} km</td>
          </tr>
          <tr>
            <th scope="row">Combined accuracy within 2 km</th>
            <td>{thesis.combinedWithin2km.toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

function Bar({ label, value, pct, kind }: { label: string; value: string; pct: number; kind: "tw" | "takagi" }) {
  return (
    <div aria-hidden="true">
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-mono text-ink tabular-nums">{value}</span>
      </div>
      <div className="h-7 rounded-[5px]">
        <div
          className={cx("bar-grow h-full rounded-[5px]", kind === "tw" ? "bg-accent" : "hatch")}
          style={{ width: `max(${pct}%, 6px)` }}
        />
      </div>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div aria-hidden="true">
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-mono text-lg font-medium text-ink tabular-nums">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-2 shadow-[inset_0_0_0_1px_var(--line)]">
        <div className="bar-grow h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
      </div>
      <div className="mt-1 flex justify-between font-mono text-xs text-ink-subtle tabular-nums">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
