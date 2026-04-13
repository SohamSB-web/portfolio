"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PreLoader() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress to 100
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.round(counter.val));
        },
        onComplete: () => {
          // Expand loader outward logic
          gsap.timeline()
            .to(textRef.current, {
              opacity: 0,
              y: -50,
              duration: 0.5,
              ease: "power2.in",
            })
            .to(containerRef.current, {
              clipPath: "circle(150% at 50% 50%)",
              opacity: 0,
              duration: 1.2,
              ease: "power4.inOut",
              onComplete: () => {
                if (containerRef.current) {
                  containerRef.current.style.display = "none";
                }
              }
            });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base-dark pointer-events-none"
      style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      <div 
        ref={textRef}
        className="font-mono text-accent-tech-primary text-6xl md:text-8xl font-bold tracking-tighter"
      >
        {progress}%
      </div>
    </div>
  );
}
