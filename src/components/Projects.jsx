import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    name: 'Lumina Studio',
    tagline: 'System zarządzania dla fotografa',
    desc: 'Kompleksowa platforma dla fotografa — publiczne portfolio i prywatny system dla klientów. Klient po sesji dostaje unikalny kod dostępu do galerii i sam wybiera zdjęcia do retuszu. Fotograf zarządza wszystkim z panelu admina.',
    features: ['System autoryzacji przez kod sesji', 'Auto-kompresja zdjęć (10MB → 400KB)', 'Panel admina z rezerwacjami', 'Editorial grid layout + animacje'],
    tech: ['React', 'Vite', 'Supabase', 'Framer Motion', 'Tailwind CSS', 'Canvas API'],
    github: 'https://github.com/szymon-222/lumina',
    live: null,
    color: '#f472b6',
    icon: '📸',
  },
  {
    name: 'PolChat',
    tagline: 'Fullstack real-time chat application',
    desc: 'Kompletna platforma do czatu w czasie rzeczywistym z pokojami, czatem 1:1, reakcjami emoji, wysyłaniem plików i panelem admina. Wiadomości bez opóźnień dzięki Socket.io.',
    features: ['Real-time czat (Socket.io)', 'Reakcje emoji & pliki', 'Panel admina', 'Status online/offline'],
    tech: ['React', 'Node.js', 'Socket.io', 'Supabase', 'PostgreSQL', 'Express'],
    github: 'https://github.com/szymon-222/polchat',
    live: null,
    color: '#667eea',
    icon: '💬',
  },
  {
    name: 'DevHUB',
    tagline: 'System dowodzenia developera — PWA',
    desc: 'Autorski system zarządzania działalnością freelancerską i finansami osobistymi. Instalowalna aplikacja PWA z dashboardem finansowym, CRM, generatorem rachunków PDF zgodnym z polskim prawem i bazą klientów.',
    features: ['Generator PDF z polskimi znakami', 'CRM — od leada do wdrożenia', 'Kalkulator zarobków (0% PIT <26 lat)', 'Offline-first PWA + Service Worker'],
    tech: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'jsPDF', 'PWA'],
    github: null,
    live: null,
    color: '#34d399',
    icon: '⚡',
  },
  {
    name: 'AutoDiag',
    tagline: 'Webowa diagnostyka usterek samochodowych',
    desc: 'Aplikacja webowa do diagnostyki samochodowej. Użytkownik wybiera model auta i objawy — własny algorytm wagowy zwraca ranking najbardziej prawdopodobnych usterek z kosztami, trudnością naprawy i listą części.',
    features: ['Własny silnik diagnostyczny (weighted scoring)', '75 usterek, 37 objawów w bazie', 'TypeScript end-to-end', 'Dark industrial design system'],
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'Supabase'],
    github: null,
    live: null,
    color: '#f59e0b',
    icon: '🔧',
  },
  {
    name: 'OLX Monitor Pro',
    tagline: 'Inteligentny monitoring ogłoszeń',
    desc: 'System monitorowania rynku nieruchomości 24/7. Bot automatycznie przegląda OLX, analizuje oferty i wysyła powiadomienia na Discorda ze zdjęciem i parametrami — zanim dobra oferta zniknie.',
    features: ['Monitoring 24/7 (Selenium)', 'Powiadomienia Discord', 'Dashboard analityczny (Flask)', 'Wykresy ceny/metrażu'],
    tech: ['Python', 'Selenium', 'Flask', 'SQLite', 'Pandas', 'Discord API'],
    github: 'https://github.com/szymon-222',
    live: null,
    color: '#a78bfa',
    icon: '🔍',
  },
  {
    name: 'Personal Trainer App',
    tagline: 'Elite Performance Coach Platform',
    desc: 'Ekskluzywna platforma dashboard dla trenera personalnego z kalkulatorem makroskładników BMR/TDEE, zarządzaniem klientami CRUD, wykresami postępów i animowanym particle systemem na Canvas.',
    features: ['Kalkulator BMR/TDEE', 'CRUD klientów (LocalStorage)', 'Wykresy Chart.js', 'Particle system na Canvas'],
    tech: ['HTML5', 'JavaScript', 'CSS3', 'Chart.js', 'Canvas API'],
    github: 'https://github.com/szymon-222',
    live: null,
    color: '#06b6d4',
    icon: '💪',
  },
  {
    name: 'BiBiCar',
    tagline: 'Landing page wypożyczalni aut',
    desc: 'Nowoczesna strona SPA dla wypożyczalni samochodów z dynamiczną nawigacją, interaktywną flotą z filtrowaniem, formularzem rezerwacji z walidacją i ukrytym panelem admina.',
    features: ['SPA bez przeładowań', 'Filtrowanie floty', 'Formularz rezerwacji', 'Panel administratora'],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/szymon-222',
    live: null,
    color: '#fb923c',
    icon: '🚗',
  },
]

const VISIBLE_DEFAULT = 4

