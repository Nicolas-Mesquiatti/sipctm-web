import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ToolsParticles from './ToolsParticles';

const WA_NUMBER = '5491155773344';
const WA_MESSAGES = {
  basico: encodeURIComponent('Hola! Me interesa el Plan Básico de SIPCTM (USD 25/mes). ¿Podés darme más información?'),
  profesional: encodeURIComponent('Hola! Me interesa el Plan Profesional de SIPCTM (USD 45/mes). ¿Podés darme más información?'),
  full: encodeURIComponent('Hola! Me interesa el Plan Full de SIPCTM (USD 75/mes). ¿Podés darme más información?'),
};

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PLANS = [
  {
    key: 'basico',
    name: 'Básico',
    priceMonthly: 25,
    priceWeekly: 6.25,
    tag: 'PRIMEROS PASOS',
    badge: null,
    desc: 'Para talleres que están arrancando y quieren digitalizar su gestión.',
    features: [
      'Hasta 20 órdenes de trabajo / mes',
      '1 usuario / mecánico',
      'Historial básico de clientes y vehículos',
      'Presupuestos simples',
      'Soporte por email',
    ],
    featured: false,
  },
  {
    key: 'profesional',
    name: 'Profesional',
    priceMonthly: 45,
    priceWeekly: 11.25,
    tag: 'MÁS POPULAR',
    badge: '⭐ MÁS POPULAR',
    desc: 'La elección más popular. Todo lo que un taller profesional necesita para crecer.',
    features: [
      'Órdenes de trabajo ilimitadas',
      'Hasta 5 mecánicos',
      'Control de stock con alertas automáticas',
      'Estimación de tiempos con IA',
      'Notificaciones automáticas a clientes',
      'Reportes de ingresos y métricas',
      'Historial completo de vehículos',
      'Presupuestos con logo del taller',
      'Soporte prioritario',
    ],
    featured: true,
  },
  {
    key: 'full',
    name: 'Full',
    priceMonthly: 75,
    priceWeekly: 18.75,
    tag: 'OPERACIÓN COMPLETA',
    badge: null,
    desc: 'Para talleres grandes con múltiples mecánicos, alta rotación y control total.',
    features: [
      'Todo lo del plan Profesional',
      'Mecánicos ilimitados',
      'Multi-sucursal',
      'API de integración',
      'Recordatorios automáticos de service',
      'Exportación de datos',
      'Onboarding personalizado',
      'Soporte 24/7',
    ],
    featured: false,
  },
];

