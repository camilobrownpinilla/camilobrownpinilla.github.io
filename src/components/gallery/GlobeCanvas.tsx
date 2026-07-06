import { useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import createGlobe from 'cobe'
import type { GalleryLocation } from '../../types'

// #FF0082 (hot pink) normalized to 0..1 for cobe
const MARKER_COLOR: [number, number, number] = [1, 0, 0.51]

// cobe positions marker labels via CSS Anchor Positioning; only render the
// floating yellow labels where the browser supports it. The location list is
// the guaranteed navigation path regardless.
const supportsAnchor =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('anchor-name: --x')

interface GlobeCanvasProps {
  locations: GalleryLocation[]
  activeSlug: string | null
  onHover: (slug: string | null) => void
  onSelect: (slug: string) => void
}

export default function GlobeCanvas({ locations, activeSlug, onHover, onSelect }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const widthRef = useRef(0)

  // interaction state (refs so the animation loop reads live values)
  const phiRef = useRef(0)
  const dragRef = useRef(0)
  const pointerStart = useRef<number | null>(null)
  const dragOnStart = useRef(0)
  const firstFrame = useRef(true)

  const { colorMode } = useColorMode()

  const buildMarkers = (active: string | null) =>
    locations.map(l => ({
      location: [l.lat, l.long] as [number, number],
      size: (l.markerSize ?? 0.045) * (l.slug === active ? 1.9 : 1),
      id: l.slug,
    }))

  // (Re)create the globe on mount and whenever the color mode or locations change.
  // cobe v2 has no internal render loop — we drive rotation via requestAnimationFrame.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const measure = () => { widthRef.current = canvas.offsetWidth || 380 }
    measure()

    const dark = colorMode === 'dark'
    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: widthRef.current * dpr,
      height: widthRef.current * dpr,
      phi: 0,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.2 : 1.3,
      mapSamples: 16000,
      mapBrightness: dark ? 5.5 : 6,
      baseColor: dark ? [0.25, 0.28, 0.34] : [0.88, 0.9, 0.94],
      markerColor: MARKER_COLOR,
      glowColor: dark ? [0.12, 0.14, 0.18] : [0.9, 0.92, 0.98],
      markers: buildMarkers(activeSlug),
    })
    globeRef.current = globe

    let raf = 0
    const tick = () => {
      if (pointerStart.current === null) phiRef.current += 0.0025
      globe.update({
        phi: phiRef.current + dragRef.current,
        width: widthRef.current * dpr,
        height: widthRef.current * dpr,
      })
      if (firstFrame.current) {
        firstFrame.current = false
        canvas.style.opacity = '1'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(measure)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      globe.destroy()
      globeRef.current = null
      firstFrame.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode, locations])

  // Highlight the active marker without recreating the globe. cobe preserves
  // markers across updates that omit them, so the rAF loop above won't clobber this.
  useEffect(() => {
    globeRef.current?.update({ markers: buildMarkers(activeSlug) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug])

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerStart.current = e.clientX
    dragOnStart.current = dragRef.current
    canvasRef.current?.setPointerCapture(e.pointerId)
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }
  const endDrag = () => {
    pointerStart.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerStart.current !== null) {
      dragRef.current = dragOnStart.current + (e.clientX - pointerStart.current) / 150
    }
  }

  return (
    <Box position="relative" w="full" maxW="420px" mx="auto" aspectRatio={1}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerMove={handlePointerMove}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 0.6s ease',
        }}
      />
      {supportsAnchor &&
        locations.map(l => {
          const style = {
            '--cobe-anchor': `--cobe-${l.slug}`,
            opacity: `var(--cobe-visible-${l.slug}, 0)`,
          } as React.CSSProperties
          return (
            <button
              key={l.slug}
              type="button"
              tabIndex={-1}
              className={`globe-label${l.slug === activeSlug ? ' is-active' : ''}`}
              style={style}
              onMouseEnter={() => onHover(l.slug)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(l.slug)}
            >
              {l.name}
            </button>
          )
        })}
    </Box>
  )
}
