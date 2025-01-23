import { useEffect, useRef, useState } from 'react'
import { formatTime } from '../utils/formatTime'

const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }
    const handleWaiting = () => setIsLoading(true)
    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
    }
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      video.currentTime = 0
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoRef.current])

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration
    if (newTime >= 0 && newTime <= duration) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleTouchProgress = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const pos = (touch.clientX - rect.left) / rect.width
    const newTime = pos * duration
    if (newTime >= 0 && newTime <= duration) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    videoRef.current.volume = value
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[95vw] md:max-w-[80vw] lg:max-w-[1000px] aspect-[9/16] md:aspect-video">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm text-white/90 hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-lg"
          >
            <span className="hidden md:block text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Overlay for desktop click-outside-to-close */}
          <div 
            className="fixed inset-0 bg-transparent cursor-pointer hidden md:block" 
            onClick={onClose}
          ></div>

          <div className="relative w-full h-full bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden">
            {/* Video container */}
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-contain"
                onClick={handlePlayPause}
                playsInline
              />

              {/* Loading spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#D91656] border-t-transparent animate-spin"></div>
                  </div>
                </div>
              )}

              {/* Play/Pause overlay */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors cursor-pointer ${
                  !isPlaying ? 'bg-black/30' : ''
                }`}
                onClick={handlePlayPause}
              >
                {!isPlaying && (
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 py-2 md:px-4 md:py-3">
                {/* Progress bar */}
                <div 
                  ref={progressRef}
                  className="relative h-1 mb-2 md:mb-3 cursor-pointer touch-none"
                  onClick={handleProgressClick}
                  onTouchMove={handleTouchProgress}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D91656] via-[#EB5B00] to-[#FFB200] rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-4">
                    {/* Play/Pause button */}
                    <button 
                      onClick={handlePlayPause}
                      className="text-white hover:text-[#FFB200] transition-colors"
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>

                    {/* Time */}
                    <div className="text-white text-xs md:text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Volume (desktop only) */}
                    <div className="hidden md:flex items-center gap-2 group">
                      <button 
                        onClick={() => {
                          const newVolume = volume === 0 ? 1 : 0;
                          setVolume(newVolume);
                          videoRef.current.volume = newVolume;
                        }}
                        className="text-white hover:text-[#FFB200] transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d={volume === 0 
                            ? "M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" 
                            : "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                          }/>
                        </svg>
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-0 group-hover:w-20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  {title && (
                    <div className="text-white/90 text-xs md:text-sm font-medium truncate max-w-[120px] md:max-w-[200px]">
                      {title}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal 