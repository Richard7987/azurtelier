'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollTextBox() {
  const { scrollY } = useScroll()
  const viewPoints = [0, 150, 300, 450, 600]
  const scale = useTransform(scrollY, viewPoints, [1, 1.5, 1.5, 1, 1])
  const rotate = useTransform(scrollY, viewPoints, [0, 0, 180, 180, 0])
  const borderRadius = useTransform(scrollY, viewPoints, ['0%', '0%', '50%', '50%', '0%'])

  return (
    <div
      className={`card bg-pink-blue-animated animation-delay-2 flex-center flex-grow flex-col space-y-5 overflow-hidden p-6`}
    >
      <h1 className="font-zzz2 text-3xl text-white">Nezzontli</h1>
      <p className="max-w-xs text-center text-gray-300">
        Un espacio donde el código, la ciencia y la creatividad convergen.
      </p>
      <motion.div
        className="bg-gray-purple flex h-12 w-12 items-center justify-center"
        style={{ scale, rotate, borderRadius }}
      >
        <motion.span
          style={{ scale: useTransform(scrollY, viewPoints, [1, 1.2, 1.2, 1, 1]) }}
          className="text-xs font-bold text-white"
        >
          scroll
        </motion.span>
      </motion.div>
    </div>
  )
}
