import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiTypescript,
  SiGit,
  SiGithubactions,
  SiVercel,
  SiDocker,
  SiArduino,
  SiGooglegemini,
  SiOpenjdk,
} from "react-icons/si";
import { Database } from "lucide-react";

type TechItem = {
  name: string;
  category: string;
  Icon: IconType | typeof Database;
  color: string;
};

const stack: TechItem[] = [
  { name: "Python", category: "Language", Icon: SiPython, color: "#FFD43B" },
  { name: "C", category: "Language", Icon: SiC, color: "#A8B9CC" },
  { name: "C++", category: "Language", Icon: SiCplusplus, color: "#00599C" },
  { name: "TypeScript", category: "Language", Icon: SiTypescript, color: "#3178C6" },
  { name: "Java", category: "Language", Icon: SiOpenjdk, color: "#ED8B00" },
  { name: "SQL", category: "Database", Icon: Database, color: "#4E85BF" },
  { name: "Arduino (Embedded C/C++)", category: "Microcontroller", Icon: SiArduino, color: "#00979D" },
  { name: "Git", category: "Version control", Icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", category: "CI/CD", Icon: SiGithubactions, color: "#2088FF" },
  { name: "Vercel", category: "Cloud deployment", Icon: SiVercel, color: "#FFFFFF" },
  { name: "Docker", category: "Containerization", Icon: SiDocker, color: "#2496ED" },
  { name: "Gemini", category: "LLM API integration", Icon: SiGooglegemini, color: "#8AB4F8" },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const ArrowNE = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
  </svg>
);

const TechStack = () => {
  return (
    <section
      id="stack"
      className="relative bg-bg py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-8 md:mb-10 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Tech Stack
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1.1]">
            Tools I <span className="font-display italic">build with</span>
          </h2>
        </motion.div>

        {/* Compact pill grid */}
        <motion.div
          className="flex flex-wrap gap-2.5 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {stack.map((item, i) => {
            const { Icon } = item;
            return (
              <motion.div
                key={item.name}
                className="group inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 bg-surface/60 hover:bg-surface border border-stroke rounded-full transition-all duration-300 hover:scale-[1.04] hover:border-text-primary/30 cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                viewport={{ once: true }}
                title={item.category}
              >
                <span className="w-7 h-7 rounded-md bg-bg border border-stroke/60 flex items-center justify-center shrink-0">
                  <Icon size={15} style={{ color: item.color }} />
                </span>
                <span className="text-sm text-text-primary font-medium whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
