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
      {/* SVG Filter to perfectly swap #E8D8C4 and #561C24 pixel by pixel */}
      <svg width="0" height="0" style={{ display: 'none' }}>
        <filter id="cursor-color-swap">
          <feColorMatrix
            type="matrix"
            values="-1  0  0  0  1.2471
                     0 -1  0  0  0.9569
                     0  0 -1  0  0.9098
                     0  0  0  1  0"
          />
        </filter>
      </svg>

      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[100] transition-opacity duration-300"
        style={{
          backdropFilter: 'url(#cursor-color-swap)',
          WebkitBackdropFilter: 'url(#cursor-color-swap)',
          backgroundColor: 'transparent',
          maskImage: 'radial-gradient(circle at center, black 2.5px, transparent 3px)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 2.5px, transparent 3px)',
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] transition-opacity duration-300"
        style={{
          backdropFilter: 'url(#cursor-color-swap)',
          WebkitBackdropFilter: 'url(#cursor-color-swap)',
          backgroundColor: 'transparent',
          // Mask clipping specifically to a 1px ring to remove the square corner artifacts
          maskImage: 'radial-gradient(circle at center, transparent 14px, black 14.8px, black 15.2px, transparent 16px)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 14px, black 14.8px, black 15.2px, transparent 16px)',
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
