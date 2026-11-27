/**
 * Single source of truth for every fact on the site and the printable CV.
 * Candidate-verified data only. Do not add metrics, dates, or credentials that are not
 * provided by Maeen Uddin.
 */

export const site = {
  url: "https://r4h47.github.io/personal-site",
  title: "Maeen Uddin — Electrical Power Systems Engineer",
  description:
    "Electrical power systems engineer with 8+ years of industrial and HV field experience: led O&M of a 132/11 kV AIS grid substation for a 24/7 steel mill, HV diagnostics and commissioning, and M.S. research on travelling-wave fault location. Open to relocation for data center, critical infrastructure, and semiconductor roles.",
};

export const person = {
  fullName: "Maeen Uddin Mohammad Abdur Rahman",
  givenName: "Maeen Uddin",
  shortName: "Maeen Uddin",
  roleTag: "Electrical Power Systems & Critical Infrastructure Engineer",
  headline: "Electrical Power Systems Engineer",
  headlineSub: "Critical Infrastructure, HV Diagnostics & Data Center Power",
  cvHeadline:
    "Electrical Power Systems Engineer | Critical Infrastructure | Field Service & HV Diagnostics",
  location: "Boston, MA",
  phone: "+1 (617) 751-0493",
  phoneHref: "tel:+16177510493",
  email: "maeen.uddin@live.com",
  linkedin: "https://www.linkedin.com/in/maeenuddin/",
  linkedinLabel: "linkedin.com/in/maeenuddin",
  availabilityBadges: [
    "Open to Relocation",
    "Data Center & Critical Infrastructure",
    "Semiconductor Cleanroom Ready",
    "Field Service & Rotating Shifts",
  ],
  availability:
    "Open to relocation, rotating shifts, domestic and international travel, semiconductor cleanroom work, and data center critical infrastructure.",
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Bangla", level: "Native" },
    { name: "Hindi", level: "Basic" },
    { name: "Urdu", level: "Basic" },
  ],
};

export const navItems = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

export const metrics = [
  { value: "8+", unit: "Years", label: "Industrial power & HV field engineering" },
  { value: "+40%", unit: "Reliability", label: "132/11 kV AIS substation uptime" },
  { value: "10–20", unit: "Min", label: "Emergency fault restoration SLA" },
  { value: "3.74", unit: "/ 4.00", label: "M.S. Electrical Engineering GPA, Wentworth" },
];

/* ------------------------------------------------------------------ */
/* Experience                                                           */
/* ------------------------------------------------------------------ */

export type ExperienceCategory = "substation" | "research" | "commissioning";

export const experienceFilters: { id: "all" | ExperienceCategory; label: string }[] = [
  { id: "all", label: "All experience" },
  { id: "substation", label: "Substation & HV O&M" },
  { id: "research", label: "Graduate research" },
  { id: "commissioning", label: "Commissioning & QA/QC" },
];

export type Role = {
  id: string;
  title: string;
  org: string;
  orgDetail?: string;
  location: string;
  period: string;
  type?: string;
  note?: string;
  categories: ExperienceCategory[];
  bullets: string[];
  equipment?: { qty: string; item: string }[];
};

