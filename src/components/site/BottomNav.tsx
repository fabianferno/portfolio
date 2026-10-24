import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import {
  XMarkIcon,
  ArrowUpRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'

import { CloudSurface } from './CloudSurface'
import { playClick } from './clickSound'
import { DOCK_SECTIONS, DockItem, DockSection } from './dock-data'
import { GeniePopover } from './GeniePopover'

// Shared motion: springs everywhere so interruptions retarget smoothly.
const spring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 } as const
const softSpring = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const
const WINDOW_W = 940
const POPOVER_W = 340

interface DockWindow {
  sectionId: string
  sectionLabel: string
  item: DockItem
  x: number
  y: number
  z: number
}

interface PopoverPos {
  left: number
  bottom: number
  originX: number
}

function Mono({ item }: { item: DockItem }) {
  let Icon = item.icon
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-base font-semibold text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      style={{ background: item.color }}
    >
      {Icon ? (
        <Icon
          className={
            item.iconFill ? 'h-[22px] w-[22px] fill-current text-white' : 'h-6 w-6 text-white'
          }
          {...(item.iconFill ? {} : { strokeWidth: 1.6 })}
        />
      ) : item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-cover"
          unoptimized
        />
      ) : (
        item.mono
      )}
    </span>
  )
}

function BigIcon({ item }: { item: DockItem }) {
  let Icon = item.icon
  if (!Icon) return null
  return (
    <span
      className="flex h-44 w-44 items-center justify-center rounded-3xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
      style={{ background: item.color }}
    >
      <Icon
        className={item.iconFill ? 'h-20 w-20 fill-current' : 'h-20 w-20'}
        {...(item.iconFill ? {} : { strokeWidth: 1.4 })}
      />
    </span>
  )
}

function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href)
}

