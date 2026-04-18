import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Hls from "hls.js";
import Navbar from "./Navbar";
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

const TECH = [
  { name: "Python", Icon: SiPython, color: "#FFD43B" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Java", Icon: SiOpenjdk, color: "#ED8B00" },
  { name: "SQL", Icon: Database, color: "#4E85BF" },
  { name: "Arduino", Icon: SiArduino, color: "#00979D" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Gemini", Icon: SiGooglegemini, color: "#8AB4F8" },
];

const ROLES = ["Software", "Fullstack", "Curious", "Aspiring"];
const VIDEO_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
    }
  }, []);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 mt-8">
          Ethan Joseph
        </h1>

        <p className="blur-in text-lg md:text-xl lg:text-2xl text-muted mb-10">
          An{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          Engineer in the making.
        </p>

        <p className="blur-in text-sm md:text-base text-muted leading-relaxed max-w-md mb-12">
          McMaster Engineering 1 Student, AI Driven Systems, Software
          Architecture.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex items-center gap-4">
          <ContactButton />
          <ViewResumeButton />
        </div>

        {/* Tech marquee */}
        <div
          className="blur-in mt-12 w-full max-w-3xl relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee gap-3">
            {[...TECH, ...TECH].map((item, i) => {
              const { Icon } = item;
              return (
                <div
                  key={`${item.name}-${i}`}
                  className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 bg-surface/60 border border-stroke rounded-full backdrop-blur-sm shrink-0"
                >
                  <span className="w-6 h-6 rounded-md bg-bg border border-stroke/60 flex items-center justify-center">
                    <Icon size={13} style={{ color: item.color }} />
                  </span>
                  <span className="text-xs text-text-primary font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="blur-in absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

const ContactButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#contact"
      className="relative rounded-full text-sm transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ inset: "-2px" }}
      />
      <span
        className={`relative z-10 block px-7 py-3.5 rounded-full transition-colors duration-300 ${
          hovered ? "bg-bg text-text-primary" : "bg-text-primary text-bg"
        }`}
      >
        Contact
      </span>
    </a>
  );
};

const ViewResumeButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      className="relative rounded-full text-sm transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ inset: "-2px" }}
      />
      <span
        className={`relative z-10 block px-7 py-3.5 rounded-full border-2 transition-colors duration-300 ${
          hovered
            ? "border-transparent bg-bg text-text-primary"
            : "border-stroke bg-bg text-text-primary"
        }`}
      >
        View Resume
      </span>
    </a>
  );
};

export default Hero;
