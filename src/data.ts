
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const STATIONS = [
  { id: 'home', label: 'Departure' },
  { id: 'about', label: 'Metro Pass' },
  { id: 'experience', label: 'Journey Log' },
  { id: 'projects', label: 'Tickets' },
  { id: 'skills', label: 'Line Map' },
  { id: 'ship', label: 'Deploy Line' },
  { id: 'now', label: 'Now Boarding' },
  { id: 'contact', label: 'Terminus' },
] as const;

export const LINKS = {
  email: 'muhammadusmanramzan586@gmail.com',
  phone: '+92 300 983 0142',
  github: 'https://github.com/muhammadusman586',
  linkedin: 'https://linkedin.com/in/muhammadusman586',
  resume: '/resume.pdf',
};

export type Role = {
  when: string;
  current?: boolean;
  title: string;
  org: string;
  link?: string;
  tag: string;
  bullets: string[];
  stamp?: { big: string; small: string };
};

export const JOURNEY: Role[] = [
  {
    when: 'Aug 2025 —',
    current: true,
    title: 'Software Engineer',
    org: 'RipeSeed',
    link: 'https://ripeseed.io',
    tag: 'Full-time · Lahore',
    bullets: [
      'Ship client web products **end to end** in TypeScript: **Next.js and React** on the frontend, **Node.js and PostgreSQL** on the backend, covering API design, background jobs, integrations and production UI.',
      'Build **third-party integrations**: **OAuth flows**, **webhook handling** and scheduled **background jobs with durable retries**.',
      'Work directly with clients and a small product team to **scope features, split ownership and deliver production releases**. Selected work is on the tickets below.',
    ],
  },
  {
    when: 'Mar 2025 — Aug 2025',
    title: 'Associate Software Engineer',
    org: 'Sixlogics',
    tag: 'Intern → Full-time · On-site',
    bullets: [
      'Started as an **intern** and moved into a **full-time** Associate Software Engineer role on existing production web applications.',
      'Built and maintained features with **PHP and Laravel** on the backend and **React** on the frontend, integrating **REST APIs** within an established production codebase.',
    ],
  },
  {
    when: 'Sep 2021 — May 2025',
    title: 'BS, Computer Science',
    org: 'FAST NUCES, Lahore',
    tag: 'Degree',
    bullets: ['National University of Computer and Emerging Sciences, Lahore, Pakistan.'],
    stamp: { big: 'GRAD', small: 'Class of 2025' },
  },
];

