'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Film, Car, Cpu, Code } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const interests = [
  { icon: Film, title: 'Movies', description: 'Passionate about Hindi, English, and Spanish films' },
  { icon: Car, title: 'Cars', description: 'Aspiring car geek, learning about Porsche history and modifications' },
  { icon: Cpu, title: 'Electronics', description: 'Hands-on experience with Arduino and electronic components' },
  { icon: Code, title: 'Coding', description: 'Enthusiastic about creating innovative apps and AI systems' },
]

function RotatingCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.7
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

export default function Interests() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(sectionRef.current.querySelectorAll('.interest-item'), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">Interests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {interests.map((interest) => (
          <div key={interest.title} className="interest-item flex items-start space-x-4 bg-white bg-opacity-5 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-opacity-10">
            <div className="w-16 h-16">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <RotatingCube />
              </Canvas>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{interest.title}</h3>
              <p className="text-gray-300">{interest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

