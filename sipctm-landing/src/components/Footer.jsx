import LogoSVG from './LogoSVG';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 0 2rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <LogoSVG size={28} />
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>SIPCTM</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-3)', lineHeight: 1.6, maxWidth: 220 }}>
              Sistema de gestión para talleres mecánicos argentinos.
            </p>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Producto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Funciones', 'Precios', 'Cómo funciona'].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}
                  style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Legal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Términos de uso', 'Privacidad'].map(l => (
                <a key={l} href="#"
                  style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Contacto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="https://sipctm.netlify.app"
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
              >
                Ingresar al sistema
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>
            © {year} SIPCTM. Todos los derechos reservados.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>
            Hecho con ♥ para talleres argentinos
          </p>
        </div>
      </div>
    </footer>
  );
}
