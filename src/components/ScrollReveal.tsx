
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: number;
  easing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  direction = "up",
  duration = 600,
  distance = 20,
  easing = "ease-out",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startY = 0;
    let startX = 0;

    if (direction === "up") startY = distance;
    if (direction === "down") startY = -distance;
    if (direction === "left") startX = distance;
    if (direction === "right") startX = -distance;

    element.style.opacity = "0";
    element.style.transform = `translate(${startX}px, ${startY}px)`;
    element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translate(0, 0)";
          }, 100);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // Reset the animation when element goes out of view
          element.style.opacity = "0";
          element.style.transform = `translate(${startX}px, ${startY}px)`;
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, direction, threshold, duration, distance, easing, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
