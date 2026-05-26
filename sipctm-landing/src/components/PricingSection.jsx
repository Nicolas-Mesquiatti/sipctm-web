import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import WebGLRing from './WebGLRing';

const PLANS = [
  {
    name: 'Arranque',
    price: 'Gratis',
    period: '',
    target: 'Primeros pasos',
    desc: 'Para talleres que están empezando y quieren probar el sistema.',
    features: [
      'Hasta 20 órdenes de trabajo por mes',
      '1 usuario / mecánico',
      'Control de clientes básico',
      'Presupuestos simples',
      'Soporte por email',
    ],
    cta: 'Empezar gratis',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$12.999',
    period: '/mes',
    target: 'Talleres que escalan',
    desc: 'La elección más popular. Todo lo que un taller profesional necesita.',
    features: [
      'Órdenes de trabajo ilimitadas',
      'Hasta 5 mecánicos',
      'Control de stock con alertas',
      'Reportes de ingresos',
      'Historial completo de vehículos',
      'Presupuestos con logo del taller',
      'Soporte prioritario',
    ],
    cta: 'Empezar con Pro',
    featured: true,
  },
  {
    name: 'Taller Completo',
    price: '$24.999',
    period: '/mes',
    target: 'Operación completa',
    desc: 'Para talleres grandes con múltiples mecánicos y alta rotación.',
    features: [
      'Todo lo del plan Pro',
      'Mecánicos ilimitados',
      'Multi-sucursal',
      'API de integración',
      'Recordatorios automáticos',
      'Exportación de datos',
      'Soporte 24/7 + onboarding',
    ],
    cta: 'Contactar ventas',
    featured: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p className="section-label">Precios</p>
          <h2 className="section-title">Planes para cada etapa</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Empezá gratis y escalá cuando tu taller crezca. Precios en pesos argentinos, sin sorpresas.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: plan.featured ? '2.25rem 2rem' : '1.75rem 1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
                borderColor: plan.featured ? 'rgba(59,107,200,0.45)' : undefined,
                boxShadow: plan.featured ? '0 0 40px rgba(59,107,200,0.2)' : undefined,
              }}
            >
              {/* WebGL ring for featured */}
              {plan.featured && <WebGLRing size={320} />}

              {/* Featured badge */}
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--blue-main)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 999,
                    zIndex: 2,
                  }}
                >
                  ⭐ Popular
                </div>
              )}

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--blue-circuit)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {plan.target}
                </p>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: plan.price === 'Gratis' ? '2rem' : '2.25rem',
                      fontWeight: 800,
                      color: plan.featured ? 'var(--blue-circuit)' : 'var(--text)',
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-3)' }}>{plan.period}</span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-2)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5,
                  }}
                >
                  {plan.desc}
                </p>

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem' }}>
                      <Check
                        size={15}
                        style={{ color: 'var(--blue-main)', flexShrink: 0, marginTop: '0.15rem' }}
                        strokeWidth={2.5}
                      />
                      <span style={{ color: 'var(--text-2)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://sipctm.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
