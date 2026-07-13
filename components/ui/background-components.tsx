import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component = ({ className, children }: ComponentProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 35% 40%, rgba(255, 245, 145, 0.45) 0%, transparent 70%)
          `,
        }}
      />
      {children}
    </div>
  );
};

export default Component;
