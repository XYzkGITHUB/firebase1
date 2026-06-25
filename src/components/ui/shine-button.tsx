
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShineButtonProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const ShineButton = ({
  label,
  size = 'lg',
  bgColor,
  onClick,
  className,
  icon
}: ShineButtonProps) => {
  const sizeClasses = {
    sm: 'h-10 px-6 text-[10px]',
    md: 'h-12 px-8 text-[11px]',
    lg: 'h-16 px-10 text-[11px]',
  };

  const defaultBg = "linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden font-bold uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center rounded-none border-none cursor-pointer",
        sizeClasses[size],
        className
      )}
      style={{ background: bgColor || defaultBg }}
    >
      <div className="relative z-10 flex items-center gap-3">
        {icon}
        {label}
      </div>
      
      {/* Fluid Shine Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
        initial={{ x: '-200%' }}
        animate={{ x: '200%' }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 0.5
        }}
        style={{ skewX: '-25deg' }}
      />
      
      {/* Subtle Blue Pulse */}
      <motion.div 
        className="absolute inset-0 bg-blue-400/10 pointer-events-none"
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </button>
  );
};
