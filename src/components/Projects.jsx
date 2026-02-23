import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    name: 'PolChat',
    tagline: 'Fullstack real-time chat application',
    desc: 'Kompletna platforma do czatu w czasie rzeczywistym z pokojami, czatem 1:1, reakcjami emoji, wysyłaniem plików i panelem admina. Wiadomości bez opóźnień dzięki Socket.io.',
    features: ['Real-time czat (Socket.io)', 'Reakcje emoji & pliki', 'Panel admina', 'Status online/offline'],
    tech: ['React', 'Node.js', 'Socket.io', 'Supabase', 'PostgreSQL', 'Express'],
    github: 'https://github.com/szymon-222/polchat',
    live: null,
    featured: true,
    color: '#667eea',
    icon: '💬',
  },
  {
    name: 'OLX Monitor Pro',
    tagline: 'Inteligentny monitoring ogłoszeń',
    desc: 'System monitorowania rynku nieruchomości 24/7. Bot automatycznie przegląda OLX, analizuje oferty i wysyła eleganckie powiadomienia na Discorda ze zdjęciem i parametrami — zanim dobra oferta zniknie.',
    features: ['Monitoring 24/7 (Selenium)', 'Powiadomienia Discord', 'Dashboard analityczny (Flask)', 'Wykresy ceny/metrażu'],
    tech: ['Python', 'Selenium', 'Flask', 'SQLite', 'Pandas', 'Discord API'],
    github: 'https://github.com/szymon-222',
    live: null,
    featured: true,
    color: '#a78bfa',
    icon: '🔍',
  },
  {
    name: 'Personal Trainer App',
    tagline: 'Elite Performance Coach Platform',
    desc: 'Ekskluzywna platforma dashboard/landing dla trenera personalnego. Zawiera kalkulator makroskładników (BMR/TDEE), zarządzanie klientami z CRUD, wykresy postępów i animowany particle system.',
    features: ['Kalkulator BMR/TDEE', 'CRUD klientów (LocalStorage)', 'Wykresy Chart.js', 'Particle system na Canvas'],
    tech: ['HTML5', 'JavaScript', 'CSS3', 'Chart.js', 'Canvas API'],
    github: 'https://github.com/szymon-222',
    live: null,
    featured: false,
    color: '#34d399',
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
    featured: false,
    color: '#f59e0b',
    icon: '🚗',
  },
]

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

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(false)

  const isFeatured = project.featured

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? project.color + '55' : 'var(--border)'}`,
        borderRadius: '16px',
        padding: isFeatured ? '36px' : '28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hovered ? `0 12px 48px ${project.color}1a` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      {/* Top glow bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Featured badge */}
      {isFeatured && (
        <div style={{
          position: 'absolute',
          top: '20px', right: '20px',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: project.color,
          background: project.color + '15',
          border: `1px solid ${project.color}35`,
          padding: '3px 10px',
          borderRadius: '20px',
        }}>
          Featured
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px',
          background: project.color + '18',
          border: `1px solid ${project.color}35`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
          flexShrink: 0,
          transition: 'transform 0.2s',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}>
          {project.icon}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isFeatured ? '1.25rem' : '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '3px',
          }}>
            {project.name}
          </h3>
          <div style={{
            fontSize: '0.7rem',
            color: project.color,
            letterSpacing: '0.06em',
            opacity: 0.85,
          }}>
            {project.tagline}
          </div>
        </div>
      </div>

      {/* Opis */}
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        lineHeight: 1.8,
        marginBottom: '20px',
        flex: 1,
      }}>
        {project.desc}
      </p>

      {/* Feature lista */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginBottom: '24px',
        padding: '16px',
        background: project.color + '08',
        borderRadius: '10px',
        border: `1px solid ${project.color}18`,
      }}>
        {project.features.map(f => (
          <div key={f} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.78rem', color: 'var(--text-muted)',
          }}>
            <span style={{ color: project.color, fontSize: '0.6rem' }}>◆</span>
            {f}
          </div>
        ))}
      </div>

      {/* Footer: tagi + link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
        {/* Tech tagi */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
              color: project.color,
              background: project.color + '12',
              border: `1px solid ${project.color}28`,
              padding: '3px 10px',
              borderRadius: '20px',
              fontFamily: 'var(--font-mono)',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            color: hovered ? project.color : 'var(--text-muted)',
            transition: 'color 0.2s',
            letterSpacing: '0.04em',
            flexShrink: 0,
            fontFamily: 'var(--font-mono)',
          }}
          onMouseEnter={e => e.currentTarget.style.color = project.color}
          onMouseLeave={e => e.currentTarget.style.color = hovered ? project.color : 'var(--text-muted)'}
        >
          GitHub →
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()

  const featured = projects.filter(p => p.featured)
  const rest     = projects.filter(p => !p.featured)

  return (
    <section id="projects" style={{ padding: 'var(--section-padding)', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <div ref={ref}>
          <div className="section-label" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            Projekty
          </div>
          <h2 className="section-title" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.2s',
          }}>
            Co zbudowałem
          </h2>
        </div>

        {/* Featured — 2 kolumny */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {featured.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>

        {/* Pozostałe — 2 kolumny */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
        }}>
          {rest.map((p, i) => <ProjectCard key={p.name} project={p} index={i + featured.length} />)}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <a
            href="https://github.com/szymon-222"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              padding: '13px 28px',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-3)'; e.currentTarget.style.color = 'var(--purple-3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)';   e.currentTarget.style.color = 'var(--text-muted)' }}
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