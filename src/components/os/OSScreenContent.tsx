"use client";

import { useState, useRef, useEffect, useLayoutEffect, type ReactNode } from "react";
import Image from "next/image";
import { useSound } from "@/context/SoundContext";
import { assets } from "@/lib/assets";
import {
  ACHIEVEMENTS,
  CONTACT,
  FILE_ENTRIES,
  OTHER_PROJECTS,
  RESUME_PDF,
  SEER_LABS,
  SKILL_GROUPS,
  TOTAL_PROJECT_SLOTS,
  type ProjectModule,
} from "@/lib/os-content";
import type { OSScreenId } from "@/lib/os-types";

type OSScreenContentProps = {
  screen: OSScreenId;
  onNavigate: (id: OSScreenId) => void;
};

type ViewportTabItem<T extends string | number> = { id: T; label: string };

const viewportTabBaseClass =
  "retro-font rounded-[var(--os-radius)] border-2 px-2.5 py-2 text-[8px] font-semibold leading-snug tracking-[0.1em] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg-dark sm:px-3 sm:py-1.5 sm:text-[9px]";
const viewportTabActiveClass =
  "border-retro-highlight/70 bg-retro-highlight/14 text-retro-highlight-bright shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";
const viewportTabIdleClass =
  "border-retro-border/45 bg-black/25 text-retro-muted hover:border-retro-highlight/35 hover:text-retro-text/90";

