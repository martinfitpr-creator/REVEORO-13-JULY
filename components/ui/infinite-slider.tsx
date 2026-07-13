import React from "react";
import { motion } from "framer-motion";

interface InfiniteSliderProps {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
}

export function InfiniteSlider({
  children,
  duration = 25,
  reverse = false,
}: InfiniteSliderProps) {
  return (
    <div className="relative w-full overflow-hidden select-none py-4">
      <div className="flex w-max" style={{ gap: "4rem" }}>
        <motion.div
          animate={{
            x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: duration,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap"
          style={{ gap: "4rem" }}
        >
          {/* We duplicate the children content to allow wrapping around */}
          <div className="flex items-center" style={{ gap: "4rem" }}>
            {children}
          </div>
          <div className="flex items-center" style={{ gap: "4rem" }}>
            {children}
          </div>
          <div className="flex items-center" style={{ gap: "4rem" }}>
            {children}
          </div>
          <div className="flex items-center" style={{ gap: "4rem" }}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
