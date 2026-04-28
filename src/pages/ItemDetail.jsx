import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { items } from "../data/items";

const categoryMeta = {
  Cars: { color: "#5b9cf6", label: "Automotive" },
  Bikes: { color: "#f97316", label: "Motorcycles" },
  Phones: { color: "#a78bfa", label: "Mobile" },
  Computers: { color: "#34d399", label: "Computing" },
};

export default function ItemDetail() {
  const { itemname } = useParams();
  const navigate = useNavigate();
  const item = items.find((i) => i.itemname === decodeURIComponent(itemname));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <p
            className="font-display text-4xl mb-4"
            style={{ color: "var(--text-dim)" }}
          >
            404
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Item not found
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-xs tracking-wider uppercase px-6 py-3 rounded-full border transition-colors"
            style={{
              borderColor: "var(--accent-gold)",
              color: "var(--accent-gold)",
            }}
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const meta = categoryMeta[item.category] || {
    color: "#c9a84c",
    label: item.category,
  };

  return (
    <div className="min-h-screen">
      {/* ── Cinematic hero — pt-16 pushes it below the fixed navbar ── */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden pt-16">
        {/* Blurred background */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "blur(2px) brightness(0.35)" }}
            onError={(e) => {
              e.target.src = "https://placehold.co/1400x800/0e0e0f/1e1e21";
            }}
          />
        </motion.div>

        {/* Top fade — covers the navbar boundary cleanly */}
        <div
          className="absolute inset-x-0 top-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary), transparent)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />

        {/* Sharp center image — sits above fades */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingTop: "2rem" }}
        >
          <img
            src={item.image}
            alt={item.itemname}
            className="max-h-[70%] max-w-[65%] object-contain drop-shadow-2xl"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x500/161618/3d3c39?text=No+Image";
            }}
          />
        </motion.div>

        {/* Back button — positioned relative to the padded hero */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate(-1)}
          className="absolute left-6 flex items-center gap-2 text-sm px-4 py-2 rounded-full border backdrop-blur-sm transition-all"
          style={{
            top: "calc(4rem + 1.25rem)" /* navbar height + breathing room */,
            borderColor: "rgba(255,255,255,0.12)",
            color: "var(--text-muted)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
          }
        >
          ← Back
        </motion.button>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 mt-2 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-5 rounded-full"
              style={{ background: meta.color }}
            />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: meta.color }}
            >
              {meta.label}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-4xl md:text-6xl mb-10 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {item.itemname}
          </h1>

          {/* Specs */}
          <div className="mb-3">
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Specifications
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.itemprops.map((prop, i) => (
                <motion.div
                  key={prop.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                  className="flex items-center justify-between px-5 py-4 rounded-xl border"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    transition: "border-color 0.25s, background 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = meta.color + "60";
                    e.currentTarget.style.background = "var(--bg-elevated)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--bg-card)";
                  }}
                >
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {prop.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: meta.color }}
                  >
                    {prop.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Related items */}
          <RelatedItems current={item} meta={meta} />
        </motion.div>
      </div>
    </div>
  );
}

function RelatedItems({ current, meta }) {
  const navigate = useNavigate();
  const related = items
    .filter(
      (i) => i.category === current.category && i.itemname !== current.itemname
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-14 pt-10 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <p
        className="text-xs tracking-[0.25em] uppercase mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        More in {current.category}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {related.map((item) => (
          <div
            key={item.itemname}
            onClick={() =>
              navigate(`/item/${encodeURIComponent(item.itemname)}`)
            }
            className="rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = meta.color + "50")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={item.image}
                alt={item.itemname}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x169/161618/3d3c39";
                }}
              />
            </div>
            <div className="p-3">
              <p
                className="text-xs font-medium truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {item.itemname}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
