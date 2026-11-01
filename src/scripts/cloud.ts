// Nuage de points du hero : repris de la maquette, avec pause hors écran et moins de points sur téléphone.
export function initCloud(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const perCluster = window.matchMedia('(max-width: 640px)').matches ? 26 : 52;

  const colors = ['#2F5BFF', '#7A5CFF', '#14A8E0'];
  const centers = [[0.32, 0.36], [0.72, 0.42], [0.5, 0.74]];
  const gauss = () => {
    let u = 0, v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  type Point = { k: number; ox: number; oy: number; ph: number; sp: number; r: number; x: number; y: number };
  const pts: Point[] = [];
  centers.forEach((cc, k) => {
    for (let i = 0; i < perCluster; i++) {
      pts.push({
        k,
        ox: cc[0] + gauss() * 0.075,
        oy: cc[1] + gauss() * 0.075,
        ph: Math.random() * 6.28,
        sp: 0.4 + Math.random() * 0.8,
        r: 1.6 + Math.random() * 2.4,
        x: 0,
        y: 0,
      });
    }
  });

  let W = 0, H = 0;
  const mouse = { x: -9999, y: -9999, on: false };

  const draw = (time = 0) => {
    const t = time / 1000;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      let tx = p.ox * W + Math.sin(t * p.sp + p.ph) * 10;
      let ty = p.oy * H + Math.cos(t * p.sp * 0.8 + p.ph) * 10;
      if (mouse.on) {
        const dx = mouse.x - tx, dy = mouse.y - ty, dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const f = (1 - dist / 150) * 0.45;
          tx += dx * f;
          ty += dy * f;
        }
      }
      p.x += (tx - p.x) * 0.08;
      p.y += (ty - p.y) * 0.08;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 52) {
          ctx.strokeStyle = a.k === b.k
            ? 'rgba(47,91,255,' + (0.22 * (1 - d / 52)).toFixed(3) + ')'
            : 'rgba(122,92,255,' + (0.12 * (1 - d / 52)).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const p of pts) {
      ctx.fillStyle = colors[p.k];
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (mouse.on) {
      ctx.strokeStyle = 'rgba(47,91,255,0.35)';
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 150, 0, 6.283);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  // Boucle d'animation, active seulement quand le canvas est visible
  let frame = 0;
  let visible = false;
  const loop = (time: number) => {
    draw(time);
    frame = visible ? requestAnimationFrame(loop) : 0;
  };
  const start = () => { if (!frame && !reduce) frame = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; };

  const resize = () => {
    const r = canvas.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    W = r.width;
    H = r.height;
    canvas.width = Math.max(1, Math.round(W * d));
    canvas.height = Math.max(1, Math.round(H * d));
    ctx.setTransform(d, 0, 0, d, 0, 0);
    for (const p of pts) { p.x = p.ox * W; p.y = p.oy * H; }
    if (reduce) draw();
  };
  resize();
  new ResizeObserver(resize).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  }).observe(canvas);

  canvas.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.on = true;
  });
  canvas.addEventListener('mouseleave', () => { mouse.on = false; });
}
