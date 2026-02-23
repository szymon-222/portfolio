import { useEffect, useRef, useState } from 'react'

const stacks = [
  {
    category: 'Frontend',
    items: [
      { name: 'React',       icon: '⚛️',  color: '#61dafb' },
      { name: 'JavaScript',  icon: '🟨',  color: '#f7df1e' },
      { name: 'HTML',        icon: '🧱',  color: '#e34f26' },
      { name: 'CSS',         icon: '🎨',  color: '#264de4' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js',     icon: '🟢',  color: '#68a063' },
      { name: 'Express',     icon: '🚂',  color: '#a78bfa' },
      { name: 'Socket.io',   icon: '⚡',  color: '#ffffff' },
      { name: 'Python',      icon: '🐍',  color: '#3776ab' },
    ],
  },
  {
    category: 'Bazy danych',
    items: [
      { name: 'Supabase',    icon: '⚡',  color: '#3ecf8e' },
      { name: 'PostgreSQL',  icon: '🐘',  color: '#336791' },
      { name: 'MySQL',       icon: '🐬',  color: '#00758f' },
    ],
  },
  {
    category: 'Inne',
    items: [
      { name: 'Java',        icon: '☕',  color: '#f89820' },
      { name: 'C',           icon: '⚙️',  color: '#a8b9cc' },
      { name: 'Git',         icon: '🌿',  color: '#f05032' },
      { name: 'Vercel',      icon: '▲',   color: '#ffffff' },
    ],
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

function TechItem({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '20px 16px',
        background: hovered ? item.color + '12' : 'var(--surface)',
        border: `1px solid ${hovered ? item.color + '50' : 'var(--border)'}`,
        borderRadius: '12px',
        cursor: 'default',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px ${item.color}20` : 'none',
      }}
    >
      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{item.icon}</span>
      <span style={{
        fontSize: '0.7rem',
        letterSpacing: '0.06em',
        color: hovered ? item.color : 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        transition: 'color 0.25s',
        textAlign: 'center',
      }}>
        {item.name}
      </span>
    </div>
  )
}

export default function Stack() {
  const [ref, inView] = useInView()

  return (
    <section id="stack" style={{
      padding: 'var(--section-padding)',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Dekoracyjna linia w tle */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(118,75,162,0.06) 0%, transparent 70%)',
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
            Stack
          </div>

          <h2 className="section-title" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.2s',
          }}>
            Czym pracuję
          </h2>
        </div>

        {/* Kategorie */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {stacks.map((group, gi) => (
            <div key={group.category} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s ease ${0.2 + gi * 0.1}s`,
            }}>
              {/* Nazwa kategorii */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
              }}>
                <span style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--purple-3)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {group.category}
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(to right, var(--border), transparent)',
                }} />
              </div>

              {/* Ikonki */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '12px',
              }}>
                {group.items.map((item, ii) => (
                  <TechItem key={item.name} item={item} index={ii} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}