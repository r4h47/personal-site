"use client";

import { useState } from "react";
import { experience, experienceFilters, type ExperienceCategory } from "@/data/profile";
import { cx } from "@/lib/ui";
import { SectionHeader } from "./SectionHeader";

type Filter = "all" | ExperienceCategory;

export function Experience() {
  const [filter, setFilter] = useState<Filter>("all");
  const roles = experience.filter((r) => filter === "all" || r.categories.includes(filter));
  const count = (f: Filter) => (f === "all" ? experience.length : experience.filter((r) => r.categories.includes(f)).length);

  return (
    <section aria-labelledby="experience" className="border-b border-line py-16 lg:py-24">
      <div className="container-page">
        <SectionHeader
          id="experience"
          index="01"
          eyebrow="Experience"
          title="Field operations, commissioning, and research"
          lede="Seven and a half years running a live 132/11 kV substation, preceded by panel QA/QC and commissioning work and followed by graduate research in fault location."
        />

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter experience">
          {experienceFilters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cx(
                  "inline-flex h-11 items-center gap-2 rounded-lg border px-3.5 text-sm transition-colors duration-150 md:h-9",
                  active ? "border-ink bg-ink text-canvas" : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {f.label}
                <span className={cx("font-mono text-xs tabular-nums", active ? "text-canvas/70" : "text-ink-subtle")}>
                  {count(f.id)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {roles.length} of {experience.length} roles.
        </p>

        <ol className="mt-8 grid gap-4">
          {roles.map((role) => (
            <li key={role.id}>
              <article
                aria-labelledby={`role-${role.id}`}
                className="grid gap-4 rounded-xl border border-line bg-surface p-5 sm:p-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8 lg:p-7"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:block">
                  <p className="font-mono text-[13px] text-ink tabular-nums">{role.period}</p>
                  <p className="text-[13px] text-ink-subtle lg:mt-1">{role.location}</p>
                  {role.type && <p className="text-[13px] text-ink-subtle lg:mt-1">{role.type}</p>}
                </div>

                <div className="min-w-0">
                  <h3 id={`role-${role.id}`} className="text-lg leading-snug font-semibold tracking-[-0.01em] text-ink">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-ink-muted">
                    {role.org}
                    {role.orgDetail && <span className="text-ink-subtle"> · {role.orgDetail}</span>}
                  </p>
                  {role.note && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-ink">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      {role.note}
                    </p>
                  )}

                  <ul className="mt-4 grid gap-2">
                    {role.bullets.map((b) => (
                      <li key={b} className="relative pl-4 text-[15px] leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2 bg-line-strong" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {role.equipment && (
                    <div className="mt-6 border-t border-line pt-5">
                      <p className="eyebrow">Equipment under responsibility</p>
                      <dl className="mt-3 grid gap-x-8 sm:grid-cols-2">
                        {role.equipment.map((e) => (
                          <div key={e.item} className="flex items-baseline gap-3 border-b border-line py-2 text-sm last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                            <dt className="w-10 shrink-0 text-right font-mono text-ink tabular-nums">{e.qty}</dt>
                            <dd className="text-ink-muted">{e.item}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
