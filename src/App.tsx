import { CustomCursor } from './components/CustomCursor'
import { TopographicBackground } from './components/TopographicBackground'

function App() {
  const heroSize = 'clamp(2rem, 11vw, 16rem)'

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#561C24]">
      {/* WebGL Background */}
      <TopographicBackground />

      {/* Custom Framer Motion Cursor */}
      <CustomCursor />

      {/* Main UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none px-[4vw] py-[2.5vh]">

        {/* ── TOP NAV ── */}
        <header className="w-full flex justify-between items-center pointer-events-auto flex-shrink-0">
          <div className="w-[clamp(40px,4vw,64px)] h-[clamp(40px,4vw,64px)] rounded-full border-[1.5px] border-[#E8D8C4] flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <span className="text-[#E8D8C4] text-[clamp(12px,1.2vw,20px)] tracking-[0.15em] leading-none mt-[2px]">CHK</span>
          </div>

          <button className="bg-[#E8D8C4] text-[#561C24] px-[clamp(16px,2vw,40px)] py-[clamp(6px,0.8vh,14px)] rounded-full text-[clamp(10px,0.7vw,14px)] tracking-[0.2em] font-sans font-black flex items-center gap-[clamp(6px,0.5vw,12px)] hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-[6px] h-[6px] rounded-full bg-[#561C24]"></div>
            MENU
          </button>
        </header>

        {/* ── STATS DIVIDER LINE ── */}
        <div className="w-full flex items-center gap-0 mt-[2.5vh] flex-shrink-0 text-[#E8D8C4] text-[clamp(7px,0.6vw,11px)] tracking-[0.2em] font-sans uppercase opacity-70">
          <span className="whitespace-nowrap pr-[1.5vw]">50+ Projects Completed</span>
          <div className="flex-1 h-[1px] bg-[#E8D8C4] opacity-25"></div>
          <span className="whitespace-nowrap px-[1.5vw]">5+ Years of Experience</span>
          <div className="flex-1 h-[1px] bg-[#E8D8C4] opacity-25"></div>
          <span className="whitespace-nowrap pl-[1.5vw]">98.3/100 Average Performance Score</span>
        </div>

        {/* ── HERO TYPOGRAPHY ── */}
        <section className="flex-1 flex flex-col justify-center w-full min-h-0">

          {/* Line 1: I BUILD  Modern */}
          <div className="flex items-baseline w-full gap-[0.2em]">
            <span
              className="text-[#E8D8C4] leading-[0.85] whitespace-nowrap"
              style={{ fontSize: heroSize }}
            >
              I BUILD
            </span>
            <span
              className="text-[#E8D8C4] leading-[0.85] whitespace-nowrap"
              style={{
                fontSize: heroSize,
                fontFamily: '"UnifrakturMaguntia", cursive',
                fontWeight: 400,
                textTransform: 'none',
              }}
            >
              Modern
            </span>
          </div>

          {/* Line 2: WEBSITES — right-aligned */}
          <div className="w-full text-right" style={{ marginTop: '-0.5vw' }}>
            <span
              className="text-[#C7B7A3] leading-[0.85] whitespace-nowrap"
              style={{ fontSize: heroSize }}
            >
              WEBSITES
            </span>
          </div>

          {/* Line 3: THAT WORK — right-aligned + underline */}
          <div className="w-full flex justify-end" style={{ marginTop: '-0.5vw' }}>
            <div className="relative inline-block">
              <span
                className="text-[#E8D8C4] leading-[0.85] whitespace-nowrap block"
                style={{ fontSize: heroSize }}
              >
                THAT WORK
              </span>
              {/* Tan underline bar */}
              <div
                className="absolute left-0 w-full bg-[#C7B7A3]"
                style={{ bottom: '0.06em', height: '0.08em' }}
              ></div>
            </div>
          </div>

        </section>

        {/* ── BOTTOM ABOUT ── */}
        <footer className="w-full flex justify-between items-end flex-shrink-0 pb-[1vh] pointer-events-auto">
          <span className="font-sans text-[clamp(8px,0.6vw,12px)] uppercase tracking-[0.3em] text-[#E8D8C4] opacity-50">
            About
          </span>

          <div className="max-w-[clamp(280px,30vw,480px)] font-sans text-[clamp(7px,0.55vw,11px)] leading-[1.8] uppercase tracking-[0.12em] text-[#E8D8C4] opacity-80 text-right">
            I'm a web developer focused on building modern, fast, and reliable websites.
            I care not only about how a site looks, but also about how it performs,
            scales, and feels for real users. From clean code and responsive layouts
            to performance optimization and SEO, I make sure every project is built
            with attention to detail and long-term quality in mind.
            <div className="mt-[0.8em] cursor-pointer hover:opacity-60 transition-opacity">
              Learn more ↗
            </div>
          </div>
        </footer>

      </div>
    </main>
  )
}

export default App
