"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  type FormEvent,
  type SVGProps,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Filter,
  GitFork,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Network,
  Send,
  Sparkles,
  Star,
  Terminal,
  Users,
  Workflow,
  Zap
} from "lucide-react";
import type { Locale, PortfolioContent, ProjectCategory } from "@/data/content";
import type { GithubRepository } from "@/lib/github";
import { cn } from "@/lib/utils";

type PortfolioExperienceProps = {
  locale: Locale;
  content: PortfolioContent;
  githubRepoCount: number | null;
  githubRepositories: GithubRepository[];
};

type Project = PortfolioContent["projects"][number];

const iconClass = "h-4 w-4";

const stackIcons = [Code2, Database, Network, Terminal];

function extractGithubProfileName(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname.endsWith("github.com")) {
      return null;
    }

    const [profileName] = parsedUrl.pathname.split("/").filter(Boolean);

    return profileName?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

function getGithubProjectRepositories(
  content: PortfolioContent,
  repositories: GithubRepository[]
) {
  const profileRepositoryName = extractGithubProfileName(content.links.github);

  return repositories
    .filter(
      (repository) =>
        repository.name.toLowerCase() !== profileRepositoryName
    );
}

function formatRepositoryName(name: string) {
  return name.replaceAll("-", " ").replaceAll("_", " ");
}

function formatRepositoryDate(updatedAt: string | null, locale: Locale) {
  if (!updatedAt) {
    return null;
  }

  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-US", {
    month: "short",
    year: "numeric"
  }).format(date);
}

function GithubLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.16 1.18A10.95 10.95 0 0 1 12 6.15c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.77 1.06.77 2.13v3.15c0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0ZM7.12 20.45H3.56V9h3.56v11.45ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm15.11 13.02h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28Z" />
    </svg>
  );
}

