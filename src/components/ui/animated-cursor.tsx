"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedCursorProps {
  color?: string;
  outerSize?: number;
  innerSize?: number;
  outerScale?: number;
  innerScale?: number;
}

export function AnimatedCursor({
  color = "255, 255, 255",
  outerSize = 16,
  innerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
}: AnimatedCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(computedStyle.cursor === "pointer");

      // Show cursor after first mouse movement
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  const variants = {
    default: {
      x: mousePosition.x - outerSize / 2,
      y: mousePosition.y - outerSize / 2,
      opacity: isVisible ? 1 : 0,
    },
    inner: {
      x: mousePosition.x - innerSize / 2,
      y: mousePosition.y - innerSize / 2,
      opacity: isVisible ? 1 : 0,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        animate={{
          ...variants.default,
          height: outerSize,
          width: outerSize,
          scale: isPointer || isClicking ? outerScale : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          stiffness: 200,
          damping: 20,
        }}
        style={{
          backgroundColor: `rgba(${color}, ${isClicking ? 0.5 : 0.3})`,
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          ...variants.inner,
          height: innerSize,
          width: innerSize,
          scale: isClicking ? innerScale : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 250,
          damping: 18,
        }}
        style={{
          backgroundColor: `rgba(${color}, 1)`,
          borderRadius: "50%",
        }}
      />
    </>
  );
}
