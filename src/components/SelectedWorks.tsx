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
      id="projects"
      ref={sectionRef}
      className="bg-bg relative"
      style={{ height: `${projects.length * 130}vh` }}
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
  const chunk = 1 / total;
  // Use 60% of the chunk for the slide transition, leaving 40% for holding
  const transitionFraction = 0.6;
  
  // Card slides in during the later part of the PREVIOUS chunk
  const slideStart = (index - 1) * chunk + chunk * (1 - transitionFraction);
  const slideEnd = index * chunk;

  const yRange = index === 0 ? [0, 1] : [slideStart, slideEnd];
  const y = useTransform(
    progress,
    yRange,
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  // Card scales down during the later part of ITS OWN chunk
  const scaleStart = index * chunk + chunk * (1 - transitionFraction);
  const scaleEnd = (index + 1) * chunk;

  const scale = useTransform(
    progress,
    [scaleStart, scaleEnd],
    index === total - 1 ? [1, 1] : [1, 0.94]
  );
  const opacity = useTransform(
    progress,
    [scaleStart, scaleEnd],
    index === total - 1 ? [1, 1] : [1, 0.5]
  );

  // Micro-interactions for continuous feedback
  const imageScale = useTransform(
    progress,
    [index === 0 ? 0 : slideStart, scaleEnd],
    [1, 1.1]
  );

  const contentY = useTransform(
    progress,
    [index * chunk, scaleEnd],
    ["0px", "-16px"]
  );

  const holdProgress = useTransform(
    progress,
    [index * chunk, index === total - 1 ? 1 : scaleStart],
    ["0%", "100%"]
  );
  const hasLiveSite = Boolean(project.liveUrl);

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
              style={{ width: holdProgress }}
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
          <motion.div 
            className="relative p-6 md:p-8 lg:p-10 flex flex-col gap-6 bg-surface z-10"
            style={{ y: contentY }}
          >
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
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full border border-stroke text-muted bg-bg/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl mb-5">
                {renderDescription(project.description, project.accentColor)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
              {/* Highlighted metrics */}
              {project.metrics ? (
                <div className="grid grid-cols-2 gap-3 max-w-xl w-full">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="relative rounded-2xl border border-stroke bg-bg/40 p-5 overflow-hidden group hover:border-white/20 transition-colors"
                    >
                      {/* Subtle background glow */}
                      <div className={`absolute -inset-4 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 bg-current ${project.accentColor}`} />
                      
                      <div className={`relative text-3xl md:text-4xl font-display italic leading-none mb-2 drop-shadow-md ${project.accentColor}`}>
                        {m.value}
                      </div>
                      <div className="relative text-[11px] uppercase tracking-[0.15em] text-text-primary leading-snug">
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
                    className="group relative inline-flex w-full items-center justify-between overflow-hidden rounded-full border border-stroke bg-bg/60 text-text-primary shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent md:w-auto md:min-w-[210px]"
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedWorks;
