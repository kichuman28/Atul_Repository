import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className={`
        mx-auto
        max-w-7xl
        rounded-2xl
        transition-all
        duration-300
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]' 
          : 'bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]'
        }
      `}>
        <div className="px-4 sm:px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className={`font-display text-2xl font-bold tracking-widest transition-colors duration-300 ${
                isScrolled 
                  ? 'text-primary' 
                  : 'text-white text-shadow-glow'
              }`}>
                PORTFOLIO
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-4 py-2 rounded-lg group transition-all duration-300 font-accent tracking-wide ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-primary' 
                      : 'text-white hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-primary' 
                    : 'text-white hover:text-white/80'
                }`}
              >
                <div className="relative w-6 h-5">
                  <span className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300 ${
                    isScrolled ? 'bg-gray-600 group-hover:bg-primary' : 'bg-white'
                  } ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  
                  <span className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300 ${
                    isScrolled ? 'bg-gray-600 group-hover:bg-primary' : 'bg-white'
                  } translate-y-2 ${isOpen ? 'opacity-0' : ''}`}></span>
                  
                  <span className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300 ${
                    isScrolled ? 'bg-gray-600 group-hover:bg-primary' : 'bg-white'
                  } translate-y-4 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden rounded-b-2xl`}>
          <div className={`px-4 py-2 space-y-1 ${
            isScrolled ? 'bg-white/80' : 'bg-black/30 backdrop-blur-lg'
          }`}>
            {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-primary hover:bg-gray-100/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar 