"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: 1,
    title: "Quantum Nexus",
    description: "High-frequency trading platform built with Rust and WebSockets.",
    tech: ["Rust", "React", "WebSockets"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Neural Canvas",
    description: "Generative AI painting tool using Stable Diffusion.",
    tech: ["Python", "PyTorch", "Next.js"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Aether Protocol",
    description: "Decentralized identity verification smart contracts.",
    tech: ["Solidity", "TypeScript", "Ethers.js"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Vortex Analytics",
    description: "Real-time log ingestion and search engine at petabyte scale.",
    tech: ["Go", "Elasticsearch", "Vue"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function WorksGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // Horizontal Scroll Animation setup
      const scrollWrapper = scrollWrapperRef.current;
      const section = sectionRef.current;

      if (scrollWrapper && section) {
        const getScrollAmount = () => -(scrollWrapper.scrollWidth - window.innerWidth);

        const tween = gsap.to(scrollWrapper, {
          x: getScrollAmount,
          ease: "none"
        });

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });

        return () => {
          st.kill();
          tween.kill();
        };
      }
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full md:h-screen bg-base-dark overflow-hidden flex flex-col justify-center py-20 md:py-0 group/section"
    >
      <div className="absolute top-10 left-8 md:top-20 md:left-16 z-10 w-full pointer-events-none">
        <h2 className="font-mono text-accent-tech-primary text-sm md:text-md uppercase tracking-widest mb-2">
          Engineering Artifacts
        </h2>
        <h3 className="font-sans text-4xl md:text-5xl font-bold text-text-primary">
          Selected Works
        </h3>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="flex flex-col md:flex-row items-center h-full px-8 md:px-[20vw] gap-10 md:gap-32 md:w-max mt-20 md:mt-0"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full max-w-[90vw] md:w-[45vw] md:max-w-[800px] h-[50vh] md:h-[60vh] shrink-0 rounded-2xl overflow-hidden cursor-pointer group/card border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Dimming for the rest of the siblings via CSS peer/group works, 
          but simulating here via a generic dim overlay that appears when the card is hovered 
          wait, the prompt says "dim the rest of the screen slightly". 
          We use a group/section in parent and dim using group-hover/section. */}
          
      <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out will-change-transform" style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        backgroundImage: `url(${project.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="absolute inset-0 bg-black/40 md:bg-black/60 transition-all duration-500 group-hover/card:bg-black/20" />
      </div>

      {/* Content overlays */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div className="flex justify-end gap-3 opacity-0 translate-y-[-10px] transform transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-y-0">
          {project.tech.map((t: string) => (
            <span key={t} className="font-mono text-xs md:text-sm text-accent-tech-primary bg-panel-dark/80 px-3 py-1 rounded-full backdrop-blur-md">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-start translate-y-4 transform transition-all duration-500 group-hover/card:translate-y-0">
          <h4 className="font-sans text-3xl md:text-5xl font-bold text-text-primary mb-2">
            {project.title}
          </h4>
          <p className="font-sans text-sm md:text-base text-text-secondary opacity-0 transition-opacity duration-300 delay-100 group-hover/card:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
