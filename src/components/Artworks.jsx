import { useState } from 'react'

const Artworks = () => {
  const [showAll, setShowAll] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const artworks = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Artwork ${i + 1}`,
    src: `/photos/${i + 1}.jpg`,
    category: 'Digital Art',
  }))

  const displayedArtworks = showAll ? artworks : artworks.slice(0, 6)

  return (
    <section id="artworks" className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-[#D91656]/10 to-[#EB5B00]/10"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656]">
            Artworks
          </h2>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              onClick={() => setSelectedImage(artwork)}
              className={`group relative bg-[#0A0A0A] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square relative overflow-hidden">
                {/* Image */}
                <img
                  src={artwork.src}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-accent text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {artwork.category}
                    </p>
                    <h3 className="text-white font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                      {artwork.title}
                    </h3>
                  </div>
                </div>

                {/* View Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-[#D91656]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {artworks.length > 6 && (
          <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-3 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D91656] to-[#EB5B00] opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center space-x-2 text-white font-accent">
                <span>{showAll ? 'Show Less' : 'Show More'}</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-h-[90vh] max-w-[90vw] w-auto h-auto">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-auto h-auto max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
              />
              <button 
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Artworks 