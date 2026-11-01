import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

root.classList.add('reveal-ready');

if (!reduce) {
  // Apparition en douceur des blocs marqués [data-reveal]
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  gsap.set(items, { y: 24 });
  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }),
  });

  // Frises : la ligne colorée se dessine au fil du scroll
  gsap.utils.toArray<HTMLElement>('[data-timeline-line]').forEach((line) => {
    gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: line.parentElement, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
    });
  });

  // Compteurs : la valeur finale est dans le HTML, on la fait défiler depuis 0 à l'entrée à l'écran
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const counter = { value: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          delay: 0.3,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = String(Math.round(counter.value)); },
        }),
    });
  });
}
