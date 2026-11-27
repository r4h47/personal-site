import { manuscript, projects, thesis } from "@/data/profile";
import { chip } from "@/lib/ui";
import { SectionHeader } from "./SectionHeader";
import { ThesisChart } from "./ThesisChart";

const panel = "reveal rounded-xl border border-line bg-surface";

export function Projects() {
  const { substation, diagnostics } = projects;

  return (
    <section aria-labelledby="projects" className="border-b border-line py-16 lg:py-24">
      <div className="container-page">
        <SectionHeader
          id="projects"
          index="02"
          eyebrow="Research & case studies"
          title="Selected research and commissioning work"
          lede="A simulation-based thesis comparing two fault-location methods, and field projects where I installed, tested, and commissioned HV/MV equipment."
        />

        {/* Thesis */}
        <article aria-labelledby="case-thesis" className={`${panel} mt-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`}>
          <div className="p-6 sm:p-8">
            <p className="eyebrow text-accent">{thesis.label}</p>
            <h3 id="case-thesis" className="mt-3 text-xl leading-snug font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
              {thesis.title}
            </h3>
            <p className="mt-2 font-mono text-[13px] text-ink-subtle">
              {thesis.institution} · {thesis.tools}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              An electromagnetic-transient (EMT) study in MATLAB/Simulink of a {thesis.line}, comparing travelling-wave
              fault location with the impedance-based Takagi method across {thesis.cases} fault cases.
            </p>
            <p className="mt-3 border-l-2 border-line-strong pl-3 text-sm leading-relaxed text-ink-subtle">{thesis.caveat}</p>

            <dl className="mt-6 grid grid-cols-2 border-t border-line">
              {[
                [thesis.cases, "Noise-free EMT fault cases"],
                [`${thesis.twDetection}%`, `TW detection (${thesis.twDetected} / ${thesis.cases})`],
                [`${thesis.twMedianErrorM} m`, `TW median error (max ${thesis.twMaxErrorM} m)`],
                [`${thesis.combinedWithin2km.toFixed(1)}%`, "Combined accuracy ≤ 2 km"],
              ].map(([v, k], i) => (
                <div key={k} className={`border-b border-line py-4 ${i % 2 === 1 ? "border-l pl-4" : "pr-4"}`}>
                  <dt className="text-[13px] text-ink-subtle">{k}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-ink tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-line p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <ThesisChart />
          </div>
        </article>

        <aside aria-label="Manuscript in preparation" className="reveal mt-4 flex flex-col gap-1 rounded-xl border border-dashed border-line-strong px-6 py-4 sm:flex-row sm:items-baseline sm:gap-4 sm:px-8">
          <p className="eyebrow shrink-0">{manuscript.label}</p>
          <p className="text-[15px] leading-relaxed text-ink-muted">{manuscript.title}</p>
        </aside>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Substation commissioning */}
          <article aria-labelledby="case-substation" className={`${panel} p-6 sm:p-8`}>
            <p className="eyebrow text-accent">{substation.label}</p>
            <h3 id="case-substation" className="mt-3 text-xl leading-snug font-semibold tracking-[-0.015em] text-ink">
              {substation.title}
            </h3>
            <p className="mt-1 font-mono text-[13px] text-ink-subtle">{substation.org}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{substation.summary}</p>
            <dl className="mt-6 border-t border-line">
              {substation.scope.map((s) => (
                <div key={s.k} className="grid gap-1 border-b border-line py-3 last:border-b-0 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="text-[13px] text-ink-subtle">{s.k}</dt>
                  <dd className="font-mono text-[13px] text-ink tabular-nums">{s.v}</dd>
                </div>
              ))}
            </dl>
          </article>

          {/* Diagnostics */}
          <article aria-labelledby="case-diagnostics" className={`${panel} p-6 sm:p-8`}>
            <p className="eyebrow text-accent">{diagnostics.label}</p>
            <h3 id="case-diagnostics" className="mt-3 text-xl leading-snug font-semibold tracking-[-0.015em] text-ink">
              {diagnostics.title}
            </h3>
            <div className="mt-4 grid gap-4">
              {diagnostics.sites.map((s) => (
                <div key={s.org}>
                  <p className="font-mono text-[13px] text-ink">{s.org}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{s.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <p className="eyebrow">Tests executed</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {diagnostics.tests.map((t) => (
                  <li key={t} className={chip}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
