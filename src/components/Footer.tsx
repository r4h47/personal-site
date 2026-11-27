import Link from "next/link";
import { person } from "@/data/profile";

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {person.fullName}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          <li>
            <a href={`mailto:${person.email}`} className="inline-flex min-h-11 items-center hover:text-ink md:min-h-6">
              Email
            </a>
          </li>
          <li>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-ink md:min-h-6">
              LinkedIn
            </a>
          </li>
          <li>
            <Link href="/resume/" className="inline-flex min-h-11 items-center hover:text-ink md:min-h-6">
              Printable CV
            </Link>
          </li>
          <li>
            <a href="#top" className="inline-flex min-h-11 items-center hover:text-ink md:min-h-6">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
