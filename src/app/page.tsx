import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { education, person, site, skillCategories } from "@/data/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.fullName,
  alternateName: person.shortName,
  jobTitle: person.headline,
  description: site.description,
  url: `${site.url}/`,
  email: `mailto:${person.email}`,
  telephone: "+1-617-751-0493",
  sameAs: [person.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  hasCredential: education.map((e) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: e.degree,
    recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
  })),
  knowsAbout: skillCategories.flatMap((c) => c.items.map((i) => i.name)).slice(0, 40),
  knowsLanguage: person.languages.map((l) => l.name === "Bangla" ? "Bengali" : l.name),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Experience />
        <Projects />
        <SkillsMatrix />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
