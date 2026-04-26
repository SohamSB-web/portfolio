import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import Lenis from 'lenis'
import SBLogo from './components/SB.png'
import { CustomCursor } from './components/CustomCursor'
import { LoaderCurtain } from './components/LoaderCurtain'
import Waves from './components/Waves'
import { MenuOverlay } from './components/MenuOverlay'
import Shuffle from './components/Shuffle'
import { ProcessSection } from './components/ProcessSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const heroSize = 'clamp(2rem, 11vw, 16rem)'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonOffsetX = useMotionValue(0)
  const buttonOffsetY = useMotionValue(0)
  const [loaderStage, setLoaderStage] = useState<'darkStart' | 'darkOpen' | 'lightCover' | 'lightOpen' | 'done'>('darkStart')
  const [showLoader, setShowLoader] = useState(true)
  const [isLoaderCovering, setIsLoaderCovering] = useState(true)
  const [isHoveringDark, setIsHoveringDark] = useState(false)
  const [isAppLoaded, setIsAppLoaded] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
      }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Wait for the 0 to 100% progress bar (1.8s) + a 1s pause to lift the curtain
    const openTimer = window.setTimeout(() => {
      setLoaderStage('darkOpen')
      setIsAppLoaded(true)
      // Switch the cursor back slightly after the slide begins so it doesn't feel stuck
      window.setTimeout(() => setIsLoaderCovering(false), 250)
    }, 2800)
    
    // Remove the loader from the DOM entirely exactly when the animation sequence finishes (2800ms + 1250ms animation)
