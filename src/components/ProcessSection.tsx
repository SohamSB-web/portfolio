import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GlareHover from './GlareHover';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  { id: '01', title: 'PERFORMANCE FIRST', desc: 'I focus on building websites that load fast and feel smooth from the first interaction. Performance is considered at every stage, from structure and assets to code quality and optimization, ensuring reliable results on real devices and networks.', linkText: 'Learn more ↗' },
  { id: '02', title: 'CLEAN & SCALABLE CODE', desc: 'I write clean, well-structured, and maintainable code with a strong focus on clarity and long-term scalability. This approach makes projects easier to understand, update, and extend over time, while reducing complexity and keeping the codebase reliable as it grows.', linkText: 'My workflow ↗' },
  { id: '03', title: 'MODERN UI & UX', desc: 'I design and build interfaces with clarity, usability, and consistency in mind. Layouts, interactions, and responsive behavior are carefully crafted to provide an intuitive experience that works seamlessly across all devices and screen sizes.', linkText: 'View approach ↗' },
  { id: '04', title: 'SEO & BEST PRACTICES', desc: 'Websites are built using modern best practices and strong technical SEO foundations from the very beginning of the project. This includes clean structure, accessibility, semantic markup, and optimization techniques that support visibility, performance, and long-term growth.', linkText: 'See details ↗' },
  { id: '05', title: 'RELIABLE DELIVERY', desc: 'From the initial idea to the final launch, I focus on clear communication, thoughtful planning, and reliable delivery at every stage of the process. Each project is carefully tested and refined to ensure stability, quality, and confidence when the product goes live.', linkText: 'How I work ↗' }
];

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const getScrollAmount = () => track.scrollWidth - window.innerWidth;
    
    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * 2.5}`,
        pin: true,
        scrub: true, // Use true instead of numeric to perfectly sync with Lenis smooth scroll without compound lag
        snap: {
          snapTo: 1 / (processSteps.length - 1),
          duration: { min: 0.2, max: 0.4 },
          delay: 0.1,
          ease: "power1.inOut"
        },
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (processSteps.length - 1));
          setActiveIndex((prev) => prev !== index ? index : prev);
        }
      }
    });

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, { scope: containerRef, dependencies: [] });

  const cardStyle = {
    width: 'clamp(280px, 60vw, 850px)',
    flexShrink: 0
  };
  
  const trackPadding = 'calc(50vw - clamp(140px, 30vw, 425px))';

  return (
    <section ref={containerRef} className="relative h-screen bg-[#F2F2F2] z-20 overflow-hidden flex flex-col justify-center select-none">
      {/* Premium subtle dot grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <div className="absolute top-[8vh] left-[4vh] md:top-[10vh] md:left-[5vw] z-30 text-[#1A1A1A] max-w-[80vw] pointer-events-none">
        <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-sans font-black uppercase tracking-tighter leading-none mb-1 opacity-30">
          How I approach
        </h2>
        <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-sans font-black uppercase tracking-tighter leading-none text-[#7A1A2A]">
          every project?
        </h2>
      </div>
      
      <div 
        ref={trackRef}
        style={{ paddingLeft: trackPadding, paddingRight: trackPadding }} 
        className="flex gap-[8vw] items-center w-max h-full pt-[4vh]"
      >
        {processSteps.map((step, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div 
              key={step.id} 
              style={cardStyle}
              className={`relative h-[60vh] min-h-[420px] transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center
                ${isActive ? 'opacity-100 scale-100' : 'opacity-[0.25] scale-[0.90]'}
              `}
            >
              <GlareHover
                className="w-full h-full rounded-3xl bg-[#E8EAE6] shadow-2xl overflow-hidden border border-[#1A1A1A]/5"
                glareColor="#ffffff"
                glareOpacity={0.5}
                borderRadius="24px"
                transitionDuration={450}
              >
                <div className="relative w-full h-full p-8 md:p-14 flex flex-col justify-between">
                  <div className="absolute -bottom-16 -right-12 text-[16rem] md:text-[28rem] font-sans font-black text-[#1A1A1A] opacity-[0.04] leading-none pointer-events-none select-none">
                    {step.id}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-[0.5em] mb-6 md:mb-8 text-[#7A1A2A]">
                      <span className="w-8 h-[2px] bg-[#7A1A2A] opacity-60" />
                      <div className="text-xs md:text-sm font-sans font-bold tracking-[0.25em]">
                        PHASE {step.id}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-[clamp(2.5rem,4vw,4.5rem)] font-sans font-black uppercase text-[#1A1A1A] leading-[1.05] mb-6 max-w-[95%] mix-blend-multiply tracking-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-base md:text-[clamp(1rem,1.25vw,1.15rem)] font-sans text-[#4A4A4A] max-w-[85%] leading-[1.7] mix-blend-multiply font-medium">
                      {step.desc}
                    </p>
                  </div>
                  
                  <div className="mt-auto relative z-10 inline-flex">
                    <span className="group flex items-center text-xs md:text-sm font-sans font-black uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#7A1A2A] transition-colors cursor-pointer relative overflow-hidden">
                      <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">{step.linkText}</span>
                      <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">{step.linkText}</span>
                    </span>
                  </div>
                </div>
              </GlareHover>
            </div>
          );
        })}
      </div>
    </section>
  );
};