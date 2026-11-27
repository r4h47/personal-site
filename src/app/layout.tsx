import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import { person, site } from "@/data/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: { default: site.title, template: `%s — ${person.shortName}` },
  description: site.description,
  applicationName: `${person.shortName} — Portfolio`,
  authors: [{ name: person.fullName, url: person.linkedin }],
  creator: person.fullName,
  keywords: [
    "electrical power systems engineer",
    "substation engineer",
    "132/11 kV substation",
    "HV diagnostics",
    "protection relays",
    "data center critical infrastructure",
    "semiconductor facilities",
    "field service engineer",
    "travelling-wave fault location",
    "Boston",
  ],
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "profile",
    firstName: "Maeen Uddin",
    lastName: "Mohammad Abdur Rahman",
    url: `${site.url}/`,
    siteName: `${person.shortName} — Portfolio`,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [{ url: `${site.url}/og-image.png`, width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/og-image.png`],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="no-print sr-only z-[70] rounded-b-lg bg-ink px-4 py-3 text-sm font-medium text-canvas focus:not-sr-only focus:fixed focus:top-0 focus:left-4"
        >
          Skip to main content
        </a>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
