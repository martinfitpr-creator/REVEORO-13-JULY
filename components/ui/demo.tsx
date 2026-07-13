// This is file of your component
// You can use any dependencies from npm; we import them automatically in package.json

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
      {/* Light Sky Blue Glow */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 65% 60%, rgba(147, 197, 253, 0.45) 0%, transparent 75%)
          `,
        }} 
      />
      {children}
    </div>
  );
};

export default Component;
