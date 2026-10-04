import { onScroll } from './scroll';

/** Header state (scrolled / hidden on scroll-down), mobile door menu and the top progress cable. */
export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#main-nav');
  const cable = document.querySelector<HTMLElement>('.scroll-cable');

  const setMenu = (open: boolean): void => {
    menu?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) header?.classList.remove('is-hidden');
  };
  const isOpen = (): boolean => menu?.getAttribute('aria-expanded') === 'true';

  menu?.addEventListener('click', () => setMenu(!isOpen()));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setMenu(false);
      menu?.focus();
    }
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', () => setMenu(false));

  let lastY = window.scrollY;
  onScroll(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    cable?.style.setProperty('--progress', String(max > 0 ? y / max : 0));
    if (!header) return;
    header.classList.toggle('is-scrolled', y > 30);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 400 && !isOpen()) header.classList.add('is-hidden');
    else if (goingUp || y < 200) header.classList.remove('is-hidden');
    lastY = y;
  });

  // Fixed header must not hide while focus is inside it (keyboard users).
  header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));
}
