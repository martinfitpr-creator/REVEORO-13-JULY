"use client"; 

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export interface NavHeaderProps {
  activeView?: "home" | "pricing" | "work";
  onNavigate?: (view: "home" | "pricing" | "work", sectionId?: string) => void;
}

export function NavHeader({ activeView, onNavigate }: NavHeaderProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const handleClick = (tabName: string) => {
    if (!onNavigate) return;
    switch (tabName.toLowerCase()) {
      case "home":
        onNavigate("home");
        break;
      case "pricing":
        onNavigate("pricing");
        break;
      case "about":
        onNavigate("home", "testimonials");
        break;
      case "services":
        onNavigate("home", "services");
        break;
      case "contact":
        onNavigate("home", "contact");
        break;
      case "work":
        onNavigate("work");
        break;
    }
  };

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-black/10 bg-white p-1 shadow-sm"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} onClick={() => handleClick("Home")}>Home</Tab>
      <Tab setPosition={setPosition} onClick={() => handleClick("Work")}>Work</Tab>
      <Tab setPosition={setPosition} onClick={() => handleClick("Pricing")}>Pricing</Tab>
      <Tab setPosition={setPosition} onClick={() => handleClick("About")}>About</Tab>
      <Tab setPosition={setPosition} onClick={() => handleClick("Services")}>Services</Tab>
      <Tab setPosition={setPosition} onClick={() => handleClick("Contact")}>Contact</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: any;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={onClick}
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-xs font-mono font-bold uppercase text-white mix-blend-difference"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 top-1 h-7 rounded-full bg-black"
    />
  );
};

export default NavHeader;
