'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Instagram, Youtube } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const socialMedia = [
  {
    name: 'GBUverse Instagram',
    icon: Instagram,
    description: 'Connecting Gautam Buddha University students, faculty, and staff',
    link: '#',
  },
  {
    name: 'GBU Meme Page',
    icon: Instagram,
    description: 'Creating memes and inside jokes for the GBU community',
    link: '#',
  },
  {
    name: 'Movie Critic Instagram',
    icon: Instagram,
    description: 'Posting movie reviews, edits, and reactions to famous scenes',
    link: '#',
  },
  {
    name: 'YouTube Channel',
    icon: Youtube,
    description: 'Collaborating with peers to create Bollywood movie reviews and vlogs',
    link: '#',
  },
]

function FloatingIcon({ index }: { index: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

export default function SocialMedia() {
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

      gsap.from(sectionRef.current.querySelectorAll('.social-item'), {
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
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">Social Media Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {socialMedia.map((social, index) => (
          <div
            key={social.name}
            className="social-item bg-white bg-opacity-5 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-opacity-10"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <FloatingIcon index={index} />
                </Canvas>
              </div>
              <h3 className="text-xl font-semibold">{social.name}</h3>
            </div>
            <p className="text-gray-300 mb-4">{social.description}</p>
            <a
              href={social.link}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Visit Page
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

