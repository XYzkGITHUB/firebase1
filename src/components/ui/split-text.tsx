'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: any;
  to?: any;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 30, // Reduced from 50
  duration = 0.8, // Reduced from 1.25
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px', // Adjusted for faster trigger
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) => {
  const ref = useRef<any>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;
      
      const el = ref.current;
      const startPct = (1 - threshold) * 100;
      const start = `top ${startPct}%`;

      // Simplified character splitting for compatibility and performance
      const content = el.innerText;
      el.innerHTML = '';
      
      const items = splitType === 'chars' ? content.split('') : content.split(' ');
      const nodes = items.map((char: string) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.whiteSpace = char === ' ' ? 'pre' : 'normal';
        span.innerText = char;
        el.appendChild(span);
        if (splitType === 'words') {
            el.appendChild(document.createTextNode(' '));
        }
        return span;
      });

      gsap.fromTo(
        nodes,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
        }
      );
    },
    {
      dependencies: [text, fontsLoaded, delay, duration],
      scope: ref
    }
  );

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        textAlign,
        display: 'inline-block',
        willChange: 'transform, opacity'
      }}
    >
      {text}
    </Tag>
  );
};

export default SplitText;