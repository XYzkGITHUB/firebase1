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
    <motion.button
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={cn(
        "relative overflow-hidden font-bold uppercase tracking-[0.3em] text-white shadow-2xl transition-all flex items-center justify-center rounded-none border-none cursor-pointer group",
        sizeClasses[size],
        className
      )}
      style={{ background: bgColor || defaultBg }}
    >
      {/* Dynamic Ripple Rings */}
      <motion.div
        variants={{
          hover: {
            scale: [1, 1.5],
            opacity: [0.3, 0],
          }
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute inset-0 border border-white/50 pointer-events-none"
      />
      <motion.div
        variants={{
          hover: {
            scale: [1, 1.8],
            opacity: [0.2, 0],
          }
        }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute inset-0 border border-white/30 pointer-events-none"
      />

      <div className="relative z-10 flex items-center gap-3">
        {icon}
        {label}
      </div>
      
      {/* Infinite Fluid Shine - Zero Delay Loop */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
        variants={{
          hover: {
            x: ['-200%', '200%'],
            transition: {
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }
          }
        }}
        initial={{ x: '-200%' }}
        animate={{ x: '200%' }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "linear"
        }}
        style={{ skewX: '-30deg', width: '100%' }}
      />
      
      {/* Inner Glow Pulse */}
      <motion.div 
        className="absolute inset-0 bg-white/10 pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 0.3, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity
            }
          }
        }}
        initial={{ opacity: 0 }}
      />
      
      {/* Hover Scale & Lift */}
      <motion.div
        variants={{
          tap: { scale: 0.95 },
          hover: { scale: 1.02 }
        }}
        className="absolute inset-0 z-0 bg-black/0 group-hover:bg-black/5 transition-colors"
      />
    </motion.button>
  );
};