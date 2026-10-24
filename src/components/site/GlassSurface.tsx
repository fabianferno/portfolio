import {
  CSSProperties,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'

// Port of reactbits.dev/components/glass-surface. Chromium gets the SVG
// displacement-map refraction; Safari/Firefox fall back to a plain frosted blur.

interface GlassSurfaceProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  borderRadius?: number
  borderWidth?: number
  brightness?: number
  opacity?: number
  blur?: number
  displace?: number
  backgroundOpacity?: number
  tint?: string
  saturation?: number
  distortionScale?: number
  redOffset?: number
  greenOffset?: number
  blueOffset?: number
  mixBlendMode?: CSSProperties['mixBlendMode']
}

function supportsSvgBackdrop(filterId: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }
  let ua = navigator.userAgent
  if (/Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua)) return false
  if (/Firefox/.test(ua)) return false
  let probe = document.createElement('div')
  probe.style.backdropFilter = `url(#${filterId})`
  return probe.style.backdropFilter !== ''
}

export function GlassSurface({
  children,
  className,
  style,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0.5,
  backgroundOpacity = 0,
  tint = 'rgba(22, 34, 26, 0.4)',
  saturation = 1,
  distortionScale = -40,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  mixBlendMode = 'difference',
}: GlassSurfaceProps) {
  let baseId = `glass-filter-${useId().replace(/:/g, '')}`
  let containerRef = useRef<HTMLDivElement>(null)
  let [svgSupported, setSvgSupported] = useState(false)
  let [size, setSize] = useState<{ w: number; h: number } | null>(null)

  // A fresh filter id per size forces Chromium to re-run the backdrop filter
  // instead of reusing a stale displacement map.
  let filterId = size ? `${baseId}-${size.w}x${size.h}` : baseId

  useEffect(() => {
    setSvgSupported(supportsSvgBackdrop(baseId))
  }, [baseId])

  useEffect(() => {
    if (!svgSupported) return
    let el = containerRef.current
    if (!el) return
    // offset sizes ignore ancestor scale transforms (entry animations)
    let measure = () => {
      let w = el!.offsetWidth
      let h = el!.offsetHeight
      if (w > 0 && h > 0) {
        setSize((prev) =>
          prev && prev.w === w && prev.h === h ? prev : { w, h }
        )
      }
    }
    measure()
    let observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [svgSupported])

  let mapHref = useMemo(() => {
    if (!size) return ''
    let { w, h } = size
    let edge = Math.min(w, h) * (borderWidth * 0.5)
    let svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${w}" height="${h}" fill="black"/><rect x="0" y="0" width="${w}" height="${h}" rx="${borderRadius}" fill="url(#red)"/><rect x="0" y="0" width="${w}" height="${h}" rx="${borderRadius}" fill="url(#blue)" style="mix-blend-mode:${mixBlendMode}"/><rect x="${edge}" y="${edge}" width="${
      w - edge * 2
    }" height="${
      h - edge * 2
    }" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }, [size, borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode])

  let mapReady = Boolean(mapHref)

  return (
    <div
      ref={containerRef}
      className={clsx(
        'glass-surface',
        svgSupported && mapReady
          ? 'glass-surface--svg'
          : 'glass-surface--fallback',
        className
      )}
      style={
        {
          ...style,
          borderRadius,
          '--glass-frost': backgroundOpacity,
          '--glass-tint': tint,
          '--glass-saturation': saturation,
          '--glass-filter': `url(#${filterId})`,
        } as CSSProperties
      }
    >
      <svg
        className="pointer-events-none absolute h-full w-full opacity-0"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              href={mapHref}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap
              scale={distortionScale + redOffset}
              in="SourceGraphic"
              in2="map"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              scale={distortionScale + greenOffset}
              in="SourceGraphic"
              in2="map"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              scale={distortionScale + blueOffset}
              in="SourceGraphic"
              in2="map"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation={displace} />
          </filter>
        </defs>
      </svg>
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
