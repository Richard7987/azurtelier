'use client'

import { useEffect, useRef } from 'react'

export default function ScrollTextBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Ajusta el tamaño real del canvas
    const width = 80
    const height = 40
    canvas.width = width * 6
    canvas.height = height * 10

    ctx.font = '10px monospace'
    ctx.textBaseline = 'top'
    ctx.fillStyle = '#fff'

    const chars = '.,-~:;=!*#$@'
    let A = 0
    let B = 0

    const render = () => {
      const z = Array(width * height).fill(0)
      const b = Array(width * height).fill(' ')

      for (let j = 0; j < Math.PI * 2; j += 0.07) {
        for (let i = 0; i < Math.PI * 2; i += 0.02) {
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

          if (y >= 0 && y < height && x >= 0 && x < width && D > z[o]) {
            z[o] = D
            b[o] = chars[Math.max(0, N)]
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lines = b.join('').match(new RegExp(`.{1,${width}}`, 'g')) || []
      lines.forEach((line, i) => {
        ctx.fillText(line, 0, i * 10)
      })

      A += 0.04
      B += 0.02
      requestAnimationFrame(render)
    }

    render()
  }, [])

  return (
    <div className="flex w-full items-center justify-center p-2">
      <canvas ref={canvasRef} className="h-auto w-full" style={{ background: 'transparent' }} />
    </div>
  )
}
