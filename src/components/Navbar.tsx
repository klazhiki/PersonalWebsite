import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";

const NAV_LINKS = ["Home", "Projects"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [sayHiHovered, setSayHiHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const scrollPosition = window.scrollY + 250; // offset
      let currentActive = active;
      
      NAV_LINKS.forEach(link => {
        const section = document.getElementById(link.toLowerCase());
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          currentActive = link;
        }
      });
      
      if (currentActive !== active) {
        setActive(currentActive);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 md:pt-6 px-4 gap-3">
      <Link
        to="/experimental"
        aria-label="Experimental — Visual Playground"
        title="Experimental"
        className="group inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border border-white/10 bg-surface text-muted hover:text-text-primary transition-colors duration-200 absolute right-4 md:right-6 top-1/2 -translate-y-1/2 mt-2 md:mt-3"
      >
        <FlaskConical className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
      </Link>
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <button
          className="relative w-9 h-9 rounded-full p-[2px] transition-transform duration-200"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            background: logoHovered
              ? "linear-gradient(90deg, #4E85BF 0%, #89AACC 100%)"
              : "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
          }}
        >
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg">
            <span
              className={`text-[13px] font-display italic tracking-tighter text-text-primary transition-transform duration-200 ${
                logoHovered ? "scale-110" : ""
              }`}
            >
              EJ
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setActive(link)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              active === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link}
          </a>
        ))}
        
        {/* Resume link */}
        <a
          href="/Ethan_Joseph_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors duration-200"
        >
          Resume
        </a>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <a
          href="#contact"
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-colors duration-200"
          onMouseEnter={() => setSayHiHovered(true)}
          onMouseLeave={() => setSayHiHovered(false)}
        >
          {/* Gradient border on hover */}
          <span
            className={`absolute rounded-full transition-opacity duration-300 accent-gradient ${
              sayHiHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{ inset: "-2px" }}
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 -mx-3 sm:-mx-4 -my-1.5 sm:-my-2 backdrop-blur-md">
            Say hi <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
