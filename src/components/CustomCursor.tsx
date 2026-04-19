import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CustomCursorProps {
  isHoveringDark?: boolean;
  forceNormal?: boolean;
  showRedOnNormal?: boolean;
}

export const CustomCursor = ({ isHoveringDark = false, forceNormal = false, showRedOnNormal = false }: CustomCursorProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const useNormalBlend = isHoveringDark || forceNormal
  const showRed = isVisible && !isHoveringDark && (!forceNormal || showRedOnNormal)

  // Use independent motion values for exact tracking (dot)
  // and spring tracking (ring)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)

  // Apply spring physics to the ring's motion values
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const ringXSpring = useSpring(ringX, springConfig)
  const ringYSpring = useSpring(ringY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      dotX.set(e.clientX)
      dotY.set(e.clientY)

      ringX.set(e.clientX)
      ringY.set(e.clientY)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [dotX, dotY, ringX, ringY, isVisible])

  return (
    <>
      {/* 
        Layer 1: White 
        Acts as "difference" for intersecting light/dark elements,
        but switches to 'normal' solid white when hovering over problematic red buttons to avoid cyan tints.
      */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9998]"
        style={{
          backgroundColor: '#FFFFFF',
          mixBlendMode: useNormalBlend ? 'normal' : 'difference',
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1.5px solid #FFFFFF',
          mixBlendMode: useNormalBlend ? 'normal' : 'difference',
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />

      {/* 
        Layer 2: Lighten (Red Override)
        Over the near-black (from difference over light bg), the #7A1A2A wins, turning it beautifully red!
        Disabled when hovering the red button.
      */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: '#7A1A2A',
          mixBlendMode: forceNormal && showRedOnNormal ? 'normal' : 'lighten',
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: showRed ? 1 : 0
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          border: '1.5px solid #7A1A2A',
          mixBlendMode: forceNormal && showRedOnNormal ? 'normal' : 'lighten',
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: showRed ? 1 : 0
        }}
      />
    </>
  )
}
