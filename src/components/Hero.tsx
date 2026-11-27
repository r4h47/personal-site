import Link from "next/link";
import { metrics, person } from "@/data/profile";
import { btn } from "@/lib/ui";
import { Icon } from "./Icons";
import { SldDiagram } from "./SldDiagram";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div className="blueprint" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 lg:pt-12 lg:pb-12">
        <div>
          <p className="eyebrow">{person.fullName}</p>

          <h1 id="hero-title" className="mt-5 text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-ink">
            {person.headline}
          </h1>
          <p className="mt-3 text-[clamp(1.125rem,2vw,1.375rem)] leading-snug tracking-[-0.01em] text-ink-muted">
            {person.headlineSub}
          </p>

          <p className="mt-6 max-w-[58ch] text-base leading-7 text-ink-muted">
            I spent seven and a half years in operation and maintenance of the 132/11&nbsp;kV AIS grid substation
            supplying a 24/7 steel mill — scheduled maintenance outages, root-cause analysis from relay event data,
            and emergency restoration on rotating shifts — and was promoted to Senior Engineer in 2022. Since 2024
            I&apos;ve worked on fault-location research at Wentworth Institute of Technology.
          </p>

          <p id="availability-label" className="eyebrow mt-7">Open to</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-labelledby="availability-label">
            {person.availabilityBadges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-ink-muted"
              >
                <Icon name="check" size={13} className="text-accent" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#experience" className={btn.primary}>
              View field experience
            </a>
            <Link href="/resume/" className={btn.secondary}>
              <Icon name="printer" size={16} />
              CV / Print view
            </Link>
          </div>
        </div>

        <SldDiagram />
      </div>

      <div className="relative border-t border-line bg-surface/60">
        <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={[
                "py-6 pr-4 lg:py-7",
                i % 2 === 1 ? "border-l border-line pl-5 lg:pl-6" : "",
                i === 2 ? "lg:border-l lg:border-line lg:pl-6" : "",
                i >= 2 ? "border-t border-line lg:border-t-0" : "",
              ].join(" ")}
            >
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="flex items-baseline gap-1.5">
                  <span className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums">
                    {m.value}
                  </span>
                  <span className="font-mono text-xs text-ink-subtle tabular-nums">{m.unit}</span>
                </span>
                <span aria-hidden="true" className="mt-2 block text-[13px] leading-snug text-ink-subtle">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
