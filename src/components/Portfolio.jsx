import { useState, useEffect } from 'react'
import VideoModal from './VideoModal'

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loadedVideos, setLoadedVideos] = useState({})
  const [showAll, setShowAll] = useState(false)

  const videos = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Video Project ${i + 1}`,
    src: `/videos/vid${i + 1}.mp4`,
    duration: '00:00', // You can add actual durations
    category: 'Video Editing', // You can add actual categories
  }))

  const displayedVideos = showAll ? videos : videos.slice(0, 6)

  const handleVideoLoaded = (id) => {
    setLoadedVideos(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-conic from-primary/5 via-secondary/5 to-accent/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656]">
            My Work
          </h2>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#D91656] rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedVideos.map((video, index) => (
            <div 
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`group relative bg-[#0A0A0A] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Video Thumbnail */}
              <div className="aspect-video bg-gray-900 relative overflow-hidden">
                {!loadedVideos[video.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  </div>
                )}
                
                <video
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    loadedVideos[video.id] 
                      ? 'opacity-90 group-hover:opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                  src={video.src}
                  muted
                  onLoadedData={() => handleVideoLoaded(video.id)}
                  onMouseOver={e => e.target.play()}
                  onMouseOut={e => {
                    e.target.pause()
                    e.target.currentTime = 0
                  }}
                >
                  Your browser does not support the video tag.
                </video>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-accent text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{video.category}</p>
                    <h3 className="text-white font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">{video.title}</h3>
                    <span className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{video.duration}</span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-[#D91656]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {videos.length > 6 && (
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

        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoSrc={selectedVideo?.src}
          title={selectedVideo?.title}
        />
      </div>
    </section>
  )
}

export default Portfolio 