"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

const artworks = [
  { id: "art-1", src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop", aspect: "aspect-[3/4]" },
  { id: "art-2", src: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800&auto=format&fit=crop", aspect: "aspect-square" },
  { id: "art-3", src: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=800&auto=format&fit=crop", aspect: "aspect-[4/3]" },
  { id: "art-4", src: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=800&auto=format&fit=crop", aspect: "aspect-[3/4]" },
  { id: "art-5", src: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?q=80&w=800&auto=format&fit=crop", aspect: "aspect-square" },
  { id: "art-6", src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop", aspect: "aspect-[4/5]" },
];

export default function Sketchbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeArt, setActiveArt] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const cards = gsap.utils.toArray(".art-card");
    
    // Entrance reveal on scroll
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const openModal = (id: string, e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const modal = document.querySelector("#art-modal-img") as HTMLElement;
    if (!target || !modal) return;

    // FLIP logic
    const state = Flip.getState(target);
    setActiveArt(id);
    
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
      });
    });
  };

  const closeModal = () => {
    const modal = document.querySelector("#art-modal-img") as HTMLElement;
    const originalCard = document.querySelector(`[data-id="${activeArt}"]`) as HTMLElement;
    if (!originalCard || !modal) {
      setActiveArt(null);
      return;
    }

    const state = Flip.getState(modal);
    setActiveArt(null);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        targets: originalCard
      });
    });
  };

  // SVG Brush Viewfinder cursor for CSS
  const customCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23C7A17A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='16'/><line x1='8' y1='12' x2='16' y2='12'/></svg>") 12 12, auto`;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-panel-dark py-24 px-8 md:px-16"
      style={{ cursor: customCursor }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden pb-10 flex items-center justify-center opacity-5">
        <h2 className="font-cursive text-[20vw] text-accent-art-primary whitespace-nowrap select-none">
          Sketchbook
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-cursive text-accent-art-primary text-6xl md:text-8xl mb-4 self-start">
          The Sketchbook
        </h2>
        <p className="font-sans text-text-secondary max-w-xl self-start mb-16 text-lg">
          A collection of creative explorations, digital paintings, and organic visual concepts that fuel the structured engineering blueprints.
        </p>

        {/* Masonry Layout */}
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-8 w-full space-y-8">
          {artworks.map((art) => (
            <div 
              key={art.id}
              data-id={art.id}
              className={`art-card relative w-full ${art.aspect} rounded-xl overflow-hidden cursor-none bg-base-dark`}
              onClick={(e) => openModal(art.id, e)}
              style={{ opacity: activeArt === art.id ? 0 : 1 }}
            >
              <img 
                src={art.src} 
                alt="Artwork" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* FLIP Modal Portal / Overlay */}
      <div 
        className={`fixed inset-0 z-[150] bg-base-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-16 transition-opacity duration-300 ${activeArt ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeModal}
      >
        {activeArt && (
          <img 
            id="art-modal-img"
            src={artworks.find(a => a.id === activeArt)?.src}
            alt="Expanded Artwork"
            className="w-full h-full max-w-5xl object-contain shadow-2xl rounded-sm"
          />
        )}
        <button 
          className="absolute top-8 right-8 font-mono text-accent-art-primary tracking-widest text-sm hover:text-white transition-colors"
          onClick={closeModal}
        >
          [CLOSE]
        </button>
      </div>
    </section>
  );
}