const doneTimer = window.setTimeout(() => setLoaderStage('done'), 4050)

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
    }
  }

  useEffect(() => {
    if (loaderStage === 'done') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoader(false)
    }
  }, [loaderStage])

  const handleButtonMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const wrapper = buttonWrapperRef.current
    if (!wrapper) return
    const rect = wrapper.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    const strength = 0.5
    buttonOffsetX.set(x * strength)
    buttonOffsetY.set(y * strength)
    setIsHoveringDark(true)
  }

  const handleButtonMouseLeave = () => {
    buttonOffsetX.set(0)
    buttonOffsetY.set(0)
    setIsHoveringDark(false)
  }

  return (
    <main className="relative w-screen min-h-screen overflow-clip bg-[#F2F2F2] select-none">
      <CustomCursor isHoveringDark={isHoveringDark || isLoaderCovering} />

      <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Waves
            pause={isMenuOpen || !isHeroVisible}
            lineColor="#d1d1d1"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={24}
            yGap={48}
          />
        </div>

        <motion.section 
          className="relative z-10 w-full h-screen flex flex-col pointer-events-none px-[4vh] py-[4vh]"
          variants={containerVariants}
          initial="hidden"
          animate={isAppLoaded ? "visible" : "hidden"}
        >
          <motion.header variants={itemVariants} className="w-full flex justify-between items-center pointer-events-auto flex-shrink-0">
          <div 
            className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            onMouseEnter={() => setIsHoveringDark(true)}
            onMouseLeave={() => setIsHoveringDark(false)}
          >
            <img src={SBLogo} alt="SB" className="w-full h-full object-contain" />
          </div>

          <div
            ref={buttonWrapperRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className={`p-4 -m-4 cursor-pointer transition-opacity duration-300 relative inline-flex items-center justify-center`}
          >
            <AnimatePresence>
              {!isMenuOpen && (
                <motion.button
                  key="menu-btn"
                  onClick={() => setIsMenuOpen(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ x: buttonOffsetX, y: buttonOffsetY }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
                  className="group bg-[#7A1A2A] text-[#F2F2F2] border-none outline-none focus:outline-none focus:ring-0 px-[clamp(12px,1.5vw,32px)] py-[clamp(18px,2.2vh,24px)] rounded-full text-[clamp(10px,0.7vw,14px)] tracking-[0.2em] font-sans font-black flex items-center gap-[clamp(8px,0.8vw,12px)] cursor-pointer"
                >
                  <div className="relative overflow-hidden inline-flex items-center justify-center">
                    <div className="flex">
                      {'MENU'.split('').map((char, i) => (
                        <span
                          key={i}
                          className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]"
                          style={{ transitionDelay: `${i * 0.025}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex" aria-hidden="true">
                      {'MENU'.split('').map((char, i) => (
                        <span
                          key={i}
                          className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] group-hover:translate-y-0"
                          style={{ transitionDelay: `${i * 0.025}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="relative flex-none ml-[4px] w-[clamp(10px,1vw,14px)] h-[clamp(10px,1vw,14px)] rounded-full bg-transparent flex items-center justify-center">
                    <motion.div 
                      layoutId="shared-menu-circle"
                      className="absolute inset-0 rounded-full bg-[#F2F2F2] flex items-center justify-center pointer-events-none group-hover:scale-200 transition-transform duration-300"
                      style={{ zIndex: 101 }}
                      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <motion.div className="absolute left-[20%] right-[20%] top-[35%] h-[1.5px] mt-[-0.75px]" transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
                        <motion.span className="block w-full h-full rounded-full bg-[#F2F2F2] group-hover:bg-[#7A1A2A] transition-colors duration-300" />
                      </motion.div>
                      <motion.div className="absolute left-[20%] right-[20%] top-[65%] h-[1.5px] mt-[-0.75px]" transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
                        <motion.span className="block w-full h-full rounded-full bg-[#F2F2F2] group-hover:bg-[#7A1A2A] transition-colors duration-300" />
                      </motion.div>
                    </motion.div>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        <motion.div variants={itemVariants} className="w-full flex items-center justify-between gap-[1.5vw] mt-[6.5vh] flex-shrink-0 text-[#1A1A1A] text-[clamp(7px,0.6vw,11px)] tracking-[0.2em] font-sans font-semibold uppercase opacity-80 leading-none">
          <span className="relative z-10 whitespace-nowrap">Design systems for intuitive interaction</span>
          <div className="flex-1 min-w-[2vw] h-[1.5px] bg-[#1A1A1A] opacity-30 translate-y-[0.15em]"></div>
          <span className="relative z-10 whitespace-nowrap">Responsive layouts for every device</span>
          <div className="flex-1 min-w-[2vw] h-[1.5px] bg-[#1A1A1A] opacity-30 translate-y-[0.15em]"></div>
          <span className="relative z-10 whitespace-nowrap">Performance-first development workflow</span>
        </motion.div>

        <motion.section variants={itemVariants} className="flex-1 flex items-center w-full min-h-0">
          <div className="w-full flex justify-between items-start gap-[4vw]">
            <div className="max-w-[36%]">
              <div className="flex items-baseline gap-[0.08em]">
                <span
                  className="text-[#1A1A1A] leading-[0.85] whitespace-nowrap"
                  style={{ fontSize: heroSize }}
                >
                  I
                </span>
                <span
                  style={{
                    color: '#1A1A1A',
                    fontFamily: '"Dirty Line", "DirtyLine", cursive',
                    fontWeight: 400,
                    fontSize: 180,
                    lineHeight: 1,
                    display: 'inline-block',
                    verticalAlign: 'text-bottom',
                    marginLeft: '0.2em',
                  }}
                >
                  D
                </span>
                <span
                  className="text-[#1A1A1A] leading-[0.85] whitespace-nowrap"
                  style={{ fontSize: heroSize }}
                >
                  ESIGN
                </span>
                <Shuffle
                  text=""
                  onShuffleComplete={undefined}
                  colorFrom={undefined}
                  colorTo={undefined}
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                  loop={true}
                  loopDelay={3}
                  tag="span"
                  style={{ display: 'inline-flex', alignItems: 'baseline' }}
                >
                  <span
                    style={{
                      color: '#1A1A1A',
                      fontFamily: '"Dirty Line", "DirtyLine", cursive',
                      fontWeight: 400,
                      fontSize: 180,
                      lineHeight: 1,
                      display: 'inline-block',
                      verticalAlign: 'text-bottom',
                      marginLeft: '0.2em',
                    }}
                  >
                    D
                  </span>
                  <span
                    className="text-[#1A1A1A] leading-[0.85] whitespace-nowrap"
                    style={{ fontSize: heroSize, textTransform: 'none' }}
                  >
                    IGITAL
                  </span>
                </Shuffle>
              </div>
            </div>

            <div className="max-w-[48%] flex flex-col items-end gap-[0.35em]" style={{ marginTop: '12vw' }}>
              <div className="relative inline-flex justify-end">
                <span
                  className="text-[#1A1A1A] leading-[0.85] whitespace-nowrap block"
                  style={{ fontSize: heroSize }}
                >
                  EXPERIENCES
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.footer variants={itemVariants} className="w-full flex justify-start items-end flex-shrink-0 pb-[1vh] pointer-events-auto">
          <div className="max-w-[clamp(280px,30vw,480px)] flex flex-col items-start text-left">
            <div className="w-full flex items-center justify-start gap-[1vw] mb-[1.5vh]">
              <span className="font-sans font-semibold text-[clamp(8px,0.6vw,12px)] uppercase tracking-[0.3em] text-[#1A1A1A] opacity-80">
                About
              </span>
              <div className="flex-1 h-[1.5px] bg-[#1A1A1A] opacity-30"></div>
            </div>
            <div className="font-sans font-medium text-[clamp(7px,0.55vw,11px)] leading-[1.8] uppercase tracking-[0.12em] text-[#1A1A1A] opacity-80">
              I build modern, fast, and dependable websites. I care as much about how
              a site looks as I do about how it performs, scales, and feels for real
              users. From clean, responsive layouts to performance tuning and SEO, I
              make sure every project is crafted with attention to detail and built
              for long-term quality.
            </div>
            <div className="mt-[0.8em] font-sans font-black tracking-[0.2em] text-[clamp(10px,0.7vw,14px)] text-[#7A1A2A] cursor-pointer group/link inline-block">
              <div className="relative overflow-hidden inline-flex whitespace-pre">
                <div className="flex">
                  {'Learn more ↗'.split('').map((char, i) => (
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
                  {'Learn more ↗'.split('').map((char, i) => (
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
        </motion.footer>
      </motion.section>

      <div className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#1A1A1A] opacity-30" />
      </div>

      <ProcessSection setIsHoveringDark={setIsHoveringDark} />

      {showLoader && <LoaderCurtain stage={loaderStage} />}

      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => {
          setIsMenuOpen(false)
          setIsHoveringDark(false)
        }}
        setIsHoveringDark={setIsHoveringDark}
      />
    </main>
  )
}

export default App
