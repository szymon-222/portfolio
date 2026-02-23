import { useEffect, useRef, useState } from 'react'

const TYPING_WORDS = ['Fullstack Developer', 'React Developer', 'Node.js Developer', 'Problem Solver']

// ── Particles ──────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    // Tworzenie cząsteczek
    const count = 80
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(179, 157, 252, ${p.alpha})`
        ctx.fill()
      })

      // Linie między bliskimi cząsteczkami
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
    }} />
  )
}

// ── Typing effect ───────────────────────────────────────────
function TypingText() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1400)
      return () => clearTimeout(t)
    }

    const word = TYPING_WORDS[wordIndex]

    if (!deleting && displayed === word) {
      setPause(true)
      setDeleting(true)
      return
    }

    if (deleting && displayed === '') {
      setDeleting(false)
      setWordIndex(i => (i + 1) % TYPING_WORDS.length)
      return
    }

    const speed = deleting ? 40 : 80
    const t = setTimeout(() => {
      setDisplayed(prev =>
        deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(t)
  }, [displayed, deleting, wordIndex, pause])

  return (
    <span style={{
      background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {displayed}
      <span style={{
        WebkitTextFillColor: 'var(--purple-3)',
        color: 'var(--purple-3)',
        animation: 'pulse-glow 1s infinite',
        marginLeft: '2px',
      }}>|</span>
    </span>
  )
}

// ── Hero ────────────────────────────────────────────────────
export default function Hero() {
  const orbRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (!orbRef.current) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 50
      const y = (e.clientY / window.innerHeight - 0.5) * 50
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Particles />

      {/* Orb */}
      <div ref={orbRef} style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.07) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 0,
      }} />

      {/* Treść */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--purple-3)', marginBottom: '28px',
          animation: 'fadeUp 0.7s 0.1s both',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--purple-3)', display: 'block' }} />
          Pełny stack developer · Podkarpacie
        </div>

        {/* Imię */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: '16px',
          animation: 'fadeUp 0.7s 0.2s both',
        }}>
          Szymon<br />Ordon.
        </h1>

        {/* Typing */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          marginBottom: '32px',
          minHeight: '2.5rem',
          animation: 'fadeUp 0.7s 0.3s both',
        }}>
          <TypingText />
        </div>

        {/* Opis */}
        <p style={{
          maxWidth: '500px',
          marginBottom: '48px',
          animation: 'fadeUp 0.7s 0.4s both',
          fontSize: '0.95rem',
        }}>
          Student informatyki na Politechnice Rzeszowskiej.
          Buduję fullstackowe aplikacje webowe od bazy danych po interfejs użytkownika.
        </p>

        {/* Przyciski */}
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.5s both',
        }}>
          <a href="#projects" style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, var(--purple-1), var(--purple-2))',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            borderRadius: '8px',
            transition: 'opacity 0.2s, transform 0.2s',
            display: 'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Zobacz projekty
          </a>

          <a href="https://github.com/szymon-222" target="_blank" rel="noreferrer" style={{
            padding: '14px 32px',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            borderRadius: '8px',
            transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            display: 'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-3)'; e.currentTarget.style.color = 'var(--purple-3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)';   e.currentTarget.style.color = 'var(--text-muted)';  e.currentTarget.style.transform = 'translateY(0)' }}
          >
            GitHub →
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '-160px', left: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          animation: 'fadeUp 0.7s 0.9s both',
        }}>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>scroll</span>
          <div style={{
            width: '1px', height: '56px',
            background: 'linear-gradient(to bottom, var(--purple-3), transparent)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}