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
  if (stage === 'done') return null

  const isOpen = stage === 'darkOpen' || stage === 'lightOpen'
  const panelColor = stage === 'darkStart' || stage === 'darkOpen' ? '#7A1A2A' : '#C7B7A3'
  const logoPulse = stage === 'lightCover'

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
        className="absolute inset-0 flex items-center justify-center"
        animate={logoPulse ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-white font-sans font-black uppercase tracking-[0.35em] text-[clamp(1rem,2vw,1.4rem)]">
          SB
        </div>
      </motion.div>
    </div>
  )
}
