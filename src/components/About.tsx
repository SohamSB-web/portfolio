"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgCodeRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect
    const bgCode = bgCodeRef.current;
    
    if (bgCode && sectionRef.current) {
      gsap.to(bgCode, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-base-dark flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-24 overflow-hidden"
    >
      {/* Background Code Snippet Snippet for Parallax */}
      <div 
        ref={bgCodeRef}
        className="absolute inset-0 h-[150%] flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0"
        style={{ top: "-25%" }}
      >
        <pre className="font-mono text-text-secondary text-[2vw] leading-tight">
          {`
function parseLogic(creativity) {
  const structure = new ArchitecturalBlueprint();
  while (creativity.persists()) {
    structure.addLayer(creativity.pull());
    if (structure.stability() < THRESHOLD) {
      balance(logic, emotion);
    }
  }
  return deploy(structure);
}
          `}
        </pre>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-16 md:gap-24 items-center">
        
        {/* Left Side: Narrative */}
        <div 
          ref={textContentRef}
          className="w-full md:w-1/2 flex flex-col justify-center text-left"
        >
          <div className="mb-4">
            <span className="font-mono text-accent-tech-primary text-sm uppercase tracking-widest">
              Context
            </span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
            Bridging the gap between rigid logic and flowing creativity.
          </h2>
          <div className="space-y-6 font-sans text-text-secondary text-lg leading-relaxed">
            <p>
              I believe that the best software is not just functionally robust, but emotionally resonant. My background lies at the intersection of heavy engineering and interaction design.
            </p>
            <p>
              Whether I am orchestrating a microservices architecture backend or fine-tuning a bezier curve for a frontend animation, the goal remains the same: a synthesis of form and function.
            </p>
          </div>
        </div>

        {/* Right Side: Portrait */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-80 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105 border border-white/5">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop')",
              }}
            />
            {/* Overlay to blend with dark theme */}
            <div className="absolute inset-0 bg-panel-dark mix-blend-multiply opacity-50" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl" />
          </div>
        </div>
        
      </div>
    </section>
  );
}
