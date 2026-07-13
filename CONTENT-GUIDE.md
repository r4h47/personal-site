# Content Guide — Before You Publish

Career details were filled in from your **complete LinkedIn source-data file**
(`Claude_LinkedIn_Profile_Complete_Input.md`, 2026-07-13). Dates, employers, projects, trainings,
and volunteering now match that record exactly.

## Remaining placeholders (search index.html for `[EDIT`)

| Section | What's needed |
|---|---|
| `<head>` | Your real domain in `canonical`, `og:url`, and the JSON-LD `url` (still `example.com`) |
| Background → B.Sc. | Years at International Islamic University Chittagong (not on your LinkedIn) |
| Publications | Co-authors and target venue for the 11 kV feeder paper; delete or fill the third entry |

## ⚠ One inconsistency to resolve: thesis title

- **This site** (and your message to me) uses: *"Traveling-Wave versus Impedance-Based Fault
  Location Under Inverter-Based-Resource Penetration and Realistic Measurement Chains:
  A Statistically Designed Comparative Study"*
- **Your LinkedIn** says: *"Travelling-Wave vs Impedance-Based Fault Location: A Practical
  Comparative Study Using MATLAB/Simulink"*

For an NIW petition, the thesis title must read **identically** everywhere USCIS might look
(site, LinkedIn, CV, university records). Decide which is current and align the others.
Note LinkedIn also says the thesis compares methods "on transmission networks" — make sure that
wording stays consistent with the final thesis scope too.

## Deliberately left off the site (on your LinkedIn, available if you want them)

- "Student of the Batch" award (BITM, 2017) — it's for an SEO training course; it would dilute
  the power-engineering narrative for NIW reviewers. Say the word if you want it back.
- LinkedIn-Learning certificates (AutoCAD Electrical, Project Leadership, Risk, Networking) —
  the AutoCAD skill itself is listed under Tools; course certificates are weak evidence.
- Advanced SEO certification (BITM, 2017) — off-topic for the endeavor.
- The recommendation from Ahasanul Hoque — testimonials can be added later; strongest once you
  have research-related ones too.

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
