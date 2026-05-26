import LogoSVG from './LogoSVG';
import ToolsParticles from './ToolsParticles';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ToolsParticles />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Marca */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <LogoSVG size={28} />
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>SIPCTM</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-3)', lineHeight: 1.6, maxWidth: 220 }}>
              Sistema de gestión para talleres mecánicos.
            </p>
          </div>

          {/* Producto */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Producto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Funciones', href: '#features' },
                { label: 'Precios', href: '#pricing' },
                { label: 'Cómo funciona', href: '#how-it-works' },
              ].map(l => (
                <a key={l.label}
                  href={l.href}
                  style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Acceso */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Acceso
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="https://sipctm.netlify.app" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
              >
                Ingresar al sistema
              </a>
              <a
                href="https://wa.me/5491155773344?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20SIPCTM"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          {/* Proyecto académico */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Proyecto académico
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', lineHeight: 1.55 }}>
                Monzón · Mesquiatti · Tolazzi
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-3)', lineHeight: 1.55, opacity: 0.8 }}>
                Instituto Tecnológico Beltrán
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-3)', lineHeight: 1.55, opacity: 0.8 }}>
                Tec. Superior en Ciencia de Datos e IA
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-3)', lineHeight: 1.55, opacity: 0.8 }}>
                Gestión de Proyectos · 2025
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer académico */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem',
            marginBottom: '1rem',
            background: 'rgba(59,107,200,0.04)',
            borderRadius: 8,
            padding: '0.875rem 1rem',
            border: '1px solid rgba(59,107,200,0.12)',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', lineHeight: 1.6, textAlign: 'center' }}>
            <span style={{ color: 'var(--blue-circuit)', fontWeight: 600 }}>Proyecto académico — TP Final 2025.</span>
            {' '}Los precios y planes son referenciales. Sin pagos online. Para consultas, contactar por WhatsApp.
          </p>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>
            © {year} SIPCTM. Proyecto académico.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>
            Instituto Tecnológico Beltrán · 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
