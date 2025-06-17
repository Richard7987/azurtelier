'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollTextBox() {
  const { scrollY } = useScroll()
  const viewPoints = [0, 150, 300, 450, 600]
  const scale = useTransform(scrollY, viewPoints, [1, 1.5, 1.5, 1, 1])
  const rotate = useTransform(scrollY, viewPoints, [0, 0, 180, 180, 0])

  return (
    <div className="flex-center min-h-screen bg-black p-6">
      <motion.img
        src="https://ascii.co.uk/images/animated/ascii-loop.gif"
        alt="ascii loop animation"
        className="h-auto w-64 rounded shadow-lg"
        style={{ scale, rotate }}
      />
    </div>
  )
}
