/**
 * Single source of truth for all portfolio content.
 * Every value below is taken from the resume PDF (src/assets/resume/Mahamadavesh-Mathakiya-Resume.pdf).
 *
 * Optional fields are left as empty strings / empty arrays. Empty values are hidden in the UI,
 * so you can fill them in later (e.g. LinkedIn, GitHub, location, project links) without touching components.
 */
import {
  Bot,
  Cloud,
  CodeXml,
  Database,
  LucideIconData,
  Plug,
  Server,
  ShieldCheck,
  Workflow,
  Wrench,
} from 'lucide-angular';

export interface Profile {
  fullName: string;
  displayName: string;
  initials: string;
  title: string;
  headline: string;
  summary: string;
  experienceLabel: string;
  email: string;
  phone: string;
  phoneHref: string;
  /** Optional — not in the resume. Leave empty to hide. */
  location: string;
  /** Optional — not in the resume. Paste full URL to show. */
  linkedin: string;
  /** Optional — not in the resume. Paste full URL to show. */
  github: string;
  resumeFile: string;
  resumeDownloadName: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  icon: LucideIconData;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  duration: string;
  summary: string;
  highlights: { label: string; text: string }[];
  tech: string[];
}

export interface Project {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  purpose: string;
  overview: string;
  features: { label: string; text: string }[];
  contributions: string[];
  tech: string[];
  /** Optional — not in the resume. */
  githubUrl: string;
  /** Optional — not in the resume. */
  liveUrl: string;
  /** Optional — relative paths under src/assets, e.g. 'assets/projects/h4c-1.webp'. */
  screenshots: { src: string; alt: string }[];
}

export interface Achievement {
  metric: string;
  label: string;
  text: string;
}

export interface EducationEntry {
  kind: 'education' | 'training' | 'certification';
  title: string;
  institution: string;
  period: string;
  details: string;
}

export const PROFILE: Profile = {
  fullName: 'Mahamadavesh Mahebubbhai Mathakiya',
  displayName: 'Mahamadavesh Mathakiya',
  initials: 'MM',
  title: 'Software Developer',
  headline: 'Full Stack Developer building multi-tenant SaaS with Angular, .NET Core & SQL Server.',
  summary:
    'Full Stack Developer with 3 years 3 months of experience building web applications with Angular, .NET Core and SQL Server. ' +
    'Currently working on Health4Community, a multi-tenant SaaS platform covering HR, policy & procedure, and billing management.',
  experienceLabel: '3 years 3 months',
  email: 'mahamadavesh786@gmail.com',
  phone: '+91 91066 31033',
  phoneHref: '+919106631033',
  location: '',
  linkedin: '',
  github: '',
  resumeFile: 'assets/resume/Mahamadavesh-Mathakiya-Resume.pdf',
  resumeDownloadName: 'Mahamadavesh-Mathakiya-Resume.pdf',
};

/**
 * Where the contact form sends messages.
 * - 'formsubmit': works on any static host (GitHub Pages). Messages are emailed to PROFILE.email via formsubmit.co.
 *   The very first submission triggers a one-time activation email — click the link in it.
 * - 'netlify': uses Netlify Forms (only works when hosted on Netlify).
 */
export const CONTACT_FORM: { provider: 'formsubmit' | 'netlify' } = {
  provider: 'formsubmit',
};

export const HERO_STACK = ['Angular 19', '.NET Core', 'C#', 'SQL Server', 'SignalR', 'Kendo UI', 'Azure'];

