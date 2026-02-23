import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('visible') // visible → fadeout

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fadeout'), 2000)
    const t2 = setTimeout(() => onDone(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9000,
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      opacity: phase === 'fadeout' ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: phase === 'fadeout' ? 'none' : 'all',
    }}>

      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '4rem',
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'splashIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}>
        SO<span style={{ opacity: 0.4, WebkitTextFillColor: 'transparent' }}>.dev</span>
      </div>

      {/* Loading bar */}
      <div style={{
        width: '160px',
        height: '1px',
        background: 'var(--border)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--purple-1), var(--purple-3))',
          animation: 'loadBar 1.6s ease forwards',
          boxShadow: '0 0 8px var(--purple-1)',
        }} />
      </div>

      <div style={{
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
        fontFamily: 'var(--font-mono)',
        animation: 'splashIn 0.6s 0.2s both',
      }}>
        Inicjalizacja...
      </div>

      <style>{`
        @keyframes splashIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}