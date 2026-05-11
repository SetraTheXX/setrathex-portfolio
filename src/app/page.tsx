import {
  ArrowRight,
  Award,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { Metadata } from "next";
import {
  type Article,
  type ContactItem,
  type GrowthItem,
  type Locale,
  type Project,
  type ProcessStep,
  getProjectLinkState,
  portfolioByLocale,
  resolveLocale,
  uiCopyByLocale,
} from "@/data/portfolio";
import { Magnetic } from "@/components/Magnetic";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import { Noise } from "@/components/Noise";
import { CommandMenu } from "@/components/CommandMenu";

const toneClasses = {
  emerald: "border-emerald-400/35 bg-emerald-400/10 text-emerald-100",
  cyan: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  amber: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  slate: "border-slate-400/25 bg-slate-400/10 text-slate-200",
} as const;

const growthTone = {
  active: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  queued: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  continuous: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
} as const;

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.21-.02-2.19-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.03 0 0 .96-.31 3.16 1.17A10.95 10.95 0 0 1 12 6.04c.98 0 1.96.13 2.88.38 2.19-1.48 3.15-1.17 3.15-1.17.63 1.57.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const contactIcons = {
  email: Mail,
  github: GitHubIcon,
  linkedin: IdCard,
  location: MapPin,
} as const;

function ShootingStars() {
  return (
    <div aria-hidden="true" className="shooting-stars">
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-panel overflow-hidden rounded-2xl border border-white/[0.12] ${className}`}
    >
      {children}
    </div>
  );
}

type LanguageCopy = {
  trLabel: string;
  enLabel: string;
  trAria: string;
  enAria: string;
};

function LanguageSwitcher({
  locale,
  copy,
}: {
  locale: Locale;
  copy: LanguageCopy;
}) {
  const itemClass = (active: boolean) =>
    `rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
      active
        ? "border border-cyan-200/35 bg-cyan-300/12 text-cyan-50"
        : "border border-transparent text-slate-400 hover:bg-white/[0.045] hover:text-cyan-100"
    }`;

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 font-[family-name:var(--font-geist-mono)]">
      <a href="/" aria-label={copy.trAria} className={itemClass(locale === "tr")}>
        {copy.trLabel}
      </a>
      <a
        href="/?lang=en"
        aria-label={copy.enAria}
        className={itemClass(locale === "en")}
      >
        {copy.enLabel}
      </a>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-7 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <p className="mb-3 font-[family-name:var(--font-geist-mono)] text-sm text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function ContactLink({ item }: { item: ContactItem }) {
  const Icon = contactIcons[item.kind];
  const isLocation = item.kind === "location";
  const baseClass =
    "surface-card interactive-card flex min-w-0 items-center gap-3 rounded-lg border border-white/10 px-4 py-3";

  if (isLocation) {
    return (
      <div className={baseClass}>
        <Icon className="h-4 w-4 shrink-0 text-cyan-200" />
        <div className="min-w-0">
          <p className="text-xs text-slate-500">{item.label}</p>
          <p className="break-words text-sm text-white">{item.value}</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className={`${baseClass} transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.055]`}
    >
      <Icon className="h-4 w-4 shrink-0 text-cyan-200" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{item.label}</p>
        <p className="break-words text-sm text-white">{item.value}</p>
      </div>
    </a>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) {
  return (
    <article className="group relative flex gap-4 rounded-lg border border-white/[0.08] bg-white/[0.022] p-4 transition hover:border-cyan-300/20 hover:bg-white/[0.04] md:block md:border-0 md:bg-transparent md:p-0 md:hover:bg-transparent">
      <div className="relative flex shrink-0 flex-col items-center md:mb-4 md:block">
        <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-cyan-300/30 bg-[#0b1420] font-[family-name:var(--font-geist-mono)] text-xs text-cyan-100 shadow-[0_0_24px_rgba(139,211,255,0.08)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-3 h-full w-px bg-gradient-to-b from-cyan-300/25 to-transparent md:hidden" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-white">{step.title}</h3>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[11px] text-slate-400">
            {step.command}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
        <p className="mt-3 font-[family-name:var(--font-geist-mono)] text-xs leading-5 text-cyan-200/75">
          {step.output}
        </p>
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  featured = false,
  labels,
}: {
  project: Project;
  featured?: boolean;
  labels: {
    status: string;
    role: string;
    nextStep: string;
  };
}) {
  const linkState = getProjectLinkState(project);
  const compact = !featured;

  return (
    <article
      className={`project-panel group flex h-full flex-col border ${
        featured
          ? "rounded-2xl p-5 shadow-[0_20px_58px_rgba(0,0,0,0.22)]"
          : "secondary-project rounded-xl p-4"
      }`}
    >
      <div className={`${compact ? "mb-4" : "mb-5"} flex items-start justify-between gap-4`}>
        <div className="min-w-0">
          <p className="mb-2 font-[family-name:var(--font-geist-mono)] text-xs text-cyan-200/75">
            {project.updatedAt}
          </p>
          <h3 className={`${compact ? "text-lg" : "text-xl"} font-semibold tracking-tight text-white`}>
            {project.name}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs ${toneClasses[project.stageTone]}`}
        >
          {project.stage}
        </span>
      </div>

      <p className={`${compact ? "leading-5" : "leading-6"} text-sm text-slate-100`}>
        {project.shortDescription}
      </p>
      <p className={`${compact ? "mt-2 leading-5" : "mt-3 leading-6"} text-sm text-slate-300`}>
        {project.longDescription}
      </p>

      <div className={`${compact ? "mt-4 gap-2 rounded-lg p-3 text-xs" : "mt-5 gap-3 rounded-xl p-3.5 text-sm sm:grid-cols-2"} grid border border-white/[0.07] bg-white/[0.016]`}>
        <div>
          <p className={`${compact ? "text-xs" : "text-sm"} mb-1.5 font-[family-name:var(--font-geist-mono)] font-semibold text-slate-200`}>
            {labels.status}
          </p>
          <p className={`${compact ? "leading-5" : "leading-6"} text-white`}>{project.maturity}</p>
        </div>
        <div>
          <p className={`${compact ? "text-xs" : "text-sm"} mb-1.5 font-[family-name:var(--font-geist-mono)] font-semibold text-slate-200`}>
            {labels.role}
          </p>
          <p className={`${compact ? "leading-5" : "leading-6"} text-white`}>{project.role}</p>
        </div>
      </div>

      <div className={`${compact ? "mt-3 gap-1.5" : "mt-4 gap-2"} flex flex-wrap`}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`${compact ? "px-2 py-0.5" : "px-2.5 py-1"} soft-chip rounded-md font-[family-name:var(--font-geist-mono)] text-xs transition group-hover:border-cyan-200/20 group-hover:text-slate-100`}
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className={`${compact ? "mt-3 space-y-1.5" : "mt-4 space-y-2"}`}>
        {project.evidence.slice(0, compact ? 2 : 3).map((item) => (
          <li key={item} className={`${compact ? "leading-5" : "leading-6"} flex gap-2 text-sm text-slate-300`}>
            <span className="font-[family-name:var(--font-geist-mono)] text-emerald-300">
              +
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className={`${compact ? "mt-3 pt-3 leading-5" : "mt-4 pt-4 leading-6"} border-t border-white/[0.08] text-sm text-slate-300`}>
        <span className={`${compact ? "text-xs" : "text-sm"} font-[family-name:var(--font-geist-mono)] font-semibold text-amber-100`}>
          {labels.nextStep}
        </span>{" "}
        {project.nextStep}
      </p>

      <div className={`${compact ? "pt-4" : "pt-5"} mt-auto flex flex-wrap items-center gap-3`}>
        {linkState.hasLinks ? (
          project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-300/[0.075] px-3 py-2 font-[family-name:var(--font-geist-mono)] text-xs text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.12] hover:text-white"
            >
              {link.label}
              {link.kind === "github" ? (
                <GitHubIcon className="h-3.5 w-3.5" />
              ) : (
                <ExternalLink className="h-3.5 w-3.5" />
              )}
            </a>
          ))
        ) : (
          <span className="rounded-md border border-slate-400/15 bg-slate-400/10 px-3 py-2 font-[family-name:var(--font-geist-mono)] text-xs text-slate-400">
            {project.demoState}
          </span>
        )}
      </div>
    </article>
  );
}

