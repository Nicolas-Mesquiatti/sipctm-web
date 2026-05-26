import { useEffect, useRef } from 'react';

const TOOL_PATHS = {
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  bolt: 'M6 2 3 6h3l-3 8 9-10H9l3-4z',
  hammer: 'M15 12l-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9M17.64 15L22 10.64M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9',
  screwdriver: 'M4 20l4-4 10-10-4-4L4 12v8z M14 6l4 4',
};

const TOOL_TYPES = Object.keys(TOOL_PATHS);

export default function ToolsParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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

    const COUNT = 25;

    const tools = Array.from({ length: COUNT }, () => ({
      x:        Math.random() * (canvas.width  || window.innerWidth),
      y:        Math.random() * (canvas.height || window.innerHeight),
      vx:       (Math.random() - 0.5) * 0.25,
      vy:       (Math.random() - 0.5) * 0.25,
      size:     10 + Math.random() * 14,
      opacity:  0.04 + Math.random() * 0.08,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      type:     TOOL_TYPES[Math.floor(Math.random() * TOOL_TYPES.length)],
    }));

    const drawTool = (tool) => {
      const { x, y, size, opacity, rotation, type } = tool;
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = dist < 100 ? Math.min(opacity * 3, 0.35) : opacity;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 24, size / 24);
      ctx.translate(-12, -12);

      ctx.strokeStyle = `rgba(59, 107, 200, ${alpha})`;
      ctx.lineWidth   = 2;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';

      const path = new Path2D(TOOL_PATHS[type]);
      ctx.stroke(path);
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

        if (t.x < -t.size)                   t.x = canvas.width  + t.size;
        if (t.x > canvas.width  + t.size)     t.x = -t.size;
        if (t.y < -t.size)                    t.y = canvas.height + t.size;
        if (t.y > canvas.height + t.size)     t.y = -t.size;

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
