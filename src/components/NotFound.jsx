export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(6rem, 20vw, 12rem)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, var(--purple-1), var(--purple-3))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        opacity: 0.3,
        userSelect: 'none',
      }}>
        404
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.5rem',
        color: 'var(--text)',
        marginTop: '-24px',
      }}>
        Strona nie istnieje
      </div>

      <p style={{ color: 'var(--text-muted)', maxWidth: '360px', fontSize: '0.9rem' }}>
        Wygląda na to, że ta strona zgubiła się w sieci. Wróć na główną i przeglądaj portfolio.
      </p>

      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '13px 28px',
          background: 'linear-gradient(135deg, var(--purple-1), var(--purple-2))',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.06em',
          borderRadius: '8px',
          transition: 'opacity 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
      >
        ← Wróć do domu
      </a>

      {/* Fake terminal */}
      <div style={{
        marginTop: '16px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '16px 20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        textAlign: 'left',
        maxWidth: '340px',
        width: '100%',
      }}>
        <span style={{ color: '#ff5f57' }}>ERROR</span>
        {' '}<span style={{ color: 'var(--text-dim)' }}>404</span>
        <br />
        <span style={{ color: '#86efac' }}>path</span>
        {' '}<span style={{ color: 'var(--text-dim)' }}>not found in</span>
        {' '}<span style={{ color: 'var(--purple-3)' }}>szymon.dev</span>
        <br />
        <span style={{ color: 'var(--purple-3)', animation: 'pulse-glow 1.2s infinite' }}>▋</span>
      </div>
    </div>
  )
}