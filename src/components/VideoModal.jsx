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
      videoRef.current?.play()
      setIsPlaying(true)
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && !isDragging && setShowControls(false)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-6xl p-4 mx-4 transform transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors group"
        >
          <span className="absolute right-full mr-2 text-sm text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
            ESC
          </span>
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl group">
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full aspect-video cursor-pointer"
            src={videoSrc}
            onClick={handlePlayPause}
          >
            Your browser does not support the video tag.
          </video>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
              </div>
            </div>
          )}
          
          {/* Custom Controls */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transform transition-all duration-300 ${
              showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            {/* Preview Timestamp */}
            {previewTime !== null && (
              <div 
                className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 rounded text-white text-sm transform -translate-x-1/2 pointer-events-none"
                style={{ left: `${(previewTime / duration) * 100}%` }}
              >
                {formatTime(previewTime)}
              </div>
            )}

            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="h-2 group relative cursor-pointer"
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={() => setPreviewTime(null)}
              onMouseDown={handleProgressDragStart}
              onMouseUp={handleProgressDragEnd}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full transform origin-left scale-y-50 group-hover:scale-y-100 transition-transform"></div>
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary via-accent to-highlight rounded-full transform origin-left scale-y-50 group-hover:scale-y-100 transition-transform"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-lg"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button 
                  onClick={handlePlayPause}
                  className="text-white hover:text-secondary transition-colors group relative"
                >
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                  </span>
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2 group relative">
                  <button 
                    onClick={() => setVolume(volume === 0 ? 1 : 0)}
                    className="text-white hover:text-secondary transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-0 group-hover:w-20 transition-all duration-300 accent-secondary"
                  />
                </div>

                {/* Time Display */}
                <div className="text-white text-sm font-accent">
                  <span className="opacity-100">{formatTime(currentTime)}</span>
                  <span className="opacity-60"> / </span>
                  <span className="opacity-60">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Title */}
              {title && (
                <h3 className="text-white font-accent text-lg truncate ml-4">{title}</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal 