export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  lede,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow">
        <span className="tabular-nums text-accent">{index}</span>
        <span aria-hidden="true" className="mx-2 text-line-strong">/</span>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-ink">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-[62ch] text-base leading-7 text-ink-muted">{lede}</p>}
    </div>
  );
}
