import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import ToolsParticles from './ToolsParticles';

const WA_URL = 'https://wa.me/5491155773344?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20plan%20Full%20de%20SIPCTM';

const PLANS = [
  {
    name: 'Básico',
    priceMonthly: 25,
    priceWeekly: 6.25,
    tag: 'PRIMEROS PASOS',
    desc: 'Para talleres que están arrancando y quieren digitalizar su gestión.',
    features: [
      'Hasta 20 órdenes de trabajo / mes',
      '1 usuario / mecánico',
      'Historial básico de clientes y vehículos',
      'Presupuestos simples',
      'Soporte por email',
    ],
    cta: 'Empezar gratis',
    ctaHref: 'https://sipctm.netlify.app',
    whatsapp: false,
    featured: false,
  },
  {
    name: 'Profesional',
    priceMonthly: 45,
    priceWeekly: 11.25,
    tag: 'MÁS POPULAR',
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
    cta: 'Empezar con Profesional',
    ctaHref: 'https://sipctm.netlify.app',
    whatsapp: false,
    featured: true,
  },
  {
    name: 'Full',
    priceMonthly: 75,
    priceWeekly: 18.75,
    tag: 'OPERACIÓN COMPLETA',
    desc: 'Para talleres grandes con múltiples mecánicos, alta rotación y necesidad de control total.',
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
    cta: 'Consultar por WhatsApp',
    ctaHref: WA_URL,
    whatsapp: true,
    featured: false,
  },
];

function AnimatedPrice({ target, inView, prefix = 'USD ' }) {
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

  const formatted = Number.isInteger(target) ? displayed.toFixed(0) : displayed.toFixed(2);
  return `${prefix}${formatted}`;
}

function PricingCard({ plan, index, inView, weekly }) {
  const price = weekly ? plan.priceWeekly : plan.priceMonthly;
  const period = weekly ? '/semana' : '/mes';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.13 }}
      whileHover={{ y: -6, boxShadow: plan.featured ? '0 24px 64px rgba(59,107,200,0.3)' : '0 12px 40px rgba(59,107,200,0.15)' }}
      style={{
        position: 'relative',
        borderRadius: 18,
        padding: plan.featured ? '2.5rem 2rem' : '2rem 1.75rem',
        background: plan.featured ? 'rgba(59,107,200,0.07)' : 'rgba(255,255,255,0.03)',
        border: plan.featured ? '1px solid rgba(91,143,232,0.4)' : '1px solid rgba(59,107,200,0.12)',
        overflow: 'hidden',
        cursor: 'default',
        transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Pulsing border for featured */}
      {plan.featured && (
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0px rgba(59,107,200,0)',
              '0 0 40px rgba(59,107,200,0.5)',
              '0 0 0px rgba(59,107,200,0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 18,
            border: '1px solid rgba(91,143,232,0.5)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Badge */}
      {plan.featured && (
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
            background: 'linear-gradient(90deg, #3B6BC8, #5B8FE8)',
            color: '#fff', padding: '4px 16px', borderRadius: 99,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
            boxShadow: '0 4px 20px rgba(59,107,200,0.5)', whiteSpace: 'nowrap', zIndex: 2,
          }}
        >
          ⭐ MÁS POPULAR
        </motion.div>
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Tag */}
        <p style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--blue-circuit)', marginBottom: '0.35rem',
        }}>
          {plan.tag}
        </p>

        {/* Plan name */}
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
          {plan.name}
        </h3>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${plan.name}-${weekly ? 'w' : 'm'}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '2.25rem', fontWeight: 800,
                color: plan.featured ? 'var(--blue-circuit)' : 'var(--text)',
              }}
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
              <span style={{ color: 'var(--blue-circuit)', flexShrink: 0, marginTop: '0.1rem', fontSize: '0.9rem' }}>✦</span>
              <span style={{ color: 'var(--text-2)', lineHeight: 1.5 }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={plan.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
          style={{
            width: '100%', justifyContent: 'center',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          {plan.whatsapp && <MessageCircle size={15} />}
          {plan.cta}
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
              Empezá gratis y escalá cuando tu taller crezca. Precios en USD, sin sorpresas.
            </p>

            {/* Toggle mensual / semanal */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(59,107,200,0.08)', border: '1px solid rgba(59,107,200,0.15)', borderRadius: 99, padding: '0.3rem 0.4rem' }}>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
              paddingTop: '1rem',
            }}
          >
            {PLANS.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} inView={inView} weekly={weekly} />
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              marginTop: '2.5rem', textAlign: 'center',
              padding: '1rem 1.5rem',
              background: 'rgba(59,107,200,0.05)',
              border: '1px solid rgba(59,107,200,0.1)',
              borderRadius: 10,
              maxWidth: 600, margin: '2.5rem auto 0',
            }}
          >
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--blue-circuit)', fontWeight: 600 }}>Valores estimativos en USD.</span>
              {' '}Sin pagos online — consultá por WhatsApp.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', opacity: 0.7, marginTop: '0.25rem' }}>
              Los precios son referenciales para el proyecto académico SIPCTM.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