function AnimatedPrice({ target, inView }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    setDisplayed(0);
  }, [target]);

  useEffect(() => {
    if (!inView) return;
    const duration = 800;
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setDisplayed(Math.round(target * eased * 100) / 100);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  const isInt = Number.isInteger(target);
  return `USD ${isInt ? Math.round(displayed) : displayed.toFixed(2)}`;
}

function PricingCard({ plan, index, inView, weekly }) {
  const price = weekly ? plan.priceWeekly : plan.priceMonthly;
  const period = weekly ? '/semana' : '/mes';
  const waHref = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGES[plan.key]}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.13 }}
      whileHover={{ y: -5, boxShadow: plan.featured ? '0 20px 56px rgba(59,107,200,0.28)' : '0 10px 32px rgba(59,107,200,0.12)' }}
      style={{
        position: 'relative',
        borderRadius: 18,
        padding: '2rem 1.75rem',
        background: plan.featured ? 'rgba(59,107,200,0.07)' : 'rgba(255,255,255,0.03)',
        border: plan.featured
          ? '1px solid rgba(91,143,232,0.5)'
          : '1px solid rgba(59,107,200,0.12)',
        boxShadow: plan.featured ? '0 0 30px rgba(59,107,200,0.18)' : 'none',
        transform: plan.featured ? 'scale(1.02)' : 'scale(1)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
    >
      {/* Pulsing glow border for featured */}
      {plan.featured && (
        <motion.div
          animate={{ boxShadow: ['0 0 0px rgba(59,107,200,0)', '0 0 36px rgba(59,107,200,0.45)', '0 0 0px rgba(59,107,200,0)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: 18, border: '1px solid rgba(91,143,232,0.45)', pointerEvents: 'none' }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Badge MÁS POPULAR — dentro del flujo, no absolute */}
        {plan.badge && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'linear-gradient(90deg, #3B6BC8, #5B8FE8)',
            color: 'white', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.06em', padding: '4px 12px',
            borderRadius: 99, marginBottom: 12, alignSelf: 'flex-start',
          }}>
            {plan.badge}
          </div>
        )}

        {/* Tag — solo si no hay badge */}
        {!plan.badge && (
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-circuit)', marginBottom: '0.4rem' }}>
            {plan.tag}
          </p>
        )}

        {/* Plan name */}
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
          {plan.name}
        </h3>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${plan.key}-${weekly ? 'w' : 'm'}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: '2.25rem', fontWeight: 800, color: plan.featured ? 'var(--blue-circuit)' : 'var(--text)' }}
            >
              <AnimatedPrice target={price} inView={inView} />
            </motion.span>
          </AnimatePresence>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-3)' }}>{period}</span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: '1.5rem', lineHeight: 1.55 }}>
          {plan.desc}
        </p>

        {/* Features */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem', flex: 1 }}>
          {plan.features.map((f, fi) => (
            <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--blue-circuit)', flexShrink: 0, marginTop: '0.1rem', fontSize: '0.85rem' }}>✦</span>
              <span style={{ color: 'var(--text-2)', lineHeight: 1.5 }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, width: '100%', padding: '12px',
            borderRadius: 8, textDecoration: 'none',
            background: plan.featured ? '#3B6BC8' : 'transparent',
            border: plan.featured ? 'none' : '1px solid rgba(59,107,200,0.4)',
            color: plan.featured ? 'white' : '#5B8FE8',
            fontSize: 14, fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = plan.featured ? '#4E7ED6' : 'rgba(59,107,200,0.08)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = plan.featured ? '#3B6BC8' : 'transparent';
            e.currentTarget.style.transform = '';
          }}
        >
          {WA_ICON}
          Consultar por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [weekly, setWeekly] = useState(false);

  return (
    <section
      id="pricing"
      className="section"
      ref={ref}
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <ToolsParticles />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p className="section-label">Precios</p>
            <h2 className="section-title">Planes para cada etapa</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
              Empezá con el plan que necesitás y escalá a medida que tu taller crece.
            </p>

            {/* Toggle mensual / semanal */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(59,107,200,0.07)', border: '1px solid rgba(59,107,200,0.15)',
              borderRadius: 99, padding: '0.3rem 0.4rem',
            }}>
              <button
                onClick={() => setWeekly(false)}
                style={{
                  padding: '0.4rem 1.1rem', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: !weekly ? '#3B6BC8' : 'transparent',
                  color: !weekly ? '#fff' : 'var(--text-3)',
                  fontSize: '0.8125rem', fontWeight: 600, transition: 'all 0.2s',
                }}
              >
                Mensual
              </button>
              <button
                onClick={() => setWeekly(true)}
                style={{
                  padding: '0.4rem 1.1rem', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: weekly ? '#3B6BC8' : 'transparent',
                  color: weekly ? '#fff' : 'var(--text-3)',
                  fontSize: '0.8125rem', fontWeight: 600, transition: 'all 0.2s',
                }}
              >
                Semanal
              </button>
            </div>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem', alignItems: 'center', paddingTop: '1rem',
          }}>
            {PLANS.map((plan, i) => (
              <PricingCard key={plan.key} plan={plan} index={i} inView={inView} weekly={weekly} />
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              textAlign: 'center', fontSize: 12,
              color: 'var(--text-3)', marginTop: 24, lineHeight: 1.7,
            }}
          >
            Sin pagos online. La contratación se realiza por WhatsApp.{' '}
            Valores estimativos — proyecto académico SIPCTM.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
