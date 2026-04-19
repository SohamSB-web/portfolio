import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SBLogo from './SB.png'
import FlowingMenu from './FlowingMenu'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  setIsHoveringDark: (val: boolean) => void
}

const menuItems = [
  { link: '#about', text: 'ABOUT', hoverText: 'MY JOURNEY' },
  { link: '#projects', text: 'PROJECTS', hoverText: 'RECENT WORK' },
  { link: '#contact', text: 'CONTACT', hoverText: "LET'S TALK" }
]

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, setIsHoveringDark }) => {
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
        variants={ {
          closed: {
            clipPath: "circle(0px at calc(100% - 60px) 60px)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          },
          open: {
            clipPath: "circle(150vw at calc(100% - 60px) 60px)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          },
        } }
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
          className="w-full h-full pt-32 pb-16 flex flex-col justify-center items-center"
          initial={listWrapperMotion.initial}
          animate={listWrapperMotion.animate}
        >
          <div className="w-full h-[100%] max-h-[85vh] pointer-events-auto">
            <FlowingMenu 
              items={menuItems} 
              onItemClick={onClose}
              setIsHoveringDark={setIsHoveringDark}
              bgColor="transparent" 
              textColor="#1A1A1A" 
              marqueeBgColor="#7A1A2A" 
              borderColor="#E5E5E5" 
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