export const experience: Role[] = [
  {
    id: "wit-ra",
    title: "Research Assistant",
    org: "Wentworth Institute of Technology",
    location: "Boston, MA",
    period: "Sep 2026 – Present",
    type: "Full-time",
    categories: ["research"],
    bullets: [
      "Electrical engineering research and technical analysis under Prof. Afsaneh Ghanavati.",
    ],
  },
  {
    id: "wit-gra",
    title: "Graduate Research Assistant",
    org: "Wentworth Institute of Technology",
    location: "Boston, MA",
    period: "Sep 2024 – Apr 2026",
    categories: ["research"],
    bullets: [
      "Investigated transmission-line fault-location algorithms using MATLAB/Simulink.",
      "M.S. thesis: travelling-wave vs. impedance-based fault location on a 230 kV transmission line, evaluated across 3,600 simulated fault scenarios.",
    ],
  },
  {
    id: "php",
    title: "Engineer → Senior Engineer, Operation & Maintenance",
    org: "PHP Integrated Steel Mills Limited",
    orgDetail: "132/11 kV AIS Grid Substation",
    location: "Feni, Bangladesh",
    period: "Mar 2017 – Aug 2024",
    note: "Promoted to Senior Engineer in Aug 2022",
    categories: ["substation", "commissioning"],
    bullets: [
      "Led the 132/11 kV AIS grid substation supplying a 24/7 steel mill, improving reliability by 40%.",
      "Planned and executed 4 scheduled annual maintenance outages, holding the breakdown rate below 1%.",
      "Worked 4 years of rotating shifts, restoring 8–15 emergency breakdowns per year within 10–20 minutes.",
      "Performed root-cause analysis from relay event data, improving restoration efficiency by 30%.",
      "Ran annual testing of 17 breakers and triennial relay calibration; reduced OLTC operations by 40%.",
      "Managed ~300 spare parts — a $500,000 inventory.",
      "Primary contact with PGCB (national grid) and NLDC (load despatch) for shutdowns, clearances, and grid compliance.",
      "Enforced LOTO and HV safety procedures, reducing incident rates by 25%.",
    ],
    equipment: [
      { qty: "4", item: "132 kV SF6 circuit breakers" },
      { qty: "13", item: "11 kV vacuum circuit breakers" },
      { qty: "2", item: "Power transformers" },
      { qty: "13", item: "MiCOM overcurrent / earth-fault relays" },
      { qty: "4", item: "MiCOM busbar protection relays" },
      { qty: "9", item: "SEL protection relays" },
      { qty: "192", item: "NiCd battery units + charger" },
      { qty: "2", item: "1,250 kVA standby diesel generators with ATS" },
    ],
  },
  {
    id: "energypac",
    title: "Project Engineer Intern",
    org: "Energypac Engineering Limited",
    location: "Chittagong, Bangladesh",
    period: "Sep 2016 – Feb 2017",
    categories: ["commissioning"],
    bullets: [
      "Tested, investigated faults on, and repaired 40+ electrical equipment units across two projects.",
    ],
  },
  {
    id: "eurotech",
    title: "Assistant Engineer",
    org: "Euro Tech Bangladesh",
    location: "Dhaka, Bangladesh",
    period: "Feb 2015 – Aug 2016",
    note: "Promoted to Team Lead within 6 months",
    categories: ["commissioning"],
    bullets: [
      "Supervised installation and QA/QC of 50+ IEC-compliant protection and control panels.",
      "Calculated and set protection relay settings for 10+ projects.",
      "Executed factory and site acceptance tests (FAT/SAT) on transformers and switchgear.",
      "Promoted to Team Lead within 6 months, managing a team of 12 engineers.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Research & projects                                                  */
/* ------------------------------------------------------------------ */

export const thesis = {
  label: "M.S. thesis · 2026",
  title:
    "Comparative Analysis of Travelling-Wave (TW) and Impedance-Based Fault Location on a 230 kV Transmission Line",
  institution: "Wentworth Institute of Technology",
  tools: "MATLAB / Simulink",
  scenarios: "3,600",
  twDetection: 91.7,
  twMedianErrorM: 104,
  takagiMedianErrorKm: 2.2,
  combinedWithin2km: 96.0,
};

export const manuscript = {
  label: "Manuscript in preparation",
  title:
    "Can Legacy Distribution Relays Support Modern Fault Location? A Field-Data Study of Impedance-Based Location and Traveling-Wave Feasibility on an 11 kV Industrial Feeder",
};

export const projects = {
  substation: {
    label: "Commissioning · 2018–2020",
    title: "132/11 kV LILO AIS Grid Substation & 132 kV Transmission",
    org: "PHP Integrated Steel Mills",
    summary:
      "Led installation, testing, and commissioning of the line-in/line-out (LILO) air-insulated grid substation that powers the steel mill, including its overhead and underground interfaces — delivered on schedule and to specification.",
    scope: [
      { k: "Interconnection", v: "132 kV LILO — overhead / underground interfaces" },
      { k: "Power transformer", v: "30/35 MVA, 132/11 kV" },
      { k: "Auxiliary transformer", v: "500 kVA, 11/0.415 kV cast-resin" },
      { k: "Standby generation", v: "2 × 1,250 kVA diesel generators + ATS" },
      { k: "Distribution", v: "11 kV underground network across the plant" },
    ],
  },
  diagnostics: {
    label: "HV diagnostics · 2016",
    title: "Transformer & HV Diagnostic Testing",
    sites: [
      {
        org: "Abul Khair Group",
        detail:
          "Installed and commissioned two 2 MVA transformers for a match-factory distribution system, running the full diagnostic suite and issuing test reports.",
      },
      {
        org: "Western Marine Shipyard Limited",
        detail:
          "Supervised erection and transformer testing for an 11/0.415 kV AIS substation — commissioned with zero issues.",
      },
    ],
    tests: [
      "Partial discharge (PD)",
      "SFRA / frequency response",
      "Tan delta & capacitance",
      "DGA",
      "Oil BDV",
      "TTR / voltage ratio",
      "Winding resistance",
      "Insulation resistance",
      "Polarity & vector group",
      "No-load & load losses",
      "Temperature rise",
      "FAT / SAT",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Technical matrix                                                     */
/* ------------------------------------------------------------------ */

export type SkillCategory = {
  id: string;
  label: string;
  items: { name: string; aliases?: string[] }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "hv",
    label: "HV/MV apparatus & substations",
    items: [
      { name: "132/11 kV AIS substations", aliases: ["air insulated", "grid substation", "LILO"] },
      { name: "132 kV SF6 circuit breakers", aliases: ["breaker", "sf6"] },
      { name: "11 kV vacuum circuit breakers", aliases: ["vcb", "breaker", "switchgear"] },
      { name: "Power transformers (30/35 MVA)", aliases: ["transformer"] },
      { name: "Cast-resin transformers", aliases: ["dry type", "transformer"] },
      { name: "OLTC operation", aliases: ["on-load tap changer", "tap changer"] },
      { name: "HV switchgear", aliases: ["switchboard"] },
      { name: "Standby diesel generators & ATS", aliases: ["generator", "transfer switch", "backup power"] },
      { name: "NiCd battery banks & chargers", aliases: ["dc system", "battery", "ups"] },
      { name: "11 kV underground distribution", aliases: ["cable", "medium voltage", "mv"] },
      { name: "LOTO & HV safety", aliases: ["lockout tagout", "safety", "permit to work"] },
      { name: "Preventive maintenance & outage planning", aliases: ["o&m", "maintenance", "shutdown"] },
    ],
  },
  {
    id: "diagnostics",
    label: "Advanced diagnostics",
    items: [
      { name: "Partial discharge (PD)", aliases: ["pd testing"] },
      { name: "SFRA", aliases: ["sweep frequency response", "frequency response analysis", "fra"] },
      { name: "Tan delta & capacitance", aliases: ["power factor", "dissipation factor", "tan δ"] },
      { name: "DGA", aliases: ["dissolved gas analysis", "oil analysis"] },
      { name: "Oil BDV", aliases: ["breakdown voltage", "dielectric strength", "oil test"] },
      { name: "TTR / voltage ratio", aliases: ["turns ratio", "ratio test"] },
      { name: "Winding & insulation resistance", aliases: ["ir test", "megger", "winding resistance"] },
      { name: "Polarity & vector group", aliases: ["phase", "vector"] },
      { name: "No-load & load loss testing", aliases: ["losses"] },
      { name: "Temperature-rise testing", aliases: ["heat run"] },
      { name: "FAT / SAT", aliases: ["factory acceptance", "site acceptance", "commissioning"] },
      { name: "Root-cause analysis", aliases: ["rca", "troubleshooting", "fault investigation"] },
    ],
  },
  {
    id: "protection",
    label: "Protection & relays",
    items: [
      { name: "SEL relays", aliases: ["schweitzer"] },
      { name: "ABB relays" },
      { name: "MiCOM OC/EF relays", aliases: ["overcurrent", "earth fault", "schneider"] },
      { name: "MiCOM busbar protection", aliases: ["busbar"] },
      { name: "IEC 61850", aliases: ["substation automation", "goose"] },
      { name: "Relay coordination", aliases: ["protection coordination", "grading"] },
      { name: "Relay settings calculation", aliases: ["settings", "protection settings"] },
      { name: "Relay event & fault-record analysis", aliases: ["event log", "disturbance record", "comtrade"] },
      { name: "Relay calibration & testing", aliases: ["secondary injection"] },
      { name: "Travelling-wave fault location", aliases: ["tw", "traveling wave", "fault location"] },
      { name: "Impedance-based fault location", aliases: ["takagi", "fault location"] },
    ],
  },
  {
    id: "automation",
    label: "Automation & networking",
    items: [
      { name: "PLC programming", aliases: ["plc"] },
      { name: "SIMATIC S7-1200", aliases: ["siemens", "plc"] },
      { name: "Allen-Bradley ControlLogix", aliases: ["rockwell", "plc"] },
      { name: "SCADA", aliases: ["supervisory control"] },
      { name: "HMI", aliases: ["human machine interface"] },
      { name: "Modbus", aliases: ["protocol"] },
      { name: "TCP/IP", aliases: ["networking", "ethernet"] },
    ],
  },
  {
    id: "simulation",
    label: "Simulation & CAD",
    items: [
      { name: "MATLAB", aliases: ["programming"] },
      { name: "Simulink", aliases: ["simulation", "modeling"] },
      { name: "AutoCAD Electrical", aliases: ["cad", "drawing", "schematic"] },
      { name: "SEL AcSELerator QuickSet", aliases: ["quickset", "sel"] },
      { name: "EasergyStudio", aliases: ["schneider", "micom"] },
      { name: "Microsoft Excel & Access", aliases: ["reporting", "office"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education, certifications, leadership                                */
/* ------------------------------------------------------------------ */

export const education = [
  {
    degree: "M.S., Electrical Engineering",
    school: "Wentworth Institute of Technology",
    location: "Boston, MA",
    date: "Sep 2026",
    gpa: "3.74 / 4.00",
    detail: `Thesis: ${"Comparative Analysis of Travelling-Wave (TW) and Impedance-Based Fault Location on a 230 kV Transmission Line"}.`,
  },
  {
    degree: "B.S., Electrical & Electronic Engineering",
    school: "International Islamic University Chittagong",
    location: "Chittagong, Bangladesh",
    date: "2018",
    detail:
      "Capstone: designed a university bus-tracking system — live positions on Google Maps with a companion mobile app.",
  },
];

export const certifications = [
  {
    name: "Transformer Manufacturing, Testing & Repairing",
    issuer: "General Electric Manufacturing Company (GEMAC)",
    date: "Sep 2014",
    id: "54/14",
  },
  {
    name: "Industrial Technology on Electrical Engineering & Instrumentation (PLC / SCADA)",
    issuer: "Training Institute for Chemical Industries (TICI)",
    date: "Dec 2012",
    id: "00007480",
    detail: "Grade A+",
  },
  {
    name: "Programmable Logic Controller (PLC)",
    issuer: "PLC Logic's Electrical & Automation Academy",
    date: "Mar 2018",
  },
  {
    name: "AutoCAD Electrical Essential Training",
    issuer: "LinkedIn Learning",
    date: "Nov 2023",
  },
];

export const leadership = [
  { name: "Best Engineer Award" },
  { name: "IEEE Student Branch Treasurer" },
  { name: "President, Rotaract Club of Rajshahi Mid Town", date: "2011 – 2012" },
  { name: "Active Citizen, British Council", date: "2016 – 2018" },
];
