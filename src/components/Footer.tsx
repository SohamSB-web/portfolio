"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Footer() {
  return (
    <footer 
      className="relative w-full h-screen bg-base-dark border-t border-white/5 flex flex-col items-center justify-center -z-10"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-screen flex flex-col items-center justify-center -z-20 p-8">
        
        <div className="absolute top-1/3 text-center">
          <h2 className="font-sans font-black text-6xl md:text-8xl text-text-primary mb-4 tracking-tight">
            Let's build.
          </h2>
          <p className="font-mono text-accent-tech-secondary text-sm uppercase tracking-widest">
            Awaiting Initialization Sequence
          </p>
        </div>

        <div className="absolute bottom-1/4 flex gap-8">
          <MagneticButton href="https://github.com" label="GitHub" />
          <MagneticButton href="https://linkedin.com" label="LinkedIn" />
          <MagneticButton href="mailto:hello@example.com" label="Email" />
        </div>
        
        <div className="absolute bottom-10 font-mono text-xs text-text-secondary/50">
          © {new Date().getFullYear()} The Synthesis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function MagneticButton({ href, label }: { href: string; label: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate distance to determine magnetic pull
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < 100) { // Trigger distance
        xTo(distanceX * 0.4);
        yTo(distanceY * 0.4);
        textXTo(distanceX * 0.2); // text moves slightly less for depth
        textYTo(distanceY * 0.2);
      } else {
        xTo(0);
        yTo(0);
        textXTo(0);
        textYTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative px-8 py-4 border border-white/20 rounded-full bg-panel-dark/50 backdrop-blur-md text-text-primary hover:border-accent-tech-primary transition-colors flex items-center justify-center overflow-hidden group"
    >
      <span ref={textRef} className="font-mono text-sm relative z-10 pointer-events-none">
        {label}
      </span>
    </a>
  );
}
