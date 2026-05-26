import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 150;
const CONNECT_DIST = 120;
const FLEE_RADIUS = 80;

function hexagonPoints(cx, cy, r, count) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const a = (Math.PI / 3) * (i % 6) - Math.PI / 6;
    const scale = Math.random() * r * 0.5 + r * 0.5;
    pts.push({ x: cx + Math.cos(a) * scale, y: cy + Math.sin(a) * scale });
  }
  return pts;
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);
  const gravityTimer = useRef(null);
  const isGravity = useRef(false);
  const targets = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function initParticles() {
      particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.5 + 0.5,
        type: Math.floor(Math.random() * 3), // 0=dot, 1=mini-hex, 2=cross
        opacity: Math.random() * 0.4 + 0.2,
      }));
    }
    initParticles();

    function drawParticle(p) {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = `rgba(59,107,200,0.8)`;
      ctx.strokeStyle = `rgba(59,107,200,0.8)`;

      if (p.type === 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 1) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i;
          const r = p.size * 2;
          if (i === 0) ctx.moveTo(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r);
          else ctx.lineTo(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(59,107,200,0.6)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else {
        const s = p.size * 2.5;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(p.x - s, p.y); ctx.lineTo(p.x + s, p.y);
        ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x, p.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ps = particles.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        if (isGravity.current && targets.current[i]) {
          const tx = targets.current[i].x;
          const ty = targets.current[i].y;
          p.vx += (tx - p.x) * 0.003;
          p.vy += (ty - p.y) * 0.003;
        } else {
          // Mouse flee
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < FLEE_RADIUS) {
            const force = (FLEE_RADIUS - dist) / FLEE_RADIUS;
            p.vx += (dx / dist) * force * 1.5;
            p.vy += (dy / dist) * force * 1.5;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        drawParticle(p);

        // Connect nearby
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx2 = p.x - q.x;
          const dy2 = p.y - q.y;
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d < CONNECT_DIST) {
            ctx.globalAlpha = (1 - d / CONNECT_DIST) * 0.25;
            ctx.strokeStyle = 'rgba(59,107,200,0.8)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    }

    tick();

    // Gravity cycle every 8s
    function triggerGravity() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      targets.current = hexagonPoints(cx, cy, 120, PARTICLE_COUNT);
      isGravity.current = true;
      setTimeout(() => { isGravity.current = false; }, 2000);
    }

    gravityTimer.current = setInterval(triggerGravity, 8000);

    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf.current);
      } else {
        tick();
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf.current);
      clearInterval(gravityTimer.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
