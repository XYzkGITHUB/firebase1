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
      onClick={onClick}
      className={cn(
        "relative overflow-hidden font-bold uppercase tracking-[0.3em] text-white shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center rounded-none border-none cursor-pointer",
        sizeClasses[size],
        className
      )}
      style={{ background: bgColor || defaultBg }}
    >
      {/* Outer Ripple Effect */}
      <motion.div
        variants={{
          hover: {
            scale: [1, 1.2],
            opacity: [0.5, 0],
          }
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute inset-0 border-2 border-blue-400/50 pointer-events-none"
      />

      <div className="relative z-10 flex items-center gap-3">
        {icon}
        {label}
      </div>
      
      {/* Fluid Shine Effect - Speeds up on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none"
        variants={{
          hover: {
            x: ['-200%', '200%'],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }
          }
        }}
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
      
      {/* Background Pulse Glow */}
      <motion.div 
        className="absolute inset-0 bg-white/20 pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 0.4, 0],
            transition: {
              duration: 1,
              repeat: Infinity
            }
          }
        }}
        initial={{ opacity: 0 }}
      />
    </motion.button>
  );
};
