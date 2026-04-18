import { Link } from "react-router-dom";
import Explorations from "@/components/Explorations";

const Experimental = () => {
  return (
    <main className="bg-bg min-h-screen">
      {/* Lightweight top bar with a back link (no main navbar here) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full backdrop-blur-md border border-white/10 bg-surface px-4 py-2 text-xs sm:text-sm text-muted hover:text-text-primary transition-colors"
        >
          <span className="text-[10px]">←</span>
          Back to portfolio
        </Link>
      </div>

      <Explorations />
    </main>
  );
};

export default Experimental;
