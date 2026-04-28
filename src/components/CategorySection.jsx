import { motion } from "framer-motion";
import ItemCard from "./ItemCard";

const categoryMeta = {
  Cars: { color: "#5b9cf6", label: "Automotive" },
  Bikes: { color: "#f97316", label: "Motorcycles" },
  Phones: { color: "#a78bfa", label: "Mobile" },
  Computers: { color: "#34d399", label: "Computing" },
};

export default function CategorySection({ category, items, index }) {
  const meta = categoryMeta[category] || { color: "#c9a84c", label: category };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-16"
    >
      {/* Section header */}
      <div
        className="flex items-end justify-between mb-6 pb-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-4">
          {/* Colored accent bar */}
          <div
            className="w-1 h-10 rounded-full"
            style={{ background: meta.color }}
          />
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-0.5"
              style={{ color: meta.color }}
            >
              {meta.label}
            </p>
            <h2
              className="font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              {category}
            </h2>
          </div>
        </div>
        <span
          className="text-xs tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <ItemCard
            key={item.itemname}
            item={item}
            index={i}
            accentColor={meta.color}
          />
        ))}
      </div>
    </motion.section>
  );
}
