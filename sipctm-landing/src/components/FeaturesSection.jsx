import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, Package, FileText, Users, BarChart2, Clock } from 'lucide-react';
import ToolsParticles from './ToolsParticles';

const FEATURES = [
  {
    icon: ClipboardList,
    title: 'Órdenes de trabajo digitales',
    desc: 'Creá, asignás y seguís cada trabajo en tiempo real. Estado, mecánico asignado, fotos y notas en un click.',
  },
  {
    icon: Package,
    title: 'Control de stock inteligente',
    desc: 'Alertas automáticas de stock mínimo, historial de movimientos y trazabilidad por número de pieza.',
  },
  {
    icon: FileText,
    title: 'Presupuestos en segundos',
    desc: 'Generá presupuestos profesionales con repuestos y mano de obra. Enviá por WhatsApp con un toque.',
  },
  {
    icon: Users,
    title: 'Historial completo de clientes',
    desc: 'Cada cliente con sus vehículos, trabajos realizados, fotos, kilometraje y observaciones del mecánico.',
  },
  {
    icon: BarChart2,
    title: 'Reportes e ingresos',
    desc: 'Tablero de control con métricas del taller: ingresos del mes, trabajos completados, vehículos atendidos.',
  },
  {
    icon: Clock,
    title: 'Recordatorios y seguimiento',
    desc: 'Avisá al cliente cuando el auto está listo. Recordatorios automáticos de service o vencimiento de póliza.',
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
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
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p className="section-label">Funciones</p>
            <h2 className="section-title">Todo lo que tu taller necesita</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Herramientas diseñadas para la realidad del taller argentino. Sin complicaciones, sin curva de aprendizaje.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(136,90,57,0.18)' }}
                  className="glass-card"
                  style={{ padding: '1.75rem', cursor: 'default' }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(136,90,57,0.12)',
                      border: '1px solid rgba(136,90,57,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      color: 'var(--blue-circuit)',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
