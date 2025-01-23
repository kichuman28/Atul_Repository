const Footer = () => {
  return (
    <footer className="relative py-6 overflow-hidden bg-[#0A0A0A]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#640D5F]/10"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2">
          {/* Brand name */}
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] hover:scale-105 transition-all duration-300">
            ATUL
          </div>
          
          {/* Copyright */}
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D91656]/50 to-transparent"></div>
    </footer>
  )
}

export default Footer 