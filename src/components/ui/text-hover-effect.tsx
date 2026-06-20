
"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text }: { text: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Precise coordinate calculation within the viewBox="0 0 300 100"
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchMove={handleMouseMove}
      className="select-none overflow-visible cursor-default max-w-full"
    >
      <defs>
        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="60"
          cx={cursorPos.x}
          cy={cursorPos.y}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        
        <mask id="textMask">
          <rect x="0" y="0" width="300" height="100" fill="url(#revealMask)" />
        </mask>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="100%" stopColor="#0000ff" />
        </linearGradient>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="font-headline fill-transparent stroke-white/10 text-[100px] lg:text-[110px] font-bold tracking-tighter"
      >
        {text}
      </text>

      <motion.g
        mask="url(#textMask)"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#textGradient)"
          className="font-headline text-[100px] lg:text-[110px] font-bold tracking-tighter"
        >
          {text}
        </text>
      </motion.g>
    </svg>
  );
};
