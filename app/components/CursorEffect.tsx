'use client'

import { useEffect, useState } from 'react'

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateCursorPosition)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  return (
    <>
      <div
        className="fixed w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="fixed w-12 h-12 rounded-full border border-white mix-blend-difference pointer-events-none z-50 transition-transform duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) scale(1.5)',
        }}
      />
    </>
  )
}

