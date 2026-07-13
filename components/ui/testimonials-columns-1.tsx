import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

interface TestimonialsColumnsProps {
  testimonials: Testimonial[];
}

export function TestimonialsColumns({ testimonials }: TestimonialsColumnsProps) {
  // Let's divide testimonials into 3 columns (or 2 columns on tablet, 1 on mobile)
  const col1 = testimonials.filter((_, idx) => idx % 3 === 0);
  const col2 = testimonials.filter((_, idx) => idx % 3 === 1);
  const col3 = testimonials.filter((_, idx) => idx % 3 === 2);

  const renderColumn = (items: Testimonial[], speed: number, reverse: boolean = false) => {
    // Duplicate the list of items to ensure infinite flow
    const duplicated = [...items, ...items, ...items, ...items];

    return (
      <div className="relative h-[600px] overflow-hidden select-none">
        <motion.div
          animate={{
            y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
          className="space-y-6 py-4"
        >
          {duplicated.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="p-6 bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl space-y-4 hover:border-black/20 hover:scale-[1.01] transition-all duration-300 shadow-sm"
            >
              <p className="text-sm text-black leading-relaxed font-sans">{item.text}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#E5E5E5]/40">
                {/* Initials Avatar */}
                <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black font-sans">{item.name}</h4>
                  <p className="text-[10px] text-[#6B6B6B] font-mono tracking-wide">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden max-w-6xl mx-auto px-2"
      id="testimonials-column-container"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)"
      }}
    >
      <div className="block">{renderColumn(col1, 75)}</div>
      <div className="hidden md:block">{renderColumn(col2, 85, true)}</div>
      <div className="hidden md:block">{renderColumn(col3, 65)}</div>
    </div>
  );
}
