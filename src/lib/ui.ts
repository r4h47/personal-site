export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const btn = {
  primary: `${btnBase} h-11 px-4 md:h-10 bg-ink text-canvas hover:bg-ink/85`,
  secondary: `${btnBase} h-11 px-4 md:h-10 border border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-2`,
  ghost: `${btnBase} h-11 px-3 md:h-9 text-ink-muted hover:bg-surface-2 hover:text-ink`,
  icon: `${btnBase} size-11 md:size-9 text-ink-muted hover:bg-surface-2 hover:text-ink`,
};

export const chip =
  "inline-flex items-center rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-muted";
