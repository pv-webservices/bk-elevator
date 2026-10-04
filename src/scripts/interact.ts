import { reducedMotion } from './scroll';

const TILT_DEG = 7;
const PRESS_RELEASE_MS = 380;
const REEL_SPEED_PX = 0.45;
const REEL_RESUME_MS = 2500;

/** 3D tilt on fine pointers; a "pressed" lift state on touch so cards animate on phones too. */
function initCardMotion(): void {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (finePointer.matches && !reducedMotion.matches) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${(x * TILT_DEG).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-y * TILT_DEG).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--ry');
        card.style.removeProperty('--rx');
      });
    });
  }
  const pressable = '.card-hover, .btn';
  let pressTimer = 0;
  document.addEventListener(
    'touchstart',
    (e) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(pressable);
      if (!target) return;
      document.querySelectorAll('.is-pressed').forEach((el) => el !== target && el.classList.remove('is-pressed'));
      target.classList.add('is-pressed');
    },
    { passive: true },
  );
  const release = (): void => {
    window.clearTimeout(pressTimer);
    pressTimer = window.setTimeout(
      () => document.querySelectorAll('.is-pressed').forEach((el) => el.classList.remove('is-pressed')),
      PRESS_RELEASE_MS,
    );
  };
  document.addEventListener('touchend', release, { passive: true });
  document.addEventListener('touchcancel', release, { passive: true });
}

/** Homepage operating-panel finish selector. */
function initPanelShowcase(): void {
  const root = document.querySelector<HTMLElement>('[data-panel-showcase]');
  if (!root) return;
  const options = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-panel]'));
  const images = Array.from(root.querySelectorAll<HTMLElement>('[data-panel-image]'));
  const label = root.querySelector<HTMLElement>('[data-panel-label]');
  const link = root.querySelector<HTMLAnchorElement>('[data-panel-link]');
  const select = (option: HTMLButtonElement): void => {
    const slug = option.dataset.panel;
    options.forEach((o) => o.setAttribute('aria-checked', String(o === option)));
    images.forEach((img) => img.classList.toggle('is-active', img.dataset.panelImage === slug));
    if (label) label.textContent = option.dataset.title || '';
    if (link) {
      link.href = `/products/${slug}/`;
      const text = link.querySelector('span');
      if (text) text.textContent = `View ${option.dataset.title} panel`;
    }
  };
  options.forEach((option, i) => {
    option.addEventListener('click', () => select(option));
    option.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
      const next = options[(i + step + options.length) % options.length];
      next.focus();
      select(next);
    });
  });
}

/** Cabin collection filter chips. */
function initFilters(): void {
  const bar = document.querySelector<HTMLElement>('[data-filter-bar]');
  const grid = document.querySelector<HTMLElement>('[data-filter-grid]');
  if (!bar || !grid) return;
  const chips = Array.from(bar.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-tone]'));
  const status = bar.querySelector<HTMLElement>('[data-filter-status]');
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      const tone = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      let shown = 0;
      cards.forEach((card) => {
        const match = tone === 'all' || card.dataset.tone === tone;
        card.classList.toggle('is-filtered-out', !match);
        card.classList.remove('is-entering');
        if (match) {
          card.style.setProperty('--i', String(shown));
          void card.offsetWidth;
          card.classList.add('is-entering');
          shown++;
        }
      });
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'design' : 'designs'}`;
    }),
  );
}

/** Self-scrolling video reel that loops seamlessly and yields to drag, swipe, wheel and focus. */
function initReel(): void {
  document.querySelectorAll<HTMLElement>('[data-autoscroll]').forEach((reel) => {
    let paused = false;
    let resumeTimer = 0;
    let visible = false;
    let position = reel.scrollLeft;
    const pause = (): void => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = (): void => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        position = reel.scrollLeft;
        paused = false;
      }, REEL_RESUME_MS);
    };
    reel.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && pause());
    reel.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && resume());
    reel.addEventListener('touchstart', pause, { passive: true });
    reel.addEventListener('touchend', resume, { passive: true });
    reel.addEventListener('focusin', pause);
    reel.addEventListener('focusout', resume);

    // Mouse drag to scroll.
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    reel.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = reel.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) {
        moved = true;
        reel.classList.add('is-dragging');
      }
      reel.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', () => {
      dragging = false;
      reel.classList.remove('is-dragging');
    });
    reel.addEventListener(
      'click',
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      true,
    );

    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }).observe(reel);

    const loop = (): void => {
      const half = reel.scrollWidth / 2;
      if (!paused && visible && !reducedMotion.matches) {
        position += REEL_SPEED_PX;
        if (position >= half) position -= half;
        reel.scrollLeft = position;
      } else if (reel.scrollLeft >= half) {
        reel.scrollLeft -= half;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
}

/** Footer "Ride to the top" — smooth scroll unless reduced motion is preferred. */
function initRideTop(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-ride-top]').forEach((link) =>
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
    }),
  );
}

export function initInteractions(): void {
  initCardMotion();
  initPanelShowcase();
  initFilters();
  initReel();
  initRideTop();
}
