import { motion } from "framer-motion";
import donemakerLogo from "@/assets/donemaker-logo.jpg";

const impact = [
  { value: "4", label: "systems unified" },
  { value: "~65%", label: "fewer API calls" },
  { value: "5+", label: "signal types" },
  { value: "Live", label: "production launch" },
];

const highlights = [
  {
    number: "01",
    title: "Unified four external systems",
    description:
      "Google Search Console, SE Ranking, WordPress, and Supabase became one reliable workflow.",
  },
  {
    number: "02",
    title: "Reduced API usage by ~65%",
    description:
      "Used caching, request deduplication, rate-limit retries, and controlled sequencing.",
  },
  {
    number: "03",
    title: "Shipped decision-ready analytics",
    description:
      "Combined 5+ signal types into fault-tolerant recommendations and delivered them to production.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const WorkExperience = () => (
  <section
    id="experience"
    className="relative overflow-hidden border-y border-stroke/70 bg-bg py-20 md:py-28"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.22]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
        maskImage: "linear-gradient(to bottom, black, transparent 92%)",
      }}
    />
    <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[48rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(78,133,191,0.14),transparent_68%)]" />

    <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease }}
        className="mb-7 flex items-center gap-4"
      >
        <span className="h-px w-9 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">
          Experience
        </span>
        <span className="h-px flex-1 bg-stroke/70" />
        <span className="text-xs tabular-nums text-muted">02 roles</span>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.75, delay: 0.05, ease }}
        className="group relative overflow-hidden rounded-[28px] border border-stroke bg-gradient-to-br from-surface/85 via-surface/70 to-bg/80 shadow-2xl shadow-black/20 backdrop-blur-sm transition-colors duration-500 hover:border-white/15"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6EA6DF] to-transparent opacity-70" />
        <div className="pointer-events-none absolute right-[-5rem] top-[-7rem] h-72 w-72 rounded-full bg-[#4E85BF]/[0.07] opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-col items-start gap-5 p-6 pb-0 md:flex-row md:gap-7 md:p-9 md:pb-0">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl border border-white/10 bg-[#4255dc] shadow-[0_14px_30px_rgba(37,55,190,0.22)] md:h-20 md:w-20"
          >
            <img
              src={donemakerLogo}
              alt="Zivko Online Solutions product logo"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="min-w-0 flex-1">
            <p className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#89AACC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4E85BF] shadow-[0_0_12px_rgba(78,133,191,0.8)]" />
              Zivko Online Solutions
            </p>
            <h2 className="mb-2 text-3xl font-semibold tracking-[-0.035em] text-text-primary md:text-4xl">
              Full-Stack Developer
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              Shipped a production analytics workflow in React, Node.js, and Supabase.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="text-[#89AACC]">
              May — August 2026
              </span>
              <span className="h-1 w-1 rounded-full bg-stroke" />
              <span>
              Production analytics
              </span>
            </div>
          </div>
        </div>

        <div className="mx-6 mt-8 flex flex-wrap gap-x-9 gap-y-5 border-y border-stroke py-6 md:mx-9 md:gap-x-14">
          {impact.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -3 }}
              className="w-[calc(50%-18px)] md:w-auto md:min-w-[105px]"
            >
              <p className="mb-1.5 font-display text-2xl italic leading-none text-[#9DBDDA] md:text-3xl">
                {item.value}
              </p>
              <p className="text-[10px] uppercase tracking-[0.17em] text-muted">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="p-6 md:p-9">
          <div className="mb-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-[#89AACC]">
              Selected impact
            </h3>
          </div>

          <div className="max-w-4xl">
            {highlights.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
                whileHover={{ x: 5 }}
                className="group/item relative border-t border-stroke py-5"
              >
                <div className="grid grid-cols-[2.2rem_1fr] gap-x-3 gap-y-1 md:grid-cols-[2.5rem_1fr] md:gap-x-5">
                  <span className="pt-1 text-[11px] tabular-nums text-[#4E85BF]">
                    {item.number}
                  </span>
                  <h4 className="text-base font-medium text-text-primary transition-colors group-hover/item:text-[#B7D0E8]">
                    {item.title}
                  </h4>
                  <p className="col-start-2 text-[13px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, delay: 0.08, ease }}
        className="group mt-5 overflow-hidden rounded-[24px] border border-stroke bg-surface/55 transition-colors duration-500 hover:border-white/15 hover:bg-surface/75"
      >
        <div className="grid gap-5 p-6 md:grid-cols-[68px_minmax(0,1fr)_auto] md:items-center md:gap-6 md:p-7 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-violet-300/15 bg-[radial-gradient(circle_at_32%_24%,#6f78e8,#25284f_72%)] shadow-[0_12px_28px_rgba(66,71,155,0.2)]"
          >
            <span className="absolute inset-[7px] rounded-full border border-white/15" />
            <span className="font-display text-3xl italic text-white">E</span>
          </motion.div>

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-text-primary md:text-2xl">
                Founder &amp; Organizer
              </h3>
              <span className="text-lg text-[#7086A0]">@</span>
              <p className="text-lg text-text-primary md:text-xl">Eclipse Hackathons</p>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted">
              Founded an Ontario-wide student hackathon, built its registration and
              submission platform, secured HCLTech sponsorship, and recruited judges
              from AMD, Dropbox, Fractal Analytics, and SAP Concur.
            </p>
          </div>

          <div className="md:min-w-[170px] md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8E99C9]">
              August — November 2024
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
              Community leadership
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-stroke">
          {[
            { value: "80+", label: "participants" },
            { value: "15+", label: "Ontario schools" },
            { value: "Zero", label: "downtime during judging" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ backgroundColor: "rgba(111,120,232,0.06)" }}
              className={`px-4 py-5 md:px-7 ${index > 0 ? "border-l border-stroke" : ""}`}
            >
              <p className="mb-1.5 font-display text-2xl italic text-[#A7AEE3] md:text-3xl">
                {item.value}
              </p>
              <p className="text-[9px] uppercase leading-snug tracking-[0.14em] text-muted md:text-[10px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.article>
    </div>
  </section>
);

export default WorkExperience;
