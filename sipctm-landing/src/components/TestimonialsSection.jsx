import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import ToolsParticles from './ToolsParticles';

const TESTIMONIALS = [
  {
    name: 'Rodrigo Fernández',
    role: 'Dueño — Taller Fernández, Córdoba',
    text: 'Antes perdía una hora por día buscando papeles. Ahora en 2 minutos tengo el historial completo de cualquier auto. SIPCTM cambió la forma en que trabajo.',
    stars: 5,
    initials: 'RF',
  },
  {
    name: 'Marcela Gómez',
    role: 'Administradora — AutoService MG, Rosario',
    text: 'Los presupuestos me llevaban 20 minutos. Hoy los hago en 3. Los clientes reciben el PDF por WhatsApp y quedan impresionados con lo profesional que se ve.',
    stars: 5,
    initials: 'MG',
  },
  {
    name: 'Tomás Herrera',
    role: 'Mecánico principal — Taller Sur, Buenos Aires',
    text: 'El stock era un desastre. Con SIPCTM sabemos exactamente qué tenemos, qué hay que pedir y cuándo. Nunca más le decimos a un cliente "no tenemos la pieza".',
    stars: 5,
    initials: 'TH',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="section"
      ref={ref}
      style={{ background: '#060810', position: 'relative', overflow: 'hidden' }}
    >
      <ToolsParticles />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p className="section-label">Testimonios</p>
            <h2 className="section-title">Lo que dicen los talleres</h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '1.75rem' }}
              >
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} fill="var(--blue-main)" color="var(--blue-main)" />
                  ))}
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'rgba(59,107,200,0.15)',
                      border: '1.5px solid rgba(59,107,200,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8125rem', fontWeight: 700, color: 'var(--blue-circuit)', flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>{t.name}</p>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-3)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
