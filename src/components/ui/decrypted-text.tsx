
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * DecryptedText component that scrambles text with random characters
 * until it settles on the target character, creating an "uncrackable" reveal effect.
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

const DEFAULT_CHARS = '!@#$%^&*()_+{}:"<>?|[];\',./`~';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 5,
  sequential = true,
  characters = DEFAULT_CHARS,
  className = "",
  parentClassName = "",
  animateOn = "view",
  animateOnViewThreshold = 0.1,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset animation when text changes (e.g., tab switch)
    setHasAnimated(false);
    setIsRevealing(false);
    setDisplayText("");
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
  }, [animateOn, animateOnViewThreshold, hasAnimated]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    if (isRevealing) {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              
              const revealIndex = sequential ? iteration / maxIterations : iteration;
              
              if (index < revealIndex) {
                return text[index];
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        iteration++;

        if (iteration >= text.length * maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
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
        transition={{ duration: 0.3 }}
      >
        {displayText || (isRevealing ? "" : " ")}
      </motion.span>
    </div>
  );
}
