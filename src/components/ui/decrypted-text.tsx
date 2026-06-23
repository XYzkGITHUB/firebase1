
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * DecryptedText component that scrambles text with random characters
 * until it settles on the target character, creating a fast "decryption" effect.
 */

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
  animateOnViewThreshold?: number;
}

const DEFAULT_CHARS = "$%#@!";

export default function DecryptedText({
  text,
  speed = 15,
  maxIterations = 2,
  sequential = true,
  characters = DEFAULT_CHARS,
  className = "",
  parentClassName = "",
  animateOn = "view",
  animateOnViewThreshold = 0.1,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<({ char: string; isRevealed: boolean } | string)[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasAnimated(false);
    setIsRevealing(false);
    setDisplayText(text.split("").map(c => ({ char: c, isRevealed: false })));
  }, [text]);

  useEffect(() => {
    if (animateOn === "view" && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealing(true);
            setHasAnimated(true);
          }
        },
        { threshold: animateOnViewThreshold }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, animateOnViewThreshold, hasAnimated, text]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    if (isRevealing) {
      interval = setInterval(() => {
        const nextText = text.split("").map((char, index) => {
          if (char === " ") return " ";
          
          // Speed up the reveal by making the iteration threshold smaller
          const revealIndex = sequential ? iteration / maxIterations : iteration;
          
          if (index < revealIndex) {
            return { char, isRevealed: true };
          }

          return { 
            char: characters[Math.floor(Math.random() * characters.length)], 
            isRevealed: false 
          };
        });

        setDisplayText(nextText);
        iteration++;

        if (iteration >= text.length * maxIterations) {
          clearInterval(interval);
          setDisplayText(text.split("").map(char => ({ char, isRevealed: true })));
          setIsRevealing(false);
        }
      }, speed);
    }

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential, characters, isRevealing]);

  return (
    <div ref={containerRef} className={parentClassName}>
      <motion.span 
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {displayText.map((item, i) => {
          if (typeof item === 'string') return item;
          return (
            <span 
              key={i} 
              className={item.isRevealed ? "" : "text-[0.6em] opacity-40 font-code inline-block w-[0.6em] text-center"}
              style={!item.isRevealed ? { verticalAlign: 'middle' } : {}}
            >
              {item.char}
            </span>
          );
        })}
      </motion.span>
    </div>
  );
}
