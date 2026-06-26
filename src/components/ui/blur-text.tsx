'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from: any, steps: any[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: any = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurText = ({
  text = '',
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.3
}: BlurTextProps) => {
  const words = useMemo(() => text.split(' '), [text]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  let charGlobalIndex = 0;

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {words.map((word, wordIndex) => {
        if (animateBy === 'words') {
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
          return (
            <motion.span
              key={wordIndex}
              className="inline-block will-change-[transform,filter,opacity] whitespace-nowrap mr-[0.25em]"
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={{
                duration: totalDuration,
                times,
                delay: (wordIndex * delay) / 1000,
                ease: easing
              }}
              onAnimationComplete={wordIndex === words.length - 1 ? onAnimationComplete : undefined}
            >
              {word}
            </motion.span>
          );
        }

        // Animate by letters but keep them inside word containers to prevent breaks
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split('').map((char, charIndex) => {
              const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
              const currentIndex = charGlobalIndex++;
              return (
                <motion.span
                  key={charIndex}
                  className="inline-block will-change-[transform,filter,opacity]"
                  initial={fromSnapshot}
                  animate={inView ? animateKeyframes : fromSnapshot}
                  transition={{
                    duration: totalDuration,
                    times,
                    delay: (currentIndex * delay) / 1000,
                    ease: easing
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default BlurText;