export function BottomNav() {
  let [openId, setOpenId] = useState<string | null>(null)
  let [popoverPos, setPopoverPos] = useState<PopoverPos | null>(null)
  let [windows, setWindows] = useState<DockWindow[]>([])
  let zCounter = useRef(60)
  let navRef = useRef<HTMLElement>(null)
  let popoverRef = useRef<HTMLDivElement>(null)

  let openSection = DOCK_SECTIONS.find((s) => s.id === openId) ?? null
  // Keep the last shown menu mounted while the genie closes it.
  let shown = useRef<{ section: DockSection; pos: PopoverPos } | null>(null)
  if (openSection && popoverPos) shown.current = { section: openSection, pos: popoverPos }
  let popover = shown.current

  let showSection = (section: DockSection, button: HTMLElement) => {
    let rect = button.getBoundingClientRect()
    let width = Math.min(POPOVER_W, window.innerWidth - 24)
    let left = rect.left + rect.width / 2 - width / 2
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12))
    setPopoverPos({
      left,
      bottom: window.innerHeight - rect.top + 12,
      originX: rect.left + rect.width / 2 - left,
    })
    setOpenId(section.id)
  }

  let toggleSection = (section: DockSection, button: HTMLElement) => {
    if (openId === section.id) setOpenId(null)
    else showSection(section, button)
  }

  let backToSection = (win: DockWindow) => {
    closeWindow(win.item.id)
    let section = DOCK_SECTIONS.find((s) => s.id === win.sectionId)
    let button = document.querySelector<HTMLElement>(
      `[data-dock="${win.sectionId}"]`
    )
    if (section && button) showSection(section, button)
  }

  let openWindow = (item: DockItem, section: DockSection) => {
    setOpenId(null)
    setWindows((current) => {
      let z = ++zCounter.current
      if (current.some((w) => w.item.id === item.id)) {
        return current.map((w) => (w.item.id === item.id ? { ...w, z } : w))
      }
      let width = Math.min(WINDOW_W, window.innerWidth - 24)
      let n = current.length % 6
      return [
        ...current,
        {
          item,
          sectionId: section.id,
          sectionLabel: section.label,
          z,
          x: Math.max(12, (window.innerWidth - width) / 2 + n * 28),
          y: Math.max(24, window.innerHeight * 0.08 + n * 28),
        },
      ]
    })
  }

  let moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((current) =>
      current.map((w) => (w.item.id === id ? { ...w, x, y } : w))
    )
  }, [])

  let focusWindow = useCallback((id: string) => {
    let z = ++zCounter.current
    setWindows((current) =>
      current.map((w) => (w.item.id === id ? { ...w, z } : w))
    )
  }, [])

  let closeWindow = useCallback((id: string) => {
    setWindows((current) => current.filter((w) => w.item.id !== id))
  }, [])

  useEffect(() => {
    if (!openId) return
    let onPointerDown = (e: PointerEvent) => {
      let target = e.target as Node
      if (popoverRef.current?.contains(target)) return
      if (navRef.current?.contains(target)) return
      setOpenId(null)
    }
    let onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openId])

  return (
    <MotionConfig reducedMotion="user">
      <nav
        ref={navRef}
        aria-label="Primary"
        className="fixed inset-x-0 bottom-[100px] z-50 flex justify-center sm:bottom-[80px]"
      >
        <ul className="flex items-center gap-1">
          {DOCK_SECTIONS.map((section) => {
            let Icon = section.icon
            let isOpen = openId === section.id
            return (
              <li key={section.id}>
                <motion.button
                  type="button"
                  aria-label={section.label}
                  data-dock={section.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 4 }}
                  transition={spring}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-current={isOpen ? 'page' : undefined}
                  onPointerDown={playClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') playClick()
                  }}
                  onClick={(e) => toggleSection(section, e.currentTarget)}
                  className="key-btn group w-[68px] !px-0 outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-[84px]"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  {!isOpen && (
                    <span className="pointer-events-none absolute -top-9 rounded-md bg-zinc-900/90 px-2 py-1 font-geist text-[10px] uppercase tracking-[0.12em] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {section.label}
                    </span>
                  )}
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      {popover && (
        <GeniePopover
          open={!!openSection && !!popoverPos}
          sectionKey={openSection?.id ?? null}
          left={popover.pos.left}
          bottom={popover.pos.bottom}
          originX={popover.pos.originX}
          width={Math.min(
            POPOVER_W,
            typeof window === 'undefined' ? POPOVER_W : window.innerWidth - 24
          )}
          popoverRef={popoverRef}
        >
          <ul
            role="menu"
            data-genie-content
            aria-label={popover.section.label}
            className="max-h-[60vh] overflow-y-auto p-2"
          >
            {popover.section.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => openWindow(item, popover.section)}
                  className="flex w-full items-center gap-4 rounded-2xl px-3 py-2.5 text-left outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/15"
                >
                  <Mono item={item} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[17px] font-medium leading-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]">
                      {item.title}
                    </span>
                    <span className="block truncate text-[13px] text-white/80">
                      {item.subtitle}
                    </span>
                  </span>
                  {item.meta && (
                    <span className="shrink-0 text-[13px] text-white/70">
                      {item.meta}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </GeniePopover>
      )}

      <AnimatePresence>
        {windows.map((w) => (
          <DockWindowView
            key={w.item.id}
            win={w}
            onMove={moveWindow}
            onFocus={focusWindow}
            onClose={closeWindow}
            onBack={backToSection}
          />
        ))}
      </AnimatePresence>
    </MotionConfig>
  )
}

function DockWindowView({
  win,
  onMove,
  onFocus,
  onClose,
  onBack,
}: {
  win: DockWindow
  onMove: (id: string, x: number, y: number) => void
  onFocus: (id: string) => void
  onClose: (id: string) => void
  onBack: (win: DockWindow) => void
}) {
  let { item } = win
  let rootRef = useRef<HTMLDivElement>(null)
  let drag = useRef<{ dx: number; dy: number } | null>(null)

  let onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y }
  }
  let onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    let w = rootRef.current?.offsetWidth ?? WINDOW_W
    let x = Math.max(
      80 - w,
      Math.min(e.clientX - drag.current.dx, window.innerWidth - 80)
    )
    let y = Math.max(
      8,
      Math.min(e.clientY - drag.current.dy, window.innerHeight - 48)
    )
    onMove(item.id, x, y)
  }
  let endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  let chip =
    'flex h-10 items-center justify-center rounded-xl border border-white/30 bg-[rgba(8,40,95,0.5)] text-white outline-none transition-colors hover:bg-[rgba(8,40,95,0.7)] focus-visible:ring-2 focus-visible:ring-white/60'

  return (
    <motion.div
      ref={rootRef}
      initial={{ scale: 0.88, y: 32 }}
      animate={{ scale: 1, y: 0 }}
      exit={{
        scale: 0.94,
        y: 16,
        transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
      }}
      transition={softSpring}
      onPointerDownCapture={() => onFocus(item.id)}
      className="fixed font-geist text-white"
      style={{
        left: win.x,
        top: win.y,
        zIndex: win.z,
        transformOrigin: '50% 90%',
        width: `min(${WINDOW_W}px, calc(100vw - 24px))`,
      }}
    >
      <CloudSurface borderRadius={28}>
        <div role="dialog" aria-label={item.title}>
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="flex cursor-grab touch-none select-none items-center justify-between px-5 py-4 active:cursor-grabbing"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              onClick={() => onBack(win)}
              className={`${chip} gap-2 px-4 text-[15px]`}
            >
              <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.75} />
              {win.sectionLabel}
            </motion.button>
            <motion.button
              type="button"
              aria-label={`Close ${item.title}`}
              data-no-hand
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={spring}
              onClick={() => onClose(item.id)}
              className={`${chip} w-10`}
            >
              <XMarkIcon className="h-5 w-5" strokeWidth={1.75} />
            </motion.button>
          </div>
          <div className="grid max-h-[calc(100svh-15rem)] grid-cols-1 overflow-y-auto border-t border-white/15 md:h-[min(520px,calc(100svh-15rem))] md:grid-cols-[300px_1fr] md:overflow-hidden">
            <div className="space-y-7 px-7 py-7 md:overflow-y-auto md:border-r md:border-white/15">
              <h2 className="text-[32px] font-semibold leading-[1.05] tracking-tight [text-shadow:0_1px_10px_rgba(0,0,0,0.3)]">
                {item.title}
              </h2>
              <Field label="Role">{item.subtitle}</Field>
              {item.period && <Field label="Period">{item.period}</Field>}
              {item.location && <Field label="Location">{item.location}</Field>}
              {!item.period && item.meta && (
                <Field label="Status">{item.meta}</Field>
              )}
              <Field label="About">
                <span className="block space-y-3">
                  {item.body.map((p, i) => (
                    <span key={i} className="block">
                      {p}
                    </span>
                  ))}
                </span>
              </Field>
              {item.highlights && item.highlights.length > 0 && (
                <Field label="Highlights">
                  <ul className="list-disc space-y-2.5 pl-5 marker:text-white/70">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </Field>
              )}
            </div>
            <div className="space-y-4 p-4 md:overflow-y-auto">
              {!item.images && !item.embeds && !item.list && (
                <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-white px-6 text-center text-zinc-900 [text-shadow:none] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
                  {item.icon ? (
                    <BigIcon item={item} />
                  ) : item.logo ? (
                    <Image
                      src={item.logo}
                      alt={`${item.title} logo`}
                      className="h-44 w-44 rounded-3xl object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-5xl font-bold tracking-tight sm:text-6xl">
                      {item.title}
                    </span>
                  )}
                </div>
              )}
              {item.images && (
                <div className="grid grid-cols-2 gap-3">
                  {item.images.map((src) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-2xl bg-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              )}
              {item.embeds?.map((embed) => (
                <iframe
                  key={embed.src}
                  title={embed.title}
                  src={embed.src}
                  height={embed.height}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="w-full rounded-2xl border-0 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
                />
              ))}
              {item.list && (
                <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl bg-white text-zinc-900 [text-shadow:none] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
                  {item.list.rows.map((row) => (
                    <motion.a
                      key={row.href}
                      whileTap={{ scale: 0.985 }}
                      transition={spring}
                      data-hand
                      href={row.href}
                      {...(/^https?:/.test(row.href)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="flex items-center justify-between gap-4 px-6 py-4 outline-none transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100"
                    >
                      <span className="min-w-0 text-[16px] font-medium leading-snug">
                        {row.title}
                      </span>
                      {row.meta && (
                        <span className="shrink-0 text-sm text-zinc-500">
                          {row.meta}
                        </span>
                      )}
                    </motion.a>
                  ))}
                </div>
              )}
              {item.links && (
                <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl bg-white text-zinc-900 [text-shadow:none] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
                  {item.links.map((link) => (
                    <motion.a
                      key={link.href}
                      whileTap={{ scale: 0.985 }}
                      transition={spring}
                      data-hand
                      href={link.href}
                      {...(/^https?:/.test(link.href)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="flex items-center justify-between gap-4 px-6 py-5 text-lg font-medium outline-none transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100"
                    >
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRightIcon
                        className="h-5 w-5 shrink-0"
                        strokeWidth={2}
                      />
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CloudSurface>
    </motion.div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white/75">
        {label}
      </p>
      <div className="text-[17px] leading-relaxed text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
        {children}
      </div>
    </div>
  )
}
