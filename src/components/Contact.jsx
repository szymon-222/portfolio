import { useEffect, useRef, useState } from 'react'

const links = [
  {
    label: 'Email',
    value: 'szymon.ordon@wp.pl',
    href: 'mailto:szymon.ordon@wp.pl',
    icon: '✉',
    color: '#667eea',
    desc: 'Napisz do mnie',
  },
  {
    label: 'GitHub',
    value: 'github.com/szymon-222',
    href: 'https://github.com/szymon-222',
    icon: '</>',
    color: '#b39dfc',
    desc: 'Moje projekty i kod',
  },
  {
    label: 'LinkedIn',
    value: 'Szymon Ordon',
    href: 'https://www.linkedin.com/in/szymon-ordon-66492733b',
    icon: 'in',
    color: '#0ea5e9',
    desc: 'Profil zawodowy',
  },
  {
    label: 'X / Twitter',
    value: '@Szymon50322683',
    href: 'https://x.com/Szymon50322683',
    icon: '𝕏',
    color: '#94a3b8',
    desc: 'Obserwuj mnie',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function ContactCard({ link, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={link.href}
      target={link.href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '22px 28px',
        background: hovered ? link.color + '0e' : 'var(--surface)',
        border: `1px solid ${hovered ? link.color + '55' : 'var(--border)'}`,
        borderRadius: '14px',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateX(8px)' : 'translateX(0)',
        boxShadow: hovered ? `0 4px 28px ${link.color}18` : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Ikona */}
      <div style={{
        width: '48px', height: '48px',
        background: link.color + '15',
        border: `1px solid ${link.color}30`,
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.9rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        color: link.color,
        flexShrink: 0,
        transition: 'background 0.25s',
        letterSpacing: '-0.02em',
      }}>
        {link.icon}
      </div>

      {/* Tekst */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          marginBottom: '4px',
          fontFamily: 'var(--font-mono)',
        }}>
          {link.label}
        </div>
        <div style={{
          fontSize: '0.9rem',
          color: hovered ? link.color : 'var(--text)',
          fontFamily: 'var(--font-mono)',
          transition: 'color 0.25s',
          fontWeight: 400,
        }}>
          {link.value}
        </div>
      </div>

      {/* Opis */}
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {link.desc}
        <span style={{
          color: hovered ? link.color : 'var(--text-dim)',
          transition: 'all 0.25s',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          display: 'inline-block',
        }}>→</span>
      </div>
    </a>
  )
}

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" style={{
      padding: 'var(--section-padding)',
      position: 'relative',
      zIndex: 2,
    }}>

      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(102,126,234,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}>

          {/* Lewa — nagłówek */}
          <div ref={ref} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <div className="section-label">Kontakt</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '24px',
              color: 'var(--text)',
            }}>
              Porozmawiajmy<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                o projekcie.
              </span>
            </h2>

            <p style={{ marginBottom: '16px' }}>
              Szukasz kogoś do współpracy przy projekcie webowym? A może chcesz po prostu pogadać o kodzie?
            </p>
            <p>
              Chętnie porozmawiam napisz do mnie na maila lub znajdź mnie na GitHubie i LinkedIn.
            </p>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '32px',
              padding: '10px 18px',
              background: 'rgba(52, 211, 153, 0.08)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              borderRadius: '30px',
            }}>
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 8px #34d399',
                animation: 'pulse-glow 2s infinite',
              }} />
              <span style={{ fontSize: '0.75rem', color: '#34d399', letterSpacing: '0.06em' }}>
                Dostępny do współpracy
              </span>
            </div>
          </div>

          {/* Prawa — karty */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.3s',
          }}>
            {links.map((link, i) => (
              <ContactCard key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '100px',
        paddingTop: '32px',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-dim)',
        fontSize: '0.7rem',
        letterSpacing: '0.08em',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <span>© 2025 Szymon Ordon</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span>Zbudowane w React + Vite</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span style={{
          background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Deployed on Vercel ▲
        </span>
      </div>
    </section>
  )
}