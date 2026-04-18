import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
  liveUrl?: string;
  metrics?: [Metric, Metric];
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
    gradient: "from-violet-500 via-fuchsia-400/60 to-transparent",
    liveUrl: "#",
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
  },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const SelectedWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track active card for the counter
  const [active, setActive] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // each card occupies 1/projects.length of the scroll
      const idx = Math.min(
        projects.length - 1,
        Math.floor(v * projects.length)
      );
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="bg-bg relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 pt-20 md:pt-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10 px-2 gap-6">
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

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted tabular-nums">
                <span className="text-text-primary font-display italic text-2xl mr-1">
                  {String(active + 1).padStart(2, "0")}
                </span>
                / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="text-xs text-muted uppercase tracking-[0.25em] hidden sm:inline">
                Keep scrolling
              </span>
            </div>
          </div>
        </div>

        {/* Stacking cards container */}
        <div className="relative flex-1 max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 pb-16">
          <div className="relative w-full h-full px-2">
            {projects.map((p, i) => (
              <Card
                key={p.slug}
                project={p}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
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
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // Each card has a "reveal window": from index/total to (index+1)/total
  const start = index / total;
  const end = (index + 1) / total;

  // First card: already in place. Others: slide up from below.
  const y = useTransform(
    progress,
    [Math.max(0, start - 1 / total), start],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  // Once revealed, scale + fade slightly as next card lands on top
  const scale = useTransform(progress, [end - 1 / total, end], [1, 0.94]);
  const opacity = useTransform(
    progress,
    [end - 1 / total, end],
    [1, index === total - 1 ? 1 : 0.5]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
      className="absolute inset-0"
    >
      <div className="bg-surface border border-stroke rounded-3xl overflow-hidden h-full shadow-2xl shadow-black/40">
        <div className="grid grid-cols-1 grid-rows-[minmax(0,1fr)_auto] h-full min-h-[420px]">
          {/* Image side (top) */}
          <div className="relative overflow-hidden min-h-[220px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-30 mix-blend-overlay`}
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
          <div className="relative p-6 md:p-8 lg:p-10 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 text-xs text-muted uppercase tracking-[0.25em]">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span>{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span className="text-text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display italic text-text-primary leading-[1.05] mb-4">
                {project.title}
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl mb-5">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
              {/* Highlighted metrics */}
              {project.metrics ? (
                <div className="grid grid-cols-2 gap-3 max-w-xl w-full">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-stroke bg-bg/40 p-4"
                    >
                      <div className="text-2xl md:text-3xl font-display italic text-text-primary leading-none mb-2">
                        {m.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-muted leading-snug">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div />
              )}

              <div className="flex flex-col gap-4 md:items-end">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full border border-stroke text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.liveUrl ?? "#"}
                  target={project.liveUrl ? "_blank" : undefined}
                  rel={project.liveUrl ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-3 text-sm text-text-primary"
                >
                  <span className="relative">
                    {project.liveUrl ? "View live site" : "View case study"}
                    <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-text-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedWorks;
