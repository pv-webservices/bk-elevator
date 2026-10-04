/** Shared requestAnimationFrame-throttled scroll/resize loop used by every scroll-driven effect. */
type Updater = () => void;

const updaters: Updater[] = [];
const resizers: Updater[] = [];
let scheduled = false;

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value));

const run = (): void => {
  scheduled = false;
  updaters.forEach((fn) => fn());
};

export const requestUpdate = (): void => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(run);
  }
};

export const onScroll = (fn: Updater): void => {
  updaters.push(fn);
};

export const onResize = (fn: Updater): void => {
  resizers.push(fn);
};

export const startScrollLoop = (): void => {
  window.addEventListener('scroll', requestUpdate, { passive: true });
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resizers.forEach((fn) => fn());
      requestUpdate();
    }, 120);
  });
  window.addEventListener('load', () => {
    resizers.forEach((fn) => fn());
    requestUpdate();
  });
  resizers.forEach((fn) => fn());
  run();
};
