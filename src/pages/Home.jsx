import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { items } from "../data/items";
import CategorySection from "../components/CategorySection";

const ALL = "All";

const categoryMeta = {
  All: { icon: "✦", color: "#c9a84c" },
  Cars: { icon: "◈", color: "#5b9cf6" },
  Bikes: { icon: "◎", color: "#f97316" },
  Phones: { icon: "◇", color: "#a78bfa" },
  Computers: { icon: "□", color: "#34d399" },
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const allCategories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))].sort();
    return [ALL, ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = items;
    if (activeCategory !== ALL)
      result = result.filter((i) => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.itemname.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filtered]);

  const categories = Object.keys(grouped).sort();

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* ── Hero ── */}
      <div className="mb-16 relative">
        {/* Background glow */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full blur-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "var(--accent-gold)" }}
          >
            ✦ &nbsp; Premium Collection
          </p>
          <h1
            className="font-display text-5xl md:text-7xl leading-[1.05] mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Discover
            <br />
            <em style={{ color: "var(--accent-gold)" }}>Extraordinary</em>
          </h1>
          <p
            className="text-base max-w-md leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            A curated showcase of the world's finest machines — cars,
            motorcycles, phones, and computers.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-8 mt-10 pt-10 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { label: "Items", value: items.length },
            { label: "Categories", value: allCategories.length - 1 },
            { label: "Year", value: "2025" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                className="font-display text-3xl"
                style={{ color: "var(--text-primary)" }}
              >
                {value}
              </div>
              <div
                className="text-xs tracking-wider uppercase mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center justify-between"
      >
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => {
            const meta = categoryMeta[cat] || { icon: "◆", color: "#c9a84c" };
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
                style={{
                  borderColor: isActive ? meta.color : "var(--border)",
                  color: isActive ? meta.color : "var(--text-muted)",
                  background: isActive ? `${meta.color}15` : "transparent",
                }}
              >
                <span className="mr-1.5 text-xs">{meta.icon}</span>
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: `${meta.color}10` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-full text-sm outline-none border transition-all duration-300 w-56 focus:w-72"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent-gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </motion.div>

      {/* ── Category sections ── */}
      <AnimatePresence mode="wait">
        {categories.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24"
            style={{ color: "var(--text-muted)" }}
          >
            <div
              className="font-display text-6xl mb-4"
              style={{ color: "var(--text-dim)" }}
            >
              ◎
            </div>
            <p className="text-sm tracking-wider">No results found</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {categories.map((cat, i) => (
              <CategorySection
                key={cat}
                category={cat}
                items={grouped[cat]}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
