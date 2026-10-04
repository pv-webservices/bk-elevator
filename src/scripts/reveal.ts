import { onScroll, reducedMotion, clamp } from './scroll';

const SETTLE_DELAY_MS = 1400;
const COUNT_DURATION_MS = 1600;

/** Animate a number from 0 to its target when it scrolls into view. */
function countUp(el: HTMLElement): void {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || reducedMotion.matches) return;
  const start = performance.now();
  const tick = (now: number): void => {
    const t = clamp((now - start) / COUNT_DURATION_MS);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

/** Fade/slide-in reveals, count-ups, scroll-filled statement text and image parallax. */
export function initReveal(): void {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        window.setTimeout(() => el.classList.add('is-settled'), SETTLE_DELAY_MS);
        observer.unobserve(el);
      }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

  const counter = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countUp(entry.target as HTMLElement);
        counter.unobserve(entry.target);
      }),
    { threshold: 0.6 },
  );
  document.querySelectorAll('[data-count]').forEach((el) => counter.observe(el));

  const fillTexts = Array.from(document.querySelectorAll<HTMLElement>('[data-fill-text]'));
  const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

  onScroll(() => {
    const vh = window.innerHeight;
    fillTexts.forEach((block) => {
      const words = block.children;
      const rect = block.getBoundingClientRect();
      const progress = reducedMotion.matches ? 1 : clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.35));
      const lit = Math.round(progress * words.length);
      for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < lit);
    });
    if (reducedMotion.matches) return;
    parallax.forEach((img) => {
      const rect = img.parentElement?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > vh) return;
      const speed = Number(img.dataset.parallax) || 0.1;
      const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
      const limit = rect.height * 0.08;
      img.style.setProperty('--py', `${clamp(offset, -limit, limit) - limit}px`);
    });
  });
}
