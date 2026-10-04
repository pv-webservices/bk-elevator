import { startScrollLoop } from './scroll';
import { initNav } from './nav';
import { initReveal } from './reveal';
import { initHeroLift } from './hero';
import { initScenes } from './scenes';
import { initInteractions } from './interact';
import { initMedia } from './media';
import { initEnquiryForm } from './form';

document.documentElement.classList.add('js');

initNav();
initReveal();
initHeroLift();
initScenes();
initInteractions();
initMedia();
initEnquiryForm();
startScrollLoop();

requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
