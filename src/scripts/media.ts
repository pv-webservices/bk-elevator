/** Video dialog and image lightbox (with gallery navigation). */
export function initMedia(): void {
  const videoDialog = document.querySelector<HTMLDialogElement>('.video-dialog');
  const player = videoDialog?.querySelector<HTMLVideoElement>('video');
  let videoTrigger: HTMLElement | null = null;

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest<HTMLElement>('[data-video]');
    if (!trigger || !videoDialog || !player) return;
    videoTrigger = trigger;
    const title = videoDialog.querySelector('#video-dialog-title');
    if (title) title.textContent = trigger.dataset.title || 'Video showcase';
    player.poster = trigger.dataset.poster || '';
    player.src = trigger.dataset.video || '';
    videoDialog.showModal();
    player.play().catch(() => {
      /* Autoplay can be blocked; the visible controls let the visitor start playback. */
    });
  });
  videoDialog?.addEventListener('close', () => {
    player?.pause();
    player?.removeAttribute('src');
    player?.load();
    videoTrigger?.focus();
  });

  const imageDialog = document.querySelector<HTMLDialogElement>('.image-dialog');
  const image = imageDialog?.querySelector('img');
  const heading = imageDialog?.querySelector('#image-dialog-title');
  const count = imageDialog?.querySelector<HTMLElement>('[data-dialog-count]');
  const enquire = imageDialog?.querySelector<HTMLAnchorElement>('#image-enquiry');
  const prev = imageDialog?.querySelector<HTMLButtonElement>('[data-dialog-prev]');
  const next = imageDialog?.querySelector<HTMLButtonElement>('[data-dialog-next]');
  let group: HTMLElement[] = [];
  let current = 0;
  let imageTrigger: HTMLElement | null = null;

  const render = (): void => {
    const trigger = group[current];
    if (!trigger || !image) return;
    const title = trigger.dataset.title || 'Design detail';
    image.src = trigger.dataset.image || '';
    image.alt = title;
    if (heading) heading.textContent = title;
    const multiple = group.length > 1;
    if (count) count.textContent = multiple ? `${current + 1} / ${group.length}` : '';
    if (prev) prev.hidden = !multiple;
    if (next) next.hidden = !multiple;
    if (enquire) {
      enquire.hidden = !trigger.dataset.enquire;
      if (trigger.dataset.enquire) enquire.href = trigger.dataset.enquire;
    }
  };
  const step = (dir: number): void => {
    current = (current + dir + group.length) % group.length;
    render();
  };

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest<HTMLElement>('[data-image]');
    if (!trigger || !imageDialog) return;
    imageTrigger = trigger;
    const name = trigger.dataset.gallery;
    group = name
      ? Array.from(document.querySelectorAll<HTMLElement>(`[data-image][data-gallery="${name}"]`)).filter(
          (el) => el.offsetParent !== null && !el.closest('[aria-hidden="true"]'),
        )
      : [trigger];
    current = Math.max(0, group.indexOf(trigger));
    render();
    imageDialog.showModal();
  });
  prev?.addEventListener('click', () => step(-1));
  next?.addEventListener('click', () => step(1));
  imageDialog?.addEventListener('keydown', (e) => {
    if (group.length < 2) return;
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  imageDialog?.addEventListener('close', () => imageTrigger?.focus());

  document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
  });
}