export const ABOUT = {
  paragraphs: [
    'I am a Full Stack Developer with 3 years 3 months of professional experience at iFour Technolab Pvt. Ltd., building web applications end to end with Angular, .NET Core and SQL Server.',
    'Today I work on Health4Community, a multi-tenant SaaS platform for healthcare organisations, contributing across its HR, Policy & Procedure and Billing modules. ' +
      'Before that I delivered features for the PIQET and FEEDBACK projects, from report builders and PDF reporting to email automation and AI-generated content.',
    'My focus is automation, real-time communication, third-party integrations and reusable, config-driven UI architecture. ' +
      'I use AI-assisted development with Claude Code every day to ship features faster while keeping code quality high.',
  ],
  strengths: [
    { title: 'Config-driven UI', text: 'Reusable data grids, dynamic forms, dialogs and file upload shared across modules.' },
    { title: 'Real-time systems', text: 'SignalR for notifications, news broadcasting and session monitoring.' },
    { title: 'Automation', text: 'Hangfire and background services for multi-step email workflows.' },
    { title: 'Integrations', text: 'Google Gemini API, Calendly, Azure Email Service and RESTful APIs.' },
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Component-driven UIs with modern Angular.',
    icon: CodeXml,
    items: ['Angular (up to v19)', 'Standalone Components', 'Signals', 'Kendo UI for Angular', 'TypeScript', 'JavaScript', 'RxJS', 'HTML5', 'CSS3 / SCSS', 'Bootstrap'],
  },
  {
    title: 'Backend',
    description: 'APIs and services on the .NET platform.',
    icon: Server,
    items: ['.NET Core', 'C#', 'Web APIs', 'SignalR', 'Modular Monolith Architecture'],
  },
  {
    title: 'Database',
    description: 'Relational data modelling and multi-tenant persistence.',
    icon: Database,
    items: ['SQL Server', 'Entity Framework Core', 'EF Core Migrations', 'Multi-tenant data'],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Delivery pipelines and cloud email services.',
    icon: Cloud,
    items: ['Azure Email Service', 'Azure DevOps Repos', 'Azure DevOps Boards', 'Azure DevOps Pipelines', 'Git'],
  },
  {
    title: 'AI-Assisted Development',
    description: 'Feature development, code review, refactoring and SonarQube fixes.',
    icon: Bot,
    items: ['Claude Code', 'Google Gemini API'],
  },
  {
    title: 'Automation',
    description: 'Reliable background processing.',
    icon: Workflow,
    items: ['Hangfire', 'Background Services'],
  },
  {
    title: 'Integrations & APIs',
    description: 'Connecting products to third-party services.',
    icon: Plug,
    items: ['Calendly', 'Google Gemini API', 'RESTful APIs'],
  },
  {
    title: 'Code Quality',
    description: 'Static analysis and linting.',
    icon: ShieldCheck,
    items: ['ESLint', 'SonarQube'],
  },
  {
    title: 'Tools & Others',
    description: 'Everyday building blocks of business apps.',
    icon: Wrench,
    items: ['PDF Generation', 'Excel Import / Export', 'Caching', 'Real-time Notifications'],
  },
];

export const CORE_COMPETENCIES = [
  'Full Stack Web Development',
  'Multi-tenant SaaS Development',
  'AI-Assisted Development (Claude Code)',
  'Real-time Application Development',
  'Email Marketing Automation',
  'Third-party API Integration',
  'Database Design and Optimization',
  'Background Job Processing',
  'AI/ML Integration',
  'Performance Optimization',
  'User Experience Design',
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Software Developer',
    company: 'iFour Technolab Pvt. Ltd.',
    period: '2023 – Present',
    duration: '3 years 3 months',
    summary:
      'Full stack development across three products — Health4Community, PIQET and FEEDBACK — using Angular, .NET Core and SQL Server.',
    highlights: [
      { label: 'Multi-tenant SaaS', text: 'Building HR, Policy & Procedure and Billing modules for Health4Community, an Angular 19 + Kendo UI platform with a modular .NET Core backend.' },
      { label: 'Reusable architecture', text: 'Created config-driven common components (data grid, dynamic forms, dialogs, context menus, file upload) shared across all modules, reducing new-screen development time.' },
      { label: 'Real-time communication', text: 'Replaced 15-second API polling with SignalR and a background session-monitoring service with proactive user notifications.' },
      { label: 'Automation', text: 'Built multi-step email automation workflows with configurable delays, processed reliably with Hangfire.' },
      { label: 'Reporting', text: 'Delivered a dynamic report builder and a PDF reporting system with email sharing.' },
      { label: 'AI integration', text: 'Integrated Google Gemini API to generate HTML templates, survey forms and marketing content inside the Froala editor.' },
      { label: 'AI-assisted delivery', text: 'Use Claude Code daily for implementing features, reviewing code, writing tests and resolving SonarQube findings.' },
    ],
    tech: ['Angular', 'TypeScript', 'Kendo UI', '.NET Core', 'C#', 'SignalR', 'SQL Server', 'Hangfire', 'Azure', 'Google Gemini API', 'Claude Code', 'SonarQube'],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { metric: '90%', label: 'less server load', text: 'Replaced the polling mechanism with SignalR real-time communication.' },
  { metric: '80%', label: 'less manual work', text: 'Streamlined email marketing workflows through automation.' },
  { metric: '70%', label: 'faster content creation', text: 'Implemented Google Gemini API for automated content generation.' },
  { metric: 'UX', label: 'better retention', text: 'Enhanced session management with proactive notifications, improving user retention.' },
];

