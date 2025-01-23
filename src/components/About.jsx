const About = () => {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-[#D91656]/10 to-[#EB5B00]/10"></div>
      
      {/* Animated shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB200]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D91656]/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image container with animated border */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D91656] via-[#EB5B00] to-[#FFB200] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img 
                src="/my_photo.jpg" 
                alt="Atul - Artist"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="relative">
            {/* Section title with gradient and animation */}
            <div className="inline-block">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] mb-6">
                About Me
              </h2>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D91656] to-[#FFB200] transition-all duration-500"></div>
            </div>

            {/* Bio with gradient text */}
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              Welcome to my portfolio! I am an aspiring animator with a passion for bringing stories to life through motion and creativity. Animation, for me, is more than just a visual medium—it's a way to connect, inspire, and evoke emotion. Here, you'll find a collection of my projects showcasing my creativity, and technical skills.
            </p>

            {/* Skills cards with hover effects */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group relative p-6 rounded-xl overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F] to-[#D91656] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500"></div>
                
                <div className="relative">
                  <h3 className="font-bold text-xl text-white mb-3 group-hover:text-[#FFB200] transition-colors duration-300">
                    Video Editing
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    Professional video editing with attention to detail
                  </p>
                </div>
              </div>

              <div className="group relative p-6 rounded-xl overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D91656] to-[#EB5B00] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500"></div>
                
                <div className="relative">
                  <h3 className="font-bold text-xl text-white mb-3 group-hover:text-[#FFB200] transition-colors duration-300">
                    Animation
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    Creative animation and motion graphics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 