function useInView(threshold = 0.1) {
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

function ProjectCard({ project, index, visible }) {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? project.color + '55' : 'var(--border)'}`,
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',

        // Animacja wjazdu przy inView
        opacity: inView && visible ? 1 : 0,
        transform: inView && visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hovered ? `0 12px 48px ${project.color}1a` : 'none',

        // Ukrycie gdy collapsed
        maxHeight: visible ? '1000px' : '0',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px',
          background: project.color + '18',
          border: `1px solid ${project.color}35`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', flexShrink: 0,
          transition: 'transform 0.2s',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}>
          {project.icon}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.15rem',
            fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: '3px',
          }}>
            {project.name}
          </h3>
          <div style={{ fontSize: '0.7rem', color: project.color, letterSpacing: '0.06em', opacity: 0.85 }}>
            {project.tagline}
          </div>
        </div>
      </div>

      {/* Opis */}
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px', flex: 1 }}>
        {project.desc}
      </p>

      {/* Features */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '6px',
        marginBottom: '24px', padding: '14px 16px',
        background: project.color + '08',
        borderRadius: '10px',
        border: `1px solid ${project.color}18`,
      }}>
        {project.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ color: project.color, fontSize: '0.55rem', flexShrink: 0 }}>◆</span>
            {f}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: '0.65rem', letterSpacing: '0.05em',
              color: project.color, background: project.color + '12',
              border: `1px solid ${project.color}28`,
              padding: '3px 10px', borderRadius: '20px',
              fontFamily: 'var(--font-mono)',
            }}>
              {t}
            </span>
          ))}
        </div>

        {project.github ? (
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{
              fontSize: '0.72rem', color: hovered ? project.color : 'var(--text-muted)',
              transition: 'color 0.2s', letterSpacing: '0.04em',
              flexShrink: 0, fontFamily: 'var(--font-mono)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = project.color}
            onMouseLeave={e => e.currentTarget.style.color = hovered ? project.color : 'var(--text-muted)'}
          >
            GitHub →
          </a>
        ) : (
          <span style={{
            fontSize: '0.68rem', color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-dim)', display: 'inline-block' }} />
            Prywatne repo
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  const [expanded, setExpanded] = useState(false)
  const extraRef = useRef(null)

  const visible    = projects.slice(0, VISIBLE_DEFAULT)
  const hidden     = projects.slice(VISIBLE_DEFAULT)
  const remaining  = hidden.length

  const handleToggle = () => {
    if (expanded) {
      // Zwiń i wróć do sekcji
      setExpanded(false)
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      setExpanded(true)
    }
  }

  return (
    <section id="projects" style={{ padding: 'var(--section-padding)', position: 'relative', zIndex: 2 }}>
      <div className="container">

        {/* Nagłówek */}
        <div ref={ref}>
          <div className="section-label" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            Projekty
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800, color: 'var(--text)', margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.2s',
            }}>
              Co zbudowałem
            </h2>
            <span style={{
              fontSize: '0.72rem', color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              opacity: inView ? 1 : 0,
              transition: 'all 0.6s ease 0.3s',
            }}>
              {projects.length} projektów łącznie
            </span>
          </div>
        </div>

        {/* Zawsze widoczne 4 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
          gap: '24px',
          marginBottom: expanded ? '24px' : '0',
        }}>
          {visible.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} visible={true} />
          ))}
        </div>

        {/* Ukryte projekty — płynne rozwinięcie */}
        <div
          ref={extraRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
            gap: '24px',
            overflow: 'hidden',
            maxHeight: expanded ? `${hidden.length * 600}px` : '0',
            opacity: expanded ? 1 : 0,
            transition: 'max-height 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
            marginBottom: expanded ? '0' : '0',
          }}
        >
          {hidden.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} visible={expanded} />
          ))}
        </div>

        {/* Separator + przycisk */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '48px',
        }}>

          {/* Linia z gradientem */}
          {!expanded && (
            <div style={{
              width: '100%',
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, var(--bg))',
              marginTop: '-80px',
              marginBottom: '16px',
              pointerEvents: 'none',
            }} />
          )}

          {/* Przycisk */}
          <button
            onClick={handleToggle}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 32px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--purple-3)'
              e.currentTarget.style.color = 'var(--purple-3)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(179,157,252,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {expanded ? (
              <>
                <span style={{ transition: 'transform 0.3s', display: 'inline-block' }}>↑</span>
                Zwiń projekty
              </>
            ) : (
              <>
                <span style={{ transition: 'transform 0.3s', display: 'inline-block' }}>↓</span>
                Pokaż pozostałe {remaining} projekty
              </>
            )}
          </button>

          {/* GitHub CTA */}
          <a
            href="https://github.com/szymon-222"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.72rem', letterSpacing: '0.06em',
              color: 'var(--text-dim)', fontFamily: 'var(--font-mono)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--purple-3)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            Zobacz wszystko na GitHub →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects .container > div:nth-child(2),
          #projects .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}