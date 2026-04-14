import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false)

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
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[100] transition-opacity duration-300"
        style={{
          backgroundColor: '#78D8C8',
          mixBlendMode: 'difference',
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] transition-opacity duration-300"
        style={{
          border: '1.5px solid #78D8C8',
          mixBlendMode: 'difference',
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  )
}
