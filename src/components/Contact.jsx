const Contact = () => {
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#640D5F]/20 to-[#640D5F]/40"></div>
      
      {/* Animated shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FFB200] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#EB5B00] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656]">
            Get In Touch
          </h2>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] rounded-full"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 bg-[#0A0A0A]/80 backdrop-blur-xl rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-[#D91656]/10 to-[#EB5B00]/10 rounded-2xl"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918089189671"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-6 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB5B00] to-[#FFB200] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 text-[#25D366] group-hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-300">WhatsApp</span>
                    <span className="text-white/60 text-sm group-hover:text-white/90 transition-colors duration-300">+91 8089189671</span>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:atgonath@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-6 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F] to-[#D91656] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 text-[#EA4335] group-hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-300">Email</span>
                    <span className="text-white/60 text-sm group-hover:text-white/90 transition-colors duration-300">atgonath@gmail.com</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D91656]/50 to-transparent"></div>
    </section>
  )
}

export default Contact 