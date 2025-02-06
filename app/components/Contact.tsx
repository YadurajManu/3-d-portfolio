'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Github, Linkedin, Instagram, Youtube } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function FloatingPlane() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 2]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (sectionRef.current && titleRef.current && formRef.current && socialRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(formRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(socialRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setFormPosition({ x: x - 0.5, y: y - 0.5 })
    }
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <form
          ref={formRef}
          className="flex-1 space-y-4"
          onMouseMove={handleMouseMove}
          style={{
            transform: `perspective(1000px) rotateX(${formPosition.y * 5}deg) rotateY(${-formPosition.x * 5}deg)`,
            transition: 'transform 0.1s',
          }}
        >
          <div className="relative h-64">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingPlane />
            </Canvas>
          </div>
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 bg-white bg-opacity-5 rounded focus:bg-opacity-10 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 bg-white bg-opacity-5 rounded focus:bg-opacity-10 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full p-2 bg-white bg-opacity-5 rounded focus:bg-opacity-10 focus:outline-none"></textarea>
          </div>
          <button type="submit" className="bg-white text-black px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
            Send Message
          </button>
        </form>
        <div ref={socialRef} className="flex-1">
          <p className="mb-4 text-lg">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

