import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  certifications,
  education,
  experience,
  leadership,
  manuscript,
  person,
  projects,
  site,
  skillCategories,
  thesis,
} from "@/data/profile";
import { btn } from "@/lib/ui";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: `Printable CV — ${person.fullName}, ${person.cvHeadline}.`,
  alternates: { canonical: `${site.url}/resume/` },
  openGraph: {
    type: "profile",
    url: `${site.url}/resume/`,
    siteName: `${person.shortName} — Portfolio`,
    title: `CV — ${person.fullName}`,
    description: person.cvHeadline,
    locale: "en_US",
    images: [{ url: `${site.url}/og-image.png`, width: 1200, height: 630 }],
  },
};

const h2 = "border-b border-line-strong pb-1 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase";

export default function ResumePage() {
  return (
    <div className="min-h-dvh bg-canvas">
      <div className="no-print sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[860px] items-center justify-between gap-3 px-5">
          <Link href="/" className={btn.ghost}>
            <Icon name="arrowLeft" size={16} />
            Portfolio
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <PrintButton />
          </div>
        </div>
      </div>

      <main id="main" className="px-4 py-6 sm:px-5 sm:py-10">
        <article className="print-sheet mx-auto max-w-[860px] rounded-xl border border-line bg-surface p-6 text-[14px] leading-relaxed text-ink-muted sm:p-10">
          <header>
            <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.02em] text-ink">{person.fullName}</h1>
            <p className="mt-1 text-[15px] font-medium text-ink">{person.cvHeadline}</p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12.5px] text-ink-subtle tabular-nums">
              <span>{person.location}</span>
              <span aria-hidden="true">·</span>
              <a href={person.phoneHref}>{person.phone}</a>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${person.email}`}>{person.email}</a>
              <span aria-hidden="true">·</span>
              <a href={person.linkedin}>{person.linkedinLabel}</a>
            </p>
            <p className="mt-3">{person.availability}</p>
          </header>

          <section aria-labelledby="cv-exp" className="mt-7">
            <h2 id="cv-exp" className={h2}>Experience</h2>
            {experience.map((r) => (
              <div key={r.id} className="print-avoid-break mt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold text-ink">{r.title}</h3>
                  <p className="font-mono text-[12.5px] text-ink-subtle tabular-nums">{r.period}</p>
                </div>
                <p className="text-[13.5px]">
                  <span className="font-medium text-ink">{r.org}</span>
                  {r.orgDetail && <>, {r.orgDetail}</>}
                  <span className="text-ink-subtle">
                    {" "}
                    · {r.location}
                    {r.note && <> · {r.note}</>}
                  </span>
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-5 marker:text-ink-subtle">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {r.equipment && (
                  <p className="mt-1.5 text-[13px]">
                    <span className="font-medium text-ink">Equipment: </span>
                    {r.equipment.map((e) => `${e.qty} × ${e.item}`).join("; ")}.
                  </p>
                )}
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-proj" className="mt-7">
            <h2 id="cv-proj" className={h2}>Research & selected projects</h2>
            <div className="print-avoid-break mt-4">
              <h3 className="font-semibold text-ink">{thesis.title}</h3>
              <p className="text-[13px] text-ink-subtle">M.S. thesis · {thesis.institution} · 2026</p>
              <p className="mt-1">
                {`${thesis.line}, ${thesis.cases} fault cases (${thesis.conditions}, ${thesis.tools}): TW detection ${thesis.twDetection}% (${thesis.twDetected}/${thesis.cases}) with ${thesis.twMedianErrorM} m median / ${thesis.twMaxErrorM} m max error; Takagi median error ${thesis.takagiMedianErrorKm.toFixed(2)} km; ${thesis.combinedWithin2km.toFixed(1)}% combined accuracy within 2 km. Simulation only — not field-validated.`}
              </p>
            </div>
            <div className="print-avoid-break mt-3">
              <h3 className="font-semibold text-ink">{manuscript.title}</h3>
              <p className="text-[13px] text-ink-subtle">{manuscript.label}</p>
            </div>
            <div className="print-avoid-break mt-3">
              <h3 className="font-semibold text-ink">
                {projects.substation.title} — {projects.substation.org}
              </h3>
              <p className="text-[13px] text-ink-subtle">2018 – 2020</p>
              <p className="mt-1">{projects.substation.scope.map((s) => s.v).join("; ")}.</p>
            </div>
            <div className="print-avoid-break mt-3">
              <h3 className="font-semibold text-ink">{projects.diagnostics.title}</h3>
              <p className="text-[13px] text-ink-subtle">2016 · {projects.diagnostics.sites.map((s) => s.org).join(" · ")}</p>
              <p className="mt-1">{projects.diagnostics.tests.join(", ")}.</p>
            </div>
          </section>

          <section aria-labelledby="cv-edu" className="print-avoid-break mt-7">
            <h2 id="cv-edu" className={h2}>Education</h2>
            {education.map((e) => (
              <div key={e.school} className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4">
                <p>
                  <span className="font-semibold text-ink">{e.degree}</span> — {e.school}, {e.location}
                  {e.gpa && <span className="tabular-nums"> · GPA {e.gpa}</span>}
                </p>
                <p className="font-mono text-[12.5px] text-ink-subtle tabular-nums">{e.date}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-skills" className="print-avoid-break mt-7">
            <h2 id="cv-skills" className={h2}>Technical skills</h2>
            <dl className="mt-3 grid gap-1.5">
              {skillCategories.map((c) => (
                <div key={c.id} className="grid gap-x-4 sm:grid-cols-[190px_1fr]">
                  <dt className="font-medium text-ink">{c.label}</dt>
                  <dd>{c.items.map((i) => i.name).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="cv-cert" className="print-avoid-break mt-7">
            <h2 id="cv-cert" className={h2}>Certifications, leadership & languages</h2>
            <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-ink-subtle">
              {certifications.map((c) => (
                <li key={c.name}>
                  <span className="text-ink">{c.name}</span> — {c.issuer}, {c.date}
                  {c.detail && <> ({c.detail})</>}
                </li>
              ))}
              {leadership.map((l) => (
                <li key={l.name}>
                  <span className="text-ink">{l.name}</span>
                  {l.date && <>, {l.date}</>}
                </li>
              ))}
            </ul>
            <p className="mt-2">
              <span className="font-medium text-ink">Languages: </span>
              {person.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