/** Scrollable inset panel: retro scrollbar + optional “SCROLL ↓” hint until user scrolls. */
function PanelScrollArea({
  children,
  className = "",
  showScrollHint = true,
}: {
  children: ReactNode;
  className?: string;
  showScrollHint?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  const measureOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;
    setHasOverflow(el.scrollHeight > el.clientHeight + 1);
  };

  useLayoutEffect(() => {
    measureOverflow();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measureOverflow());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop > 10) setHintDismissed(true);
  };

  const hintVisible = showScrollHint && hasOverflow;

  return (
    <div className={`relative flex min-h-0 min-w-0 flex-1 flex-col ${className}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="os-panel-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain pr-1"
      >
        <div className="pb-7">{children}</div>
      </div>
      {hintVisible && (
        <p
          className={`pointer-events-none absolute bottom-2 left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-retro-highlight/80 transition-opacity duration-500 ease-out motion-reduce:duration-150 motion-reduce:animate-none ${hintDismissed ? "opacity-0" : "opacity-95 motion-safe:animate-pulse"}`}
          aria-hidden
        >
          SCROLL ↓
        </p>
      )}
    </div>
  );
}

function ViewportTabStrip<T extends string | number>({
  items,
  activeId,
  onChange,
  ariaLabel,
}: {
  items: readonly ViewportTabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  ariaLabel: string;
}) {
  const { playSound } = useSound();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex shrink-0 flex-wrap gap-1.5 border-b border-retro-border/55 pb-2.5"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={String(item.id)}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${viewportTabBaseClass} ${isActive ? viewportTabActiveClass : viewportTabIdleClass}`}
            onClick={() => {
              playSound("click");
              onChange(item.id);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default function OSScreenContent({ screen, onNavigate }: OSScreenContentProps) {
  const { playSound } = useSound();

  let panel: ReactNode = null;
  switch (screen) {
    case "home":
      panel = (
        <HomeView
          onViewProjects={() => {
            playSound("click");
            onNavigate("projects");
          }}
        />
      );
      break;
    case "profile":
      panel = <ProfileView />;
      break;
    case "projects":
      panel = <ProjectsView />;
      break;
    case "skills":
      panel = <SkillsView />;
      break;
    case "files":
      panel = <FilesView />;
      break;
    case "contact":
      panel = <ContactView />;
      break;
    default:
      panel = null;
  }

  return <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{panel}</div>;
}

function HomeView({ onViewProjects }: { onViewProjects: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-3 py-4 text-center sm:px-4 sm:py-5">
      <div className="relative flex w-full max-w-[min(100%,36rem)] flex-col items-center gap-5 sm:gap-6 md:max-w-[38rem] md:gap-7">
        <div className="relative shrink-0">
          <div
            className="pointer-events-none absolute -inset-8 rounded-full bg-retro-highlight/[0.06] blur-2xl md:-inset-12"
            aria-hidden
          />
          <p className="relative m-0 font-mono text-[10px] uppercase tracking-[0.3em] text-retro-muted sm:text-[11px]">
            System · Home
          </p>
          <p className="relative m-0 mt-3.5 retro-font text-2xl leading-[1.12] tracking-wide text-retro-highlight-bright retro-title-readable sm:mt-4 sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-6xl">
            Rodrigo Seer
          </p>
        </div>
        <p className="relative z-[1] m-0 max-w-[28rem] text-pretty os-body sm:max-w-lg md:text-[1.0625rem] md:leading-[1.72]">
          I build real-world software systems — data-driven apps, APIs, and tools people actually use.
        </p>
        <div className="relative z-[1] flex w-full flex-col items-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={onViewProjects}
            className="retro-cta-button w-full max-w-xs shrink-0 rounded-[var(--os-radius)] border-2 border-retro-highlight/90 bg-retro-highlight/32 px-8 py-3.5 text-base text-retro-highlight-bright shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-[transform,background-color,border-color,box-shadow] duration-150 ease-out hover:scale-[1.03] hover:border-retro-highlight-bright hover:bg-retro-highlight/44 hover:shadow-[0_8px_32px_rgba(0,0,0,0.48),0_0_36px_rgba(167,139,250,0.38),inset_0_1px_0_rgba(255,255,255,0.12)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight-bright focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg-dark motion-reduce:transition-none motion-reduce:hover:scale-100 md:max-w-sm md:px-10 md:py-4 md:text-lg"
          >
            Explore Systems
          </button>
          <p className="m-0 max-w-md font-mono text-[9px] leading-relaxed tracking-[0.04em] text-retro-highlight/78 sm:text-[10px] md:text-[11px]">
            <span className="text-retro-highlight/55" aria-hidden>
              →{" "}
            </span>
            700+ users in first week • Real-time data systems • Full-stack apps
          </p>
        </div>
      </div>
    </div>
  );
}

type ProfileBlock =
  | { title: string; kind: "paragraphs"; paragraphs: string[] }
  | { title: string; kind: "list"; items: string[] };

const PROFILE_TAB_LABELS = ["About", "Drives", "Build", "Aim"] as const;

const PROFILE_BLOCKS: ProfileBlock[] = [
  {
    title: "About",
    kind: "paragraphs",
    paragraphs: [
      "I’m an Information Science student focused on building practical, production-minded software.",
      "I like turning messy real-world data into systems and tools that people actually use.",
    ],
  },
  {
    title: "What drives me",
    kind: "paragraphs",
    paragraphs: [
      "I care about building useful systems — not just projects that work, but products people actually interact with.",
    ],
  },
  {
    title: "What I like building",
    kind: "list",
    items: [
      "Full-stack applications",
      "Data-driven systems",
      "APIs and backend logic",
      "Clean, usable interfaces",
    ],
  },
  {
    title: "What I’m aiming for",
    kind: "paragraphs",
    paragraphs: [
      "Continue building and improving real-world software systems and gaining experience shipping production-level applications.",
    ],
  },
];

function ProfileView() {
  const [panel, setPanel] = useState(0);
  const b = PROFILE_BLOCKS[panel]!;
  const tabItems = PROFILE_BLOCKS.map((_, i) => ({
    id: i,
    label: PROFILE_TAB_LABELS[i]!,
  }));

  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
      role="region"
      aria-label="Profile — background"
    >
      <ViewportTabStrip
        items={tabItems}
        activeId={panel}
        onChange={setPanel}
        ariaLabel="Profile panels"
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-3" role="tabpanel">
        <section className="os-panel flex h-full min-h-0 flex-col overflow-hidden p-4 sm:p-5 md:p-6">
          <h3 className="m-0 shrink-0 border-b border-retro-border/60 pb-3 text-base text-retro-highlight-bright md:text-lg">
            {b.title}
          </h3>
          <PanelScrollArea key={panel} className="min-h-0 pt-3.5" showScrollHint>
            <div className="space-y-3.5 pb-3 font-sans text-[0.8125rem] leading-[1.68] text-retro-text/95 sm:text-sm sm:leading-[1.72]">
              {b.kind === "paragraphs" &&
                b.paragraphs.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
              {b.kind === "list" && (
                <ul className="m-0 list-none space-y-2.5 p-0 pl-0.5" aria-label={b.title}>
                  {b.items.map((item) => (
                    <li
                      key={item}
                      className="relative m-0 pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-sm before:bg-retro-highlight/70 before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </PanelScrollArea>
        </section>
      </div>
    </div>
  );
}

const missionBtnClass =
  "inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-[var(--os-radius)] border-2 border-retro-border-inner bg-retro-panel-solid/95 px-3 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-retro-highlight transition-[border-color,background-color,box-shadow,transform,color] duration-200 hover:border-retro-highlight/75 hover:bg-retro-highlight/12 hover:shadow-[0_2px_14px_rgba(0,0,0,0.35)] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg-dark sm:px-3.5";

function MissionActions({ m }: { m: ProjectModule }) {
  const { externalLinkAudioProps } = useSound();
  return (
    <div className="flex w-full min-w-0 shrink-0 flex-col gap-2">
      {m.demoUrl && (
        <a
          href={m.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={missionBtnClass}
          {...externalLinkAudioProps}
        >
          <span className="text-retro-highlight/60" aria-hidden>
            ▸
          </span>
          <span className="normal-case tracking-tight">View Project</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      )}
      {m.githubUrl && (
        <a
          href={m.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={missionBtnClass}
          {...externalLinkAudioProps}
        >
          <span className="text-retro-highlight/60" aria-hidden>
            ▸
          </span>
          <span className="normal-case tracking-tight">GitHub</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      )}
    </div>
  );
}

const moduleActionsColClass =
  "w-full shrink-0 md:mt-0 md:flex md:min-h-[5.5rem] md:w-[14rem] md:flex-col md:justify-end md:pt-0";

function ModuleMissionCard({
  m,
  slot,
  compact,
  dense,
  registryContext,
}: {
  m: ProjectModule;
  slot: string;
  compact?: boolean;
  /** Tighter layout for fixed viewport / pagination */
  dense?: boolean;
  /** Subsystem vs standalone — registry grouping */
  registryContext?: "subsystem" | "external";
}) {
  const pad = dense ? "p-4 sm:p-5" : compact ? "p-5 md:p-6" : "p-6 md:p-7";
  const hasMeta = Boolean((m.highlights && m.highlights.length > 0) || m.impactLine);
  const contextLabel =
    registryContext === "subsystem"
      ? "Platform module"
      : registryContext === "external"
        ? "Standalone project"
        : null;
  const borderTone =
    registryContext === "subsystem"
      ? "border-retro-highlight/45 hover:border-retro-highlight/65"
      : registryContext === "external"
        ? "border-retro-border/70 hover:border-retro-highlight/50"
        : "border-retro-border/65 hover:border-retro-highlight/55";
  return (
    <div
      className={`group relative flex min-h-0 flex-col overflow-hidden rounded-[var(--os-radius)] border-2 bg-[rgba(24,21,46,0.96)] shadow-[var(--panel-glow)] transition-[border-color,background-color] duration-200 ease-out hover:bg-[rgba(28,24,52,0.98)] ${borderTone} ${pad}`}
    >
      <span
        className="pointer-events-none absolute left-0 top-0 h-full w-0.5 rounded-l-lg bg-retro-highlight/80 opacity-40 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className={`relative flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch ${dense ? "gap-4 md:gap-5" : "gap-5 md:gap-8"}`}
      >
        <div className={`flex min-h-0 min-w-0 flex-1 ${dense ? "gap-2.5 md:gap-3.5" : "gap-3 md:gap-4"}`}>
          <span
            className={`shrink-0 font-mono tabular-nums text-retro-muted/90 transition-colors group-hover:text-retro-highlight/70 ${dense ? "pt-1 text-[9px]" : "pt-1 text-[10px]"}`}
          >
            {slot}
          </span>
          <div className={`min-w-0 flex-1 ${dense ? "space-y-3" : "space-y-3"}`}>
            <div className={dense ? "space-y-2" : "space-y-2.5"}>
              {contextLabel && (
                <p className="m-0 font-mono text-[8px] uppercase tracking-[0.14em] text-retro-highlight/55">
                  {contextLabel}
                </p>
              )}
              <h3
                className={`m-0 leading-tight text-retro-highlight-bright retro-title-readable transition-colors ${dense ? "text-sm sm:text-[0.9375rem]" : "text-base sm:text-[1.0625rem]"}`}
              >
                {m.name}
              </h3>
              <p
                className={`m-0 font-sans text-retro-text/93 ${dense ? "text-[11.5px] leading-[1.65] sm:text-xs sm:leading-[1.7]" : "text-[13px] leading-[1.72] sm:text-sm"}`}
              >
                {m.description}
              </p>
              {hasMeta && (
                <div
                  className={`space-y-1 border-l-2 border-retro-highlight/40 pl-2.5 pt-0.5 ${dense ? "sm:pl-3" : "pl-3"}`}
                >
                  {m.highlights?.map((line) => (
                    <p
                      key={line}
                      className={`m-0 font-mono leading-snug text-retro-highlight/85 ${dense ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px]"}`}
                    >
                      <span className="text-retro-highlight/55" aria-hidden>
                        →{" "}
                      </span>
                      {line}
                    </p>
                  ))}
                  {(!m.highlights || m.highlights.length === 0) && m.impactLine && (
                    <p
                      className={`m-0 font-mono leading-relaxed text-retro-highlight/80 ${dense ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px]"}`}
                    >
                      {m.impactLine}
                    </p>
                  )}
                </div>
              )}
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pt-0.5" aria-label="Technologies">
              {m.tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-block rounded-md border border-retro-border-inner/90 bg-black/35 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-retro-muted transition-[border-color,color,background-color] duration-200 group-hover:border-retro-highlight/45 group-hover:bg-retro-highlight/10 group-hover:text-retro-highlight/85">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={moduleActionsColClass}>
          <MissionActions m={m} />
        </div>
      </div>
    </div>
  );
}

type ProjectsRegistryTab = "platform" | "subsystems" | "external";

function ProjectsView() {
  const [registryTab, setRegistryTab] = useState<ProjectsRegistryTab>("platform");

  const seerHubModule: ProjectModule = {
    name: SEER_LABS.name,
    description: SEER_LABS.descriptionLines.join(" "),
    impactLine: SEER_LABS.impactLine,
    tags: SEER_LABS.tags,
    demoUrl: SEER_LABS.demoUrl,
    githubUrl: SEER_LABS.githubUrl,
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ViewportTabStrip<ProjectsRegistryTab>
        items={[
          { id: "platform", label: "Platform" },
          { id: "subsystems", label: "Subsystems" },
          { id: "external", label: "External" },
        ]}
        activeId={registryTab}
        onChange={setRegistryTab}
        ariaLabel="Project registry"
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-2.5" role="tabpanel">
        {registryTab === "platform" && (
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <header className="shrink-0 border-b border-retro-border/50 pb-2.5">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="m-0 font-mono text-[8px] uppercase tracking-[0.22em] text-retro-muted/85">Registry</p>
                  <p className="m-0 mt-0.5 retro-font text-xs leading-snug tracking-wide text-retro-highlight-bright sm:text-sm md:text-base">
                    Platform core
                  </p>
                </div>
                <p className="m-0 font-mono text-[9px] tabular-nums text-retro-muted/80">
                  {String(TOTAL_PROJECT_SLOTS).padStart(2, "0")} modules indexed
                </p>
              </div>
              <p className="m-0 mt-2 max-w-md font-mono text-[8px] uppercase tracking-[0.18em] text-retro-muted/78">
                Core platform · subsystems tab lists registered modules
              </p>
            </header>

            <PanelScrollArea key="projects-platform" className="min-h-0 pt-3" showScrollHint>
              <article className="relative mb-2 flex flex-col rounded-[var(--os-radius-lg)] border-2 border-retro-highlight/[0.88] bg-gradient-to-b from-retro-highlight/[0.2] via-[rgba(28,24,52,0.98)] to-[rgba(14,12,30,0.99)] p-5 shadow-[var(--panel-glow),0_0_52px_rgba(139,92,246,0.14),inset_0_1px_0_rgba(255,255,255,0.07)] sm:p-6 md:flex-row md:items-stretch md:gap-8 md:p-8">
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {SEER_LABS.badgeLabels.map((b) => (
                      <span
                        key={b}
                        className="rounded-md border border-retro-highlight/55 bg-retro-highlight/[0.16] px-2.5 py-0.5 font-mono text-[8px] font-medium uppercase tracking-wider text-retro-highlight-bright sm:text-[9px]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <h2 className="m-0 text-2xl leading-[1.12] text-retro-highlight-bright retro-title-readable sm:text-3xl md:text-4xl md:leading-[1.1]">
                    {SEER_LABS.name}
                  </h2>
                  <div className="space-y-3">
                    {SEER_LABS.descriptionLines.map((line) => (
                      <p
                        key={line}
                        className="m-0 max-w-prose text-[0.875rem] leading-[1.65] text-retro-text/95 sm:text-[0.9375rem] sm:leading-[1.68]"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="m-0 max-w-prose border-l-2 border-retro-highlight/50 pl-3 font-mono text-[10px] leading-relaxed text-retro-highlight/90 sm:text-[11px]">
                    {SEER_LABS.impactLine}
                  </p>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pt-0.5" aria-label="Stack">
                    {SEER_LABS.tags.map((t) => (
                      <li key={t}>
                        <span className="inline-block rounded-md border border-retro-border-inner/80 bg-black/45 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-retro-muted">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`shrink-0 pt-4 md:pt-1 ${moduleActionsColClass}`}>
                  <MissionActions m={seerHubModule} />
                </div>
              </article>
            </PanelScrollArea>
          </div>
        )}

        {registryTab === "subsystems" && (
          <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
            <div className="shrink-0 border-b border-retro-border/50 pb-2.5">
              <p className="m-0 font-mono text-[9px] uppercase tracking-[0.16em] text-retro-muted/75">Subsystem registry</p>
              <p className="m-0 mt-1 retro-font text-xs tracking-wide text-retro-highlight/90">Seer Labs subsystems</p>
              <p className="m-0 mt-1.5 max-w-lg font-mono text-[9px] leading-relaxed text-retro-muted/82">
                Modules registered under the platform—independent deploys, shared engineering patterns.
              </p>
            </div>
            <PanelScrollArea key="projects-subsystems" className="min-h-0" showScrollHint>
              <div className="relative ml-0.5 space-y-5 border-l-2 border-retro-highlight/35 pl-4 pb-4 md:ml-1 md:space-y-6 md:pl-6">
                {SEER_LABS.modules.map((m, i) => (
                  <ModuleMissionCard
                    key={m.name}
                    m={m}
                    slot={String(i + 1).padStart(2, "0")}
                    compact
                    registryContext="subsystem"
                  />
                ))}
              </div>
            </PanelScrollArea>
          </div>
        )}

        {registryTab === "external" && (
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="shrink-0 border-b border-retro-border/50 pb-2.5">
              <p className="m-0 font-mono text-[9px] uppercase tracking-[0.18em] text-retro-muted/75">External registry</p>
              <p className="m-0 mt-1 font-sans text-[11px] leading-snug text-retro-text/78">
                Projects outside the Seer Labs grouping—same bar for quality, APIs, and shipping.
              </p>
            </div>
            <PanelScrollArea key="projects-external" className="min-h-0 pt-3" showScrollHint>
              <div className="space-y-5 pb-3 md:space-y-6">
                {OTHER_PROJECTS.map((m, i) => (
                  <ModuleMissionCard
                    key={m.name}
                    m={m}
                    slot={String(SEER_LABS.modules.length + i + 1).padStart(2, "0")}
                    compact
                    registryContext="external"
                  />
                ))}
              </div>
            </PanelScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}

const BAR_SEGMENTS = 10;

function blockBar(value: number) {
  const filled = Math.max(0, Math.min(BAR_SEGMENTS, Math.round((value / 100) * BAR_SEGMENTS)));
  return "█".repeat(filled) + "░".repeat(BAR_SEGMENTS - filled);
}

function SkillStatRow({ name, value, compact }: { name: string; value: number; compact?: boolean }) {
  const bar = blockBar(value);
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={`shrink-0 font-sans font-semibold text-retro-text/95 ${compact ? "min-w-[5.5rem] text-[11px] sm:min-w-[6.25rem] sm:text-xs" : "min-w-[6.5rem] text-[12px] sm:text-sm md:min-w-[7.5rem]"}`}
        >
          {name}
        </span>
        <span
          className={`min-w-0 flex-1 font-mono leading-none tracking-tight text-retro-highlight/95 ${compact ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px]"}`}
          aria-hidden
        >
          {bar}
        </span>
        <span
          className={`shrink-0 font-mono tabular-nums text-retro-muted ${compact ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px]"}`}
        >
          {value}
        </span>
      </div>
      <div
        className={`relative overflow-hidden rounded-full border border-retro-border-inner bg-black/45 ${compact ? "h-1" : "h-1.5"}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={`${name}, ${value} percent`}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-600/90 to-retro-highlight shadow-[0_0_8px_rgba(167,139,250,0.35)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

type SkillsMainTab = "capabilities" | "achievements";

function SkillsView() {
  const [mainTab, setMainTab] = useState<SkillsMainTab>("capabilities");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ViewportTabStrip<SkillsMainTab>
        items={[
          { id: "capabilities", label: "Capabilities" },
          { id: "achievements", label: "Achievements" },
        ]}
        activeId={mainTab}
        onChange={setMainTab}
        ariaLabel="Skills views"
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-2.5" role="tabpanel">
        {mainTab === "capabilities" && (
          <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
            <header className="shrink-0 border-b border-retro-border/50 pb-2.5">
              <p className="m-0 font-mono text-[8px] uppercase tracking-[0.2em] text-retro-muted/85">Technical profile</p>
              <p className="m-0 mt-0.5 retro-font text-xs leading-snug tracking-wide text-retro-highlight-bright sm:text-sm md:text-base">
                Stack & depth
              </p>
            </header>

            <PanelScrollArea key="skills-caps" className="min-h-0" showScrollHint>
              <div className="space-y-3.5 pb-3">
                {SKILL_GROUPS.map((group) => (
                  <div
                    key={group.category}
                    className="os-panel flex flex-col gap-3 p-3.5 sm:p-4 md:p-4"
                  >
                    <h3 className="m-0 border-b border-retro-border/45 pb-2.5 text-sm text-retro-highlight-bright">
                      {group.category}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {group.stats.map((s) => (
                        <SkillStatRow key={s.name} name={s.name} value={s.value} compact />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PanelScrollArea>
          </div>
        )}

        {mainTab === "achievements" && (
          <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
            <header className="shrink-0 border-b border-retro-border/50 pb-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-amber-400/85" aria-hidden>
                  ★
                </span>
                <h3 className="m-0 text-sm text-retro-highlight-bright md:text-base">Proof points</h3>
                <span className="font-mono text-[8px] uppercase tracking-wider text-retro-muted/85">Verified</span>
              </div>
            </header>
            <PanelScrollArea key="skills-ach" className="min-h-0" showScrollHint>
              <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 pb-3 sm:grid-cols-3 sm:gap-3 md:gap-3.5">
                {ACHIEVEMENTS.map((a) => (
                  <li
                    key={a.title}
                    className="flex min-w-0 gap-2.5 rounded-[var(--os-radius)] border-2 border-retro-border/60 bg-[rgba(20,18,40,0.92)] p-3.5 sm:p-4"
                  >
                    <span className="shrink-0 select-none text-sm leading-none text-emerald-400/85" aria-hidden>
                      ✓
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 retro-font text-xs text-retro-highlight sm:text-sm">{a.title}</p>
                      <p className="m-0 mt-2 text-[10px] leading-[1.55] text-retro-text/90 sm:text-[11px] sm:leading-snug">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </PanelScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeSystemFilePanel() {
  const { playSound, externalLinkAudioProps } = useSound();

  return (
    <section
      className="os-panel shrink-0 overflow-hidden rounded-[var(--os-radius)] border-2 border-retro-highlight/30 bg-[rgba(20,18,40,0.94)] shadow-[var(--panel-glow)]"
      aria-labelledby="resume-file-title"
    >
      <div className="border-b border-retro-border/55 bg-gradient-to-r from-retro-panel-solid/98 to-retro-panel-solid/85 px-4 py-3 sm:px-5 sm:py-3.5">
        <p className="m-0 font-mono text-[9px] uppercase tracking-[0.2em] text-retro-muted/90">System file</p>
        <div className="mt-3 flex items-start gap-3 sm:gap-4">
          <Image
            src={assets.icons.document}
            alt=""
            width={40}
            height={40}
            className="retro-nav-icon h-9 w-9 shrink-0 object-contain opacity-95 sm:h-10 sm:w-10"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <h2 id="resume-file-title" className="m-0 text-xs text-retro-highlight-bright sm:text-sm">
              Resume
            </h2>
            <p className="m-0 mt-1 font-mono text-[10px] text-retro-muted/95">{RESUME_PDF.filename}</p>
            <p className="m-0 mt-2 max-w-md font-sans text-[11px] leading-relaxed text-retro-text/85 sm:text-xs">
              Canonical PDF — open in-browser or download for ATS and recruiters.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <a
            href={RESUME_PDF.href}
            target="_blank"
            rel="noopener noreferrer"
            className={missionBtnClass}
            {...externalLinkAudioProps}
          >
            <span className="text-retro-highlight/60" aria-hidden>
              ▸
            </span>
            <span className="normal-case tracking-tight">Open Resume</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a
            href={RESUME_PDF.href}
            download={RESUME_PDF.downloadAs}
            className={missionBtnClass}
            onPointerDown={externalLinkAudioProps.onPointerDown}
            onClick={() => playSound("click")}
          >
            <span className="text-retro-highlight/60" aria-hidden>
              ⬇
            </span>
            <span className="normal-case tracking-tight">Download Resume</span>
          </a>
        </div>

        <div className="hidden md:block">
          <p className="m-0 mb-2 font-mono text-[9px] uppercase tracking-wider text-retro-muted/85">Preview</p>
          <div className="overflow-hidden rounded-[var(--os-radius)] border-2 border-retro-border/55 bg-black/50 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.08)]">
            <div className="os-panel-scroll max-h-52 overflow-y-auto overflow-x-hidden">
              <iframe
                src={`${RESUME_PDF.href}#view=FitH`}
                title="Resume PDF preview"
                className="min-h-[13rem] w-full border-0 bg-[#14122a]"
              />
            </div>
          </div>
          <p className="m-0 mt-2 font-sans text-[10px] leading-snug text-retro-muted/75">
            If the preview is empty, use Open or Download — some mobile browsers hide embedded PDFs.
          </p>
        </div>
      </div>
    </section>
  );
}

function FilesView() {
  const { playSound, externalLinkAudioProps } = useSound();
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden font-mono text-xs sm:text-sm">
      <p className="mb-2.5 shrink-0 text-[10px] uppercase tracking-wider text-retro-muted/85">
        Volume SYS · /user/rodrigo/ — résumé & system files
      </p>
      <PanelScrollArea className="min-h-0" showScrollHint>
        <div className="space-y-5 pb-2">
          <ResumeSystemFilePanel />

          <div>
            <p className="m-0 mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-retro-muted/80">Volume index</p>
            <ul className="m-0 list-none space-y-2 p-0">
          {FILE_ENTRIES.map((entry) => {
          if (entry.type === "file") {
            const external = entry.external && entry.href.startsWith("http");
            return (
              <li key={entry.name} className="shrink-0">
                <a
                  href={entry.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  onPointerDown={external ? externalLinkAudioProps.onPointerDown : undefined}
                  onClick={(e) => {
                    if (external) externalLinkAudioProps.onClick();
                    else playSound("click");
                    if (entry.href === "#") e.preventDefault();
                  }}
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[var(--os-radius)] border-2 border-transparent px-3 py-3.5 transition-colors duration-200 hover:border-retro-highlight/40 hover:bg-retro-highlight/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight"
                >
                  <span className="shrink-0 text-retro-highlight">[FILE]</span>
                  <span className="truncate font-sans text-sm text-retro-text">{entry.name}</span>
                  <span className="truncate font-sans text-[11px] text-retro-muted">— {entry.hint}</span>
                  {external && <span className="sr-only"> (opens in new tab)</span>}
                </a>
              </li>
            );
          }
          return (
            <li
              key={entry.name}
              className="shrink-0 overflow-hidden rounded-[var(--os-radius)] border-2 border-retro-border/55 bg-[rgba(18,16,36,0.75)] px-4 py-3 shadow-[inset_0_1px_0_rgba(167,139,250,0.05)]"
            >
              <div className="flex min-w-0 items-center gap-2 text-xs text-retro-highlight">
                <span>[DIR]</span>
                <span className="truncate">{entry.name}</span>
                <span className="truncate text-[10px] font-normal text-retro-muted">— {entry.hint}</span>
              </div>
              <ul className="m-0 mt-2 list-none space-y-1 border-l border-retro-border/40 pl-3 text-[10px] text-retro-muted">
                {entry.children.map((c) => (
                  <li key={c.name} className="line-clamp-2">
                    <span className="text-retro-text/90">{c.name}</span>
                    {c.detail && (
                      <span className="mt-0.5 block leading-snug text-retro-muted/90 line-clamp-2">{c.detail}</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
            </ul>
          </div>
        </div>
      </PanelScrollArea>
    </div>
  );
}

function ContactView() {
  const { externalLinkAudioProps } = useSound();
  const items = [
    { label: "Email", href: CONTACT.email, external: false as const, action: "rodrigo16seer@gmail.com" },
    { label: "GitHub", href: CONTACT.github, external: true as const, action: "GitHub" },
    { label: "LinkedIn", href: CONTACT.linkedin, external: true as const, action: "LinkedIn" },
  ];
  const contactBtnClass =
    "inline-flex w-full justify-center rounded-[var(--os-radius)] border-2 border-retro-highlight/55 bg-retro-highlight/14 px-5 py-3 font-sans text-sm font-semibold text-retro-highlight transition-[background-color,border-color,transform] duration-200 hover:scale-[1.01] hover:border-retro-highlight-bright hover:bg-retro-highlight/24 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg-dark sm:w-auto sm:text-[0.9375rem]";

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden py-1">
      <div className="flex max-h-full min-h-0 flex-col overflow-hidden rounded-[var(--os-radius)] border-2 border-retro-border/70 bg-[rgba(18,16,36,0.88)] shadow-[var(--panel-glow)]">
        <div className="shrink-0 border-b border-retro-border/60 bg-retro-panel-solid/80 px-4 py-2.5 retro-font text-[9px] tracking-[0.14em] text-retro-highlight">
          Contact · direct channels
        </div>
        <ul className="m-0 flex list-none flex-col divide-y divide-retro-border/40 p-0">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex min-h-0 shrink-0 flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4"
            >
              <span className="shrink-0 retro-font text-[11px] uppercase tracking-wider text-retro-muted sm:text-xs">
                {item.label}
              </span>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={contactBtnClass}
                {...externalLinkAudioProps}
              >
                {item.action}
                {item.external && <span className="sr-only"> (opens in new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
