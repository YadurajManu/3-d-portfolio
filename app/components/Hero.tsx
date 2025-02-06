'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import gsap from 'gsap'

function AnimatedBackground() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[9, 3, 768, 3, 4, 3]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

export default function Hero() {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const subHeaderRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (headerRef.current && subHeaderRef.current) {
      gsap.from(headerRef.current, { 
        opacity: 0, 
        y: 50, 
        duration: 1, 
        delay: 0.5,
        ease: "power3.out"
      })
      gsap.from(subHeaderRef.current, { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        delay: 1,
        ease: "power3.out"
      })
    }
  }, [])

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-center z-10">
        <h1 ref={headerRef} className="text-6xl font-bold mb-4 tracking-tight">Yaduraj Singh</h1>
        <p ref={subHeaderRef} className="text-xl mb-8 tracking-wide">AI/ML Enthusiast | iOS Developer | Tech Innovator</p>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedBackground />
        </Canvas>
      </div>
    </section>
  )
}

