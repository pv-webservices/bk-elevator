import { reducedMotion } from './scroll';

const SALES_EMAIL = 'sales@bkelevator.in';
const BUILDING_ALIASES: Record<string, string> = {
  Healthcare: 'Hospital / Healthcare',
  Hospitality: 'Hotel / Hospitality',
  Retail: 'Shopping mall',
  Institutions: 'Educational institution',
};

/** Enquiry form: prefill from the URL, validate, and prepare a reviewable email draft. */
export function initEnquiryForm(): void {
  const form = document.querySelector<HTMLFormElement>('#enquiry-form');
  if (!form) return;
  let enquiryText = '';
  const params = new URLSearchParams(window.location.search);

  const interest = form.querySelector<HTMLSelectElement>('[name=interest]');
  const wantedInterest = params.get('interest');
  if (interest && wantedInterest && Array.from(interest.options).some((o) => o.value === wantedInterest))
    interest.value = wantedInterest;

  const building = form.querySelector<HTMLSelectElement>('[name=building]');
  const wantedBuilding = params.get('building');
  if (building && wantedBuilding) {
    const value = BUILDING_ALIASES[wantedBuilding] || wantedBuilding;
    if (Array.from(building.options).some((o) => o.value === value)) building.value = value;
  }

  const message = form.querySelector<HTMLTextAreaElement>('[name=message]');
  const design = params.get('design');
  if (message && design) message.value = `I would like to discuss the ${design.slice(0, 80)} cabin design.\n`;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const v = new FormData(form);
    const get = (key: string): string => String(v.get(key) ?? '').trim();
    enquiryText = [
      'Project enquiry for Bk Elevator Pvt. Ltd',
      '',
      `Name: ${get('name')}`,
      `Company: ${get('company') || 'Not specified'}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone')}`,
      `Building: ${get('building')}`,
      `Interested in: ${get('interest') || 'General enquiry'}`,
      '',
      'Requirements:',
      get('message'),
    ].join('\n');
    const link = document.querySelector<HTMLAnchorElement>('#draft-link');
    if (link)
      link.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(`Elevator project enquiry — ${get('name')}`)}&body=${encodeURIComponent(enquiryText)}`;
    const result = form.querySelector<HTMLElement>('.enquiry-result');
    if (result) {
      result.hidden = false;
      result.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
    }
  });

  document.querySelector('#copy-enquiry')?.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(enquiryText);
      if (status) status.textContent = `Enquiry copied. Paste it into an email to ${SALES_EMAIL}.`;
    } catch {
      if (status) status.textContent = 'Copy is unavailable in this browser. Use the email draft link above.';
    }
  });
}
