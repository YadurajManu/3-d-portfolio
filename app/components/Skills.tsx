'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'Artificial Intelligence', level: 80 },
  { name: 'Machine Learning', level: 75 },
  { name: 'iOS Development', level: 70 },
  { name: 'Python', level: 85 },
  { name: 'JavaScript', level: 60 },
  { name: 'Blockchain', level: 40 },
  { name: 'Firebase', level: 65 },
  { name: 'MongoDB Atlas', level: 70 },
  { name: 'Arduino', level: 60 },
]

function SkillBar({ skill, index }: { skill: typeof skills[0], index: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1 + skill.level / 100
    }
  })

  return (
    <mesh ref={meshRef} position={[index * 0.5 - 2, 0, 0]}>
      <boxGeometry args={[0.3, 1, 0.1]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

export default function Skills() {
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

      gsap.from(sectionRef.current.querySelectorAll('.skill-item'), {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="skill-item bg-white bg-opacity-5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
            <div className="w-full h-40 relative">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SkillBar skill={skill} index={index} />
              </Canvas>
              <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-20 h-1">
                <div
                  className="h-full bg-white"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

