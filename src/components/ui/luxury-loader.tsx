
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

  const darkBeige = '#8B5E3C'; 
  const faintBeige = 'rgba(139, 115, 85, 0.1)';

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    fontSize: '6rem',
    fontWeight: '900',
    fontFamily: '"Inter", sans-serif',
    letterSpacing: '0.4em', 
    color: faintBeige,
    lineHeight: '1',
    userSelect: 'none',
    textAlign: 'center'
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
    animation: 'luxuryFill 0.5s forwards cubic-bezier(0.65, 0, 0.35, 1)',
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background animate-in fade-in duration-200">
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
