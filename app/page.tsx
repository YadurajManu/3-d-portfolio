'use client'

import { useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Interests from './components/Interests'
import Education from './components/Education'
import SocialMedia from './components/SocialMedia'
import Contact from './components/Contact'
import CursorEffect from './components/CursorEffect'
import ScrollEffect from './components/ScrollEffect'

const tabs = [
  { id: 'home', label: 'Home', component: Hero },
  { id: 'about', label: 'About', component: About },
  { id: 'projects', label: 'Projects', component: Projects },
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'interests', label: 'Interests', component: Interests },
  { id: 'education', label: 'Education', component: Education },
  { id: 'social', label: 'Social Media', component: SocialMedia },
  { id: 'contact', label: 'Contact', component: Contact },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <main className="min-h-screen bg-black text-white">
      <CursorEffect />
      <ScrollEffect />
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-md z-50">
        <ul className="flex justify-center space-x-4 p-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === tab.id ? 'bg-white text-black' : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="pt-20">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <tab.component />
          </div>
        ))}
      </div>
    </main>
  )
}

