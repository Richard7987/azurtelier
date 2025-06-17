'use client'

import { useEffect, useRef } from 'react'

export default function ScrollTextBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // ASCII characters por "brillo"
    const chars = '.,-~:;=!*#$@'

    // Donut params
    let A = 0,
      B = 0

    const renderFrame = () => {
      const b = new Array(width * height).fill(' ')
      const z = new Array(width * height).fill(0)

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const c = Math.sin(i)
          const d = Math.cos(j)
          const e = Math.sin(A)
          const f = Math.sin(j)
          const g = Math.cos(A)
          const h = d + 2
          const D = 1 / (c * h * e + f * g + 5)
          const l = Math.cos(i)
          const m = Math.cos(B)
          const n = Math.sin(B)
          const t = c * h * g - f * e
          const x = Math.floor(width / 2 + (width / 4) * D * (l * h * m - t * n))
          const y = Math.floor(height / 2 + (height / 2) * D * (l * h * n + t * m))
          const o = x + width * y
          const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n))
          if (height > y && y > 0 && x > 0 && width > x && D > z[o]) {
            z[o] = D
            b[o] = chars[Math.max(0, N)]
          }
        }
      }

      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = 'white'
      ctx.font = '10px monospace'
      const text = b.join('')
      const lines = text.match(new RegExp(`.{1,${width}}`, 'g')) || []
      lines.forEach((line, i) => {
        ctx.fillText(line, 2, 10 + i * 10)
      })

      A += 0.04
      B += 0.02

      requestAnimationFrame(renderFrame)
    }

    renderFrame()
  }, [])

  return (
    <div className="card bg-pink-blue-animated animation-delay-2 flex-center flex-grow flex-col space-y-5 overflow-hidden p-2">
      <h1 className="font-zzz2 text-white">Coming Soon</h1>

      <canvas
        ref={canvasRef}
        width={80}
        height={50}
        style={{
          background: 'black',
          width: '320px',
          height: '200px',
        }}
      />
    </div>
  )
}
