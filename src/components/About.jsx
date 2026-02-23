import { useEffect, useRef, useState } from 'react'

const highlights = [
  { icon: '💡', title: 'Czysty kod', desc: 'Cenię przejrzystość, strukturę i realną użyteczność każdego projektu.' },
  { icon: '🚀', title: 'Własne projekty', desc: 'Tworzę aplikacje z pasją od koncepcji po wdrożenie.' },
  { icon: '📈', title: 'Ciągły rozwój', desc: 'Nieustannie uczę się nowych technologii, by być coraz lepszym.' },
]

const stats = [
  { target: 4,  suffix: '+', label: 'Projektów'    },
  { target: 2,  suffix: '+', label: 'Lat kodowania' },
  { target: 10, suffix: '+', label: 'Technologii'   },
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

// Animowany licznik 0 → target
function Counter({ target, suffix, started }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!started) return
    let start = null
    const duration = 1200

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setVal(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [started, target])

  return <>{val}{suffix}</>
}

function StatCard({ stat, started }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--purple-2)' : 'var(--border)'}`,
        borderRadius: '12px',
        padding: '20px 16px',
        textAlign: 'center',
        transition: 'all 0.25s',
        cursor: 'default',
        boxShadow: hovered ? '0 4px 20px rgba(118,75,162,0.15)' : 'none',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.2rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        <Counter target={stat.target} suffix={stat.suffix} started={started} />
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{stat.label}</div>
    </div>
  )
}

function HighlightCard({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '16px', alignItems: 'flex-start',
        padding: '16px 20px',
        background: hovered ? 'rgba(102,126,234,0.06)' : 'var(--surface)',
        border: `1px solid ${hovered ? 'rgba(179,157,252,0.3)' : 'var(--border)'}`,
        borderRadius: '10px',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
      <div>
        <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{item.title}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</div>
      </div>
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" style={{ padding: 'var(--section-padding)', position: 'relative', zIndex: 2 }}>
      <div className="container" ref={ref}>

        <div className="section-label" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          O mnie
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Lewa — tekst */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, lineHeight: 1.1, marginBottom: '32px',
            }}>
              Piszę kod,{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                nie tylko uczę się go.
              </span>
            </h2>

            <p style={{ marginBottom: '18px' }}>
              Ukończyłem technikum o profilu <strong style={{ color: 'var(--text)', fontWeight: 600 }}>technik programista</strong>, zdobywając tytuł zawodowy technika.
              Obecnie studiuję <strong style={{ color: 'var(--text)', fontWeight: 600 }}>informatykę na Politechnice Rzeszowskiej</strong>, rozwijając wiedzę z zakresu
              programowania, architektury systemów i technologii webowych.
            </p>
            <p style={{ marginBottom: '18px' }}>
              Podczas praktyk zawodowych tworzyłem oraz testowałem wewnętrzne aplikacje użytkowe
              w środowisku biurowym. Poza tym realizuję <strong style={{ color: 'var(--text)', fontWeight: 600 }}>własne projekty</strong> od
              prostych stron po fullstackowe aplikacje webowe z autoryzacją i bazą danych.
            </p>
            <p style={{ marginBottom: '40px' }}>
              Jestem osobą ambitną, która szybko się uczy i dąży do nieustannego rozwoju.
              W pracy cenię sobie <strong style={{ color: 'var(--text)', fontWeight: 600 }}>czystość kodu, przejrzystość interfejsu i realną użyteczność projektów</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {highlights.map((h, i) => <HighlightCard key={i} item={h} />)}
            </div>
          </div>

          {/* Prawa — terminal + statsy */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.4s',
          }}>
            {/* Terminal */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', overflow: 'hidden', marginBottom: '24px',
            }}>
              <div style={{
                padding: '12px 18px', background: 'var(--bg-2)',
                borderBottom: '1px solid var(--border)',
                display: 'flex', gap: '8px', alignItems: 'center',
              }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                ))}
                <span style={{ marginLeft: '8px', fontSize: '0.7rem', color: 'var(--text-dim)' }}>szymon@politechnika-rzeszowska ~ zsh</span>
              </div>
              <div style={{ padding: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 2.1 }}>
                <div><span style={{ color: 'var(--purple-3)' }}>const</span> <span style={{ color: '#93c5fd' }}>szymon</span> <span style={{ color: 'var(--text-muted)' }}>=</span> {'{'}</div>
                {[
                  ['role',       '"Fullstack Developer"'],
                  ['edu',        '"Politechnika Rzeszowska"'],
                  ['location',   '"Podkarpacie, PL"'],
                  ['internship', '"doświadczenie zawodowe ✓"'],
                ].map(([k, v]) => (
                  <div key={k} style={{ paddingLeft: '20px' }}>
                    <span style={{ color: '#86efac' }}>{k}</span>
                    <span style={{ color: 'var(--text-muted)' }}>: </span>
                    <span style={{ color: '#fca5a5' }}>{v}</span>
                    <span style={{ color: 'var(--text-dim)' }}>,</span>
                  </div>
                ))}
                <div style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#86efac' }}>available</span>
                  <span style={{ color: 'var(--text-muted)' }}>: </span>
                  <span style={{ color: 'var(--purple-3)' }}>true</span>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
                <div style={{ marginTop: '4px' }}>
                  <span style={{ color: 'var(--purple-3)', animation: 'pulse-glow 1.2s infinite' }}>▋</span>
                </div>
              </div>
            </div>

            {/* Statystyki z licznikami */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {stats.map((s, i) => <StatCard key={i} stat={s} started={inView} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}