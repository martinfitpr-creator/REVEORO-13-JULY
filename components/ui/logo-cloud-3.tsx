import React from "react";
import { InfiniteSlider } from "./infinite-slider";

export function LogoCloud() {
  const logos = [
    {
      name: "Next.js",
      svg: (
        <svg className="h-6 w-auto text-white" viewBox="0 0 180 180" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M168.3 90c0 43.2-35.1 78.3-78.3 78.3-15.6 0-30.2-4.6-42.5-12.5l88.5-114.1c7.2 9.1 11.5 20.6 11.5 33.1v15.2zm-120.3 35.8c-7.3-10.4-11.5-23-11.5-35.8 0-43.2 35.1-78.3 78.3-78.3 19.3 0 37 7 50.8 18.5L54.4 153.2c-2.4-1.9-4.5-4.1-6.4-7.4zm54-52.5h-10.8v45h10.8V73.3z" />
        </svg>
      ),
    },
    {
      name: "Supabase",
      svg: (
        <svg className="h-6 w-auto text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.362 9.354H12V.5L2.638 14.646H12v8.854l9.362-14.146z" />
        </svg>
      ),
    },
    {
      name: "Vercel",
      svg: (
        <svg className="h-5 w-auto text-white" viewBox="0 0 115.5 100" fill="currentColor">
          <polygon points="57.75,0 115.5,100 0,100" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      svg: (
        <svg className="h-6 w-auto text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg className="h-6 w-auto text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6.036c-2.286 0-3.428 1.144-3.428 3.43 0 2.286 1.142 3.43 3.428 3.43 2.286 0 3.428-1.144 3.428-3.43 0-2.286-1.142-3.43-3.428-3.43zm-6.857 6.86c-2.286 0-3.428 1.143-3.428 3.428 0 2.286 1.142 3.43 3.428 3.43 2.286 0 3.428-1.144 3.428-3.43 0-2.286-1.142-3.428-3.428-3.428zM12 0c-2.286 0-3.428 1.143-3.428 3.428 0 2.286 1.142 3.43 3.428 3.43 2.286 0 3.428-1.144 3.428-3.43C15.428 1.143 14.286 0 12 0zm6.857 6.036c-2.286 0-3.428 1.143-3.428 3.428 0 2.286 1.142 3.43 3.428 3.43 2.286 0 3.428-1.144 3.428-3.43 0-2.286-1.142-3.428-3.428-3.428z" strokeWidth="0" />
        </svg>
      ),
    },
    {
      name: "Figma",
      svg: (
        <svg className="h-6 w-auto text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4.5-9C6.12 9 5 10.12 5 11.5S10.12 14 11.5 14H12V9H7.5zm0 4c-.28 0-.5-.22-.5-.5s.22-.5.5-.5H11v1H7.5zm9 0c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H13v1h3.5zM12 9h4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H12V9z" />
        </svg>
      ),
    },
    {
      name: "OpenAI",
      svg: (
        <svg className="h-6 w-auto text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-9 9m4.5-1.206a8.959 8.959 0 0 1-4.5 1.206" />
        </svg>
      ),
    },
    {
      name: "Google",
      svg: (
        <svg className="h-5 w-auto text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.74-.08-1.305-.175-1.85H12.24z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-[#F5F5F5] py-8 border-y border-[#E5E5E5] overflow-hidden" id="logo-cloud-wrapper">
      <div className="max-w-6xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono font-medium">
          Trusted by Businesses Across SA & Beyond
        </p>
        <p className="text-xs text-neutral-500/80 mt-1">
          Powering websites for local businesses
        </p>
      </div>

      <div className="w-full relative flex items-center justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5F5F5] to-transparent z-15 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5F5F5] to-transparent z-15 pointer-events-none" />

        <InfiniteSlider duration={50}>
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-2 px-12 select-none grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105 [&>svg]:text-black">
                {logo.svg}
              </div>
              <span className="font-sans font-bold text-xs tracking-wider uppercase text-black font-mono">
                {logo.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
