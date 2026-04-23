import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import GlareHover from './GlareHover';
import { TopographicBackground } from './TopographicBackground';

const processSteps = [
  { id: '01', title: 'PERFORMANCE FIRST', desc: 'I focus on building websites that load fast and feel smooth from the first interaction. Performance is considered at every stage, from structure and assets to code quality and optimization, ensuring reliable results on real devices and networks.', linkText: 'Learn more', icon: <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { id: '02', title: 'CLEAN & SCALABLE CODE', desc: 'I write clean, well-structured, and maintainable code with a strong focus on clarity and long-term scalability. This approach makes projects easier to understand, update, and extend over time, while reducing complexity and keeping the codebase reliable as it grows.', linkText: 'My workflow', icon: <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> },
  { id: '03', title: 'MODERN UI & UX', desc: 'I design and build interfaces with clarity, usability, and consistency in mind. Layouts, interactions, and responsive behavior are carefully crafted to provide an intuitive experience that works seamlessly across all devices and screen sizes.', linkText: 'View approach', icon: <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> },
  { id: '04', title: 'SEO & BEST PRACTICES', desc: 'Websites are built using modern best practices and strong technical SEO foundations from the very beginning of the project. This includes clean structure, accessibility, semantic markup, and optimization techniques that support visibility, performance, and long-term growth.', linkText: 'See details', icon: <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
  { id: '05', title: 'RELIABLE DELIVERY', desc: 'From the initial idea to the final launch, I focus on clear communication, thoughtful planning, and reliable delivery at every stage of the process. Each project is carefully tested and refined to ensure stability, quality, and confidence when the product goes live.', linkText: 'How I work', icon: <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> }
];

interface ProcessSectionProps {
  setIsHoveringDark?: (val: boolean) => void;
}

export const ProcessSection = ({ setIsHoveringDark }: ProcessSectionProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (processSteps.length - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const [dimensions, setDimensions] = useState(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      return {
        width: w,
        cardWidth: Math.min(Math.max(280, w * 0.6), 850),
        gap: w * 0.08
      };
    }
    return { width: 1200, cardWidth: 850, gap: 96 };
  });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const cWidth = Math.min(Math.max(280, w * 0.6), 850);
      const g = w * 0.08;
      setDimensions({ width: w, cardWidth: cWidth, gap: g });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const xOffset = dimensions.width === 0 
    ? 0 
    : (dimensions.width / 2) - (dimensions.cardWidth / 2) - (activeIndex * (dimensions.cardWidth + dimensions.gap));

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-[#F2F2F2] z-20">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center select-none">
        
        <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply">
          <TopographicBackground />
        </div>

        <div className="absolute top-[4vh] left-[4vh] md:top-[5.5vh] md:left-[4vh] z-30 text-[#1A1A1A] max-w-[80vw] pointer-events-none">
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-black uppercase tracking-[0em] leading-none mb-1 opacity-30" style={{ fontFamily: 'Anton, sans-serif' }}>
            How I approach
          </h2>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-black tracking-[0em] leading-none text-[#7A1A2A]" style={{ fontFamily: 'Magnolia Script, cursive', textTransform: 'none' }}>
            every project ?
          </h2>
        </div>
        
        <motion.div 
          className="flex items-center w-max pt-[8vh] md:pt-[6vh]"
          animate={{ x: xOffset }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ gap: dimensions.gap }}
        >
          {processSteps.map((step, index) => {
            const isActive = index === activeIndex;
            const isEven = index % 2 === 0;

            const cardBg = isEven ? 'bg-[#FFFFFF]' : 'bg-[#7A1A2A]';
            const cardBorder = isEven ? 'border-2 border-[#7A1A2A]' : 'border-2 border-[#FFFFFF]';
            const cardShadow = isEven 
              ? 'shadow-[0_30px_80px_-15px_rgba(0,0,0,0.25)]' 
              : 'shadow-[0_30px_80px_-15px_rgba(122,26,42,0.45)]';
            const textColor = isEven ? 'text-[#1A1A1A]' : 'text-[#FFFFFF]';
            const phaseColor = isEven ? 'text-[#7A1A2A]' : 'text-[#FFFFFF]';
            const phaseLine = isEven ? 'bg-[#7A1A2A]' : 'bg-[#FFFFFF]';
            const watermarkColor = isEven ? 'text-[#1A1A1A] opacity-[0.04]' : 'text-[#FFFFFF] opacity-[0.12]';
            const descColor = isEven ? 'text-[#4A4A4A]' : 'text-[#FFFFFF]/90';
            const hoverText = isEven ? 'hover:text-[#7A1A2A]' : 'hover:text-[#FFFFFF]';

            return (
              <motion.div 
                key={step.id} 
                style={{ width: dimensions.cardWidth }}
                className="relative h-[65vh] min-h-[460px] origin-center flex-shrink-0"
                animate={{
                  filter: isActive ? 'blur(0px)' : 'blur(8px)',
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.9,
                  y: isActive ? 0 : 15,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div 
                  className={`w-full h-full rounded-3xl ${cardBg} ${cardBorder} ${cardShadow} overflow-hidden`}
                  onMouseEnter={() => !isEven && setIsHoveringDark?.(true)}
                  onMouseLeave={() => !isEven && setIsHoveringDark?.(false)}
                >
                  {isActive ? (
                    <GlareHover
                      className="w-full h-full"
                      glareColor="#ffffff"
                      glareOpacity={0.4}
                      borderRadius="24px"
                      transitionDuration={450}
                    >
                      <div className="relative w-full h-full p-6 md:p-10 lg:p-14 flex flex-col justify-between">
                        <div className={`absolute -bottom-16 -right-12 text-[16rem] md:text-[28rem] font-sans font-black leading-none pointer-events-none select-none ${watermarkColor}`}>
                          {step.id}
                        </div>
                    
                        <div className="relative z-10">
                          <div className={`flex items-center gap-[0.5em] mb-6 md:mb-8 ${phaseColor}`}>
                            <span className={`w-8 h-[2px] ${phaseLine} opacity-60`} />
                            <div className="text-xs md:text-sm font-sans font-bold tracking-[0.25em]">
                              PHASE {step.id}
                            </div>
                          </div>
                          
                          <h3 className={`text-3xl md:text-[clamp(2.5rem,4vw,4.5rem)] font-sans font-black uppercase leading-[1.05] mb-6 max-w-[95%] tracking-tight ${textColor}`}>
                            {step.title}
                          </h3>
                          
                          <p className={`text-base md:text-[clamp(1rem,1.25vw,1.15rem)] font-sans max-w-[85%] leading-[1.7] font-medium ${descColor}`}>
                            {step.desc}
                          </p>
                        </div>
                    
                        <div className={`mt-auto relative z-10 inline-flex ${textColor}`}>
                          <div className={`group/link flex items-center text-xs md:text-sm font-sans font-black uppercase tracking-[0.2em] transition-colors cursor-pointer relative overflow-hidden whitespace-pre ${hoverText}`}>
                            <div className="flex">
                              {(step.linkText + ' ↗').split('').map((char, i) => (
                                <span
                                  key={i}
                                  className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:-translate-y-[150%]"
                                  style={{ transitionDelay: `${i * 0.015}s` }}
                                >
                                  {char}
                                </span>
                              ))}
                            </div>
                            <div className="absolute inset-0 flex" aria-hidden="true">
                              {(step.linkText + ' ↗').split('').map((char, i) => (
                                <span
                                  key={i}
                                  className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] group-hover/link:translate-y-0"
                                  style={{ transitionDelay: `${i * 0.015}s` }}
                                >
                                  {char}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlareHover>
                  ) : (
                    <div className="relative w-full h-full p-6 md:p-10 lg:p-14 flex flex-col justify-between">
                      <div className={`absolute -bottom-16 -right-12 text-[16rem] md:text-[28rem] font-sans font-black leading-none pointer-events-none select-none ${watermarkColor}`}>
                        {step.id}
                      </div>
                    
                      <div className="relative z-10">
                        <div className={`flex items-center gap-[0.5em] mb-6 md:mb-8 ${phaseColor}`}>
                          <span className={`w-8 h-[2px] ${phaseLine} opacity-60`} />
                          <div className="text-xs md:text-sm font-sans font-bold tracking-[0.25em]">
                            PHASE {step.id}
                          </div>
                        </div>
                        
                        <h3 className={`text-3xl md:text-[clamp(2.5rem,4vw,4.5rem)] font-sans font-black uppercase leading-[1.05] mb-6 max-w-[95%] tracking-tight ${textColor}`}>
                          {step.title}
                        </h3>
                        
                        <p className={`text-base md:text-[clamp(1rem,1.25vw,1.15rem)] font-sans max-w-[85%] leading-[1.7] font-medium ${descColor}`}>
                          {step.desc}
                        </p>
                      </div>
                    
                      <div className={`mt-auto relative z-10 inline-flex ${textColor}`}>
                        <div className={`group/link flex items-center text-xs md:text-sm font-sans font-black uppercase tracking-[0.2em] transition-colors cursor-pointer relative overflow-hidden whitespace-pre ${hoverText}`}>
                          <div className="flex">
                            {(step.linkText + ' ↗').split('').map((char, i) => (
                              <span
                                key={i}
                                className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:-translate-y-[150%]"
                                style={{ transitionDelay: `${i * 0.015}s` }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                          <div className="absolute inset-0 flex" aria-hidden="true">
                            {(step.linkText + ' ↗').split('').map((char, i) => (
                              <span
                                key={i}
                                className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] group-hover/link:translate-y-0"
                                style={{ transitionDelay: `${i * 0.015}s` }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};