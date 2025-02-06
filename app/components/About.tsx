'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current && titleRef.current && contentRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">About Me</h2>
      <div ref={contentRef} className="space-y-6">
        <p className="text-lg leading-relaxed">
          Hello! I'm Yaduraj Singh, an aspiring tech innovator currently based in Himachal Pradesh. I'm pursuing an IIM L course and specializing in Artificial Intelligence and Machine Learning (AIML).
        </p>
        <p className="text-lg leading-relaxed">
          My educational journey includes completing my schooling at The Doon School and class 12th from The Asian School. Now, I'm diving deep into the world of AI, iOS development, and exploring exciting technologies like blockchain.
        </p>
        <p className="text-lg leading-relaxed">
          I'm passionate about creating interactive, user-focused applications and tools. My goal is to build a JARVIS-like AI system and develop innovative apps that make a difference in people's lives.
        </p>
      </div>
    </section>
  )
}

