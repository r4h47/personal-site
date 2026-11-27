"use client";

import { useId, useMemo, useState } from "react";
import { skillCategories } from "@/data/profile";
import { cx } from "@/lib/ui";
import { Icon } from "./Icons";
import { SectionHeader } from "./SectionHeader";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-accent-soft text-ink [box-shadow:0_1px_0_var(--accent)]">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export function SkillsMatrix() {
  const [tab, setTab] = useState<string>("all");
  const [q, setQ] = useState("");
  const inputId = useId();
  const query = q.trim().toLowerCase();

  const groups = useMemo(
    () =>
      skillCategories
        .filter((c) => tab === "all" || c.id === tab)
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (s) => !query || s.name.toLowerCase().includes(query) || s.aliases?.some((a) => a.toLowerCase().includes(query)),
          ),
        }))
        .filter((c) => c.items.length > 0),
    [tab, query],
  );
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const all = skillCategories.reduce((n, g) => n + g.items.length, 0);

  return (
    <section aria-labelledby="skills" className="border-b border-line py-16 lg:py-24">
      <div className="container-page">
        <SectionHeader
          id="skills"
          index="03"
          eyebrow="Technical matrix"
          title="Search the technical stack"
          lede="Type a keyword from your job description — SFRA, IEC 61850, ATS, SCADA — to see where it shows up in my work."
        />

        <div className="mt-10 rounded-xl border border-line bg-surface">
          <div className="flex flex-col gap-3 border-b border-line p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor={inputId} className="sr-only">
                Search skills
              </label>
              <Icon name="search" size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-subtle" />
              <input
                id={inputId}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search skills, e.g. relay, DGA, PLC"
                autoComplete="off"
                spellCheck={false}
                className="h-11 w-full rounded-lg border border-line bg-canvas pr-3 pl-10 text-base text-ink placeholder:text-ink-subtle hover:border-line-strong md:text-sm"
              />
            </div>
            <p className="font-mono text-xs text-ink-subtle tabular-nums" aria-live="polite">
              {total} of {all} skills
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3 sm:px-5" role="group" aria-label="Skill category">
            {[{ id: "all", label: "All categories" }, ...skillCategories].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={tab === c.id}
                onClick={() => setTab(c.id)}
                className={cx(
                  "inline-flex h-11 shrink-0 items-center rounded-md border px-3 text-[13px] transition-colors duration-150 md:h-8",
                  tab === c.id ? "border-accent-line bg-accent-soft text-ink" : "border-transparent text-ink-subtle hover:bg-surface-2 hover:text-ink",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {groups.length === 0 ? (
            <div className="flex flex-col items-start gap-3 p-6 sm:p-8">
              <p className="text-[15px] text-ink">No skills match “{q.trim()}”.</p>
              <p className="text-sm text-ink-subtle">Try a broader term such as “transformer”, “relay”, or “testing”.</p>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setTab("all");
                }}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm text-ink hover:bg-surface-2 md:h-9"
              >
                <Icon name="reset" size={15} />
                Clear search
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-b-xl">
            <div className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <div key={g.id} className="border-r border-b border-line p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-ink">
                    {g.label}
                    <span className="ml-2 font-mono text-xs font-normal text-ink-subtle tabular-nums">{g.items.length}</span>
                  </h3>
                  <ul className="mt-3 grid gap-1.5">
                    {g.items.map((s) => (
                      <li key={s.name} className="flex items-start gap-2 text-sm leading-snug text-ink-muted">
                        <span aria-hidden="true" className="mt-[0.55em] size-1 shrink-0 rounded-full bg-line-strong" />
                        <span>
                          <Highlight text={s.name} query={query} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
