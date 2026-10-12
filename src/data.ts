// All site content lives here so components stay presentational.

/** Stable DOM id fragment, e.g. "Connect Devs" -> "connect-devs". */
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const STATIONS = [
  { id: 'home', label: 'Departure' },
  { id: 'about', label: 'Metro Pass' },
  { id: 'experience', label: 'Journey Log' },
  { id: 'projects', label: 'Tickets' },
  { id: 'skills', label: 'Line Map' },
  { id: 'ship', label: 'Deploy Line' },
  { id: 'contact', label: 'Terminus' },
] as const;

export const LINKS = {
  email: 'muhammadusmanramzan586@gmail.com',
  phone: '+92 300 9830142',
  github: 'https://github.com/muhammadusman586',
  linkedin: 'https://linkedin.com/in/muhammad-usman-ramzan-a97105247',
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
    tag: 'Full-time',
    bullets: [
      'Delivered **full-stack features** for client products in TypeScript: **Next.js and React** on the frontend, **Node.js with PostgreSQL** on the backend.',
      'Built **third-party API integrations**, including **OAuth flows**, **webhook handling** and scheduled **background jobs with durable retries**.',
      'Worked with clients and a small product team to **scope features and ship releases**.',
    ],
  },
  {
    when: 'Mar 2025 — Aug 2025',
    title: 'Associate Software Engineer',
    org: 'Sixlogics',
    tag: 'Intern → Full-time · On-site',
    bullets: [
      'Started as an **intern** and moved into a **full-time role**.',
      'Built features with **PHP and Laravel** on the backend and **React** on the frontend, against a **REST API**.',
      'Contributed to an **existing production codebase**.',
    ],
  },
  {
    when: '2021 — 2025',
    title: 'BS, Computer Science',
    org: 'FAST NUCES, Lahore',
    tag: 'Degree',
    bullets: ['Foundations in **algorithms, systems and software engineering**, Lahore, Pakistan.'],
    stamp: { big: 'GRAD', small: 'Class of 2025' },
  },
  {
    when: '2019 — 2021',
    title: 'Intermediate, Pre-Engineering',
    org: 'Government College University',
    tag: 'College',
    bullets: ['Mathematics and physics track, Lahore, Pakistan.'],
  },
];

export type Project = {
  title: string;
  line: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  color: 'pink' | 'lime' | 'cyan' | 'blue';
  built: string[];
  host: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Hirrd',
    line: 'Job portal',
    description:
      'Candidates browse and apply to roles while recruiters post and manage listings, with Clerk auth, role-based access and saved jobs.',
    image: '/images/hirrd.jpg',
    tech: ['React', 'Tailwind CSS', 'Supabase', 'Clerk'],
    github: 'https://github.com/muhammadusman586/jobportal',
    demo: 'https://hirrd-lyart.vercel.app/',
    color: 'pink',
    built: [
      'Candidate flow to **browse roles, apply** and **save jobs**.',
      'Recruiter flow to **post and manage listings**.',
      '**Clerk** authentication with **role-based access** for candidates and recruiters.',
      'Data and storage on **Supabase**.',
    ],
    host: 'Vercel',
  },
  {
    title: 'Pizzeria',
    line: 'Food ordering',
    description:
      'Order pizzas with a cart, auth and an admin dashboard, built end-to-end on the MERN stack.',
    image: '/images/pizza.jpg',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/muhammadusman586/Pizzeria',
    demo: 'https://pizzeria-murex.vercel.app/',
    color: 'lime',
    built: [
      'Menu and **cart** with **pizza customisation** and a live order summary.',
      '**Auth** plus an **admin dashboard** for managing orders.',
      'Built end-to-end on the **MERN** stack.',
    ],
    host: 'Vercel',
  },
  {
    title: 'Connect Devs',
    line: 'Dev social network',
    description: 'Discover developers, swipe to connect and build your network.',
    image: '/images/ConnectDevs.jpeg',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/muhammadusman586/ConnectDevs',
    demo: 'https://connectdevs.vercel.app/',
    color: 'cyan',
    built: [
      'Developer **profiles** with profile management.',
      '**Swipe to connect**: send and accept connection requests.',
      'Manage your **professional network** in one place.',
    ],
    host: 'Vercel',
  },
];

export const LINES: { name: string; code: string; color: string; stops: string[] }[] = [
  { name: 'Frontend', code: 'F', color: '#FF3EA5', stops: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { name: 'Backend', code: 'B', color: '#2D4BFF', stops: ['Node.js', 'Express', 'PHP / Laravel', 'REST APIs'] },
  { name: 'Integrations', code: 'I', color: '#FFB938', stops: ['OAuth', 'Webhooks', 'Third-party APIs', 'Background jobs'] },
  { name: 'Data', code: 'D', color: '#E6FF00', stops: ['PostgreSQL', 'MongoDB', 'Supabase'] },
  { name: 'Cloud & Ops', code: 'C', color: '#B07CFF', stops: ['AWS', 'Docker', 'Vercel'] },
  { name: 'Tools', code: 'T', color: '#7AF7FF', stops: ['Linux / Bash', 'Git', 'GitHub'] },
];

/** Where each Line Map stop shows up (project titles or employer names). Empty = general toolkit. */
export const USED_IN: Record<string, string[]> = {
  React: ['RipeSeed', 'Sixlogics', 'Hirrd', 'Pizzeria', 'Connect Devs'],
  'Next.js': ['RipeSeed'],
  TypeScript: ['RipeSeed'],
  'Tailwind CSS': ['Hirrd'],
  'Node.js': ['RipeSeed', 'Pizzeria', 'Connect Devs'],
  Express: ['Pizzeria', 'Connect Devs'],
  'PHP / Laravel': ['Sixlogics'],
  'REST APIs': ['Sixlogics'],
  OAuth: ['RipeSeed'],
  Webhooks: ['RipeSeed'],
  'Third-party APIs': ['RipeSeed'],
  'Background jobs': ['RipeSeed'],
  PostgreSQL: ['RipeSeed'],
  MongoDB: ['Pizzeria', 'Connect Devs'],
  Supabase: ['Hirrd'],
  Vercel: ['Hirrd', 'Pizzeria', 'Connect Devs'],
};

/** The "How I ship" route. Only tools listed elsewhere on the site. */
export const SHIP_STEPS = [
  { stop: 'Commit', tools: ['Git', 'GitHub'], log: '$ git push origin main' },
  { stop: 'Checks', tools: ['TypeScript', 'ESLint'], log: '✓ typecheck + lint passed' },
  { stop: 'Build', tools: ['Docker', 'Linux / Bash'], log: '✓ docker build → image tagged' },
  { stop: 'Deploy', tools: ['AWS', 'Vercel'], log: '✓ deployed → health check 200' },
  { stop: 'Watch', tools: ['Logs', 'Retries'], log: '● watching logs · jobs retry on failure' },
];
