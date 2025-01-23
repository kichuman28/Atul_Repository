import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Artworks from './components/Artworks'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Dynamic background gradient that follows mouse */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(235,91,0,0.15) 0%, rgba(217,22,86,0.15) 25%, rgba(100,13,95,0.15) 50%, transparent 70%)`
        }}
      />

      {/* Animated background patterns */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,178,0,0.05) 0%, transparent 50%)`
             }}
        ></div>
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#640D5F] rounded-full mix-blend-screen filter blur-3xl opacity-[0.15] animate-float"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#D91656] rounded-full mix-blend-screen filter blur-3xl opacity-[0.15] animate-float-delayed"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-[#EB5B00] rounded-full mix-blend-screen filter blur-3xl opacity-[0.15] animate-float-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-48 h-48 bg-[#FFB200] rounded-full mix-blend-screen filter blur-3xl opacity-[0.15] animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="relative">
          <Hero />
          <About />
          <Portfolio />
          <Artworks />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#0A0A0A] shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-110 group ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#D91656] via-[#EB5B00] to-[#FFB200] rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></div>
        <svg 
          className="relative w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  )
}

export default App


