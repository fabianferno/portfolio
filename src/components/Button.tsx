import Link from 'next/link'
import clsx from 'clsx'
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
} as const

type Variant = keyof typeof variantStyles

interface BaseButtonProps {
  variant?: Variant
  className?: string
  children?: ReactNode
}

interface ButtonAsButtonProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined
}

interface ButtonAsLinkProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

export function Button({ variant = 'primary', className, href, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  if (href) {
    const { href: _, ...linkProps } = props as ButtonAsLinkProps
    return <Link href={href} className={className} {...linkProps} />
  } else {
    return <button className={className} {...(props as ButtonAsButtonProps)} />
  }
}
