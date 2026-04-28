import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b"
          : "bg-transparent border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(14,14,15,0.92)" : "transparent",
        borderColor: scrolled ? "rgba(255,255,255,0.07)" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo mark */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{
              borderColor: "var(--accent-gold)",
              background: "rgba(201,168,76,0.1)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z"
                stroke="#c9a84c"
                strokeWidth="1.2"
                fill="none"
              />
              <circle cx="8" cy="8" r="2" fill="#c9a84c" />
            </svg>
          </div>
          <span
            className="font-display text-xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Catalog<span style={{ color: "var(--accent-gold)" }}>X</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {location.pathname === "/" ? "Browse Collection" : "Item Detail"}
          </span>
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 hover:bg-gold hover:text-black"
              style={{
                borderColor: "var(--accent-gold)",
                color: "var(--accent-gold)",
              }}
            >
              ← Catalog
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
