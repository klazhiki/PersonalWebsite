import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import donemakerLogo from "@/assets/donemaker-logo.jpg";
import eclipseLogo from "@/assets/eclipse-logo.png";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type?: string;
  link?: {
    url: string;
    label: string;
  };
  logo: {
    type: "image" | "custom";
    src?: string;
    symbol?: string;
  };
  bullets: string[];
  stack: string[];
}

const experiences: Experience[] = [
  {
    id: "donemaker",
    role: "Software Engineer Intern",
    company: "DoneMaker",
    period: "May 2026 – August 2026",
    location: "Ontario, Canada",
    type: "Full-Stack Analytics",
    logo: {
      type: "image",
      src: donemakerLogo,
    },
    bullets: [
      "Owned and shipped a full-stack analytics workflow, translating stakeholder requirements into production features across an existing React, Node.js, and Supabase codebase.",
      "Built a server-side data pipeline integrating 4 independent systems (Google Search Console, SE Ranking, WordPress, Supabase) with URL normalization and structured aggregation to unify fragmented third-party data into a single application workflow.",
      "Redesigned third-party API orchestration around on-demand execution, reducing third-party API calls by ~65% through 24-hour caching, request deduplication, rate-limit retries, and controlled request sequencing.",
      "Developed a decision and recommendation layer combining 5+ independent signal types across performance, ranking, authority, backlink, and audit data into prioritized application outputs, with fault-tolerant handling that preserved usable results when individual upstream services failed.",
      "Partnered directly with project stakeholders and a 3-person development team through feature demos, technical feedback, regression testing, Git-based review, and production handoff, ultimately shipping the workflow to the live application.",
    ],
    stack: [
      "React",
      "Node.js",
      "Supabase",
      "Google Search Console",
      "SE Ranking",
      "WordPress API",
      "REST APIs",
      "Caching Strategies",
    ],
  },
  {
    id: "eclipse",
    role: "Founder & Organizer",
    company: "Eclipse Hackathons",
    period: "August 2024 – November 2024",
    location: "Ontario, Canada",
    type: "Leadership & Platform Engineering",
    link: {
      url: "https://eclipse-hackathon.devpost.com/",
      label: "View Devpost",
    },
    logo: {
      type: "image",
      src: eclipseLogo,
    },
    bullets: [
      "Founded and led an 80+ participant hackathon across 15+ Ontario schools, securing HCLTech sponsorship and recruiting judges from AMD, Dropbox, Fractal Analytics, and SAP Concur.",
      "Designed and developed the event's website, registration system, submission portal, automated email workflows, and backend application infrastructure supporting 80+ registered users with zero downtime during live judging.",
    ],
    stack: [
      "Full-Stack Web",
      "Registration System",
      "Submission Portal",
      "Email Workflows",
      "Infrastructure",
    ],
  },
];

const renderBulletWithHighlights = (text: string) => {
  const parts = text.split(
    /(~?\d+[%+]?|\b(?:Google Search Console|SE Ranking|WordPress|Supabase|HCLTech|AMD|Dropbox|Fractal Analytics|SAP Concur|zero downtime|4 independent systems|5\+ independent signal types|80\+ participant|80\+ registered users|15\+ Ontario schools)\b)/g
  );

  return parts.map((part, i) => {
    if (
      /(~?\d+[%+]?|\b(?:Google Search Console|SE Ranking|WordPress|Supabase|HCLTech|AMD|Dropbox|Fractal Analytics|SAP Concur|zero downtime|4 independent systems|5\+ independent signal types|80\+ participant|80\+ registered users|15\+ Ontario schools)\b)/.test(
        part
      )
    ) {
      return (
        <span
          key={i}
          className="font-medium text-neutral-100 transition-colors duration-200"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const customEase = [0.21, 0.47, 0.32, 0.98] as const;

// Experience Card with refined Liquid Glass styling
const ExperienceCard = ({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.06), transparent 80%)`;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.14,
        ease: customEase,
      }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.13] bg-neutral-950/45 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5),0_16px_50px_rgba(0,0,0,0.6)] transition-all duration-400 hover:border-white/[0.24] hover:bg-neutral-950/60 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_20px_60px_rgba(0,0,0,0.7)]"
    >
      {/* Subtle mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />

      {/* Specular hairline top light reflection */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      {/* Header: Role, Company, Period, Links */}
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          {/* Liquid Glass Company Logo Container */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.15] bg-white/[0.04] p-1 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          >
            {exp.logo.type === "image" && exp.logo.src ? (
              <img
                src={exp.logo.src}
                alt={exp.company}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <span className="font-display text-xl font-bold italic text-indigo-400">
                {exp.logo.symbol}
              </span>
            )}
          </motion.div>

          <div>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-100 sm:text-xl">
                {exp.role}
              </h3>
              <span className="text-neutral-400 font-medium">·</span>
              <span className="text-base font-medium text-neutral-300 transition-colors duration-200 group-hover:text-white sm:text-lg">
                {exp.company}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                {exp.period}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                {exp.location}
              </span>
            </div>
          </div>
        </div>

        {/* Liquid Glass Devpost Link */}
        {exp.link && (
          <motion.a
            href={exp.link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="group/link inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-200 hover:border-white/30 hover:bg-white/[0.09] hover:text-white hover:shadow-md"
          >
            <span>{exp.link.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </motion.a>
        )}
      </div>

      {/* Bullet Points */}
      <ul className="relative z-10 mt-6 space-y-3 border-t border-white/[0.07] pt-5">
        {exp.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.2 + i * 0.05,
              ease: "easeOut",
            }}
            className="group/bullet flex items-start gap-3 text-[13px] leading-relaxed text-neutral-300 transition-colors duration-200 hover:text-white sm:text-sm"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600 transition-all duration-200 group-hover/bullet:scale-125 group-hover/bullet:bg-neutral-300" />
            <span>{renderBulletWithHighlights(bullet)}</span>
          </motion.li>
        ))}
      </ul>

      {/* Liquid Glass Tech Stack Pills */}
      <div className="relative z-10 mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.05] pt-4">
        {exp.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-400 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-neutral-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
};

const WorkExperience = () => {
  return (
    <section
      id="experience"
      className="relative border-y border-white/[0.07] bg-[#09090b] py-20 md:py-28"
    >
      {/* Ambient background refraction light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/[0.05] via-indigo-600/[0.03] to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1060px] px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: customEase }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: customEase }}
            className="mt-3 text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl"
          >
            Work Experience
          </motion.h2>
        </div>

        {/* Linear Experience List */}
        <div className="space-y-8 md:space-y-10">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
