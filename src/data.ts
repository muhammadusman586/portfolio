export const LINKS = {
  email: 'muhammadusmanramzan586@gmail.com',
  github: 'https://github.com/muhammadusman586',
  linkedin: 'https://linkedin.com/in/muhammadusman586',
  resume: '/resume.pdf',
};

export type ArtKey = 'teammates' | 'clarity' | 'dialpad' | 'roofing' | 'hirrd';

export type Project = {
  id: string;
  title: string;
  kind: string;
  where: string;
  year: number;
  art: ArtKey;
  summary: string;
  built: string[];
  stack: string[];
  links: { label: string; href: string }[];
  say: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-teammates',
    title: 'AI Teammates',
    kind: 'AI agents',
    where: 'Personal',
    year: 2026,
    art: 'teammates',
    summary:
      'Most AI assistants tell you how to do something and leave the doing to you. AI Teammates are agents that work like coworkers: each has a job, its own Linux computer and the tools to use it, so it runs the command, edits the file or clicks through the app itself.',
    built: [
      'A persistent Daytona sandbox per teammate (shell, files and a graphical desktop) that it controls with mouse and keyboard tools.',
      'Durable agent turns on Trigger.dev, so long desktop tasks never die inside a web request.',
      'Group chats with handoffs: pick who answers, and let a bot pass the work to the teammate whose job it is.',
      'A live desktop panel that streams the bot’s screen over noVNC, plus Clerk auth and Neon Postgres with server-side ownership checks.',
    ],
    stack: ['Next.js', 'TypeScript', 'Trigger.dev', 'Daytona', 'AI SDK', 'Neon', 'Clerk', 'Drizzle'],
    links: [
      { label: 'Live app', href: 'https://ai-teammates-production-fd15.up.railway.app/' },
      { label: 'Code', href: 'https://github.com/muhammadusman586/ai-teammates' },
    ],
    say: 'bots with their own computers 🤖',
  },
  {
    id: 'clarityhero',
    title: 'ClarityHero',
    kind: 'AI briefings',
    where: 'RipeSeed',
    year: 2026,
    art: 'clarity',
    summary:
      'Founders drown in email, chat, CRM and accounting tools. ClarityHero reads all of it (read-only) and sends back a short, ranked daily briefing of the decisions and risks that matter.',
    built: [
      'The AI pipeline: multi-step LLM jobs on Inngest that rank raw messages and records into decisions and risks, with scheduled runs and durable retries.',
      'Gmail and Outlook integrations end to end: OAuth consent, token refresh and incremental read-only sync.',
      'The Next.js frontend and the delivery layer that ships each briefing in-app, by email and to Slack.',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Inngest', 'LLM APIs'],
    links: [],
    say: 'this one reads your inbox for you!',
  },
  {
    id: 'dialpad-quickbase',
    title: 'Dialpad → Quickbase',
    kind: 'Integration',
    where: 'RipeSeed',
    year: 2026,
    art: 'dialpad',
    summary:
      'The client’s team typed every call into Quickbase by hand. Now call and contact activity from Dialpad lands there automatically.',
    built: [
      'Webhook intake and REST sync between Dialpad and Quickbase.',
      'Field mapping between the two data models.',
      'Retries and error handling, so a failed delivery never loses a call.',
    ],
    stack: ['TypeScript', 'Node.js', 'Webhooks', 'REST APIs'],
    links: [],
    say: 'webhooks that never drop a call',
  },
  {
    id: 'roofing-platform',
    title: 'Roofing ops platform',
    kind: 'Platform',
    where: 'RipeSeed',
    year: 2026,
    art: 'roofing',
    summary: 'An operations platform for a roofing business. I own the Next.js frontend on top of the REST API.',
    built: [
      'Lead management end to end: capture, filterable listing, detail view and status updates.',
      'Typed API clients and reusable components shared across the app.',
    ],
    stack: ['Next.js', 'TypeScript', 'REST APIs'],
    links: [],
    say: 'leads, but for roofs 🏠',
  },
  {
    id: 'hirrd',
    title: 'Hirrd',
    kind: 'Job portal',
    where: 'Personal',
    year: 2025,
    art: 'hirrd',
    summary:
      'A full-stack job portal with separate candidate and recruiter roles: onboarding, posting jobs, applying and saving jobs.',
    built: [
      'Role-based auth with Clerk for candidates and recruiters.',
      'Jobs and applications modelled in Supabase.',
      'Search and filters by role, company and location.',
    ],
    stack: ['React', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Clerk'],
    links: [
      { label: 'Live site', href: 'https://hirrd-lyart.vercel.app/' },
      { label: 'Code', href: 'https://github.com/muhammadusman586/jobportal' },
    ],
    say: 'he built this one solo',
  },
];

export type Role = {
  id: string;
  org: string;
  title: string;
  when: string;
  where: string;
  logo: string;
  link?: string;
  bullets: string[];
  say: string;
};

export const ROLES: Role[] = [
  {
    id: 'ripeseed',
    org: 'RipeSeed',
    title: 'Software Engineer',
    when: 'Aug 2025 – now',
    where: 'Lahore · Full-time',
    logo: '/logos/ripeseed.svg',
    link: 'https://ripeseed.io',
    bullets: [
      'Ship client products end to end in TypeScript: Next.js and React, Node.js and PostgreSQL.',
      'Third-party integrations: OAuth flows, webhooks and background jobs with durable retries.',
      'Scope features with clients, split ownership and take releases to production.',
    ],
    say: 'his current team!',
  },
  {
    id: 'sixlogics',
    org: 'Sixlogics',
    title: 'Associate Software Engineer',
    when: 'Mar – Aug 2025',
    where: 'Intern → Full-time',
    logo: '/logos/sixlogics.png',
    bullets: [
      'Started as an intern, moved to full-time on production web apps.',
      'PHP and Laravel on the backend, React on the frontend, REST API integrations.',
    ],
    say: 'intern to engineer in months',
  },
  {
    id: 'fast',
    org: 'FAST NUCES',
    title: 'BS Computer Science',
    when: '2021 – 2025',
    where: 'Lahore',
    logo: '/logos/fast.png',
    bullets: ['National University of Computer and Emerging Sciences.'],
    say: 'where it all started',
  },
];
