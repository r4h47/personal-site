# Content Guide — Before You Publish

Career details were filled in from a **screenshot of your LinkedIn profile** (2026-07-12). The
screenshot was low-resolution, so **every date and small detail must be verified against your
actual CV** — items I could not read confidently are marked **in amber with a dashed underline**
on the page and tagged `[verify: ...]` or `[EDIT: ...]` in `index.html`. Do not publish (and
definitely do not cite in an NIW petition) until all are confirmed.

## Facts taken from the LinkedIn screenshot — confirm each one

- Full name: Maeen Uddin Mohammad Abdur Rahman (short form "Maeen Uddin" used in the UI)
- Graduate Research Assistant + M.S. EE, Wentworth Institute of Technology, Boston, MA
- Engineer → Senior Engineer, 132/33 kV grid substation, PHP Integrated Steel Mills Ltd. (~5 yrs; promoted 2023?)
- PHP 132/33 kV grid substation + 132 kV transmission line project, Feni, Bangladesh
- 11/0.415 kV substation installation & commissioning, Western Marine Shipyard Limited
- B.Sc. EEE, International Islamic University Chittagong; capstone = university bus-tracking system (you told me this)
- Rotaract Club President, British Council Active Citizen, "Student of the Batch" award
- Tools: MATLAB, AutoCAD Electrical

## Remaining placeholders (search index.html for `[verify` and `[EDIT`)

| Section | What's needed |
|---|---|
| `<head>` | Your real domain in `canonical`, `og:url`, and the JSON-LD `url` |
| Background → Wentworth | Start date; expected graduation year |
| Background → PHP | Exact employment years; promotion year |
| Background → Early career | Exact roles/companies/years (intern role — Energypac? — was unreadable) |
| Background → B.Sc. | Years |
| Leadership cards | Rotaract club name & years; award issuer & year |
| Expertise → Tools | Your EMT/simulation platform and any other tools |
| Publications | Co-authors, target venue; thesis expected year; delete or fill the third entry |

## How this site supports an EB-2 NIW petition

The NIW test (Matter of Dhanasar) has three prongs. The site is written to evidence each:

1. **Substantial merit & national importance** — the *Mission* and *Impact* sections frame your
   research around U.S. grid reliability, the renewable-energy transition, outage costs, and
   wildfire risk. These are documented federal priorities (DOE, FERC, NERC). When your petition
   letter cites specific DOE/LBNL/NERC reports, the site should echo them consistently.

2. **Well positioned to advance the endeavor** — the *Research*, *Expertise*, *Background*, and
   *Publications* sections. Strengthen this prong over time by adding to the site:
   - Published papers (update the Publications list the day anything is accepted)
   - Conference presentations, posters, invited talks
   - Professional memberships (IEEE PES, CIGRE) and reviewer roles
   - Citations of your work, letters/collaborations with utilities
   - Professional licenses/certifications

3. **Beneficial to waive the job offer** — the framing throughout stresses that the work benefits
   *utilities and ratepayers nationwide*, not a single employer. Keep that tone in anything you add.

### Important cautions

- **Never overstate.** USCIS officers and attorneys may visit this site. Every claim here must
  match your CV, petition, and evidence exactly. The current copy makes no factual claims beyond
  your two research titles — keep it that way as you edit.
- The "tens of billions of dollars" outage-cost line is deliberately conservative and attributed
  to "DOE-funded studies" (LBNL's interruption-cost work). If you cite an exact figure in the
  petition, update the site to match the same source.
- Consider adding a professional headshot to the hero once you have one (ask and I'll restyle).

## Publishing

Static files — host anywhere:
- **GitHub Pages / Netlify / Cloudflare Pages** (free): drop the folder in, done.
- **Shared hosting** (like the BC Accountants setup): upload `index.html`, `css/`, `js/` to `public_html`.
- Buy a clean domain (e.g. `maeenuddin.com`) — it looks better in a petition exhibit than a
  subdomain, and update the three URL placeholders in `<head>`.

Once you have a domain, I can add: `robots.txt`, `sitemap.xml`, `.htaccess`, and OG preview image —
same treatment as the BC Accountants site.
