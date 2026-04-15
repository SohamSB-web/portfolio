import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LoaderCurtainProps {
  stage: 'darkStart' | 'darkOpen' | 'lightCover' | 'lightOpen' | 'done'
}

const panelVariants = {
  open: (index: number) => ({
    y: '-100%',
    transition: {
      duration: 0.95,
      ease: [0.42, 0, 0.58, 1] as const,
      delay: index * 0.1,
    },
  }),
  closed: (index: number) => ({
    y: '0%',
    transition: {
      duration: 0.95,
      ease: [0.42, 0, 0.58, 1] as const,
      delay: index * 0.1,
    },
  }),
}

export const LoaderCurtain = ({ stage }: LoaderCurtainProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 1800
    const interval = 20
    let elapsed = 0
    const timer = setInterval(() => {
       elapsed += interval
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)
      if (p === 100) clearInterval(timer)
    }, interval)
    
    return () => clearInterval(timer)
  }, [])

  if (stage === 'done') return null

  const isOpen = stage === 'darkOpen' || stage === 'lightOpen'
  const panelColor = '#7A1A2A'

  return (
    <div className="pointer-events-none fixed inset-0 z-[50] overflow-hidden">
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            custom={index}
            variants={panelVariants}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className="absolute top-0 bottom-0"
            style={{
              left: `${index * 25}vw`,
              width: '25vw',
              backgroundColor: panelColor,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0"
        animate={isOpen ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 0.95, ease: [0.42, 0, 0.58, 1], delay: 0.1 }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pb-[8vh]">
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[#F2F2F2] leading-[0.85] tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 11vw, 12rem)' }}
          >
            PORTFOLIO
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 w-[60vw] max-w-[600px] flex flex-col gap-[1.5vh]"
        >
          <div 
            className="text-[#F2F2F2] text-center leading-none"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
          >
            {Math.round(progress)}%
          </div>
          <div className="h-[2px] w-full bg-[#F2F2F2]/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-[#F2F2F2]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
