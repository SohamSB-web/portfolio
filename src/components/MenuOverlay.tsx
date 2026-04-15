import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  setIsHoveringDark: (val: boolean) => void
}

const menuItems = [
  { id: '01', title: 'ABOUT', marquee: 'MY JOURNEY • '.repeat(10) },
  { id: '02', title: 'PROJECTS', marquee: 'RECENT WORK • '.repeat(10) },
  { id: '03', title: 'CONTACT', marquee: "LET'S TALK • ".repeat(10) }
]

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, setIsHoveringDark }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: {
            clipPath: "circle(0px at calc(100% - 60px) 60px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          },
          open: {
            clipPath: "circle(150vw at calc(100% - 60px) 60px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          },
        }}
        className={`fixed inset-0 z-[100] bg-[#FFFFFF] ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-[4vh] right-[4vh] -m-4 p-4 z-[101]">
          <AnimatePresence>
            {isOpen && (
              <motion.button
                layoutId="shared-menu-circle"
                onClick={onClose}
                className="border-[1.5px] border-[#7A1A2A] rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden group pointer-events-auto bg-[#F2F2F2]"
                style={{
                  width: 'clamp(48px,5vw,64px)',
                  height: 'clamp(48px,5vw,64px)',
                }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.span
                  layoutId="menu-line-1"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-[25%] right-[25%] top-[50%] -translate-y-1/2 h-[2px] bg-[#7A1A2A] rounded-full origin-center"
                />
                <motion.span
                  layoutId="menu-line-2"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -45 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-[25%] right-[25%] top-[50%] -translate-y-1/2 h-[2px] bg-[#7A1A2A] rounded-full origin-center"
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Center Content */}
        <div className="w-full h-full flex flex-col justify-center items-center">
          <ul className="w-full max-w-7xl flex flex-col">
            {menuItems.map((item, index) => (
              <li
                key={item.id}
                className="relative w-full py-8 md:py-12 flex items-center justify-center group cursor-pointer overflow-visible"
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  setIsHoveringDark(true)
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  setIsHoveringDark(false)
                }}
              >
                {/* Title & Index (Foreground) */}
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full flex items-center justify-start px-8 md:px-16 pointer-events-none"
                >
                  <span className="text-[#1A1A1A] text-sm md:text-base font-medium self-start mt-2 md:mt-4 mr-8 md:mr-16">
                    {item.id}
                  </span>
                  <h2 className="text-[#1A1A1A] uppercase leading-[0.85] tracking-normal font-black text-[clamp(4rem,9vw,160px)] whitespace-nowrap">
                    {item.title}
                  </h2>
                </motion.div>

                {/* Crimson Hover Band (Background) */}
                <motion.div
                  initial="initial"
                  animate={hoveredIndex === index ? "hover" : "initial"}
                  variants={{
                    initial: { scaleY: 0 },
                    hover: { scaleY: 1 }
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full bg-[#7F1D2C] flex items-center overflow-hidden z-0 origin-center pointer-events-none"
                >
                  <motion.div
                    className="flex whitespace-nowrap h-full items-center"
                    animate={hoveredIndex === index ? { x: ["0%", "-50%"] } : { x: "0%" }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                  >
                    <span 
                      className="text-[clamp(4rem,9vw,160px)] font-black uppercase tracking-normal whitespace-nowrap px-8"
                      style={{
                        WebkitTextStroke: "2px #FFFFFF",
                        color: "transparent",
                        opacity: 0.8
                      }}
                    >
                      {item.marquee}
                    </span>
                    <span 
                      className="text-[clamp(4rem,9vw,160px)] font-black uppercase tracking-normal whitespace-nowrap px-8"
                      style={{
                        WebkitTextStroke: "2px #FFFFFF",
                        color: "transparent",
                        opacity: 0.8
                      }}
                    >
                      {item.marquee}
                    </span>
                  </motion.div>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  )
}
