'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './TrueFocus.css';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'hsl(var(--primary))',
  glowColor = 'hsl(var(--primary) / 0.5)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = ""
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  // Function to calculate the position of the current word
  const updateFocusRect = useCallback(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex]);

  // Handle auto-advancing index
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Update rect whenever index or content changes
  useEffect(() => {
    updateFocusRect();
  }, [currentIndex, updateFocusRect, sentence]);

  // Update on resize and initial mount to handle late layout shifts
  useEffect(() => {
    window.addEventListener('resize', updateFocusRect);
    
    // Multiple small intervals to ensure it catches the font/layout settle
    const t1 = setTimeout(updateFocusRect, 50);
    const t2 = setTimeout(updateFocusRect, 500);

    return () => {
      window.removeEventListener('resize', updateFocusRect);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [updateFocusRect]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div className={`focus-container ${className}`} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => {
              if (el) {
                wordRefs.current[index] = el;
              }
            }}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={
              {
                filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                '--border-color': borderColor,
                '--glow-color': glowColor
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        initial={false} // Prevents jump from 0,0 on first render
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 && focusRect.width > 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration,
          ease: "easeInOut"
        }}
        style={
          {
            '--border-color': borderColor,
            '--glow-color': glowColor
          } as React.CSSProperties
        }
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;