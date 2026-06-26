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
  delay = 30,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
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

      const originalContent = el.innerText;
      el.innerHTML = '';
      
      const words = originalContent.split(' ');
      const nodes: HTMLElement[] = [];

      words.forEach((word: string, wordIdx: number) => {
        // Create a wrapper for the word to prevent mid-word breaks
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block';
        wordWrapper.style.whiteSpace = 'nowrap';
        
        if (splitType === 'chars') {
          const chars = word.split('');
          chars.forEach((char: string) => {
            const charSpan = document.createElement('span');
            charSpan.style.display = 'inline-block';
            charSpan.innerText = char;
            wordWrapper.appendChild(charSpan);
            nodes.push(charSpan);
          });
        } else {
          // splitType === 'words' or 'lines'
          wordWrapper.innerText = word;
          nodes.push(wordWrapper);
        }
        
        el.appendChild(wordWrapper);
        
        // Add space after the word if it's not the last one
        if (wordIdx < words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
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
      dependencies: [text, fontsLoaded, delay, duration, splitType],
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