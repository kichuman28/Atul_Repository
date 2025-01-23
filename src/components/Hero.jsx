const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/20 via-[#D91656]/20 to-[#EB5B00]/20"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB200] rounded-full mix-blend-multiply filter blur-[128px] animate-float opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D91656] rounded-full mix-blend-multiply filter blur-[128px] animate-float-delayed opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EB5B00] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main title with animated gradient */}
          <div className="relative inline-block mb-8">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] animate-gradient-x">
                ATUL
              </h1>
              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
            {/* Glowing effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] opacity-30 blur-2xl -z-10 animate-pulse"></div>
          </div>

          {/* Subtitle with typing animation */}
          <div className="overflow-hidden mb-12">
            <p className="text-2xl md:text-3xl text-white/90 font-light animate-slide-up">
              Artist & Video Editor
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in">
            <a
              href="#portfolio"
              className="group relative px-8 py-4 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D91656] to-[#EB5B00] opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#EB5B00] to-[#FFB200] opacity-0 group-hover:opacity-90 transition-opacity"></div>
              <span className="relative text-white font-medium tracking-wider text-lg">View My Work</span>
            </a>
            
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#640D5F] to-[#D91656] opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D91656] to-[#EB5B00] opacity-0 group-hover:opacity-90 transition-opacity"></div>
              <span className="relative text-white font-medium tracking-wider text-lg">Get In Touch</span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 p-1">
              <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 