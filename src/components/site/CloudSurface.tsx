import { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'

// Frosted sky-blue panel with soft white mist drifting inside and a glowing rim.

interface CloudSurfaceProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  borderRadius?: number
}

export function CloudSurface({
  children,
  className,
  style,
  borderRadius = 28,
}: CloudSurfaceProps) {
  return (
    <div
      className={clsx('cloud-surface', className)}
      style={{ ...style, borderRadius }}
    >
      <div className="cloud-surface__body" aria-hidden="true">
        <div className="cloud-surface__puffs" />
        <div className="cloud-surface__puffs cloud-surface__puffs--alt" />
      </div>
      <div className="cloud-surface__content">{children}</div>
    </div>
  )
}
