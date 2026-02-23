import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let animId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot śledzi natychmiastowo
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top  = mouseY + 'px'
      }
    }

    // Ring śledzi z opóźnieniem (lerp)
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px'
        ringRef.current.style.top  = ringY + 'px'
      }

      animId = requestAnimationFrame(animate)
    }

    // Hover efekt na linkach i buttonach
    const onEnter = () => {
      if (dotRef.current)  { dotRef.current.style.transform  = 'translate(-50%, -50%) scale(2.5)'; dotRef.current.style.opacity = '0.6' }
      if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.6)'; ringRef.current.style.borderColor = 'var(--purple-3)' }
    }
    const onLeave = () => {
      if (dotRef.current)  { dotRef.current.style.transform  = 'translate(-50%, -50%) scale(1)'; dotRef.current.style.opacity = '1' }
      if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'; ringRef.current.style.borderColor = 'var(--purple-1)' }
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    animate()
    addListeners()

    // Re-apply na dynamiczne elementy
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  const base = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
  }

  return (
    <>
      {/* Kropka */}
      <div ref={dotRef} style={{
        ...base,
        width: '8px',
        height: '8px',
        background: 'var(--purple-3)',
        boxShadow: '0 0 10px var(--purple-1), 0 0 20px var(--purple-2)',
        transition: 'transform 0.15s ease, opacity 0.15s ease',
        left: '-100px', top: '-100px',
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        ...base,
        width: '36px',
        height: '36px',
        border: '1px solid var(--purple-1)',
        opacity: 0.6,
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        left: '-100px', top: '-100px',
      }} />
    </>
  )
}