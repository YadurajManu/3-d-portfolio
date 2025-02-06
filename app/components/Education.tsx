'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    institution: 'IIM L',
    course: 'Artificial Intelligence and Machine Learning',
    period: 'Current',
  },
  {
    institution: 'The Asian School',
    course: 'Class 12th',
    period: 'Completed',
  },
  {
    institution: 'The Doon School',
    course: 'Schooling',
    period: 'Completed',
  },
]

function TimelineSphere({ index }: { index: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, index * -1, 0]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

export default function Education() {
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

      gsap.from(sectionRef.current.querySelectorAll('.education-item'), {
        opacity: 0,
        x: index => index % 2 === 0 ? -50 : 50,
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
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">Education</h2>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white bg-opacity-20"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {education.map((_, index) => (
              <TimelineSphere key={index} index={index} />
            ))}
          </Canvas>
        </div>
        <div className="space-y-16">
          {education.map((edu, index) => (
            <div
              key={edu.institution}
              className={`education-item flex items-center ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                <div className="bg-white bg-opacity-5 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-opacity-10">
                  <h3 className="text-xl font-semibold mb-2">{edu.institution}</h3>
                  <p className="text-gray-300 mb-1">{edu.course}</p>
                  <p className="text-gray-400 text-sm">{edu.period}</p>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

