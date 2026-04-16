import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SBLogo from './SB.png'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  setIsHoveringDark: (val: boolean) => void
}

const menuItems = [
  { id: '01', title: 'ABOUT', marquee: 'MY JOURNEY • '.repeat(10), direction: 'left', speed: 44 },
  { id: '02', title: 'PROJECTS', marquee: 'RECENT WORK • '.repeat(10), direction: 'right', speed: 52 },
  { id: '03', title: 'CONTACT', marquee: "LET'S TALK • ".repeat(10), direction: 'left', speed: 48 }
]

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, setIsHoveringDark }) => {
  const [hoverState, setHoverState] = useState<{ active: number | null, lastActive: number | null }>({ active: null, lastActive: null })
  const [bandTop, setBandTop] = useState('50%')
  const [direction, setDirection] = useState<'top' | 'bottom'>('top')
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])

  const activeIndexToRender = hoverState.active !== null ? hoverState.active : (hoverState.lastActive !== null ? hoverState.lastActive : 0)
  const activeItemData = menuItems[activeIndexToRender]

  const updateBandPosition = (index: number) => {
    const item = itemRefs.current[index]
    if (!item) return

    const list = item.parentElement
    if (!list) return

    const top = item.offsetTop + item.offsetHeight / 2
    setBandTop(`${top}px`)
  }

  const entranceTransition = { duration: 1.1, ease: [0.76, 0, 0.24, 1] } as const
  const logoMotion = {
    initial: { opacity: 0, y: -24 },
    animate: isOpen ? { opacity: 1, y: 0, transition: entranceTransition } : { opacity: 0, y: -24, transition: entranceTransition }
  }
  const listWrapperMotion = {
    initial: { opacity: 0, y: 28 },
    animate: isOpen ? { opacity: 1, y: 0, transition: { ...entranceTransition, delay: 0.16 } } : { opacity: 0, y: 28, transition: entranceTransition }
  }

  return (
    <>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: {
            clipPath: "circle(0px at calc(100% - 60px) 60px)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          },
          open: {
            clipPath: "circle(150vw at calc(100% - 60px) 60px)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          },
        }}
        className={`fixed inset-0 z-[100] bg-[#FFFFFF] ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Logo */}
        <motion.div
          className="absolute top-[4vh] left-[4vh] -m-4 p-4 z-[101] pointer-events-none"
          initial={logoMotion.initial}
          animate={logoMotion.animate}
        >
          <img src={SBLogo} alt="SB logo" className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] object-contain" />
        </motion.div>

        {/* Close Button */}
        <div className="absolute top-[4vh] right-[4vh] -m-4 p-4 z-[101]">
          <AnimatePresence>
            {isOpen && (
              <motion.button
                layoutId="shared-menu-circle"
                onClick={onClose}
                className="border-[1px] border-[#7A1A2A] rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden group pointer-events-auto bg-[#F2F2F2]"
                style={{
                  width: 'clamp(48px,5vw,64px)',
                  height: 'clamp(48px,5vw,64px)',
                }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.div
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-[25%] right-[25%] top-[50%] h-[1.5px] mt-[-0.75px]"
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 45 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                    className="block w-full h-full bg-[#7A1A2A] rounded-full origin-center"
                  />
                </motion.div>
                <motion.div
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-[25%] right-[25%] top-[50%] h-[1.5px] mt-[-0.75px]"
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -45 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                    className="block w-full h-full bg-[#7A1A2A] rounded-full origin-center"
                  />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Center Content */}
        <motion.div
          className="w-full h-full flex flex-col justify-center items-center"
          initial={listWrapperMotion.initial}
          animate={listWrapperMotion.animate}
        >
          <ul 
            className="relative w-full max-w-7xl flex flex-col"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const isTop = e.clientY < rect.top + rect.height / 2
              setDirection(isTop ? 'top' : 'bottom')
            }}
            onMouseLeave={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const isTop = e.clientY < rect.top + rect.height / 2
              setDirection(isTop ? 'top' : 'bottom')
              setHoverState({ active: null, lastActive: null });
              setIsHoveringDark(false);
            }}
          >
            {/* Single Shared Crimson Hover Band (Foreground overlay) */}
            <AnimatePresence custom={direction}>
              {hoverState.active !== null && (
                <motion.div
                  key="shared-band"
                  custom={direction}
                  variants={{
                    initial: (dir: 'top' | 'bottom') => ({
                      clipPath: dir === 'top' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
                      top: bandTop,
                    }),
                    animate: {
                      clipPath: 'inset(0% 0% 0% 0%)',
                      top: bandTop,
                      transition: {
                        clipPath: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                        top: { type: 'spring', stiffness: 120, damping: 24, mass: 0.45 },
                      },
                    },
                    exit: (dir: 'top' | 'bottom') => ({
                      clipPath: dir === 'top' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[clamp(5rem,11vw,180px)] bg-[#7F1D2C] flex items-center overflow-hidden z-20 pointer-events-none"
                >
                  <div
                    className={`flex whitespace-nowrap h-full items-center ${activeItemData.direction === 'right' ? 'marquee-right' : 'marquee-left'}`}
                    style={{
                      willChange: 'transform',
                      animationDuration: `${activeItemData.speed}s`
                    }}
                  >
                    <span
                      className="text-[clamp(4rem,9vw,160px)] font-black uppercase tracking-normal whitespace-nowrap px-8 leading-[0.85]"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px #FFFFFF',
                      }}
                    >
                      {activeItemData.marquee}
                    </span>
                    <span
                      className="text-[clamp(4rem,9vw,160px)] font-black uppercase tracking-normal whitespace-nowrap px-8 leading-[0.85]"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px #FFFFFF',
                      }}
                    >
                      {activeItemData.marquee}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {menuItems.map((item, index) => (
              <motion.li
                ref={(el) => { itemRefs.current[index] = el }}
                key={item.id}
                className="relative z-10 w-full py-4 md:py-6 flex items-center justify-center group cursor-pointer overflow-visible"
                initial={{ opacity: 0, x: 24, y: 24 }}
                animate={isOpen ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 24, y: 24 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.24 + index * 0.08 }}
                onMouseEnter={() => {
                  setHoverState(prev => ({ 
                    active: index, 
                    lastActive: prev.active !== null ? prev.active : prev.lastActive 
                  }));
                  updateBandPosition(index)
                  setIsHoveringDark(true);
                }}
              >
                {/* Title & Index (Foreground) */}
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: hoverState.active === index ? 0 : 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full flex items-center justify-start px-8 md:px-16 pointer-events-none"
                >
                  <span className="text-[#1A1A1A] text-sm md:text-base font-medium self-start mt-2 md:mt-4 mr-8 md:mr-16">
                    {item.id}
                  </span>
                  <h2 className="text-[#1A1A1A] uppercase leading-[0.85] tracking-normal font-black text-[clamp(4rem,9vw,160px)] whitespace-nowrap">
                    {item.title}
                  </h2>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </>
  )
}
