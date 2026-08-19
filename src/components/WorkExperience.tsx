import { motion } from "framer-motion";

const impact = [
  { value: "4", label: "systems unified" },
  { value: "~65%", label: "fewer API calls" },
  { value: "5+", label: "signal types" },
  { value: "Live", label: "production launch" },
];

const highlights = [
  {
    number: "01",
    title: "Unified a fragmented data stack",
    description:
      "Built a server-side pipeline across Google Search Console, SE Ranking, WordPress, and Supabase, using URL normalization and structured aggregation to create one reliable application workflow.",
  },
  {
    number: "02",
    title: "Made third-party APIs dramatically leaner",
    description:
      "Reworked orchestration around on-demand execution, 24-hour caching, request deduplication, rate-limit retries, and controlled sequencing - reducing external API calls by roughly 65%.",
  },
  {
    number: "03",
    title: "Turned raw signals into decisions",
    description:
      "Combined performance, ranking, authority, backlink, and audit data into prioritized recommendations, with fault-tolerant handling when individual upstream services failed.",
  },
  {
    number: "04",
    title: "Shipped with the people using it",
    description:
      "Worked directly with project stakeholders and a three-person development team through demos, technical feedback, regression testing, Git-based review, and production handoff.",
  },
];

const technologies = ["React", "Node.js", "Supabase", "Data pipelines", "API orchestration"];

const WorkExperience = () => (
  <section
    id="experience"
    className="relative overflow-hidden border-y border-stroke/70 bg-bg py-24 md:py-32"
  >
    <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_78%_20%,rgba(78,133,191,0.13),transparent_36%)]" />
    <div className="pointer-events-none absolute right-[-3vw] top-[-8rem] select-none font-display text-[18rem] italic leading-none text-white/[0.018] md:text-[26rem]">
      01
    </div>

    <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-16">
      <div className="mb-16 flex items-center gap-4 md:mb-20">
        <span className="h-px w-10 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">
          Work experience
        </span>
        <span className="h-px flex-1 bg-stroke/70" />
        <span className="text-xs tabular-nums text-muted">01 / 01</span>
      </div>

      <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:sticky lg:top-28 lg:self-start"
        >
          <div className="absolute bottom-0 left-0 top-0 w-px bg-stroke" />
          <div className="absolute left-[-3px] top-1 h-[7px] w-[7px] rounded-full bg-[#4E85BF] shadow-[0_0_24px_rgba(78,133,191,0.8)]" />

          <div className="pl-7">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#89AACC]">
              May - August 2026
            </p>
            <h2 className="mb-3 font-display text-4xl italic leading-none text-text-primary md:text-5xl">
              Software Developer
            </h2>
            <p className="mb-8 text-lg text-muted">Zivko Online Solutions</p>

            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="border-b border-stroke pb-1 text-xs text-muted"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-muted">
              Full-stack analytics workflow
            </p>
            <h3 className="max-w-3xl text-3xl leading-[1.12] text-text-primary md:text-4xl lg:text-[2.7rem]">
              From scattered third-party data to a production workflow built for
              <span className="font-display italic text-[#89AACC]"> clear decisions.</span>
            </h3>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Owned and shipped features across an existing React, Node.js, and Supabase codebase,
              translating stakeholder requirements into a live analytics experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="my-12 grid grid-cols-2 border-y border-stroke md:grid-cols-4"
          >
            {impact.map((item, index) => (
              <div
                key={item.label}
                className={`py-6 md:px-5 ${index % 2 === 1 ? "pl-5" : "pr-5"} ${index > 0 ? "md:border-l md:border-stroke" : ""}`}
              >
                <div className="mb-2 font-display text-3xl italic text-text-primary md:text-4xl">
                  {item.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="border-t border-stroke">
            {highlights.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="grid gap-4 border-b border-stroke py-7 md:grid-cols-[3rem_0.8fr_1.2fr] md:gap-6"
              >
                <span className="text-xs tabular-nums text-[#4E85BF]">{item.number}</span>
                <h4 className="text-base font-medium leading-snug text-text-primary md:text-lg">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WorkExperience;
