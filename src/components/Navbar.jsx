import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'O mnie',   href: '#about'    },
  { label: 'Projekty', href: '#projects'  },
  { label: 'Stack',    href: '#stack'     },
  { label: 'Kontakt',  href: '#contact'   },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)

  // Scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1))
    const observers = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Zamknij menu po kliknięciu linku
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 48px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(10, 9, 15, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>

        {/* Logo */}
        <a href="#" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.1rem',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          zIndex: 101,
        }}>
          SO<span style={{ opacity: 0.4 }}>.dev</span>
        </a>

        {/* Desktop linki */}
        <ul style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
        }}
        className="nav-desktop"
        >
          {LINKS.map(link => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    color: isActive ? 'var(--purple-3)' : 'var(--text-muted)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                    position: 'relative',
                    paddingBottom: '4px',
                  }}
                  onMouseEnter={e => { if (!isActive) e.target.style.color = 'var(--text)' }}
                  onMouseLeave={e => { if (!isActive) e.target.style.color = 'var(--text-muted)' }}
                >
                  {link.label}
                  {/* Aktywna kreska */}
                  <span style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, var(--purple-1), var(--purple-3))',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Hamburger — tylko mobile */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger"
          aria-label="Menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            zIndex: 101,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: 'var(--purple-3)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        background: 'rgba(10, 9, 15, 0.97)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}
      className="mobile-menu"
      >
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2.5rem',
              color: active === link.href.slice(1) ? 'var(--purple-3)' : 'var(--text)',
              letterSpacing: '-0.02em',
              transition: 'color 0.2s, transform 0.2s',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--purple-3)'}
            onMouseLeave={e => e.currentTarget.style.color = active === link.href.slice(1) ? 'var(--purple-3)' : 'var(--text)'}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}