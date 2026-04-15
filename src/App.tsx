import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import SBLogo from './components/SB.png'
import { CustomCursor } from './components/CustomCursor'
import { TopographicBackground } from './components/TopographicBackground'

function App() {
  const heroSize = 'clamp(2rem, 11vw, 16rem)'
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null)

  const handleButtonMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const wrapper = buttonWrapperRef.current
    if (!wrapper) return
    const rect = wrapper.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    const strength = 0.5
    setButtonOffset({ x: x * strength, y: y * strength })
  }

  const handleButtonMouseLeave = () => {
    setButtonOffset({ x: 0, y: 0 })
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-transparent">
      {/* WebGL Background */}
      <TopographicBackground />

      {/* Custom Framer Motion Cursor */}
      <CustomCursor />

      {/* Main UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none px-[4vh] py-[4vh]">

        {/* ── TOP NAV ── */}
        <header className="w-full flex justify-between items-center pointer-events-auto flex-shrink-0">
          <div className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img src={SBLogo} alt="SB" className="w-full h-full object-contain" />
          </div>

          <div
            ref={buttonWrapperRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="p-4 -m-4 cursor-pointer"
          >
            <motion.button
              animate={{ x: buttonOffset.x, y: buttonOffset.y }}
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
              <span className="relative flex-none ml-[4px] w-[clamp(10px,1vw,14px)] h-[clamp(10px,1vw,14px)] rounded-full bg-[#F2F2F2] transition-transform duration-300 group-hover:scale-200">
                <span className="absolute left-[20%] right-[20%] top-[32%] h-[1px] rounded-full bg-transparent group-hover:bg-[#7A1A2A] transition-colors duration-300"></span>
                <span className="absolute left-[20%] right-[20%] top-[62%] h-[1px] rounded-full bg-transparent group-hover:bg-[#7A1A2A] transition-colors duration-300"></span>
              </span>
            </motion.button>
          </div>
        </header>

        {/* ── SKILL HIGHLIGHTS ── */}
        <div className="w-full flex items-center justify-between gap-[1.5vw] mt-[6.5vh] flex-shrink-0 text-[#1A1A1A] text-[clamp(7px,0.6vw,11px)] tracking-[0.2em] font-sans font-semibold uppercase opacity-80 leading-none">
          <span className="relative z-10 whitespace-nowrap">Design systems for intuitive interaction</span>
          <div className="flex-1 min-w-[2vw] h-[1.5px] bg-[#1A1A1A] opacity-30 translate-y-[0.15em]"></div>
          <span className="relative z-10 whitespace-nowrap">Responsive layouts for every device</span>
          <div className="flex-1 min-w-[2vw] h-[1.5px] bg-[#1A1A1A] opacity-30 translate-y-[0.15em]"></div>
          <span className="relative z-10 whitespace-nowrap">Performance-first development workflow</span>
        </div>

        {/* ── HERO TYPOGRAPHY ── */}
        <section className="flex-1 flex items-center w-full min-h-0">
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
                    fontSize: 200,
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
                <span
                  className="text-[#1A1A1A] leading-[0.85] whitespace-nowrap"
                  style={{ fontSize: heroSize, textTransform: 'none' }}
                >
                  <span
                    style={{
                      color: '#1A1A1A',
                      fontFamily: '"Dirty Line", "DirtyLine", cursive',
                      fontWeight: 400,
                      fontSize: 200,
                      lineHeight: 1,
                      display: 'inline-block',
                      marginLeft: '0.2em',
                    }}
                  >
                    D
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                    }}
                  >
                    IGITAL
                  </span>
                </span>
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
        </section>

        {/* ── BOTTOM ABOUT ── */}
        <footer className="w-full flex justify-end items-end flex-shrink-0 pb-[1vh] pointer-events-auto">
          <div className="max-w-[clamp(280px,30vw,480px)] flex flex-col items-end text-right">
            <div className="w-full flex items-center gap-[1vw] mb-[1.5vh]">
              <div className="flex-1 h-[1.5px] bg-[#1A1A1A] opacity-30"></div>
              <span className="font-sans font-semibold text-[clamp(8px,0.6vw,12px)] uppercase tracking-[0.3em] text-[#1A1A1A] opacity-80">
                About
              </span>
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
        </footer>

      </div>
    </main>
  )
}

export default App