export type Project = {
  title: string;
  line: string;
  meta: string;
  description: string;
  image?: string;
  flow?: string[];
  tech: string[];
  github?: string;
  demo?: string;
  color: 'accent' | 'signal' | 'sky' | 'deep';
  built: string[];
  host?: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'ClarityHero',
    line: 'Decision intelligence · AI',
    meta: 'RipeSeed · 2026',
    description:
      'Connects read-only to a founder’s email, chat, CRM and accounting data and returns a short, ranked daily briefing instead of a dashboard.',
    flow: ['Gmail / Outlook', 'OAuth sync', 'Inngest jobs', 'LLM ranking', 'Briefing'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Inngest', 'LLM APIs'],
    color: 'accent',
    built: [
      'Built the **AI pipeline** that distills raw messages and records into **ranked decisions and risks**, orchestrating multi-step **LLM jobs with Inngest** for scheduled runs and durable retries.',
      'Implemented the **Gmail and Outlook integrations** end to end: **OAuth consent, token refresh** and incremental read-only sync of recent mail.',
      'Built the **Next.js frontend** and the delivery layer that ships each briefing **in-app, by email and to Slack**.',
    ],
  },
  {
    title: 'Dialpad–Quickbase Integration',
    line: 'Integration',
    meta: 'RipeSeed · 2026',
    description:
      'Syncs call and contact activity from Dialpad into Quickbase records, removing manual data entry from the client’s daily workflow.',
    flow: ['Dialpad', 'Webhook', 'Map fields', 'Retry', 'Quickbase'],
    tech: ['TypeScript', 'Node.js', 'REST APIs', 'Webhooks'],
    color: 'signal',
    built: [
      'Synced call and contact activity into Quickbase records through **webhooks and REST APIs**.',
      'Handled **field mapping** between the two data models.',
      'Added **retries and error handling** for failed webhook deliveries.',
    ],
  },
  {
    title: 'Roofing Operations Platform',
    line: 'Operations platform',
    meta: 'RipeSeed · 2026',
    description: 'A roofing-industry platform: a Next.js frontend backed by a REST API.',
    flow: ['Lead capture', 'REST API', 'Typed client', 'Next.js UI', 'Status'],
    tech: ['Next.js', 'TypeScript', 'REST APIs'],
    color: 'sky',
    built: [
      'Own the **Next.js frontend** of the platform.',
      'Built **lead management** end to end: capture, filterable listing, detail view and status updates.',
      'Worked against the backend **REST API** with **typed clients** and **reusable components**.',
    ],
  },
  {
    title: 'Hirrd',
    line: 'Job portal',
    meta: 'Personal · 2025',
    description:
      'Full-stack job portal with separate candidate and recruiter roles: onboarding, job posting, applications and saved jobs.',
    image: '/images/hirrd.jpg',
    tech: ['React', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Clerk'],
    github: 'https://github.com/muhammadusman586/jobportal',
    demo: 'https://hirrd-lyart.vercel.app/',
    color: 'deep',
    built: [
      'Implemented **authentication and role-based access** with **Clerk** for candidates and recruiters.',
      'Modelled **jobs and applications** in **Supabase**.',
      'Added **search and filtering** by role, company and location.',
    ],
    host: 'Vercel',
  },
];

export const LINES: { name: string; code: string; color: string; stops: string[] }[] = [
  { name: 'Languages', code: 'L', color: '#111111', stops: ['TypeScript', 'JavaScript', 'SQL', 'HTML / CSS'] },
  { name: 'Frontend', code: 'F', color: 'rgb(var(--accent))', stops: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'React Hook Form'] },
  { name: 'Backend', code: 'B', color: 'rgb(var(--deep))', stops: ['Node.js', 'Express', 'PHP / Laravel', 'REST APIs'] },
  { name: 'Integrations & AI', code: 'I', color: 'rgb(var(--alt))', stops: ['OAuth', 'Webhooks', 'Third-party APIs', 'Inngest', 'LLM APIs'] },
  { name: 'Data', code: 'D', color: 'rgb(var(--signal))', stops: ['PostgreSQL', 'MongoDB', 'Prisma', 'Supabase'] },
  { name: 'Cloud & Ops', code: 'C', color: '#B07CFF', stops: ['AWS', 'Docker', 'Vercel', 'Linux / Bash'] },
  { name: 'Tools', code: 'T', color: 'rgb(var(--sky))', stops: ['Git', 'GitHub', 'Postman', 'Jira'] },
];

export const USED_IN: Record<string, string[]> = {
  TypeScript: ['RipeSeed', 'ClarityHero', 'Dialpad–Quickbase Integration', 'Roofing Operations Platform'],
  React: ['RipeSeed', 'Sixlogics', 'Hirrd'],
  'Next.js': ['RipeSeed', 'ClarityHero', 'Roofing Operations Platform'],
  'Tailwind CSS': ['Hirrd'],
  'shadcn/ui': ['Hirrd'],
  'Node.js': ['RipeSeed', 'ClarityHero', 'Dialpad–Quickbase Integration'],
  'PHP / Laravel': ['Sixlogics'],
  'REST APIs': ['Sixlogics', 'Dialpad–Quickbase Integration', 'Roofing Operations Platform'],
  OAuth: ['ClarityHero', 'RipeSeed'],
  Webhooks: ['Dialpad–Quickbase Integration', 'RipeSeed'],
  'Third-party APIs': ['ClarityHero', 'Dialpad–Quickbase Integration'],
  Inngest: ['ClarityHero'],
  'LLM APIs': ['ClarityHero'],
  PostgreSQL: ['RipeSeed', 'ClarityHero'],
  Supabase: ['Hirrd'],
  Vercel: ['Hirrd'],
};

// Bump `updated` whenever the rows change.
export const NOW = {
  updated: 'Oct 2026',
  rows: [
    { status: 'Running', label: 'Building', text: 'AI briefing pipelines and third-party integrations at RipeSeed' },
    { status: 'Arrived', label: 'Shipped', text: 'This portfolio: the metro edition, with four line themes' },
    { status: 'Boarding', label: 'Looking for', text: 'Software engineer roles: full-stack, integrations, AI products' },
  ],
};

export const SHIP_STEPS = [
  { stop: 'Commit', tools: ['Git', 'GitHub'], log: '$ git push origin main' },
  { stop: 'Checks', tools: ['TypeScript', 'ESLint'], log: '✓ typecheck + lint passed' },
  { stop: 'Build', tools: ['Docker', 'Linux / Bash'], log: '✓ docker build → image tagged' },
  { stop: 'Deploy', tools: ['AWS', 'Vercel'], log: '✓ deployed → health check 200' },
  { stop: 'Watch', tools: ['Logs', 'Retries'], log: '● watching logs · jobs retry on failure' },
];
