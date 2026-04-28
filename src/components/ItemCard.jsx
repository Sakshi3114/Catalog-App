import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ItemCard({ item, index, accentColor = "#c9a84c" }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/item/${encodeURIComponent(item.itemname)}`)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? accentColor + "50" : "var(--border)"}`,
        transition: "border-color 0.3s",
      }}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden relative">
        <motion.img
          src={item.image}
          alt={item.itemname}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x225/161618/3d3c39?text=No+Image";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-liner-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View arrow — appears on hover */}
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold"
          style={{ background: accentColor }}
        >
          →
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3
          className="text-sm font-medium leading-snug mb-1.5 truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {item.itemname}
        </h3>

        {item.itemprops.slice(0, 2).map((prop) => (
          <div
            key={prop.label}
            className="flex justify-between items-center mt-1"
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {prop.label}
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: accentColor }}
            >
              {prop.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }}
      />
    </motion.div>
  );
}
