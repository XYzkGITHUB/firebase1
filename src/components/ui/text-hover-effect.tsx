
"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text, disableInteraction = false }: { text: string; disableInteraction?: boolean }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (disableInteraction || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    } else {
      return;
    }

    const x = ((clientX - rect.left) / rect.width) * 300;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    setCursorPos({ x, y });
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => !disableInteraction && setIsHovered(true)}
      onMouseLeave={() => !disableInteraction && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => !disableInteraction && setIsHovered(true)}
      onTouchEnd={() => !disableInteraction && setIsHovered(false)}
      onTouchMove={handleMouseMove}
      className="select-none overflow-visible cursor-default max-w-full pointer-events-auto"
    >
      <defs>
        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="160"
          cx={cursorPos.x}
          cy={cursorPos.y}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="50%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        
        <mask id="textMask">
          <rect x="0" y="0" width="300" height="100" fill={disableInteraction ? "none" : "url(#revealMask)"} />
        </mask>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="font-headline fill-transparent stroke-white/10 text-[80px] lg:text-[100px] font-bold tracking-tighter"
      >
        {text}
      </text>

      {!disableInteraction && (
        <motion.g
          mask="url(#textMask)"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#textGradient)"
            className="font-headline text-[80px] lg:text-[100px] font-bold tracking-tighter"
          >
            {text}
          </text>
        </motion.g>
      )}
    </svg>
  );
};
