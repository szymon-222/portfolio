import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: `${progress}%`,
      height: '2px',
      background: 'linear-gradient(90deg, var(--purple-1), var(--purple-3))',
      zIndex: 200,
      transition: 'width 0.05s linear',
      boxShadow: '0 0 8px var(--purple-1)',
    }} />
  )
}