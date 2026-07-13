import React from "react";
import { motion } from "framer-motion";

interface MenuToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export function MenuToggle({ isOpen, toggle }: MenuToggleProps) {
  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white hover:bg-neutral-50 active:scale-95 transition-all outline-none"
      aria-label="Toggle Menu"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" className="text-black">
        {/* Top Line */}
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? { d: "M 3 15 L 15 3" } : { d: "M 2 5 L 16 5" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
        {/* Middle Line */}
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          d="M 2 9 L 16 9"
          transition={{ duration: 0.15, ease: "easeInOut" }}
        />
        {/* Bottom Line */}
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? { d: "M 3 3 L 15 15" } : { d: "M 2 13 L 16 13" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
      </svg>
    </button>
  );
}
