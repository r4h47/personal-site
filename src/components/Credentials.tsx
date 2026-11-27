import { certifications, education, leadership, person } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";

const colTitle = "eyebrow border-b border-line pb-3";

export function Credentials() {
  return (
    <section aria-labelledby="credentials" className="border-b border-line py-16 lg:py-24">
      <div className="container-page">
        <SectionHeader
          id="credentials"
          index="04"
          eyebrow="Credentials"
          title="Education, certifications, and leadership"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div className="reveal">
            <h3 className={colTitle}>Education</h3>
            <ul className="mt-2">
              {education.map((e) => (
                <li key={e.school} className="border-b border-line py-5 last:border-b-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-semibold text-ink">{e.degree}</p>
                    <p className="font-mono text-[13px] text-ink-subtle tabular-nums">{e.date}</p>
                  </div>
                  <p className="mt-1 text-[15px] text-ink-muted">{e.school}</p>
                  <p className="text-[13px] text-ink-subtle">{e.location}</p>
                  {e.gpa && (
                    <p className="mt-3 inline-flex items-baseline gap-2 rounded-md border border-line px-2.5 py-1">
                      <span className="text-[13px] text-ink-subtle">GPA</span>
                      <span className="font-mono text-sm font-medium text-ink tabular-nums">{e.gpa}</span>
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className={colTitle}>Certifications & training</h3>
            <ul className="mt-2">
              {certifications.map((c) => (
                <li key={c.name} className="border-b border-line py-4 last:border-b-0">
                  <p className="text-[15px] leading-snug font-medium text-ink">{c.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{c.issuer}</p>
                  <p className="mt-1 font-mono text-xs text-ink-subtle tabular-nums">
                    {c.date}
                    {c.id && <> · ID {c.id}</>}
                    {c.detail && <> · {c.detail}</>}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className={colTitle}>Leadership & recognition</h3>
            <ul className="mt-2">
              {leadership.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-3 border-b border-line py-4">
                  <p className="text-[15px] leading-snug font-medium text-ink">{l.name}</p>
                  {l.date && <p className="shrink-0 font-mono text-xs text-ink-subtle tabular-nums">{l.date}</p>}
                </li>
              ))}
            </ul>

            <h3 className={`${colTitle} mt-10`}>Languages</h3>
            <dl className="mt-2 grid grid-cols-2 gap-x-6">
              {person.languages.map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-2 border-b border-line py-3">
                  <dt className="text-[15px] text-ink">{l.name}</dt>
                  <dd className="font-mono text-xs text-ink-subtle">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
