"use client";

import { motion } from "framer-motion";

const chevron = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function ScrollDownIndicator() {
  return (
    <motion.div
      className="absolute bottom-8  left-1/2 -translate-x-1/2 z-10"
      style={{ color: "var(--text-accent)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
    >
      <div
        className="flex flex-col items-center rounded-full px-1.5 py-1"
        style={{
          border: "1.5px solid var(--border-accent)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="block"
            style={{ marginTop: i === 0 ? 0 : "-12px" }}
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            {chevron}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
