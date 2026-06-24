"use client";

import React, { useMemo } from 'react';

interface LuxuryLoaderProps {
  isVisible: boolean;
}

export function LuxuryLoader({ isVisible }: LuxuryLoaderProps) {
  // Random pause point between 30% and 70% of the progress
  const pausePoint = useMemo(() => Math.floor(Math.random() * 41) + 30, []);

  if (!isVisible) return null;

  const styles = `
    @keyframes luxuryFill {
      0% { width: 0%; }
      35% { width: ${pausePoint}%; } 
      58% { width: ${pausePoint}%; }
      100% { width: 100%; }
    }
  `;

  // Luxury Dark Beige Palette adapted for IRGG theme
  const darkBeige = '#8B5E3C'; 
  const faintBeige = 'rgba(139, 115, 85, 0.1)';

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    fontSize: '5rem',
    fontWeight: '900',
    fontFamily: '"Playfair Display", serif',
    letterSpacing: '0.15em', // Added spacing per user request
    color: faintBeige,
    lineHeight: '1',
    userSelect: 'none'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '0%',
    height: '100%',
    color: darkBeige,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    animation: 'luxuryFill 1.3s forwards cubic-bezier(0.65, 0, 0.35, 1)',
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
      <style>{styles}</style>
      
      <div style={containerStyle}>
        {/* Background Layer */}
        <span>IRGG</span>
        
        {/* Animated Progress Layer */}
        <div style={overlayStyle}>
          IRGG
        </div>
      </div>
    </div>
  );
}