export function PortfolioExperience({
  locale,
  content,
  githubRepoCount,
  githubRepositories
}: PortfolioExperienceProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [activeProjectId, setActiveProjectId] = useState<Project["id"]>(
    content.projects[0].id
  );
  const [liveGithubRepoCount, setLiveGithubRepoCount] = useState(githubRepoCount);
  const [liveGithubRepositoryData, setLiveGithubRepositoryData] =
    useState(githubRepositories);
  const otherLocale = locale === "pl" ? "en" : "pl";
  const liveGithubRepositories = useMemo(
    () => getGithubProjectRepositories(content, liveGithubRepositoryData),
    [content, liveGithubRepositoryData]
  );

  useEffect(() => {
    let isActive = true;

    async function refreshGithubData() {
      try {
        const response = await fetch("/api/github", {
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          repoCount?: unknown;
          repositories?: unknown;
        };

        if (!isActive) {
          return;
        }

        if (typeof data.repoCount === "number") {
          setLiveGithubRepoCount(data.repoCount);
        }

        if (Array.isArray(data.repositories)) {
          setLiveGithubRepositoryData(data.repositories as GithubRepository[]);
        }
      } catch {
        // The server-rendered GitHub data stays visible if the live refresh fails.
      }
    }

    void refreshGithubData();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return content.projects;
    }

    return content.projects.filter((project) =>
      project.categories.includes(activeFilter)
    );
  }, [activeFilter, content.projects]);

  const activeProject =
    filteredProjects.find((project) => project.id === activeProjectId) ??
    filteredProjects[0] ??
    content.projects[0];

  return (
    <main>
      <Hero content={content} locale={locale} otherLocale={otherLocale} />
      <RecruiterStrip content={content} githubRepoCount={liveGithubRepoCount} />
      <MobileSectionNav items={content.nav} />

      <section id="projects" className="py-14 md:py-28">
        <div className="page-shell">
          <SectionHeading
            kicker={content.sections.projects.kicker}
            title={content.sections.projects.title}
            intro={content.sections.projects.intro}
          />

          <div className="mt-7 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
              <Filter className={iconClass} />
              {locale === "pl" ? "Filtr" : "Filter"}
            </span>
            <div className="-mx-3 overflow-x-auto px-3 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
              <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="tablist" aria-label="Project filters">
                {content.filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    aria-pressed={activeFilter === filter.id}
                    className={cn(
                      "focus-ring rounded-md border px-3 py-2 text-sm font-semibold transition",
                      activeFilter === filter.id
                        ? "border-violet bg-violet text-white shadow-lg shadow-violet-950/10"
                        : "border-soft-strong bg-white/70 text-ink hover-border-violet"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.25fr] lg:items-start">
            <div className="grid gap-4">
              <AnimatePresence initial={false}>
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={activeProject.id === project.id}
                    onSelect={() => setActiveProjectId(project.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            <ProjectDetail project={activeProject} locale={locale} />
          </div>

          <LiveGithubRepositories
            content={content}
            locale={locale}
            repositories={liveGithubRepositories}
          />
        </div>
      </section>

      <section id="stack" className="border-y border-soft bg-white/50 py-14 md:py-28">
        <div className="page-shell">
          <SectionHeading
            kicker={content.sections.stack.kicker}
            title={content.sections.stack.title}
            intro={content.sections.stack.intro}
          />

          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
            {content.skillGroups.map((group, index) => {
              const Icon = stackIcons[index] ?? Code2;

              return (
                <article key={group.title} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-soft text-violet">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink">{group.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{group.note}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tag px-3 py-1.5 text-sm font-semibold">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="education" className="py-14 md:py-28">
        <div className="page-shell">
          <SectionHeading
            kicker={content.sections.education.kicker}
            title={content.sections.education.title}
            intro={content.sections.education.intro}
          />

          <div className="mt-8 grid gap-5 md:mt-10 md:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4">
              {content.timeline.map((item) => (
                <article key={item.title} className="card p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-violet-dark">
                        <GraduationCap className={iconClass} />
                        {item.period}
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-semibold text-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">{item.body}</p>
                </article>
              ))}
            </div>

            <aside className="dark-card p-6 text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-violet-on-dark" />
                <h3 className="text-xl font-bold">
                  {locale === "pl" ? "Atuty w pracy" : "Work strengths"}
                </h3>
              </div>
              <div className="mt-6 grid gap-3">
                {content.strengths.map((strength) => (
                  <div key={strength} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-on-dark" />
                    <span className="text-sm leading-6 text-white/80">{strength}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-white/15 pt-6">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin className={iconClass} />
                  {content.contact.location}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Contact content={content} />
    </main>
  );
}

function Hero({
  content,
  locale,
  otherLocale
}: {
  content: PortfolioContent;
  locale: Locale;
  otherLocale: Locale;
}) {
  return (
    <section className="relative min-h-[82svh] overflow-hidden bg-[#0c0a14] text-white md:min-h-[86svh]">
      <div className="hero-grid absolute inset-0" />

      <header className="relative z-10 pt-5">
        <nav className="page-shell glass-nav flex min-h-14 items-center justify-between gap-4 rounded-lg px-3 py-2 text-ink">
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-md px-2 py-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet text-sm font-black text-white">
              RT
            </span>
            <span className="hidden text-sm font-bold sm:inline">Robert Tworek</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-muted transition hover:bg-black/5 hover-text-ink"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${otherLocale}`}
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm font-bold transition hover-border-violet"
              aria-label={locale === "pl" ? "Switch to English" : "Przełącz na polski"}
            >
              <Languages className={iconClass} />
              {otherLocale.toUpperCase()}
            </Link>
            <a
              href={content.links.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              aria-label="GitHub"
              className="focus-ring hidden h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white/70 transition hover-border-violet sm:flex"
            >
              <GithubLogo className="h-5 w-5" />
            </a>
            <a
              href={content.links.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              className="focus-ring hidden h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white/70 transition hover-border-violet sm:flex"
            >
              <LinkedinLogo className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </header>

      <div id="top" className="relative z-10">
        <div className="page-shell grid min-h-[calc(82svh-88px)] items-center gap-10 py-12 md:min-h-[calc(86svh-88px)] md:py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="section-kicker text-violet-on-dark">{content.hero.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.96] text-white sm:text-6xl md:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              {content.hero.body}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <a
                href="#projects"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover-bg-violet-ghost"
              >
                <ArrowDown className={iconClass} />
                {content.hero.primaryCta}
              </a>
              <a
                href={content.links.cv}
                download
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <Download className={iconClass} />
                {content.hero.secondaryCta}
              </a>
              <a
                href={content.links.github}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <GithubLogo className={iconClass} />
                {content.hero.tertiaryCta}
              </a>
              <a
                href={content.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <LinkedinLogo className={iconClass} />
                {content.hero.linkedinCta}
              </a>
            </div>

          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="dark-card hidden p-6 lg:block"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <p className="text-sm font-bold text-white/75">{content.heroPanel.title}</p>
              <Terminal className="h-5 w-5 text-violet-on-dark" />
            </div>
            <div className="mt-5 grid gap-4">
              {content.heroPanel.items.map((item, index) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-glass text-xs font-black text-violet-on-dark">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-violet-faint">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-white/60">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function RecruiterStrip({
  content,
  githubRepoCount
}: {
  content: PortfolioContent;
  githubRepoCount: number | null;
}) {
  return (
    <section className="relative z-20 -mt-10 pb-10">
      <div className="page-shell">
        <div className="-mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-px md:overflow-hidden md:rounded-lg md:border md:border-[rgba(50,38,84,0.1)] md:bg-line-dark md:p-0 md:shadow-[0_24px_60px_rgba(44,31,78,0.08)]">
          {content.recruiterStrip.items.map((item) => {
            const hasGithubRepoCount =
              "dynamicMetric" in item &&
              item.dynamicMetric === "githubPublicRepos" &&
              typeof githubRepoCount === "number";
            const value = hasGithubRepoCount ? String(githubRepoCount) : item.value;
            const label =
              hasGithubRepoCount && "dynamicLabel" in item
                ? item.dynamicLabel
                : item.label;
            const detail =
              hasGithubRepoCount && "dynamicDetail" in item
                ? item.dynamicDetail
                : item.detail;

            return (
              <div key={item.label} className="min-w-[78%] snap-start rounded-lg border border-[rgba(50,38,84,0.1)] bg-surface-strong p-5 shadow-[0_14px_36px_rgba(44,31,78,0.08)] md:min-w-0 md:rounded-none md:border-0 md:shadow-none">
                <p className="text-2xl font-black text-ink">{value}</p>
                <p className="mt-1 text-sm font-bold text-foreground">{label}</p>
                <p className="mt-2 text-sm leading-5 text-muted">{detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileSectionNav({
  items
}: {
  items: PortfolioContent["nav"];
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-soft bg-[rgba(247,245,251,0.9)] py-2 backdrop-blur-xl md:hidden">
      <nav
        className="page-shell -my-1 flex gap-2 overflow-x-auto py-1"
        aria-label="Mobile section navigation"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="focus-ring shrink-0 rounded-md border border-soft-strong bg-white/80 px-3 py-2 text-xs font-black text-ink shadow-sm transition hover-border-violet"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  intro,
  tone = "light"
}: {
  kicker: string;
  title: string;
  intro: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={cn(
          "section-kicker",
          tone === "dark" ? "text-violet-on-dark" : "text-violet-dark"
        )}
      >
        {kicker}
      </p>
      <h2
        className={cn(
          "section-title mt-3 text-balance",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-sm leading-6 md:text-lg md:leading-7",
          tone === "dark" ? "text-white/70" : "text-muted"
        )}
      >
        {intro}
      </p>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  isActive,
  onSelect
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, delay: index * 0.03 }}
    >
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "focus-ring card group w-full p-4 text-left transition hover:-translate-y-1 hover:shadow-xl md:p-5",
          isActive && "border-violet bg-white"
        )}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-violet-soft px-2.5 py-1 text-xs font-bold text-violet-dark">
              {project.label}
            </span>
          </div>
          {project.shortTitle.toLowerCase() !== project.title.toLowerCase() ? (
            <p className="mt-4 text-xs font-black uppercase text-muted">
              {project.shortTitle}
            </p>
          ) : null}
          <h3
            className={cn(
              "text-lg font-black leading-tight text-ink md:text-xl",
              project.shortTitle.toLowerCase() !== project.title.toLowerCase()
                ? "mt-3"
                : "mt-4"
            )}
          >
            {project.title}
          </h3>
          <p className="mt-2 hidden text-sm leading-6 text-muted md:block">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="tag px-2.5 py-1 text-xs font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function ProjectDetail({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={project.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.24 }}
        className="card p-4 md:p-6 lg:sticky lg:top-5"
      >
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold text-violet-dark">
                {project.label}
              </p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-ink">
                {project.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-violet bg-violet px-3 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-dark"
                >
                  <ExternalLink className={iconClass} />
                  Live demo
                </a>
              ) : null}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-black/10 bg-ink px-3 py-2 text-sm font-bold text-on-dark transition hover:-translate-y-0.5 hover-bg-violet-dark"
              >
                <GithubLogo className={iconClass} />
                {locale === "pl" ? "Repozytorium" : "Repository"}
              </a>
            </div>
          </div>

          <p className="mt-5 rounded-lg border border-soft bg-white/60 p-4 text-base leading-7 text-foreground">
            {project.summary}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-soft bg-violet-soft p-3"
              >
                <p className="text-xs font-black uppercase text-violet-dark">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-bold leading-5 text-ink">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-black/10 pt-3">
                <p className="text-xl font-black text-ink">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                <Workflow className={iconClass} />
                {locale === "pl" ? "Wyzwanie" : "Challenge"}
              </h4>
              <p className="mt-2 text-sm leading-6 text-muted">
                {project.challenge}
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                <Users className={iconClass} />
                {locale === "pl" ? "Mój wkład" : "My contribution"}
              </h4>
              <p className="mt-2 text-sm leading-6 text-muted">
                {project.contribution}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="flex items-center gap-2 text-sm font-black text-ink">
              <Zap className={iconClass} />
              {locale === "pl" ? "Zakres techniczny" : "Technical scope"}
            </h4>
            <div className="mt-3 grid gap-2">
              {project.proof.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                  <span className="text-sm leading-6 text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="tag px-3 py-1.5 text-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

function LiveGithubRepositories({
  content,
  locale,
  repositories
}: {
  content: PortfolioContent;
  locale: Locale;
  repositories: GithubRepository[];
}) {
  return (
    <section className="mt-10 border-t border-soft pt-8 md:mt-14 md:pt-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="section-kicker text-violet-dark">
            {locale === "pl" ? "GitHub" : "GitHub"}
          </p>
          <h3 className="mt-3 text-2xl font-black text-ink md:text-3xl">
            {content.sections.projects.githubTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted md:text-base">
            {content.sections.projects.githubIntro}
          </p>
        </div>
        <a
          href={content.links.github}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-md border border-soft-strong bg-white px-4 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover-border-violet"
        >
          <GithubLogo className={iconClass} />
          {locale === "pl" ? "Profil GitHub" : "GitHub profile"}
          <ExternalLink className={iconClass} />
        </a>
      </div>

      {repositories.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repositories.map((repository, index) => {
            const updatedAt = formatRepositoryDate(repository.updatedAt, locale);
            const openLabel =
              locale === "pl" ? "Otwórz repozytorium" : "Open repository";
            const archivedLabel =
              locale === "pl" ? "archiwalne" : "archived";
            const forkLabel = locale === "pl" ? "fork" : "fork";

            return (
              <motion.a
                key={repository.id}
                href={repository.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.22, delay: Math.min(index * 0.025, 0.16) }}
                className="card focus-ring group relative flex h-full overflow-hidden p-0 transition hover:-translate-y-1 hover-border-violet hover:shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-violet"
                />
                <div className="flex w-full flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-md bg-violet-soft px-2.5 py-1 text-xs font-black uppercase text-violet-dark">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                          {repository.language ??
                            content.sections.projects.githubLanguageFallback}
                        </span>
                        {repository.isArchived ? (
                          <span className="rounded-md border border-black/10 px-2.5 py-1 text-xs font-bold text-muted">
                            {archivedLabel}
                          </span>
                        ) : null}
                        {repository.isFork ? (
                          <span className="rounded-md border border-black/10 px-2.5 py-1 text-xs font-bold text-muted">
                            {forkLabel}
                          </span>
                        ) : null}
                      </div>
                      <h4 className="mt-3 text-lg font-black leading-tight text-ink">
                        {formatRepositoryName(repository.name)}
                      </h4>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink text-on-dark transition group-hover:bg-violet">
                      <GithubLogo className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                    {repository.description ??
                      content.sections.projects.githubNoDescription}
                  </p>

                  {repository.topics.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {repository.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="tag px-2.5 py-1 text-xs font-semibold"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-4 text-xs font-bold text-muted">
                    {updatedAt ? (
                      <span>
                        {content.sections.projects.githubUpdatedLabel}: {updatedAt}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-violet" />
                      {repository.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5 text-violet" />
                      {repository.forks}
                    </span>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-violet-dark">
                    {openLabel}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      ) : (
        <div className="card mt-6 border-dashed p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-soft text-violet">
              <GithubLogo className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-lg font-black text-ink">
                {content.sections.projects.githubEmptyTitle}
              </h4>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                {content.sections.projects.githubEmptyText}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Contact({ content }: { content: PortfolioContent }) {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const emailAddress = content.links.email.replace("mailto:", "");

  function buildEmailHref() {
    const params = new URLSearchParams();
    const trimmedSubject = emailSubject.trim();
    const trimmedMessage = emailMessage.trim();

    if (trimmedSubject) {
      params.set("subject", trimmedSubject);
    }

    if (trimmedMessage) {
      params.set("body", trimmedMessage);
    }

    const query = params.toString();

    return query ? `${content.links.email}?${query}` : content.links.email;
  }

  function openEmailComposer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = buildEmailHref();
  }

  function copyTextFallback(value: string) {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }

  async function copyEmail() {
    let didCopy = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy) {
      didCopy = copyTextFallback(emailAddress);
    }

    if (didCopy) {
      setIsEmailCopied(true);
      window.setTimeout(() => setIsEmailCopied(false), 1800);
    } else {
      setIsEmailCopied(false);
    }
  }

  const actions = [
    {
      href: content.links.linkedin,
      label: content.contact.linkedinActionLabel,
      description: content.contact.linkedinLabel,
      icon: LinkedinLogo,
      external: true
    },
    {
      href: content.links.github,
      label: content.contact.githubActionLabel,
      description: content.contact.githubLabel,
      icon: GithubLogo,
      external: true
    },
    {
      href: content.links.cv,
      label: content.contact.cvLabel,
      description: content.contact.cvDescription,
      icon: Download,
      external: false,
      download: true
    }
  ];

  return (
    <section id="contact" className="bg-ink py-14 text-white md:py-24">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex h-full flex-col">
            <SectionHeading
              kicker={content.sections.contact.kicker}
              title={content.sections.contact.title}
              intro={content.sections.contact.intro}
              tone="dark"
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <button
                type="button"
                onClick={() => {
                  void copyEmail();
                }}
                className="focus-ring group flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/10 p-4 text-left transition hover:-translate-y-1 hover-border-violet-soft hover:bg-white/15"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-glass text-violet-on-dark">
                    {isEmailCopied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </span>
                  <span aria-live="polite" className="min-w-0">
                    <span className="block truncate text-sm font-bold text-white/90">
                      {isEmailCopied
                        ? content.contact.emailCopiedLabel
                        : content.contact.copyEmailLabel}
                    </span>
                    <span className="mt-1 block truncate text-xs font-semibold text-white/50">
                      {emailAddress}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover-text-violet-on-dark" />
              </button>

              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                    download={action.download}
                    className="focus-ring group flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/10 p-4 transition hover:-translate-y-1 hover-border-violet-soft hover:bg-white/15"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-glass text-violet-on-dark">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-white/90">
                          {action.label}
                        </span>
                        <span className="mt-1 block truncate text-xs font-semibold text-white/50">
                          {action.description}
                        </span>
                      </span>
                    </span>
                    {action.external ? (
                      <ExternalLink className="h-4 w-4 shrink-0 text-white/50 transition group-hover-text-violet-on-dark" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover-text-violet-on-dark" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={openEmailComposer}
            className="flex h-full min-h-full flex-col rounded-lg border border-white/15 bg-white p-5 text-ink shadow-2xl shadow-black/20 md:p-6"
          >
            <div className="flex items-center gap-3 border-b border-black/10 pb-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-soft text-violet">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-black text-ink">
                  {content.contact.composeTitle}
                </h3>
                <p className="mt-1 truncate text-sm font-semibold text-muted">
                  {emailAddress}
                </p>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-ink">
                {content.contact.subjectLabel}
              </span>
              <input
                type="text"
                value={emailSubject}
                onChange={(event) => setEmailSubject(event.target.value)}
                placeholder={content.contact.subjectPlaceholder}
                className="focus-ring mt-2 min-h-12 w-full rounded-md border border-black/10 bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-violet"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-ink">
                {content.contact.messageLabel}
              </span>
              <textarea
                value={emailMessage}
                onChange={(event) => setEmailMessage(event.target.value)}
                placeholder={content.contact.messagePlaceholder}
                rows={7}
                className="focus-ring mt-2 min-h-44 w-full flex-1 resize-y rounded-md border border-black/10 bg-surface px-4 py-3 text-sm font-medium leading-6 text-ink outline-none transition focus:border-violet"
              />
            </label>

            <button
              type="submit"
              className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-violet px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-dark"
            >
              <Send className={iconClass} />
              {content.contact.sendEmailLabel}
            </button>
          </form>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>Robert Tworek - 2026</p>
          <p>Next.js / React / TypeScript / Tailwind CSS / Motion</p>
        </div>
      </div>
    </section>
  );
}
