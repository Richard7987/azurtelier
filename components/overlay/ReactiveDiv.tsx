'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface ReactiveDivProps {
  isEnabled: boolean
  className?: string
  children?: React.ReactNode
}

// A container that can be dragged and zoomed. Supports both mouse and touch events.
// Avoid creating more than one instance on the same page to prevent event conflicts.
const ReactiveDiv: React.FC<ReactiveDivProps> = ({ isEnabled, className, children }) => {
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [initialDistance, setInitDist] = useState(0)

  const ref = useRef<HTMLDivElement | null>(null)

  // Calculate distance between two touches for pinch zoom
  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Scroll wheel zoom handler
  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (!isEnabled) return

      e.preventDefault()
      setZoom((prevZoom) => {
        const nextZoom = prevZoom - e.deltaY * 0.005
        return Math.min(10, Math.max(1, nextZoom))
      })
    },
    [isEnabled]
  )

  // Mouse events handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isEnabled) return
      setDragging(true)
      setStartPos({ x: e.clientX, y: e.clientY })
    },
    [isEnabled]
  )

  const handleMouseUp = useCallback(() => {
    if (!isEnabled) return
    setDragging(false)
  }, [isEnabled])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isEnabled) return
      if (dragging) {
        setPosition((prevPos) => ({
          x: prevPos.x + e.clientX - startPos.x,
          y: prevPos.y + e.clientY - startPos.y,
        }))
        setStartPos({ x: e.clientX, y: e.clientY })
      }
    },
    [dragging, isEnabled, startPos]
  )

  // Touch events handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!isEnabled) return

      e.preventDefault()
      setDragging(true)
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })

      if (e.touches.length > 1) {
        // pinch zoom start
        setInitDist(getDistance(e.touches[0], e.touches[1]))
      }
    },
    [isEnabled]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isEnabled) return

      e.preventDefault()
      if (dragging && e.touches.length === 1) {
        setPosition((prevPos) => ({
          x: prevPos.x + e.touches[0].clientX - startPos.x,
          y: prevPos.y + e.touches[0].clientY - startPos.y,
        }))
        setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
      if (e.touches.length > 1) {
        // pinch zoom move
        const distance = getDistance(e.touches[0], e.touches[1])
        const scale = distance / initialDistance

        setZoom((prevZoom) => {
          const nextZoom = prevZoom * scale
          return Math.min(10, Math.max(1, nextZoom))
        })

        setInitDist(distance)
      }
    },
    [dragging, initialDistance, isEnabled, startPos]
  )

  const handleTouchEnd = useCallback(() => {
    if (!isEnabled) return
    setDragging(false)
  }, [isEnabled])

  // Effect to add/remove wheel event listener
  useEffect(() => {
    if (!isEnabled) return

    window.addEventListener('wheel', handleScroll, { passive: false })
    setPosition({ x: 0, y: 0 })
    setZoom(1)

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll, isEnabled])

  // Effect to add/remove touch event listeners on the div
  useEffect(() => {
    const element = ref.current
    if (!element || !isEnabled) return

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, isEnabled])

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      role="none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
        touchAction: 'none', // prevent default gestures like double-tap zoom or scroll
        userSelect: 'none', // prevent text selection during drag
      }}
    >
      {children}
    </div>
  )
}

export default ReactiveDiv
