import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import sentinelImage from "@/assets/sentinel.png";
import esp32Image from "@/assets/esp32.png";

type Metric = { value: string; label: string };

type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  image: string;
  gradient: string;
  accentColor: string;
  liveUrl?: string;
  metrics?: [Metric, Metric];
};

const renderDescription = (text: string, accentColor: string) => {
  const parts = text.split(/(~?\d+%)/g);
  return parts.map((part, i) => {
    if (/(~?\d+%)/.test(part)) {
      return (
        <span key={i} className={`font-semibold ${accentColor}`}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const projects: Project[] = [
  {
    slug: "sentinel-security-auditor",
    title: "Sentinel Security Auditor",
    category: "AI Security Tooling",
    year: "Nov 2025 – Mar 2026",
    description:
      "An AI-driven application security auditor that scans local and GitHub repositories to produce structured vulnerability findings, attack-flow graphs, and automated Git-patch remediations — cutting false positives by ~35% vs rule-only scanners and landing fixes at a ~70% success rate.",
    stack: ["Python", "TypeScript", "Gemini API", "GitHub Actions", "Vercel"],
    image: sentinelImage,
    gradient: "from-blue-600 via-blue-400/60 to-transparent",
    accentColor: "text-blue-400",
    liveUrl: "https://sentinelauditor.vercel.app/",
    metrics: [
      { value: "−35%", label: "False positives vs rule-only scanners" },
      { value: "~70%", label: "Auto-patch fix success rate" },
    ],
  },
  {
    slug: "esp32-microcontroller",
    title: "ESP32 Microcontroller Project",
    category: "In Progress — Embedded Systems",
    year: "2026",
    description:
      "Focusing on low-level microcontroller related tech — exploring firmware, peripherals, and hardware-software integration on the ESP32 platform.",
    stack: ["C++", "Python"],
    image: esp32Image,
    gradient: "from-sky-500 via-blue-400/60 to-transparent",
    accentColor: "text-sky-400",
  },
];

// One viewport displays the stack; each additional card gets a compact scroll
// runway. This keeps the transition deliberate without trapping fast scrollers.
const STACK_BASE_HEIGHT_VH = 100;
const SCROLL_VH_PER_ADDITIONAL_CARD = 82;

const useCompactProjectLayout = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isCompact;
};

const SelectedWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const prefersReducedMotion = useReducedMotion();
  const isCompact = useCompactProjectLayout();
  const stackEnabled = !isCompact && !prefersReducedMotion;
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.18,
    restDelta: 0.001,
  });
  const stackProgress = prefersReducedMotion
    ? scrollYProgress
    : springProgress;

  const [active, setActive] = useState(0);
  const sectionHeight =
    STACK_BASE_HEIGHT_VH +
    Math.max(0, projects.length - 1) * SCROLL_VH_PER_ADDITIONAL_CARD;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const idx = Math.min(
      projects.length - 1,
      Math.round(value * Math.max(1, projects.length - 1))
    );
    setActive(idx);
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-bg relative"
      style={stackEnabled ? { height: `${sectionHeight}vh` } : undefined}
    >
      <div className={stackEnabled ? "sticky top-0 h-screen flex flex-col overflow-hidden" : "flex flex-col"}>
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 pt-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 px-2 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-stroke" />
                <span className="text-xs text-muted uppercase tracking-[0.3em]">
                  Selected Work
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1.1]">
                Featured <span className="font-display italic">projects</span>
              </h2>
            </div>

            {stackEnabled && <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted tabular-nums">
                <span className="text-text-primary font-display italic text-2xl mr-1">
                  {String(active + 1).padStart(2, "0")}
                </span>
                / {String(projects.length).padStart(2, "0")}
              </span>
            </div>}
          </div>
        </div>

        {/* Stacking cards container */}
        <div className="relative flex-1 max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 pb-6">
          <div className={stackEnabled ? "relative w-full h-full px-2" : "relative w-full px-2 flex flex-col gap-6"}>
            {projects.map((p, i) => (
              <Card
                key={p.slug}
                project={p}
                index={i}
                total={projects.length}
                progress={stackProgress}
                isActive={active === i}
                reducedMotion={Boolean(prefersReducedMotion)}
                stacked={stackEnabled}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  project,
  index,
  total,
  progress,
  isActive,
  reducedMotion,
  stacked,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
  reducedMotion: boolean;
  stacked: boolean;
}) => {
  const step = 1 / Math.max(1, total - 1);
  const entryStart = index === 0 ? 0 : (index - 1) * step + step * 0.08;
  const entryEnd = index === 0 ? 0 : index * step - step * 0.16;
  const nextEntryStart = index === total - 1
    ? 1
    : index * step + step * 0.08;
  const nextEntryEnd = index === total - 1
    ? 1
    : (index + 1) * step - step * 0.16;

  const y = useTransform(
    progress,
    index === 0 ? [0, 1] : [entryStart, entryEnd],
    index === 0 || reducedMotion ? ["0vh", "0vh"] : ["70vh", "0vh"]
  );

  const scaleRange = index === 0
    ? [nextEntryStart, nextEntryEnd]
    : index === total - 1
      ? [entryStart, entryEnd]
      : [entryStart, entryEnd, nextEntryStart, nextEntryEnd];
  const scaleValues = index === 0
    ? [1, 0.955]
    : index === total - 1
      ? [0.985, 1]
      : [0.985, 1, 1, 0.955];
  const scale = useTransform(progress, scaleRange, scaleValues);
  const imageScale = useTransform(progress, [0, 1], [1, 1.055]);
  const cardProgress = useTransform(
    progress,
    index === total - 1
      ? [entryEnd, 1]
      : [entryEnd, nextEntryEnd],
    ["0%", "100%"]
  );
  const hasLiveSite = Boolean(project.liveUrl);

  return (
    <motion.div
      style={{
        y: stacked ? y : 0,
        scale: stacked ? scale : 1,
        opacity: 1,
        zIndex: index + 1,
        pointerEvents: stacked && !isActive ? "none" : "auto",
      }}
      aria-hidden={stacked ? !isActive : undefined}
      className={stacked ? "absolute inset-x-0 top-0" : "relative w-full"}
    >
      <div className={`bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl shadow-black/40 ${stacked ? "h-[min(720px,calc(100vh-195px))]" : "h-auto"}`}>
        <div className={`grid grid-cols-1 min-h-[420px] ${stacked ? "grid-rows-[clamp(160px,24vh,280px)_minmax(0,1fr)] h-full" : "grid-rows-[minmax(220px,0.7fr)_auto] h-auto"}`}>
          {/* Image side (top) */}
          <div className={`relative overflow-hidden ${stacked ? "min-h-0" : "min-h-[220px]"}`}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover origin-center"
              style={{ scale: imageScale }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-30 mix-blend-overlay`}
            />
            
            {/* Scroll Progress Indicator for Hold Phase */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20" />
            <motion.div 
              className="absolute top-0 left-0 h-1 bg-white/60 z-20 origin-left"
              style={{ width: cardProgress }}
            />
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #000 1px, transparent 1px)",
                backgroundSize: "4px 4px",
              }}
            />
          </div>

          {/* Text side (bottom) */}
          <div className={`relative px-6 flex flex-col gap-3 bg-surface z-10 ${stacked ? "py-3" : "py-4"}`}>
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] md:tracking-[0.25em] [&>span]:whitespace-nowrap">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span>{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span className="text-text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display italic text-text-primary leading-[1.05] mb-3">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full border border-stroke text-muted bg-bg/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl mb-3">
                {renderDescription(project.description, project.accentColor)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
              {/* Highlighted metrics */}
              {project.metrics ? (
                <div className="grid grid-cols-2 gap-3 max-w-xl w-full">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="relative rounded-2xl border border-stroke bg-bg/40 p-3 overflow-hidden group hover:border-white/20 transition-colors"
                    >
                      {/* Subtle background glow */}
                      <div className={`absolute -inset-4 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 bg-current ${project.accentColor}`} />
                      
                      <div className={`relative text-3xl font-display italic leading-none mb-2 drop-shadow-md ${project.accentColor}`}>
                        {m.value}
                      </div>
                      <div className="relative text-[10px] uppercase tracking-[0.12em] text-text-primary leading-snug">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div />
              )}

              <div className="flex flex-col gap-4 md:items-end h-full justify-end">
                {hasLiveSite ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={!stacked || isActive ? 0 : -1}
                    className="group relative inline-flex w-full items-center justify-between overflow-hidden rounded-full border border-stroke bg-bg/60 text-text-primary shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent md:w-auto md:min-w-[180px]"
                  >
                    <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute inset-[1px] rounded-full bg-bg/95" />
                    <div className="relative flex items-center gap-3 px-6 py-4">
                      <span className="h-2 w-2 rounded-full bg-[#4E85BF]" />
                      <span className="text-[15px] font-medium tracking-[0.01em] text-text-primary">
                        View live site
                      </span>
                    </div>
                    <span className="relative mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stroke bg-surface transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/15">
                      <svg
                        className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </a>
                ) : (
                  <a
                    href="#"
                    tabIndex={!stacked || isActive ? 0 : -1}
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-stroke bg-bg/40 px-6 py-4 text-sm font-medium text-text-primary transition-colors duration-300 hover:border-white/20 hover:bg-bg/70 w-full md:w-auto md:min-w-[200px]"
                  >
                    <span>View case study</span>
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedWorks;
