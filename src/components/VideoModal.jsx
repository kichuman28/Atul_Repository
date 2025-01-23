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
  const [isDragging, setIsDragging] = useState(false)
  const [previewTime, setPreviewTime] = useState(null)
  let controlsTimeout = null

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

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleWaiting = () => setIsLoading(true)
    const handlePlaying = () => setIsLoading(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      video.currentTime = 0
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoRef.current, isDragging])

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressHover = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    setPreviewTime(pos * duration)
  }

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = pos * duration
    setCurrentTime(pos * duration)
  }

  const handleProgressDragStart = () => {
    setIsDragging(true)
    videoRef.current.pause()
  }

  const handleProgressDragEnd = (e) => {
    setIsDragging(false)
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = pos * duration
    if (isPlaying) videoRef.current.play()
  }

  const handleVolumeChange = (e) => {
    const value = e.target.value
    setVolume(value)
    videoRef.current.volume = value
  }

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimeout)
    controlsTimeout = setTimeout(() => {
      if (isPlaying && !isDragging) setShowControls(false)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    switch (e.key) {
      case ' ':
        e.preventDefault()
        handlePlayPause()
        break
      case 'ArrowRight':
        videoRef.current.currentTime += 10
        break
      case 'ArrowLeft':
        videoRef.current.currentTime -= 10
        break
      case 'ArrowUp':
        setVolume(Math.min(1, volume + 0.1))
        break
      case 'ArrowDown':
        setVolume(Math.max(0, volume - 0.1))
        break
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && !isDragging && setShowControls(false)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >      
      <div className="relative w-full h-full md:h-auto md:w-auto max-w-[95vw] md:max-w-6xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 md:right-0 text-white/80 hover:text-white transition-colors z-50 p-2"
          aria-label="Close video"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-full md:h-auto rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl">
          {/* Video Player */}
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videoSrc}
              onClick={handlePlayPause}
            >
              Your browser does not support the video tag.
            </video>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-[#D91656] animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Custom Controls */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-3 md:py-4 transform transition-all duration-300 ${
              showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="h-1.5 group relative cursor-pointer mb-4"
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={() => setPreviewTime(null)}
              onMouseDown={handleProgressDragStart}
              onMouseUp={handleProgressDragEnd}
              onTouchStart={handleProgressDragStart}
              onTouchEnd={handleProgressDragEnd}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full"></div>
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D91656] via-[#EB5B00] to-[#FFB200] rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button 
                  onClick={handlePlayPause}
                  className="text-white hover:text-[#FFB200] transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white/90 text-sm font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1 text-white/60">/</span>
                  <span className="text-white/60">{formatTime(duration)}</span>
                </div>

                {/* Volume Control - Hide on mobile */}
                <div className="hidden md:flex items-center gap-2 group">
                  <button 
                    onClick={() => setVolume(volume === 0 ? 1 : 0)}
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
                <h3 className="text-white/90 font-medium text-sm md:text-base truncate md:ml-auto">
                  {title}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal 