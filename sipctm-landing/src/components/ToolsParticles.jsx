import { useEffect, useRef } from 'react';

const TOOL_PATHS = {
  wrench:      'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  gear:        'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41',
  screwdriver: 'M4 20l4-4 10-10-4-4L4 12v8z M14 6l4 4',
  hammer:      'M15 12l-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9M17.64 15L22 10.64',
  bolt:        'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  nut:         'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  wrench2:     'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18',
  gauge:       'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v2M6 12H4M12 12l3-4',
  toolbox:     'M3 6h18v12H3zM3 10h18M8 10v8M16 10v8',
  circuit:     'M4 6h4M4 10h4M4 14h4M16 6h4M16 10h4M16 14h4M8 6v2M8 12v2M16 6v2M16 12v2M12 4v16',
};

const TOOL_TYPES = Object.keys(TOOL_PATHS);
const COUNT = 60;

export default function ToolsParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const tools = Array.from({ length: COUNT }, () => ({
      x:        Math.random() * (canvas.width  || window.innerWidth),
      y:        Math.random() * (canvas.height || window.innerHeight),
      vx:       (Math.random() - 0.5) * 0.28,
      vy:       (Math.random() - 0.5) * 0.28,
      size:     12 + Math.random() * 18,
      opacity:  0.05 + Math.random() * 0.10,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      type:     TOOL_TYPES[Math.floor(Math.random() * TOOL_TYPES.length)],
    }));

    const drawTool = (tool) => {
      // Lee el tema actual del DOM en cada frame → sin prop drilling
      const isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';

      const { x, y, size, opacity, rotation, type } = tool;
      const dx   = x - mouse.x;
      const dy   = y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const baseAlpha = isDarkMode ? opacity : opacity * 2.5;
      const nearAlpha = isDarkMode ? Math.min(opacity * 4, 0.35) : Math.min(opacity * 4, 0.25);
      const alpha = dist < 100 ? nearAlpha : baseAlpha;

      const color = isDarkMode ? '59, 107, 200' : '30, 58, 110';

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 24, size / 24);
      ctx.translate(-12, -12);

      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth   = 2;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';

      ctx.stroke(new Path2D(TOOL_PATHS[type]));
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      tools.forEach(t => {
        t.x += t.vx;
        t.y += t.vy;
        t.rotation += t.rotSpeed;

        const dx   = t.x - mouse.x;
        const dy   = t.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) / 80;
          t.x += (dx / dist) * force * 1.2;
          t.y += (dy / dist) * force * 1.2;
        }

        if (t.x < -t.size)                t.x = canvas.width  + t.size;
        if (t.x > canvas.width  + t.size) t.x = -t.size;
        if (t.y < -t.size)                t.y = canvas.height + t.size;
        if (t.y > canvas.height + t.size) t.y = -t.size;

        drawTool(t);
      });

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
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVis);
      resizeObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
