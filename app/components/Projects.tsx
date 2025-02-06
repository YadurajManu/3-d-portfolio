'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Skill Swap Web App',
    description: 'A MongoDB Atlas-based application connecting people to share skills.',
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 2,
    title: 'Public Transport Tracker',
    description: 'A modern design website to track public transport.',
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 3,
    title: 'Gesture-to-Braille Converter',
    description: 'Utilizes a camera for gesture recognition instead of a glove.',
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 4,
    title: 'Movie Recommendation System',
    description: 'Offers tailored recommendations based on user input, with a sleek cinematic design.',
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 5,
    title: 'Jarvis Project',
    description: 'Starting from basics, aiming to include advanced AI-powered voice interaction using Hugging Face APIs.',
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 6,
    title: 'Flying UFO Drone Project',
    description: 'Focused on hand movements for control, designed to be safe for kids.',
    image: '/placeholder.svg?height=300&width=400',
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10
      setRotation({ x: rotateX, y: rotateY })
    }
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="bg-white bg-opacity-5 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-opacity-10"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={project.image || "/placeholder.svg"} alt={project.title} width={400} height={300} className="w-full" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-300">{project.description}</p>
      </div>
    </div>
  )
}

export default function Projects() {
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

      gsap.from(sectionRef.current.querySelectorAll('.project-card'), {
        opacity: 0,
        y: 50,
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
    <section ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}

