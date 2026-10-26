import { useEffect, useState } from 'react'
import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid'

const TRACK_TITLE = 'chronicles_of_fabelism.mp3'
const TRACK_SRC = `/audio/${TRACK_TITLE}`

// One shared element at module scope so the music keeps playing across
// client-side route changes instead of restarting with each page.
let audio: HTMLAudioElement | null = null

function getAudio() {
  if (!audio) {
    audio = new Audio(TRACK_SRC)
    audio.loop = true
    audio.volume = 0.4
    audio.preload = 'auto'
  }
  return audio
}

export function MusicPlayer() {
  let [playing, setPlaying] = useState(false)
  let [volume, setVolume] = useState(0.4)

  useEffect(() => {
    let el = getAudio()
    setVolume(el.volume)
    setPlaying(!el.paused)

    let onPlay = () => setPlaying(true)
    let onPause = () => setPlaying(false)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)

    // Browsers block autoplay with sound, so fall back to starting on the
    // visitor's first interaction with the page.
    let startOnInteraction = () => {
      if (!el.dataset.userPaused) el.play().catch(() => {})
      removeInteractionListeners()
    }
    let removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }
    if (el.paused && !el.dataset.userPaused) {
      el.play().catch(() => {
        window.addEventListener('pointerdown', startOnInteraction)
        window.addEventListener('keydown', startOnInteraction)
      })
    }

    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      removeInteractionListeners()
    }
  }, [])

  function togglePlay(event: React.MouseEvent) {
    // Keep the first-interaction listener from immediately undoing this click.
    event.stopPropagation()
    let el = getAudio()
    if (el.paused) {
      delete el.dataset.userPaused
      el.play().catch(() => {})
    } else {
      el.dataset.userPaused = '1'
      el.pause()
    }
  }

  function changeVolume(value: number) {
    let el = getAudio()
    el.volume = value
    el.muted = false
    setVolume(value)
  }

  return (
    <div
      className="flex items-center gap-3"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        data-no-hand
        aria-label={playing ? 'Pause music' : 'Play music'}
        onClick={togglePlay}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(14,62,130,0.55)] ring-1 ring-white/30 backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <PauseIcon className="h-3.5 w-3.5" />
        ) : (
          <PlayIcon className="h-3.5 w-3.5 translate-x-px" />
        )}
      </button>
      <span className="group relative hidden normal-case tracking-normal sm:inline">
        {TRACK_TITLE}
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[rgba(14,62,130,0.85)] px-2 py-1 opacity-0 ring-1 ring-white/30 backdrop-blur-xl transition duration-150 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Music I made
        </span>
      </span>
      <button
        type="button"
        data-no-hand
        aria-label={volume === 0 ? 'Unmute music' : 'Mute music'}
        onClick={() => changeVolume(volume === 0 ? 0.4 : 0)}
        className="hidden text-white/75 transition-colors hover:text-white md:inline"
      >
        {volume === 0 ? (
          <SpeakerXMarkIcon className="h-4 w-4" />
        ) : (
          <SpeakerWaveIcon className="h-4 w-4" />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        aria-label="Music volume"
        data-no-hand
        onChange={(e) => changeVolume(Number(e.target.value))}
        className="hidden h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30 md:block [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        style={{
          background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)`,
        }}
      />
    </div>
  )
}
