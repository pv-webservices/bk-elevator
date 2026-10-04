import { onScroll, onResize, reducedMotion, clamp } from './scroll';

/** Pinned section whose vertical scroll drives a horizontal track. */
function initHorizontalPin(): void {
  document.querySelectorAll<HTMLElement>('[data-hpin]').forEach((section) => {
    const viewport = section.querySelector<HTMLElement>('[data-hpin-viewport]');
    const track = section.querySelector<HTMLElement>('[data-hpin-track]');
    const bar = section.querySelector<HTMLElement>('[data-hpin-progress]');
    if (!viewport || !track || reducedMotion.matches) return;
    let distance = 0;

    onResize(() => {
      section.classList.add('is-pinned');
      track.style.transform = '';
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${distance + window.innerHeight}px`;
    });
    onScroll(() => {
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel) : 0;
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`;
      bar?.style.setProperty('--p', p.toFixed(3));
    });
  });
}

/** Sticky stacked cards: covered cards shrink and dim as the next card arrives. */
function initStack(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-card]'));
  if (!cards.length || reducedMotion.matches) return;
  onScroll(() => {
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const a = card.getBoundingClientRect();
      const b = next.getBoundingClientRect();
      const covered = clamp(1 - (b.top - a.top) / a.height);
      card.style.setProperty('--s', (1 - covered * 0.07).toFixed(4));
      card.style.setProperty('--dim', (covered * 0.45).toFixed(3));
    });
  });
}

/** Clip-path zoom reveal for the engineering image. */
function initZoom(): void {
  document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((scene) => {
    if (reducedMotion.matches) return;
    scene.classList.add('is-live');
    onScroll(() => {
      const rect = scene.getBoundingClientRect();
      const travel = scene.offsetHeight - window.innerHeight;
      const p = clamp((window.innerHeight * 0.6 - rect.top) / (travel * 0.55 + window.innerHeight * 0.6));
      scene.style.setProperty('--zi', (1 - p).toFixed(4));
      scene.style.setProperty('--zc', clamp((p - 0.55) / 0.35).toFixed(3));
    });
  });
}

/** CTA elevator doors part as the final floor scrolls into view. */
function initCtaDoors(): void {
  document.querySelectorAll<HTMLElement>('[data-cta]').forEach((scene) => {
    if (reducedMotion.matches) return;
    onScroll(() => {
      const rect = scene.getBoundingClientRect();
      const p = clamp((window.innerHeight - rect.top) / (window.innerHeight * 0.85));
      scene.style.setProperty('--open', (p * p * (3 - 2 * p)).toFixed(4));
    });
  });
  const wordmark = document.querySelector<HTMLElement>('.footer-wordmark span');
  if (wordmark && !reducedMotion.matches) {
    onScroll(() => {
      const rect = wordmark.getBoundingClientRect();
      wordmark.style.setProperty('--rise', clamp((window.innerHeight - rect.top) / rect.height).toFixed(3));
    });
  }
}

/** Floor indicator: current floor, travel direction and a continuous car position. */
function initFloorHud(): void {
  const hud = document.querySelector<HTMLElement>('[data-hud]');
  const floors = Array.from(document.querySelectorAll<HTMLElement>('[data-floor]'));
  if (!hud || !floors.length) return;
  const number = hud.querySelector<HTMLElement>('[data-hud-number]');
  const name = hud.querySelector<HTMLElement>('[data-hud-name]');
  const arrow = hud.querySelector<HTMLElement>('[data-hud-arrow]');
  const car = hud.querySelector<HTMLElement>('[data-hud-car]');
  const stops = Array.from(hud.querySelectorAll<HTMLAnchorElement>('.hud-stop'));
  let current = '';
  let lastY = window.scrollY;

  onScroll(() => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) > 2) arrow?.classList.toggle('is-down', y < lastY);
    lastY = y;
    const line = window.innerHeight * 0.45;
    let active = floors[0];
    floors.forEach((f) => {
      if (f.getBoundingClientRect().top <= line) active = f;
    });
    const max = document.documentElement.scrollHeight - window.innerHeight;
    car?.style.setProperty('--p', String(max > 0 ? clamp(y / max) : 0));
    hud.classList.toggle('is-hidden', active === floors[0] && y < window.innerHeight * 0.5);
    const floor = active.dataset.floor || '1';
    if (floor === current) return;
    current = floor;
    if (number) {
      number.textContent = floor.padStart(2, '0');
      number.classList.remove('is-changing');
      void number.offsetWidth;
      number.classList.add('is-changing');
    }
    if (name) name.textContent = active.dataset.floorName || '';
    stops.forEach((stop) => {
      const on = stop.dataset.stop === floor;
      stop.classList.toggle('active', on);
      if (on) stop.setAttribute('aria-current', 'step');
      else stop.removeAttribute('aria-current');
    });
  });
}

/** Technical mechanism page: sticky readout follows the active step. */
function initMechanism(): void {
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.mechanism-step'));
  const display = document.querySelector<HTMLElement>('#mechanism-part');
  const layout = document.querySelector<HTMLElement>('.mechanism-layout');
  if (!steps.length || !layout) return;
  onScroll(() => {
    let part = steps[0];
    let index = 0;
    steps.forEach((step, i) => {
      if (step.getBoundingClientRect().top < window.innerHeight * 0.6) {
        part = step;
        index = i;
      }
    });
    steps.forEach((step) => step.classList.toggle('is-active', step === part));
    layout.style.setProperty('--mp', (index / Math.max(1, steps.length - 1)).toFixed(3));
    if (display) display.textContent = `${part.dataset.mechanism?.padStart(2, '0')} / ${part.dataset.part?.toUpperCase()}`;
  });
}

export function initScenes(): void {
  initHorizontalPin();
  initStack();
  initZoom();
  initCtaDoors();
  initFloorHud();
  initMechanism();
}
