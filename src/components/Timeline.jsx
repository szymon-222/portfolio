import { useEffect, useRef, useState } from 'react'

const events = [
  {
    year: '2025 — teraz',
    title: 'Politechnika Rzeszowska',
    subtitle: 'Informatyka — studia inżynierskie',
    desc: 'Po ukończeniu technikum z tytułem technika programisty, rozpocząłem studia inżynierskie. Rozwijam wiedzę z algorytmów, architektury systemów i technologii webowych.',
    icon: '🎓',
    color: '#b39dfc',
    type: 'edu',
  },
  {
    year: '2024',
    title: 'Praktyki zawodowe II',
    subtitle: 'Drugie praktyki — środowisko biurowe',
    desc: 'Kolejna runda praktyk zawodowych — rozwijanie umiejętności tworzenia i testowania aplikacji użytkowych. Praca z kodem w realnym środowisku produkcyjnym.',
    icon: '💼',
    color: '#34d399',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Praktyki zawodowe I',
    subtitle: 'Pierwsze praktyki — firma biurowa',
    desc: 'Pierwsze doświadczenie zawodowe — tworzenie i testowanie wewnętrznych aplikacji użytkowych w środowisku biurowym. Tu po raz pierwszy pisałem kod produkcyjny.',
    icon: '🏢',
    color: '#f59e0b',
    type: 'work',
  },
  {
    year: '2020 — 2025',
    title: 'Technikum Programistyczne',
    subtitle: 'Technik programista — tytuł zawodowy',
    desc: 'Pięć lat nauki programowania od podstaw — Java, C, HTML, CSS, bazy danych i algorytmika. Tu zaczęła się przygoda z kodem i pasja do tworzenia oprogramowania.',
    icon: '🏫',
    color: '#64748b',
    type: 'edu',
  },
]

function useInView(threshold = 0.2) {
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

function EventCard({ event, hovered, setHovered }) {
  const typeLabel = { edu: 'Edukacja', work: 'Doświadczenie', project: 'Projekt' }
  const typeBg    = { edu: '#b39dfc',  work: '#34d399',        project: '#667eea' }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? event.color + '55' : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '20px 24px',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? `0 8px 32px ${event.color}18` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span style={{ fontSize: '1.1rem' }}>{event.icon}</span>
        <span style={{
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: typeBg[event.type],
          background: typeBg[event.type] + '15',
          border: `1px solid ${typeBg[event.type]}30`,
          padding: '2px 8px',
          borderRadius: '20px',
        }}>
          {typeLabel[event.type]}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1rem',
        color: 'var(--text)',
        marginBottom: '4px',
        lineHeight: 1.3,
      }}>
        {event.title}
      </h3>

      <div style={{
        fontSize: '0.75rem',
        color: event.color,
        marginBottom: '10px',
        letterSpacing: '0.03em',
        opacity: 0.9,
      }}>
        {event.subtitle}
      </div>

      <p style={{
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        lineHeight: 1.75,
        margin: 0,
      }}>
        {event.desc}
      </p>
    </div>
  )
}

function TimelineItem({ event, index }) {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(false)
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        alignItems: 'start',
        marginBottom: '8px',
      }}
    >
      {/* Lewa kolumna */}
      <div style={{
        paddingRight: '32px',
        paddingBottom: '40px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-24px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
      }}>
        {isLeft ? (
          <EventCard event={event} hovered={hovered} setHovered={setHovered} />
        ) : (
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            textAlign: 'right',
            paddingTop: '14px',
            fontFamily: 'var(--font-mono)',
          }}>
            {event.year}
          </div>
        )}
      </div>

      {/* Środkowa kolumna — oś + kropka */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: event.color,
          border: '3px solid var(--bg)',
          boxShadow: `0 0 0 2px ${event.color}60, 0 0 16px ${event.color}40`,
          flexShrink: 0,
          marginTop: '14px',
          zIndex: 1,
          transition: 'transform 0.2s',
          transform: hovered ? 'scale(1.4)' : 'scale(1)',
        }} />
        <div style={{
          width: '1px',
          flex: 1,
          minHeight: '40px',
          background: `linear-gradient(to bottom, ${event.color}60, var(--border))`,
          marginTop: '4px',
        }} />
      </div>

      {/* Prawa kolumna */}
      <div style={{
        paddingLeft: '32px',
        paddingBottom: '40px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(24px)',
        transition: `all 0.6s ease ${index * 0.1 + 0.05}s`,
      }}>
        {!isLeft ? (
          <EventCard event={event} hovered={hovered} setHovered={setHovered} />
        ) : (
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            paddingTop: '14px',
            fontFamily: 'var(--font-mono)',
          }}>
            {event.year}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Timeline() {
  const [ref, inView] = useInView()

  return (
    <section id="timeline" style={{ padding: 'var(--section-padding)', position: 'relative', zIndex: 2 }}>

      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div ref={ref}>
          <div className="section-label" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            Historia
          </div>
          <h2 className="section-title" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.2s',
          }}>
            Moja droga
          </h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
          {events.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}