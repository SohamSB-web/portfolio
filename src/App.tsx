import { CustomCursor } from './components/CustomCursor'
import { TopographicBackground } from './components/TopographicBackground'

function App() {
  const heroSize = 'clamp(2rem, 11vw, 16rem)'

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#E8D8C4]">
      {/* WebGL Background */}
      <TopographicBackground />

      {/* Custom Framer Motion Cursor */}
      <CustomCursor />

      {/* Main UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none px-[4vw] py-[2.5vh]">

        {/* ── TOP NAV ── */}
        <header className="w-full flex justify-between items-center pointer-events-auto flex-shrink-0">
          <div className="w-[clamp(40px,4vw,64px)] h-[clamp(40px,4vw,64px)] rounded-full border-[1.5px] border-[#561C24] flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <span className="text-[#561C24] text-[clamp(12px,1.2vw,20px)] tracking-[0.15em] leading-none mt-[2px]">CHK</span>
          </div>

          <button className="bg-[#561C24] text-[#E8D8C4] px-[clamp(16px,2vw,40px)] py-[clamp(6px,0.8vh,14px)] rounded-full text-[clamp(10px,0.7vw,14px)] tracking-[0.2em] font-sans font-black flex items-center gap-[clamp(6px,0.5vw,12px)] hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-[6px] h-[6px] rounded-full bg-[#E8D8C4]"></div>
            MENU
          </button>
        </header>

        {/* ── STATS DIVIDER LINE ── */}
        <div className="w-full flex items-center gap-0 mt-[2.5vh] flex-shrink-0 text-[#561C24] text-[clamp(7px,0.6vw,11px)] tracking-[0.2em] font-sans uppercase opacity-70">
          <span className="whitespace-nowrap pr-[1.5vw]">50+ Projects Completed</span>
          <div className="flex-1 h-[1px] bg-[#561C24] opacity-25"></div>
          <span className="whitespace-nowrap px-[1.5vw]">5+ Years of Experience</span>
          <div className="flex-1 h-[1px] bg-[#561C24] opacity-25"></div>
          <span className="whitespace-nowrap pl-[1.5vw]">98.3/100 Average Performance Score</span>
        </div>

        {/* ── HERO TYPOGRAPHY ── */}
        <section className="flex-1 flex items-start w-full min-h-0">
          <div className="w-full flex justify-between items-start gap-[4vw]">
            <div className="max-w-[36%]">
              <div className="flex items-baseline gap-[0.08em]">
                <span
                  className="text-[#561C24] leading-[0.85] whitespace-nowrap"
                  style={{ fontSize: heroSize }}
                >
                  I
                </span>
                <span
                  style={{
                    fontFamily: '"Dirty Line", "DirtyLine", cursive',
                    fontWeight: 400,
                    fontSize: 200,
                    lineHeight: 1,
                    display: 'inline-block',
                    verticalAlign: 'text-bottom',
                  }}
                >
                  D
                </span>
                <span
                  className="text-[#561C24] leading-[0.85] whitespace-nowrap"
                  style={{ fontSize: heroSize }}
                >
                  ESIGN
                </span>
              </div>
            </div>

            <div className="max-w-[48%] flex flex-col items-end gap-[0.35em]" style={{ marginTop: '1.2vw' }}>
              <div className="flex items-end gap-[0.08em] justify-end">
                <span
                  className="text-[#561C24] leading-[0.85] whitespace-nowrap"
                  style={{ fontSize: heroSize, textTransform: 'none' }}
                >
                  <span
                    style={{
                      fontFamily: '"Dirty Line", "DirtyLine", cursive',
                      fontWeight: 400,
                      fontSize: 200,
                      lineHeight: 1,
                      display: 'inline-block',
                      verticalAlign: 'text-bottom',
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

              <div className="relative inline-flex justify-end">
                <span
                  className="text-[#561C24] leading-[0.85] whitespace-nowrap block"
                  style={{ fontSize: heroSize }}
                >
                  EXPERIENCES
                </span>
                <div
                  className="absolute left-0 w-full bg-[#561C24]"
                  style={{ bottom: '0.06em', height: '0.08em' }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM ABOUT ── */}
        <footer className="w-full flex justify-between items-end flex-shrink-0 pb-[1vh] pointer-events-auto">
          <span className="font-sans text-[clamp(8px,0.6vw,12px)] uppercase tracking-[0.3em] text-[#561C24] opacity-50">
            About
          </span>

          <div className="max-w-[clamp(280px,30vw,480px)] font-sans text-[clamp(7px,0.55vw,11px)] leading-[1.8] uppercase tracking-[0.12em] text-[#561C24] opacity-80 text-right">
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
