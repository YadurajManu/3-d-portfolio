'use client'

import { useEffect, useState } from 'react'

export default function ScrollEffect() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.pageYOffset
      const progress = (currentScroll / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-white z-50 transition-all duration-300 ease-out"
      style={{ width: `${scrollProgress}%` }}
    />
  )
}

