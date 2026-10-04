import { reducedMotion } from './scroll';

const DOOR_MS = 1100;
const DWELL_MS = 4800;
const FIRST_OPEN_MS = 700;

/** Hero lift: doors close, the car "travels" to the next cabin design, doors open again. */
export function initHeroLift(): void {
  const lift = document.querySelector<HTMLElement>('[data-lift]');
  if (!lift) return;
  const slides = Array.from(lift.querySelectorAll<HTMLImageElement>('.lift-slide'));
  const floor = lift.querySelector<HTMLElement>('[data-lift-floor]');
  const name = lift.querySelector<HTMLElement>('[data-lift-name]');
  const card = document.querySelector<HTMLAnchorElement>('[data-lift-link]');
  const title = card?.querySelector<HTMLElement>('[data-lift-title]');
  const finish = card?.querySelector<HTMLElement>('[data-lift-finish]');
  const nextBtn = document.querySelector<HTMLButtonElement>('[data-lift-next]');
  const prevBtn = document.querySelector<HTMLButtonElement>('[data-lift-prev]');
  if (slides.length < 2) return;

  let index = 0;
  let busy = false;
  let timer = 0;
  let inView = true;

  const show = (next: number): void => {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === next));
    const slide = slides[next];
    const label = slide.dataset.title || '';
    if (floor) {
      floor.textContent = String(next + 1).padStart(2, '0');
      floor.classList.remove('is-changing');
      void floor.offsetWidth;
      floor.classList.add('is-changing');
    }
    if (name) name.textContent = label;
    if (title) title.textContent = label;
    if (finish) finish.textContent = slide.dataset.finish || '';
    if (card) {
      card.href = `/enquiry/?${new URLSearchParams({ interest: 'Cabin design', design: label })}`;
      card.classList.remove('is-swapping');
      void card.offsetWidth;
      card.classList.add('is-swapping');
    }
  };

  const schedule = (): void => {
    window.clearTimeout(timer);
    if (!reducedMotion.matches && inView) timer = window.setTimeout(() => travel(1), DWELL_MS);
  };

  const travel = (direction: 1 | -1, button?: HTMLButtonElement | null): void => {
    if (busy) return;
    busy = true;
    window.clearTimeout(timer);
    button?.classList.add('is-lit');
    lift.classList.toggle('is-descending', direction < 0);
    const next = (index + direction + slides.length) % slides.length;
    // Preload the next image before the doors re-open.
    if (slides[next].loading === 'lazy') slides[next].loading = 'eager';
    lift.classList.remove('is-open');
    window.setTimeout(
      () => {
        index = next;
        show(index);
        lift.classList.add('is-open');
        window.setTimeout(() => {
          busy = false;
          button?.classList.remove('is-lit');
          schedule();
        }, DOOR_MS);
      },
      reducedMotion.matches ? 0 : DOOR_MS,
    );
  };

  nextBtn?.addEventListener('click', () => travel(1, nextBtn));
  prevBtn?.addEventListener('click', () => travel(-1, prevBtn));

  new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
    if (inView) schedule();
    else window.clearTimeout(timer);
  }).observe(lift);

  window.setTimeout(() => {
    lift.classList.add('is-open');
    schedule();
  }, reducedMotion.matches ? 0 : FIRST_OPEN_MS);

  // Subtle 3D tilt that follows the pointer across the hero (fine pointers only).
  const stage = document.querySelector<HTMLElement>('.hero');
  if (stage && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      lift.style.setProperty('--ry', `${(x * 14 - 4).toFixed(2)}deg`);
      lift.style.setProperty('--rx', `${(-y * 10 + 2).toFixed(2)}deg`);
    });
    stage.addEventListener('pointerleave', () => {
      lift.style.removeProperty('--ry');
      lift.style.removeProperty('--rx');
    });
  }
}