function ArticleCard({
  article,
  readLabel,
}: {
  article: Article;
  readLabel: string;
}) {
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noreferrer"
      className="surface-card interactive-card group flex h-full flex-col rounded-xl border border-white/10 p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-xs text-cyan-100">
          {article.topic}
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-slate-600">
          {article.source}
        </span>
      </div>
      <h3 className="text-base font-semibold leading-6 text-white">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-5 text-slate-300">{article.note}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-5 font-[family-name:var(--font-geist-mono)] text-xs">
        <span className="text-slate-600">{article.publishedAt}</span>
        <span className="inline-flex items-center gap-2 text-cyan-200 transition group-hover:text-white">
          {readLabel} <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}

function GrowthCard({ item }: { item: GrowthItem }) {
  return (
    <article className="surface-card interactive-card rounded-2xl border border-white/10 p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-semibold text-white">{item.title}</h3>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs ${growthTone[item.statusTone]}`}
        >
          {item.status}
        </span>
      </div>
      <p className="text-sm leading-6 text-slate-300">{item.description}</p>
    </article>
  );
}

type HomeProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export function generateMetadata({ searchParams }: HomeProps): Metadata {
  const locale = resolveLocale(searchParams?.lang);

  if (locale === "en") {
    return {
      title: "Tuncay Ölmez | Software Developer Internship Candidate",
      description:
        "Tuncay Ölmez's personal portfolio site for web applications, developer tools, Python automation projects, and internship applications.",
    };
  }

  return {
    title: "Tuncay Ölmez | Yazılım Geliştirici Stajyer Adayı",
    description:
      "Tuncay Ölmez'in kişisel portföy sitesi. Web uygulamaları, geliştirici araçları, Python otomasyon projeleri ve staj başvurusu için seçili çalışmalar.",
  };
}

export default function Home({ searchParams }: HomeProps) {
  const locale = resolveLocale(searchParams?.lang);
  const portfolio = portfolioByLocale[locale];
  const copy = uiCopyByLocale[locale];
  const navigation = copy.navigation;
  const github = portfolio.contact.find((item) => item.kind === "github");
  const linkedin = portfolio.contact.find((item) => item.kind === "linkedin");
  const mail = portfolio.contact.find((item) => item.kind === "email");
  const location = portfolio.contact.find((item) => item.kind === "location");
  const featuredProjects = portfolio.projects.filter((project) => project.featured);
  const otherProjects = portfolio.projects.filter((project) => !project.featured);
  const cvOptions = [
    {
      ...portfolio.profile.cv.tr,
      label: copy.hero.cvOptions[0],
    },
    {
      ...portfolio.profile.cv.en,
      label: copy.hero.cvOptions[1],
    },
  ];
  const commandCvDownloads = [
    {
      ...portfolio.profile.cv.tr,
      label: copy.commandMenu.cvLabels[0],
    },
    {
      ...portfolio.profile.cv.en,
      label: copy.commandMenu.cvLabels[1],
    },
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/[0.06] bg-[#070b12]/88 shadow-[0_1px_18px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
        <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <LanguageSwitcher locale={locale} copy={copy.language} />
            <a
              href="#top"
              className="font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-white"
            >
              setra<span className="text-cyan-200">thex</span>
            </a>
          </div>

          <div className="hidden items-center gap-7 font-[family-name:var(--font-geist-mono)] text-[15px] text-slate-300 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-2 transition after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-cyan-200 after:transition hover:text-white hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 max-[420px]:hidden">
            {github ? (
              <Magnetic strength={0.15}>
                <a
                  href={github.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="rounded-md p-2.5 text-slate-400 transition hover:bg-cyan-300/[0.08] hover:text-cyan-100 block"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
              </Magnetic>
            ) : null}
            {linkedin ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="rounded-md p-2.5 text-slate-400 transition hover:bg-cyan-300/[0.08] hover:text-cyan-100"
              >
                <IdCard className="h-5 w-5" />
              </a>
            ) : null}
            {mail ? (
              <a
                href={mail.href}
                aria-label="Mail"
                title="Mail"
                className="rounded-md p-2.5 text-slate-400 transition hover:bg-cyan-300/[0.08] hover:text-cyan-100"
              >
                <Mail className="h-5 w-5" />
              </a>
            ) : null}
          </div>
        </nav>
        <div className="border-t border-white/[0.06] md:hidden">
          <div className="scrollbar-none mx-auto flex max-w-7xl gap-4 overflow-x-auto px-5 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-slate-300 sm:gap-5">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 transition hover:text-cyan-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="site-shell relative isolate min-h-screen overflow-x-hidden bg-[var(--background)] text-slate-200">
      <Noise />
      <CommandMenu copy={copy.commandMenu} cvDownloads={commandCvDownloads} />
      <div className="ambient-background pointer-events-none fixed inset-0 -z-20" />
      <ShootingStars />

      <section
        id="top"
        className="relative mx-auto grid min-h-[580px] max-w-7xl items-center gap-9 overflow-hidden px-5 py-10 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:py-12"
      >
        <div
          aria-hidden="true"
          className="hidden"
        />
        <div
          aria-hidden="true"
          className="hidden"
        />
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-sm text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(57,217,138,0.45)]" />
            {portfolio.profile.statusBadge}
          </div>

          <FadeIn direction="up" delay={0.1}>
            <p className="mb-4 font-[family-name:var(--font-geist-mono)] text-sm text-slate-500">
              {copy.hero.breadcrumb}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {portfolio.profile.name}
            </h1>
            <p className="mt-5 max-w-2xl text-2xl leading-8 text-slate-200">
              {portfolio.profile.title}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {portfolio.profile.heroSummary}
            </p>

            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="metric-card rounded-lg border border-cyan-300/15 bg-cyan-300/[0.035] p-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-2xl text-white">
                  {portfolio.projects.length}
                </p>
                <p className="text-sm text-slate-400">{copy.hero.projectMetric}</p>
              </div>
              <div className="metric-card rounded-lg border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-2xl text-white">
                  {portfolio.articles.length}
                </p>
                <p className="text-sm text-slate-400">{copy.hero.articleMetric}</p>
              </div>
              <div className="metric-card rounded-lg border border-amber-300/15 bg-amber-300/[0.04] p-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-2xl text-white">
                  {portfolio.profile.gpa}
                </p>
                <p className="text-sm text-slate-400">{portfolio.profile.gpaScale}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={0.1}>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-200/40 bg-cyan-300/[0.13] px-5 py-3 text-sm font-medium text-cyan-50 shadow-[0_0_28px_rgba(139,211,255,0.08)] transition hover:-translate-y-0.5 hover:border-cyan-100/60 hover:bg-cyan-300/[0.18] hover:shadow-[0_0_34px_rgba(139,211,255,0.14)] w-full"
                >
                  {copy.hero.projectsButton}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
              {github ? (
                <Magnetic strength={0.1}>
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/15"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                </Magnetic>
              ) : null}
              <Magnetic strength={0.1}>
                <details className="group/cv relative w-full">
                  <summary
                    aria-label={copy.hero.cvAria}
                    className="inline-flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-300/[0.105] px-5 py-3 text-sm font-medium text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-200/45 hover:bg-emerald-300/[0.15] [&::-webkit-details-marker]:hidden"
                  >
                    <Download className="h-4 w-4" />
                    {copy.hero.cvButton}
                  </summary>
                  <div className="relative z-30 mt-2 overflow-hidden rounded-lg border border-emerald-300/20 bg-[#0b111b]/95 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                    {cvOptions.map((cv) => (
                      <a
                        key={cv.href}
                        href={cv.href}
                        download={cv.fileName}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/10 hover:text-white"
                      >
                        {cv.label}
                        <Download className="h-3.5 w-3.5 text-emerald-200/75" />
                      </a>
                    ))}
                  </div>
                </details>
              </Magnetic>
              <Magnetic strength={0.1}>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05] w-full"
                >
                  {copy.hero.contactButton}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </FadeIn>
        </div>

        <GlassPanel className="focus-panel relative z-10">
          <div className="relative overflow-hidden p-6 sm:p-7">
            <div className="focus-panel-grid" />
            <div className="focus-panel-glow" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/[0.075] text-cyan-100">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-xs text-cyan-100/75">
                  {copy.focusPanel.eyebrow}
                </span>
              </div>

              <h2 className="text-2xl font-semibold leading-9 text-white">
                {copy.focusPanel.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                {copy.focusPanel.description}
              </p>

              <div className="mt-5 grid gap-2.5">
                {copy.focusPanel.areas.map((area, index) => (
                  <div
                    key={area.title}
                    className="focus-row rounded-xl border border-white/[0.08] bg-white/[0.022] px-3.5 py-3"
                  >
                    <div className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-cyan-200/12 bg-slate-950/25 font-[family-name:var(--font-geist-mono)] text-[11px] text-cyan-100/85">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {area.title}
                        </h3>
                        <p className="mt-0.5 text-sm leading-5 text-slate-400">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-emerald-300/12 bg-emerald-300/[0.035] px-3.5 py-2.5">
                <p className="font-[family-name:var(--font-geist-mono)] text-[11px] leading-5 text-emerald-100/75">
                  {copy.focusPanel.openGoal}
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section
        id="projects"
        className="section-band section-band-projects relative border-y border-white/[0.08] px-5 py-12 sm:px-8"
      >
        <div className="hidden" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              eyebrow={copy.sections.projects.eyebrow}
              title={copy.sections.projects.title}
              description={copy.sections.projects.description}
            />
          </FadeIn>
          <StaggerContainer className="grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.name}>
                <ProjectCard
                  project={project}
                  featured
                  labels={copy.projectCard}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-7">
              <div>
                <p className="font-[family-name:var(--font-geist-mono)] text-sm text-cyan-200">
                  {copy.sections.projects.otherEyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {copy.sections.projects.otherTitle}
                </h3>
              </div>
              <p className="hidden max-w-md text-sm leading-6 text-slate-400 md:block">
                {copy.sections.projects.otherDescription}
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-4 grid gap-4 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <StaggerItem key={project.name}>
                <ProjectCard project={project} labels={copy.projectCard} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section
        id="about"
        className="section-band section-band-soft relative border-y border-white/[0.08] px-5 py-10 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              eyebrow={copy.sections.about.eyebrow}
              title={copy.sections.about.title}
              align="left"
              description={copy.sections.about.description}
            />
          </FadeIn>

          <StaggerContainer className="mt-6 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
            {/* Main About text */}
            <StaggerItem className="surface-card interactive-card rounded-2xl border border-white/10 p-5 md:col-span-2 md:p-6">
              <div className="space-y-3">
                {portfolio.profile.about.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-slate-200">
                    {paragraph}
                  </p>
                ))}
              </div>
            </StaggerItem>

            {/* Info Box */}
            <StaggerItem className="surface-card interactive-card flex flex-col justify-center rounded-2xl border border-white/10 p-5 md:p-6">
              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10">
                    <MapPin className="h-5 w-5 text-cyan-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {copy.sections.about.location}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">{portfolio.profile.location}</p>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/10">
                    <GraduationCap className="h-5 w-5 text-emerald-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {copy.sections.about.education}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">{portfolio.profile.education}</p>
                </div>
              </div>
            </StaggerItem>

            {/* Principles */}
            {portfolio.profile.principles.map((item, i) => (
              <StaggerItem
                key={item.title}
                className={`surface-card interactive-card rounded-2xl border p-5 ${
                  i === 0 ? "border-cyan-300/20 bg-cyan-300/5" :
                  i === 1 ? "border-emerald-300/20 bg-emerald-300/5" :
                  "border-amber-300/20 bg-amber-300/5"
                }`}
              >
                <div className="mb-3 flex items-center gap-3 text-base font-semibold text-white">
                  <ShieldCheck className={`h-5 w-5 shrink-0 ${
                    i === 0 ? "text-cyan-300" :
                    i === 1 ? "text-emerald-300" :
                    "text-amber-300"
                  }`} />
                  {item.title}
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section id="method" className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow={copy.sections.method.eyebrow}
            title={copy.sections.method.title}
            description={copy.sections.method.description}
          />
        </FadeIn>
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute left-4 top-[18px] hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-cyan-300/20 via-slate-200/[0.12] to-transparent md:block" />
          <StaggerContainer className="grid gap-3 md:grid-cols-4 md:gap-5">
            {portfolio.processSteps.map((step, index) => (
              <StaggerItem key={step.command} className="relative">
                <ProcessCard step={step} index={index} />
                {index < portfolio.processSteps.length - 1 ? (
                  <ArrowRight className="pointer-events-none absolute -right-4 top-3 hidden h-4 w-4 text-cyan-200/35 md:block" />
                ) : null}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section
        id="writing"
        className="section-band section-band-soft relative border-y border-white/[0.08] px-5 py-10 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.sections.writing.eyebrow}
            title={copy.sections.writing.title}
            description={copy.sections.writing.description}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {portfolio.articles.map((article) => (
              <ArticleCard
                key={article.href}
                article={article}
                readLabel={copy.projectCard.read}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow={copy.sections.skills.eyebrow}
            title={copy.sections.skills.title}
            description={copy.sections.skills.description}
          />
        </FadeIn>
        <StaggerContainer className="grid gap-4 md:grid-cols-3 group/skills">
          {portfolio.skills.map((group) => (
            <StaggerItem
              key={group.title}
              className="surface-card interactive-card rounded-2xl border border-white/[0.08] p-5 transition-opacity duration-300 hover:!opacity-100 group-hover/skills:opacity-40"
            >
              <div className="mb-5 flex items-center gap-3">
                <Code2 className="h-5 w-5 text-cyan-200" />
                <h3 className="font-semibold text-white">{group.title}</h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-300">{item}</span>
                    <span className="hidden h-px flex-1 bg-white/[0.07] sm:block" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/70" />
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="surface-card mt-4 rounded-lg border border-cyan-300/15 px-4 py-3">
          <p className="text-sm leading-6 text-slate-300">{portfolio.aiTooling}</p>
        </div>
      </section>

      <section
        id="education"
        className="section-band section-band-deep relative border-y border-white/[0.08] px-5 py-9 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={copy.sections.education.eyebrow}
            title={copy.sections.education.title}
            description={copy.sections.education.description}
          />
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card rounded-lg border border-white/10 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex gap-3">
                  <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                  <div>
                    <h3 className="font-semibold text-white">
                      {copy.sections.education.university}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {copy.sections.education.degree}{" "}
                      {portfolio.profile.expectedGraduation}.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                  <div>
                    <h3 className="font-semibold text-white">
                      {copy.sections.education.securityTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {copy.sections.education.securityDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <h3 className="mb-3 font-[family-name:var(--font-geist-mono)] text-sm text-slate-400">
                  {copy.sections.education.certificates}
                </h3>
                <div className="space-y-2">
                  {portfolio.certificates.map((certificate) => (
                    <div
                      key={certificate.title}
                      className="flex items-start gap-3 rounded-md border border-white/[0.07] bg-white/[0.018] px-3 py-2"
                    >
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {certificate.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {certificate.platform} · {certificate.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {portfolio.growthPlan.map((item) => (
                <GrowthCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="section-band section-band-contact relative border-t border-white/10 px-5 py-10 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={copy.sections.contact.eyebrow}
            title={copy.sections.contact.title}
            description={copy.sections.contact.description}
          />
          <div className="surface-card rounded-lg border border-white/10 p-5">
            <div className="grid gap-3 md:grid-cols-2">
              {portfolio.contact.map((item) => (
                <ContactLink key={item.label} item={item} />
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-emerald-300/25 bg-[linear-gradient(135deg,rgba(57,217,138,0.12),rgba(57,217,138,0.04))] p-5 shadow-[0_18px_55px_rgba(57,217,138,0.055)]">
              <div className="mb-2 flex items-center gap-2 text-emerald-200">
                <Sparkles className="h-4 w-4" />
                <h3 className="font-semibold">
                  {copy.sections.contact.availabilityTitle}
                </h3>
              </div>
              <p className="text-sm leading-6 text-slate-200">
                {copy.sections.contact.availabilityDescription}
              </p>
            </div>
            {location ? (
              <p className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
                <Terminal className="h-4 w-4" />
                {location.value}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 font-[family-name:var(--font-geist-mono)] text-sm text-slate-500 sm:flex-row">
          <p>{portfolio.profile.siteName}</p>
          <p>{copy.footer.tagline}</p>
        </div>
      </footer>
      </main>
    </>
  );
}
