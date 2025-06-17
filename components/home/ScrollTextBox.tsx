'use client'
import { useEffect, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export default function ScrollTextBox() {
  const { scrollY } = useScroll()
  const viewPoints = [0, 150, 300, 450, 600]
  const scale = useTransform(scrollY, viewPoints, [1, 1.5, 1.5, 1, 1])
  const borderRadius = useTransform(scrollY, viewPoints, ['0%', '0%', '50%', '50%', '0%'])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let A = 1,
      B = 1
    const R1 = 1,
      R2 = 2,
      K1 = 150,
      K2 = 5
    const width = canvas.width,
      height = canvas.height

    ctx.font = '12px monospace'

    function frame() {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)

      A += 0.07
      B += 0.03

      const cA = Math.cos(A),
        sA = Math.sin(A)
      const cB = Math.cos(B),
        sB = Math.sin(B)

      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j),
          st = Math.sin(j)
        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i),
            cp = Math.cos(i)
          const ox = R2 + R1 * ct,
            oy = R1 * st
          const x = ox * (cB * cp + sA * sB * sp) - oy * cA * sB
          const y = ox * (sB * cp - sA * cB * sp) + oy * cA * cB
          const ooz = 1 / (K2 + cA * ox * sp + sA * oy)
          const xp = width / 2 + K1 * ooz * x
          const yp = height / 2 - K1 * ooz * y
          const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp)
          if (L > 0) {
            ctx.fillStyle = `rgba(255,255,255,${L})`
            ctx.fillText('.', xp, yp)
          }
        }
      }

      requestAnimationFrame(frame)
    }

    frame()
  }, [])

  return (
    <div className="card bg-pink-blue-animated animation-delay-2 flex-center flex-grow flex-col space-y-5 overflow-hidden p-2">
      <h1 className="font-zzz2 text-white">Coming Soon</h1>

      <div
        className="rounded-md bg-black shadow-md"
        style={{
          transform: `scale(${scale.get()})`,
          borderRadius: borderRadius.get(),
        }}
      >
        <canvas ref={canvasRef} width={240} height={160} className="bg-black" />
      </div>
    </div>
  )
}
