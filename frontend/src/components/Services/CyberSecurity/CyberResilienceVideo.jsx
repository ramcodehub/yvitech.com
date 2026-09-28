import React, { useState, useRef, useEffect } from "react"
import cyberResilienceVid from "../../../assets/Videos/CyberResilience.mp4"
import "./CyberResilienceVideo.css"

const CyberResilienceVideo = () => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.8)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isPipAvailable, setIsPipAvailable] = useState(false)
  const [isPipActive, setIsPipActive] = useState(false)

  // Check Picture-in-Picture support
  useEffect(() => {
    if (document.pictureInPictureEnabled) {
      setIsPipAvailable(true)
    }
  }, [])

  // Auto-play on mount (muted)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleVolumeChange = () => {
      setIsMuted(video.muted)
      setVolume(video.volume)
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("volumechange", handleVolumeChange)

    // Attempt autoplay
    video.play().catch(() => {
      setIsPlaying(false)
    })

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("volumechange", handleVolumeChange)
    }
  }, [])

  // Handle Fullscreen state change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Auto-hide controls when playing and idle
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2600)
    }
  }

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false)
    }
  }

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  // Mute / Unmute toggle
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted && video.volume === 0) {
      video.volume = 0.7
      setVolume(0.7)
    }
  }

  // Volume slider change
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return
    video.volume = newVol
    setVolume(newVol)
    if (newVol > 0 && video.muted) {
      video.muted = false
      setIsMuted(false)
    } else if (newVol === 0) {
      video.muted = true
      setIsMuted(true)
    }
  }

  // Seek bar
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return
    video.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Skip forward / backward
  const skipSeconds = (seconds) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration || 0)
  }

  // Restart video
  const restartVideo = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play()
  }

  // Playback speed cycle: 1x -> 1.25x -> 1.5x -> 2x -> 0.75x -> 1x
  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2, 0.75]
    const currentIndex = rates.indexOf(playbackRate)
    const nextRate = rates[(currentIndex + 1) % rates.length]
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate
      setPlaybackRate(nextRate)
    }
  }

  // Toggle Picture-in-Picture
  const togglePip = async () => {
    try {
      const video = videoRef.current
      if (!video) return
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        setIsPipActive(false)
      } else {
        await video.requestPictureInPicture()
        setIsPipActive(true)
      }
    } catch (err) {
      console.warn("PiP error:", err)
    }
  }

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00"
    const mins = Math.floor(timeInSeconds / 60)
    const secs = Math.floor(timeInSeconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section className="container cyber-video-section" aria-label="Cyber Resilience Showcase">
      <div className="cyber-video-container">
        {/* Section Header */}
        <div className="cyber-video-header">
          <span className="cyber-video-eyebrow">Cyber Resilience Showcase</span>
          <h2 id="cyber-video-title">
            Continuous Cyber Resilience &amp; <span>Enterprise Defense</span>
          </h2>
          <p>
            Experience our proactive defense matrix: real-time anomaly detection, zero-trust containment, and automated recovery engineered for zero downtime.
          </p>
        </div>

        {/* Video Player Box */}
        <div
          ref={containerRef}
          className={`cyber-player-card ${isFullscreen ? "is-fullscreen" : ""} ${
            !isPlaying ? "is-paused" : ""
          }`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Top Quick Info Bar */}
          <div className={`cyber-player-topbar ${showControls ? "visible" : ""}`}>
            <div className="cyber-player-tag">
              <span className="live-dot" />
              <span>OVERVIEW • CYBER RESILIENCE</span>
            </div>
            {isMuted && (
              <button
                type="button"
                className="cyber-unmute-chip"
                onClick={toggleMute}
                title="Click to unmute video"
              >
                <i className="bi bi-volume-mute-fill" aria-hidden="true" />
                <span>Audio Muted • Click to Unmute</span>
              </button>
            )}
          </div>

          {/* Actual Video Element */}
          <video
            ref={videoRef}
            src={cyberResilienceVid}
            className="cyber-video-media"
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
          />

          {/* Center Play/Pause Large Trigger Button */}
          <button
            type="button"
            className={`cyber-center-play ${!isPlaying || showControls ? "visible" : ""}`}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
          >
            <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`} aria-hidden="true" />
          </button>

          {/* Controls Bar Overlay */}
          <div
            className={`cyber-controls-panel ${showControls || !isPlaying ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Interactive Progress Bar */}
            <div className="cyber-progress-wrapper">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="cyber-progress-range"
                style={{
                  background: `linear-gradient(to right, var(--color-links, #0d6efd) ${progressPercent}%, rgba(255, 255, 255, 0.2) ${progressPercent}%)`,
                }}
                aria-label="Seek video position"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="cyber-controls-row">
              {/* Left Actions: Play/Pause, Rewind, Forward, Time */}
              <div className="cyber-controls-group">
                <button
                  type="button"
                  className="cyber-ctrl-btn"
                  onClick={togglePlay}
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`} />
                </button>

                <button
                  type="button"
                  className="cyber-ctrl-btn"
                  onClick={() => skipSeconds(-10)}
                  title="Rewind 10 seconds"
                  aria-label="Rewind 10 seconds"
                >
                  <i className="bi bi-arrow-counterclockwise" />
                </button>

                <button
                  type="button"
                  className="cyber-ctrl-btn"
                  onClick={() => skipSeconds(10)}
                  title="Forward 10 seconds"
                  aria-label="Forward 10 seconds"
                >
                  <i className="bi bi-arrow-clockwise" />
                </button>

                {/* Volume & Mute */}
                <div className="cyber-volume-control">
                  <button
                    type="button"
                    className="cyber-ctrl-btn"
                    onClick={toggleMute}
                    title={isMuted ? "Unmute" : "Mute"}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    <i
                      className={`bi ${
                        isMuted || volume === 0
                          ? "bi-volume-mute-fill text-warning"
                          : volume < 0.5
                          ? "bi-volume-down-fill"
                          : "bi-volume-up-fill"
                      }`}
                    />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="cyber-volume-slider"
                    aria-label="Adjust volume"
                  />
                </div>

                {/* Time Display */}
                <span className="cyber-time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Actions: Speed, Restart, PiP, Fullscreen */}
              <div className="cyber-controls-group cyber-controls-group--right">
                <button
                  type="button"
                  className="cyber-ctrl-btn cyber-speed-btn"
                  onClick={cyclePlaybackRate}
                  title="Change playback speed"
                  aria-label={`Playback speed: ${playbackRate}x`}
                >
                  <span>{playbackRate}x</span>
                </button>

                <button
                  type="button"
                  className="cyber-ctrl-btn"
                  onClick={restartVideo}
                  title="Restart video"
                  aria-label="Restart video"
                >
                  <i className="bi bi-arrow-repeat" />
                </button>

                {isPipAvailable && (
                  <button
                    type="button"
                    className="cyber-ctrl-btn"
                    onClick={togglePip}
                    title="Picture-in-Picture"
                    aria-label="Picture in Picture"
                  >
                    <i className={`bi ${isPipActive ? "bi-pip-fill" : "bi-pip"}`} />
                  </button>
                )}

                <button
                  type="button"
                  className="cyber-ctrl-btn"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  <i
                    className={`bi ${
                      isFullscreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CyberResilienceVideo
