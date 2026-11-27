"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { person } from "@/data/profile";
import { copyText } from "@/lib/clipboard";
import { btn, cx } from "@/lib/ui";
import { Icon, LinkedInIcon } from "./Icons";
import { SectionHeader } from "./SectionHeader";
import { useToast } from "./Toast";

type Field = "name" | "email" | "company" | "message";
type Values = Record<Field, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: Field, v: string): string {
  const value = v.trim();
  if (field === "name" && !value) return "Enter your name so I know who's reaching out.";
  if (field === "email") {
    if (!value) return "Enter your email so I can reply.";
    if (!EMAIL_RE.test(value)) return "Enter a valid email, like name@company.com.";
  }
  if (field === "message" && value.length < 10) return "Add a short message — at least 10 characters.";
  return "";
}

export function Contact() {
  const toast = useToast();
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    company: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const copy = async (text: string, label: string) => {
    const ok = await copyText(text);
    toast(ok ? `Copied ${label}` : `${label}: ${text}`);
  };

  const onBlur = (field: Field) => {
    setErrors((e) => ({ ...e, [field]: validate(field, values[field]) }));
  };

  const onChange = (field: Field, v: string) => {
    setValues((s) => ({ ...s, [field]: v }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, v) }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    (["name", "email", "message"] as Field[]).forEach((f) => {
      const err = validate(f, values[f]);
      if (err) next[f] = err;
    });
    setErrors(next);
    const firstInvalid = (["name", "email", "message"] as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }
    const subject = `Opportunity for Maeen Uddin${values.company.trim() ? ` — ${values.company.trim()}` : ""}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}${values.company.trim() ? `, ${values.company.trim()}` : ""}\n${values.email.trim()}`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input =
    "h-11 w-full rounded-lg border bg-canvas px-3 text-base text-ink placeholder:text-ink-subtle transition-colors duration-150 hover:border-line-strong md:text-[15px]";

  const fieldProps = (f: Field) => ({
    id: `contact-${f}`,
    value: values[f],
    onBlur: () => onBlur(f),
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `contact-${f}-error` : undefined,
  });

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={`contact-${f}-error`} role="alert" className="mt-1.5 text-[13px] text-[#b42318] dark:text-[#ff8a80]">
        {errors[f]}
      </p>
    ) : null;

  return (
    <section aria-labelledby="contact" className="py-16 lg:py-24">
      <div className="container-page">
        <SectionHeader
          id="contact"
          index="05"
          eyebrow="Contact"
          title="Hiring for power, data center, or semiconductor infrastructure?"
          lede={person.availability}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="reveal rounded-xl border border-line bg-surface">
            <ul>
              <li className="flex items-center justify-between gap-3 border-b border-line p-5 sm:px-6">
                <div className="min-w-0">
                  <p className="eyebrow">Email</p>
                  <a href={`mailto:${person.email}`} className="block min-h-11 truncate pt-1 text-[15px] leading-10 font-medium text-ink underline-offset-4 hover:underline md:min-h-0 md:leading-normal">
                    {person.email}
                  </a>
                </div>
                <button type="button" onClick={() => copy(person.email, "email")} className={btn.secondary} aria-label="Copy email address">
                  <Icon name="copy" size={15} />
                  Copy
                </button>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-line p-5 sm:px-6">
                <div className="min-w-0">
                  <p className="eyebrow">Phone</p>
                  <a href={person.phoneHref} className="block min-h-11 pt-1 text-[15px] leading-10 font-medium text-ink tabular-nums underline-offset-4 hover:underline md:min-h-0 md:leading-normal">
                    {person.phone}
                  </a>
                </div>
                <button type="button" onClick={() => copy(person.phone, "phone number")} className={btn.secondary} aria-label="Copy phone number">
                  <Icon name="copy" size={15} />
                  Copy
                </button>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-line p-5 sm:px-6">
                <div className="min-w-0">
                  <p className="eyebrow">LinkedIn</p>
                  <p className="mt-1 truncate text-[15px] font-medium text-ink">{person.linkedinLabel}</p>
                </div>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={btn.primary}>
                  <LinkedInIcon size={15} />
                  Connect
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li className="flex items-center justify-between gap-3 p-5 sm:px-6">
                <div className="min-w-0">
                  <p className="eyebrow">Location</p>
                  <p className="mt-1 text-[15px] font-medium text-ink">{person.location} · open to relocation</p>
                </div>
                <Link href="/resume/" className={btn.secondary}>
                  <Icon name="printer" size={15} />
                  CV
                </Link>
              </li>
            </ul>
          </div>

          <form noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="reveal rounded-xl border border-line bg-surface p-5 sm:p-6">
            <h3 id="form-title" className="text-base font-semibold text-ink">
              Send a message
            </h3>
            <p className="mt-1 text-sm text-ink-subtle">Opens a pre-filled email in your mail app — nothing is stored on this site.</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
                  Name <span className="text-ink-subtle">(required)</span>
                </label>
                <input
                  ref={refs.name}
                  {...fieldProps("name")}
                  onChange={(e) => onChange("name", e.target.value)}
                  type="text"
                  autoComplete="name"
                  className={cx(input, errors.name ? "border-[#b42318] dark:border-[#ff8a80]" : "border-line")}
                />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
                  Work email <span className="text-ink-subtle">(required)</span>
                </label>
                <input
                  ref={refs.email}
                  {...fieldProps("email")}
                  onChange={(e) => onChange("email", e.target.value)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  className={cx(input, errors.email ? "border-[#b42318] dark:border-[#ff8a80]" : "border-line")}
                />
                {fieldError("email")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-ink">
                  Company <span className="text-ink-subtle">(optional)</span>
                </label>
                <input
                  ref={refs.company}
                  {...fieldProps("company")}
                  onChange={(e) => onChange("company", e.target.value)}
                  type="text"
                  autoComplete="organization"
                  className={cx(input, "border-line")}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message <span className="text-ink-subtle">(required)</span>
                </label>
                <textarea
                  ref={refs.message}
                  {...fieldProps("message")}
                  onChange={(e) => onChange("message", e.target.value)}
                  rows={5}
                  placeholder="Role, location, and timeline…"
                  className={cx(input, "h-auto min-h-32 resize-y py-2.5", errors.message ? "border-[#b42318] dark:border-[#ff8a80]" : "border-line")}
                />
                {fieldError("message")}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="submit" className={btn.primary}>
                <Icon name="send" size={15} />
                Compose email
              </button>
              {sent && (
                <p role="status" className="text-sm text-ink-muted">
                  Your mail app should open. If it didn&apos;t,{" "}
                  <button type="button" onClick={() => copy(person.email, "email")} className="font-medium text-ink underline underline-offset-4">
                    copy my email
                  </button>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
