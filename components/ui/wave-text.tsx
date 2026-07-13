import React from "react";
import { motion } from "framer-motion";

interface WaveTextProps {
  text: string;
  className?: string;
}

export function Text_03({ text, className }: WaveTextProps) {
  const letters = Array.from(text);

  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block select-none cursor-default ${className || "text-inherit font-inherit"}`}
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
