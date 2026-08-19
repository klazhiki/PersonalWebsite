import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Award, Sparkles } from "lucide-react";
import sentinelImage from "@/assets/sentinel.png";
import safeguardImage from "@/assets/safeguard.png";

type Metric = { value: string; label: string; subtext?: string };

type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  badge?: string;
  description: string;
  stack: string[];
  image: string;
  gradient: string;
  accentColor: string;
  accentBorder: string;
  glowColor: string;
  liveUrl?: string;
  metrics: Metric[];
};

const renderDescription = (text: string) => {
  const parts = text.split(
    /(~?\d+[%+]?|−\d+[%+]?|\b(?:50k\+ LOC|40\+ open-source repos|800 monthly visits|8 images per request|Best Use of Gemini API)\b)/g
  );
  return parts.map((part, i) => {
    if (
      /(~?\d+[%+]?|−\d+[%+]?|\b(?:50k\+ LOC|40\+ open-source repos|800 monthly visits|8 images per request|Best Use of Gemini API)\b)/.test(
        part
      )
    ) {
      return (
        <span key={i} className="font-semibold text-neutral-100">
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
    category: "AI Security & Static Analysis",
    year: "Nov 2025 – Present",
    description:
      "AI-driven application security auditor that analyzes local and GitHub repositories to generate structured vulnerability findings, attack-flow graphs, and remediation guidance. Scaled a production web app averaging ~800 monthly visits, compressed prompts across 50k+ LOC codebases to reduce token spend by 28%, reduced false positives by ~35% vs rule-only scanners (across 40+ open-source repos), and achieved a ~70% successful Git-patch fix application rate.",
    stack: ["Python", "TypeScript", "Gemini API", "GitHub Actions", "Vercel"],
    image: sentinelImage,
    gradient: "from-blue-600/30 via-indigo-600/20 to-transparent",
    accentColor: "text-blue-400",
    accentBorder: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
    liveUrl: "https://sentinelauditor.vercel.app/",
    metrics: [
      { value: "−35%", label: "False Positives", subtext: "vs rule-only scanners" },
      { value: "~70%", label: "Git Patch Success", subtext: "Automated fix application" },
      { value: "~800", label: "Monthly Scans", subtext: "Active production traffic" },
    ],
  },
  {
    slug: "safeguard-ai-safety",
    title: "SafeGuard",
    category: "AI Computer Vision & Safety",
    year: "Mar 2026",
    badge: "MacHacks Winner · Best Use of Gemini API",
    description:
      "Built and deployed an AI safety application that analyzes environmental images to identify hazards and generate structured risk reports. Engineered a Gemini vision pipeline with normalized JSON outputs supporting up to 8 images per request and context-aware follow-up analysis, with client-side image compression reducing payload sizes by ~60% before serverless inference.",
    stack: ["JavaScript", "React", "Tailwind CSS", "Flask", "Gemini API", "Vercel"],
    image: safeguardImage,
    gradient: "from-emerald-600/30 via-teal-600/20 to-transparent",
    accentColor: "text-emerald-400",
    accentBorder: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.15)",
    metrics: [
      { value: "Winner", label: "Best Gemini API", subtext: "MacHacks Hackathon Award" },
      { value: "−60%", label: "Payload Reduced", subtext: "Client-side image compression" },
      { value: "8 Imgs", label: "Vision Pipeline", subtext: "Normalized JSON output schema" },
    ],
  },
];

const ProjectCard = ({
  project,
  index,
  total,
  range,
  targetScale,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  range: [number, number];
  targetScale: number;
  progress: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, index === total - 1 ? 1 : 0.65]);

  return (
    <div
      ref={containerRef}
      className="sticky top-20 md:top-24 flex items-center justify-center py-4"
    >
      <motion.article
        style={{
          scale,
          opacity,
          top: `calc(10% + ${index * 24}px)`,
        }}
        className="group relative w-full max-w-[1060px] overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c0e]/95 p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-400 hover:border-white/[0.18]"
      >
        {/* Subtle Ambient Accent Glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[100px] transition-opacity duration-500"
          style={{ background: project.glowColor }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-center">
          {/* Left Column: Project Info & Metrics */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div>
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-3">
                <span className="font-semibold uppercase tracking-widest text-neutral-300">
                  {project.category}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="font-mono text-neutral-400">{project.year}</span>
                <span className="text-neutral-600">•</span>
                <span className="font-mono text-neutral-400">
                  0{index + 1} / 0{total}
                </span>
              </div>

              {/* Award Badge if present */}
              {project.badge && (
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  <Award className="h-3.5 w-3.5" />
                  <span>{project.badge}</span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-[14px]">
                {renderDescription(project.description)}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 sm:p-4 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <span className="font-display text-2xl font-bold italic tracking-tight text-white sm:text-3xl">
                    {m.value}
                  </span>
                  <p className="mt-1 text-xs font-medium text-neutral-200">
                    {m.label}
                  </p>
                  {m.subtext && (
                    <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                      {m.subtext}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Tech Stack Pills & CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-white/[0.05]">
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-200 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                >
                  <span>View Live Site</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Right Column: High Quality Preview Image */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 shadow-2xl lg:col-span-5 aspect-[16/11]">
            <motion.img
              src={project.image}
              alt={project.title}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full object-cover origin-center"
            />
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${project.gradient}`}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const SelectedWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <section id="projects" ref={containerRef} className="relative bg-[#09090b] py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-[1060px] px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Selected Work
            </span>
          </div>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">
              Featured <span className="font-display italic text-neutral-300 font-normal">projects.</span>
            </h2>

            <p className="max-w-xs text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Production AI tooling, security static analysis, and multi-modal computer vision applications.
            </p>
          </div>
        </div>

        {/* Fluid Stacking Cards Container */}
        <div className="relative">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.04;
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                total={projects.length}
                range={[i * 0.45, 1]}
                targetScale={targetScale}
                progress={smoothProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
