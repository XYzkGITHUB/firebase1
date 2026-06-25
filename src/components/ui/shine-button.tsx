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
  variant?: 'default' | 'outline';
}

export const ShineButton = ({
  label,
  size = 'lg',
  bgColor,
  onClick,
  className,
  icon,
  variant = 'outline'
}: ShineButtonProps) => {
  const sizeClasses = {
    sm: 'h-10 px-6 text-[10px]',
    md: 'h-12 px-8 text-[11px]',
    lg: 'h-16 px-10 text-[11px]',
  };

  const isOutline = variant === 'outline';

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={cn(
        "relative overflow-hidden font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center rounded-none cursor-pointer group",
        sizeClasses[size],
        isOutline 
          ? "bg-transparent border border-black text-black shadow-none hover:shadow-xl" 
          : "text-white border-none shadow-2xl",
        className
      )}
      style={!isOutline ? { background: bgColor || "hsl(var(--primary))" } : {}}
    >
      {/* Dynamic Ripple Rings - Only visible on hover */}
      <motion.div
        variants={{
          hover: {
            scale: [1, 1.5],
            opacity: [0.3, 0],
          },
          initial: { opacity: 0 }
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className={cn(
          "absolute inset-0 border pointer-events-none", 
          isOutline ? "border-black/10" : "border-white/50"
        )}
      />

      <div className="relative z-10 flex items-center gap-3">
        {icon}
        {label}
      </div>
      
      {/* Shine effect - now only active on hover to prevent "stuck" feeling */}
      <motion.div 
        className={cn(
          "absolute inset-0 pointer-events-none",
          isOutline ? "bg-gradient-to-r from-transparent via-black/5 to-transparent" : "bg-gradient-to-r from-transparent via-white/40 to-transparent"
        )}
        variants={{
          hover: {
            x: ['-200%', '200%'],
            transition: {
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }
          },
          initial: { x: '-200%' }
        }}
        style={{ skewX: '-30deg', width: '100%' }}
      />
      
      {/* Hover Background Layer */}
      <motion.div
        variants={{
          tap: { scale: 0.98 },
          hover: { scale: 1.02 }
        }}
        className="absolute inset-0 z-0 transition-colors group-hover:bg-black/[0.02]"
      />
    </motion.button>
  );
};