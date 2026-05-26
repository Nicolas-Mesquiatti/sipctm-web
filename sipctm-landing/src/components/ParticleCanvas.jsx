import { useEffect, useRef } from 'react';

export default function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const PARTICLE_COUNT = 150;
    const COLOR_BASE = isDark
      ? 'rgba(59, 107, 200,'
      : 'rgba(30, 58, 110,';

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:      Math.random() * window.innerWidth,
      y:      Math.random() * window.innerHeight,
      vx:     (Math.random() - 0.5) * 0.4,
      vy:     (Math.random() - 0.5) * 0.4,
      r:      1 + Math.random() * 2.5,
      opacity: 0.2 + Math.random() * 0.5,
      type:   Math.floor(Math.random() * 3), // 0=círculo, 1=mini hex, 2=cruz
    }));

    const drawHex = (x, y, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + r * Math.cos(angle);
        const py = y + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawCross = (x, y, r) => {
      ctx.beginPath();
      ctx.moveTo(x - r, y); ctx.lineTo(x + r, y);
      ctx.moveTo(x, y - r); ctx.lineTo(x, y + r);
    };

    let lastHexTime = Date.now();
    let hexActive   = false;
    let hexProgress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      if (now - lastHexTime > 8000) {
        hexActive    = true;
        hexProgress  = 0;
        lastHexTime  = now;
      }
      if (hexActive) {
        hexProgress += 0.008;
        if (hexProgress >= 1) { hexActive = false; hexProgress = 0; }
      }

      const cx   = canvas.width  / 2;
      const cy   = canvas.height / 2;
      const hexR = Math.min(canvas.width, canvas.height) * 0.25;

      particles.forEach((p, i) => {
        // Target para gravedad hexagonal
        const angle = (Math.PI * 2 / PARTICLE_COUNT) * i - Math.PI / 6;
        const snap  = hexActive ? hexProgress : 0;
        const tx    = cx + hexR * Math.cos(angle);
        const ty    = cy + hexR * Math.sin(angle);

        p.x += p.vx + (tx - p.x) * snap * 0.015;
        p.y += p.vy + (ty - p.y) * snap * 0.015;

        // Repulsión del cursor
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) / 80;
          p.x += dx * force * 0.08;
          p.y += dy * force * 0.08;
        }

        // Wrap en bordes
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Iluminar si está cerca del cursor
        const nearMouse = dist < 120;
        const alpha     = nearMouse ? Math.min(p.opacity + 0.4, 1) : p.opacity;

        ctx.strokeStyle = `${COLOR_BASE}${alpha})`;
        ctx.fillStyle   = `${COLOR_BASE}${alpha})`;
        ctx.lineWidth   = 1;

        if (p.type === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 1) {
          drawHex(p.x, p.y, p.r + 1);
          ctx.stroke();
        } else {
          drawCross(p.x, p.y, p.r + 1);
          ctx.stroke();
        }
      });

      // Líneas de conexión entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `${COLOR_BASE}${(1 - d / 120) * 0.18})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else animId = requestAnimationFrame(animate);
    };
    document.addEventListener('visibilitychange', onVis);

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