export const PROJECTS: Project[] = [
  {
    id: 'h4c',
    name: 'Health4Community',
    shortName: 'H4C',
    tagline: 'Multi-tenant SaaS platform for healthcare organisations',
    purpose:
      'Give healthcare organisations one platform to run HR, policy & procedure and billing operations.',
    overview:
      'A multi-tenant SaaS platform built with Angular 19 + Kendo UI and a modular .NET Core backend. I work across all three of its core modules plus the shared platform layer.',
    features: [
      { label: 'HRM', text: 'Attendance tracking with a kiosk check-in app and device logging, shift roster and coverage planning, leave management, timesheets, and user/role management with permission-based access.' },
      { label: 'PMS', text: 'Document and file library, policies and procedures with preview/edit flows, folder explorer, tagging, document import and sign-off tracking.' },
      { label: 'BMS', text: 'Contractor management, billing data imports, billing settings, and billing reports with restore periods.' },
      { label: 'Platform', text: 'Real-time notifications, email templates with merge-field placeholders, unsaved-changes protection, and centralised API error handling.' },
    ],
    contributions: [
      'Built config-driven common components — data grid, dynamic forms, dialogs, context menus and file upload — shared across all modules, reducing new-screen development time.',
      'Implemented features across the HRM, PMS and BMS modules end to end.',
      'Used Claude Code daily for implementing features, reviewing code, writing tests and resolving SonarQube findings, improving delivery speed and code quality.',
    ],
    tech: ['Angular', 'Kendo UI', '.NET Core', 'Claude Code', 'SonarQube'],
    githubUrl: '',
    liveUrl: '',
    screenshots: [],
  },
  {
    id: 'piqet',
    name: 'PIQET',
    shortName: 'PIQET',
    tagline: 'Reporting, email automation and real-time features',
    purpose:
      'Help users build their own reports, automate email campaigns and stay informed in real time.',
    overview:
      'Work on PIQET covered a self-service report builder, PDF reporting, a full email automation pipeline with analytics, and replacing polling with real-time SignalR communication.',
    features: [
      { label: 'Report Builder', text: 'Users create custom reports by choosing data fields, filters, grouping and sorting, then preview, save and export them.' },
      { label: 'PDF Reports', text: 'Comprehensive PDF reporting system with professional UI design and email sharing.' },
      { label: 'Email Automation', text: 'Campaigns triggered by user actions (signup, purchase, trial requests) with multi-step workflows and configurable delays.' },
      { label: 'Email Analytics', text: 'Azure Email Service event tracking (opens, clicks, delivery status) and an analytics dashboard for automation performance.' },
      { label: 'Session Management', text: 'Replaced API polling every 15 seconds with SignalR, plus a background service for session monitoring with proactive notifications.' },
      { label: 'Real-time Broadcasts', text: 'News broadcasting to all logged-in users and an instant notification system.' },
      { label: 'Excel Import', text: 'Predefined templates and a custom template system for personalised import mappings with data validation.' },
      { label: 'Caching', text: 'Caching for external API calls to improve response times.' },
    ],
    contributions: [
      'Integrated Hangfire for reliable background job processing of automation workflows.',
      'Configured Azure Email Service event tracking and built the automation performance dashboard.',
      'Reduced server load by 90% by replacing polling with SignalR real-time communication.',
    ],
    tech: ['SignalR', 'Hangfire', 'Azure', 'Excel Import', 'PDF Generation', 'Caching'],
    githubUrl: '',
    liveUrl: '',
    screenshots: [],
  },
  {
    id: 'feedback',
    name: 'FEEDBACK',
    shortName: 'FEEDBACK',
    tagline: 'Marketing automation with AI-generated content',
    purpose:
      'Support business growth with automated messaging, AI-assisted content and self-service marketing tools.',
    overview:
      'A marketing-focused product where I built automated messaging for worldwide campaigns, Google Gemini-powered content generation and generators for surveys, signup forms and marketing pages.',
    features: [
      { label: 'Marketing Automation', text: 'Automated messaging system for business growth and worldwide marketing campaigns.' },
      { label: 'AI Content', text: 'Google Gemini API integration to generate HTML templates, survey forms and marketing content within the Froala editor.' },
      { label: 'Form Generators', text: 'Dynamic survey and signup form generators.' },
      { label: 'Campaign Tools', text: 'QR code generation for marketing campaigns and responsive marketing page templates.' },
    ],
    contributions: [
      'Implemented the Google Gemini API integration for automated content generation.',
      'Built the survey and signup form generators and QR code generation.',
      'Developed responsive marketing page templates.',
    ],
    tech: ['Google Gemini API', 'Froala Editor', 'QR Codes'],
    githubUrl: '',
    liveUrl: '',
    screenshots: [],
  },
];

/**
 * The resume lists only a training period — no degree, institution or certifications.
 * To add a formal qualification, append an entry such as:
 * { kind: 'education', title: 'B.E. Computer Engineering', institution: 'Your University', period: '2019 – 2023', details: '' }
 */
export const EDUCATION: EducationEntry[] = [
  {
    kind: 'training',
    title: 'Professional Training',
    institution: 'iFour Technolab Pvt. Ltd.',
    period: '2023 · 6 months',
    details: 'Six-month training period in 2023, followed by 3 years 3 months of professional experience at iFour Technolab Pvt. Ltd.',
  },
];

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

