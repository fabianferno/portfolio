import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <AnimatePresence>
      <div
        id="page-content"
        className="-mt-[150px] md:-mt-[60px]"
      >
        {props.children}
      </div>
    </AnimatePresence>
  )
}
