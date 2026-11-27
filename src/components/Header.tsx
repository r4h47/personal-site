"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems, person } from "@/data/profile";
import { copyText } from "@/lib/clipboard";
import { btn, cx } from "@/lib/ui";
import { Icon, LinkedInIcon, LogoMark } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./Toast";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toast = useToast();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id)?.closest("section"))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const update = () => {
      const probe = window.innerHeight * 0.4;
      let current = "";
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) current = navItems[i].id;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const copyEmail = async () => {
    const ok = await copyText(person.email);
    toast(ok ? `Copied ${person.email}` : `Email: ${person.email}`);
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-3 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg py-1 pr-1" aria-label={`${person.shortName} — back to top`}>
          <LogoMark size={32} />
          <span className="min-w-0 leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight text-ink">{person.shortName}</span>
            <span className="hidden truncate text-xs text-ink-subtle lg:block">{person.roleTag}</span>
          </span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden xl:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cx(
                    "relative inline-flex h-9 items-center rounded-md px-3 text-sm transition-colors duration-150",
                    active === item.id ? "text-ink" : "text-ink-subtle hover:text-ink",
                  )}
                >
                  {item.label}
                  {active === item.id && (
                    <span aria-hidden="true" className="absolute inset-x-3 -bottom-[15px] h-px bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 xl:ml-3">
          <button type="button" onClick={copyEmail} className={cx(btn.ghost, "max-md:w-11 max-md:px-0")} aria-label={`Copy email address ${person.email}`}>
            <Icon name="copy" size={16} />
            <span className="hidden md:inline">Copy email</span>
          </button>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(btn.icon, "max-sm:hidden")}
            aria-label="LinkedIn profile (opens in a new tab)"
          >
            <LinkedInIcon size={16} />
          </a>
          <Link href="/resume/" className={cx(btn.primary, "ml-1 max-md:hidden")}>
            <Icon name="printer" size={16} />
            CV / Print
          </Link>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className={cx(btn.icon, "xl:hidden")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas xl:hidden">
          <nav aria-label="Sections (mobile)" className="mx-auto max-w-[1280px] px-5 py-3 sm:px-8">
            <ul className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center rounded-lg px-3 text-base text-ink hover:bg-surface-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-4">
              <Link href="/resume/" className={btn.primary}>
                <Icon name="printer" size={16} />
                CV / Print
              </Link>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={btn.secondary}>
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
              <a href={person.phoneHref} className={btn.secondary}>
                <Icon name="phone" size={16} />
                Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
