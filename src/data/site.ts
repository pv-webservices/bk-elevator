import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const company = {
  name: 'Bk Elevator Pvt. Ltd',
  phone: '9579048849',
  email: 'info@bkelevator.in',
  sales: 'sales@bkelevator.in',
  address: '4841/G/32, Chakrapani Nagar, Nagpur – 440015',
};
export const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=4841%2FG%2F32%20Chakrapani%20Nagar%20Nagpur%20440015';

/** Returns the public URL of an optional generated image, or undefined when it has not been generated. */
export function generatedImage(name: string): string | undefined {
  const file = join(process.cwd(), 'public', 'images', 'generated', `${name}.webp`);
  return existsSync(file) ? `/images/generated/${name}.webp` : undefined;
}

export type CabinTone = 'gold' | 'warm' | 'silver';
export const cabinTones: { id: CabinTone | 'all'; label: string }[] = [
  { id: 'all', label: 'All designs' },
  { id: 'gold', label: 'Gold' },
  { id: 'warm', label: 'Copper & warm' },
  { id: 'silver', label: 'Silver & dark' },
];
export const cabins: {
  id: number;
  title: string;
  finish: string;
  tone: CabinTone;
}[] = [
  {
    id: 8,
    title: 'Geometric Gold',
    finish: 'Warm metallic · Patterned walls',
    tone: 'gold',
  },
  {
    id: 1,
    title: 'Reflective Silver',
    finish: 'Mirror finish · Decorative detailing',
    tone: 'silver',
  },
  {
    id: 5,
    title: 'Architectural Gold',
    finish: 'Vertical lines · Dark stone floor',
    tone: 'gold',
  },
  {
    id: 3,
    title: 'Linear Elegance',
    finish: 'Gold accents · Architectural lines',
    tone: 'gold',
  },
  {
    id: 2,
    title: 'Artistic Geometry',
    finish: 'Patterned surfaces · Warm tones',
    tone: 'warm',
  },
  {
    id: 4,
    title: 'Contemporary Black',
    finish: 'Dark mirror · Expressive flooring',
    tone: 'silver',
  },
  {
    id: 6,
    title: 'Warm Contrast',
    finish: 'Copper tones · Graphic detailing',
    tone: 'warm',
  },
  {
    id: 7,
    title: 'Classic Detailing',
    finish: 'Warm finish · Decorative panels',
    tone: 'warm',
  },
  {
    id: 9,
    title: 'Circular Accent',
    finish: 'Gold finish · Statement centrepiece',
    tone: 'gold',
  },
  {
    id: 10,
    title: 'Metallic Mosaic',
    finish: 'Mixed metals · Reflective surfaces',
    tone: 'gold',
  },
];
export const cabinSrcset = (id: number): string =>
  `/images/cabins/cabin-${id}-480.webp 480w, /images/cabins/cabin-${id}-720.webp 720w, /images/cabins/cabin-${id}.webp 1000w`;
export const enquiryUrl = (interest: string, extra: Record<string, string> = {}): string =>
  `/enquiry/?${new URLSearchParams({ interest, ...extra }).toString()}`;

export const sectors = [
  { name: 'Residential', icon: 'home', line: 'Apartments, villas and private homes.' },
  { name: 'Commercial', icon: 'building', line: 'Offices, towers and mixed-use spaces.' },
  { name: 'Healthcare', icon: 'hospital', line: 'Hospitals, clinics and care facilities.' },
  { name: 'Hospitality', icon: 'hotel', line: 'Hotels, resorts and guest arrivals.' },
  { name: 'Industrial', icon: 'factory', line: 'Goods movement and working sites.' },
  { name: 'Retail', icon: 'shop', line: 'Malls and busy shopping destinations.' },
  { name: 'Institutions', icon: 'school', line: 'Schools, colleges and public buildings.' },
].map((s) => ({ ...s, image: generatedImage(`sector-${s.name.toLowerCase()}`) }));

export const stats = [
  { value: 10, label: 'Signature cabin designs' },
  { value: 6, label: 'Operating panel finishes' },
  { value: 7, label: 'Component brands' },
  { value: 4, label: 'Service lines' },
];
export const panels = [
  {
    id: 3,
    slug: 'black-shine-panel',
    title: 'Black Shine',
    finish: 'Reflective black finish',
  },
  {
    id: 1,
    slug: 'rose-gold-panel',
    title: 'Rose Gold',
    finish: 'Warm metallic finish',
  },
  {
    id: 7,
    slug: 'silver-panel',
    title: 'Silver',
    finish: 'Clean stainless-steel look',
  },
  {
    id: 6,
    slug: 'black-mat-panel',
    title: 'Black Mat',
    finish: 'Understated dark finish',
  },
  {
    id: 14,
    slug: 'silver-mat-panel',
    title: 'Silver Mat',
    finish: 'Soft metallic finish',
  },
  {
    id: 13,
    slug: 'black-mirror-panel',
    title: 'Black Mirror',
    finish: 'Polished dark surface',
  },
];
export const videos = [
  {
    id: 'elevator-1',
    title: 'Inside the gold cabin',
    tag: 'Cabin walkthrough',
  },
  {
    id: 'elevator-2',
    title: 'A closer look at silver',
    tag: 'Interior details',
  },
  { id: 'elevator-3', title: 'Doors in motion', tag: 'On-site footage' },
  {
    id: 'elevator-4',
    title: 'The arrival experience',
    tag: 'Elevator in action',
  },
  { id: 'elevator-5', title: 'Reflections in gold', tag: 'Cabin showcase' },
  {
    id: 'touch-panel',
    title: 'Technology at your fingertips',
    tag: 'Touch panel demonstration',
  },
];
export const partners = [
  { name: 'Fermator', category: 'Automatic lift doors', slug: 'elevator-doors' },
  { name: 'Montanari', category: 'Lift gearboxes', slug: 'gearboxes' },
  { name: 'Wittur', category: 'Elevator doors', slug: 'elevator-doors' },
  { name: 'Inditech', category: 'Electrical panels', slug: 'control-panels' },
  { name: 'Usha Martin', category: 'Wire ropes', slug: 'wire-ropes' },
  { name: 'Marazzi', category: 'Guide rails', slug: 'guide-rails' },
  { name: 'Liftbyte', category: 'Touch panels', slug: 'touch-panels' },
];
export const technicalDocs = [
  { img: 'technical-image-1', title: 'Passenger elevator cabins' },
  { img: 'technical-image-2', title: 'Car elevator layout' },
  { img: 'technical-image-3', title: 'Freight elevator functions' },
  { img: 'technical-image-4', title: 'Dumbwaiter elevator' },
  { img: 'technical-image-5', title: 'Villa elevator structures' },
  { img: 'technical-image-6', title: 'Steel & alloy shaft structures' },
  { img: 'technical-image-7', title: 'Villa elevator layout' },
  { img: 'technical-image-a1', title: 'Machine-room-less specifications' },
  { img: 'technical-image-a2', title: 'Machine-room specifications' },
  { img: 'technolgy-image', title: 'Drive arrangement comparison' },
];
export const services = [
  {
    slug: 'installation',
    title: 'Installation',
    icon: 'tools',
    desc: 'From site planning to the first smooth ride.',
    body: 'A considered installation begins with your building. We discuss the shaft, access, intended use and cabin requirements, then coordinate the system selection and on-site work.',
    steps: [
      'Site review & requirement planning',
      'System & cabin selection',
      'Installation coordination',
      'Commissioning & handover',
    ],
  },
  {
    slug: 'modernization',
    title: 'Modernization',
    icon: 'gear',
    desc: 'A new chapter for your existing elevator.',
    body: 'Refresh the experience without overlooking the system behind it. Modernization options can include interiors, doors, controls and operating panels, following a review of the existing installation.',
    steps: [
      'Existing-system assessment',
      'Upgrade priorities & compatibility',
      'Component & finish selection',
      'Planned execution & review',
    ],
  },
  {
    slug: 'maintenance',
    title: 'Maintenance',
    icon: 'shield',
    desc: 'Care that keeps your building moving.',
    body: 'Regular attention supports dependable day-to-day operation. Discuss a maintenance approach suited to your elevator, its usage and its service history with our team.',
    steps: [
      'Condition & service-history review',
      'Preventive inspection planning',
      'Component attention & adjustments',
      'Service recommendations',
    ],
  },
  {
    slug: 'amc',
    title: 'AMC Support',
    icon: 'support',
    desc: 'Long-term support, thoughtfully planned.',
    body: 'An annual maintenance arrangement provides an ongoing service plan for your elevator. Scope, visit frequency, coverage and response arrangements are agreed with our team for your installation.',
    steps: [
      'Installation & usage review',
      'Agreed service scope',
      'Scheduled maintenance visits',
      'Ongoing service coordination',
    ],
  },
];
export const categories = [
  {
    slug: 'cabin-panels',
    title: 'Cabin Operating Panels',
    image: '/images/products/panel-3.webp',
    desc: 'The everyday connection between passenger and elevator.',
    brand: 'Panel selection',
    points: [
      'Cabin controls and floor selection',
      'Finish options to complement the interior',
      'Configuration matched to the elevator',
    ],
  },
  {
    slug: 'touch-panels',
    title: 'Touch Panels',
    image: '/images/videos/touch-panel.webp',
    desc: 'Intuitive interaction, presented with clarity.',
    brand: 'Liftbyte',
    points: [
      'Touch-based passenger interface',
      'Clean visual presentation',
      'System compatibility reviewed before selection',
    ],
  },
  {
    slug: 'elevator-doors',
    title: 'Automatic Elevator Doors',
    image: '/images/videos/elevator-3.webp',
    desc: 'A considered entrance to every journey.',
    brand: 'Fermator / Wittur',
    points: [
      'Cabin and landing door coordination',
      'Finish and opening requirements',
      'Selection based on available shaft space',
    ],
  },
  {
    slug: 'gearboxes',
    title: 'Lift Gearboxes',
    image: '/images/mechanism/lift mechanism-1.webp',
    desc: 'Mechanical performance at the heart of the system.',
    brand: 'Montanari',
    points: [
      'Drive-system component selection',
      'Duty and installation requirements',
      'Compatibility with the complete elevator system',
    ],
  },
  {
    slug: 'control-panels',
    title: 'Electrical & Control Panels',
    image: '/images/technical/technolgy-image.webp',
    desc: 'Coordinating the systems behind a smooth ride.',
    brand: 'Inditech',
    points: [
      'Elevator control architecture',
      'Integration with doors and passenger controls',
      'Technical selection with our engineering team',
    ],
  },
  {
    slug: 'wire-ropes',
    title: 'Wire Ropes',
    image: '/images/mechanism/lift mechanism-2.webp',
    desc: 'A critical connection within the lifting system.',
    brand: 'Usha Martin',
    points: [
      'Rope selection for the installation',
      'Drive and suspension compatibility',
      'Condition assessment as part of maintenance',
    ],
  },
  {
    slug: 'guide-rails',
    title: 'Guide Rails',
    image: '/images/technical/technical-image-6.webp',
    desc: 'Precision guidance throughout the shaft.',
    brand: 'Marazzi',
    points: [
      'Guidance for cabin travel',
      'Alignment and installation planning',
      'Selection according to the system design',
    ],
  },
];
export type PageInfo = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  kind: string;
  body?: string;
  points?: string[];
  brand?: string;
};
export const pages: PageInfo[] = [
  {
    slug: 'about',
    title: 'A higher standard.\nAt every level.',
    eyebrow: 'Our company',
    description:
      'Thoughtful interiors. Considered engineering. Support that stays with you.',
    image: '/images/mechanism/lift mechanism-2.webp',
    kind: 'about',
  },
  {
    slug: 'cabin-designs',
    title: 'Small spaces.\nExtraordinary possibilities.',
    eyebrow: 'The cabin collection',
    description:
      'Explore surfaces, reflections and details that transform an everyday journey.',
    image: '/images/cabins/cabin-8.webp',
    kind: 'cabins',
  },
  {
    slug: 'products',
    title: 'Every detail.\nWorking together.',
    eyebrow: 'Products & accessories',
    description:
      'Explore the components and passenger interfaces behind the complete elevator experience.',
    image: '/images/products/panel-3.webp',
    kind: 'products',
  },
  ...categories.map((c) => ({
    ...c,
    title: c.title,
    eyebrow: 'Component collection',
    description: c.desc,
    slug: `products/${c.slug}`,
    kind: 'category',
  })),
  ...panels.map((p) => ({
    slug: `products/${p.slug}`,
    title: `${p.title}\nOperating Panel`,
    eyebrow: 'Passenger controls',
    description: p.finish + '. A considered interface for your cabin interior.',
    image: `/images/products/panel-${p.id}.webp`,
    kind: 'product',
    points: [
      'Coordinated cabin and landing interfaces',
      'Floor-selection and passenger controls',
      'Finish shown in the supplied product image',
      'Configuration and availability confirmed on enquiry',
    ],
  })),
  {
    slug: 'technical',
    title: 'Beauty outside.\nIntelligence within.',
    eyebrow: 'Engineering & technology',
    description:
      'Explore the architecture, motion and components that bring an elevator to life.',
    image: '/images/mechanism/lift mechanism-1.webp',
    kind: 'technical',
  },
  {
    slug: 'technical/elevator-mechanism',
    title: 'The anatomy\nof elevation.',
    eyebrow: 'Elevator mechanism',
    description:
      'Follow the connection between the drive, suspension, guidance, cabin and controls.',
    image: '/images/mechanism/lift mechanism-1.webp',
    kind: 'mechanism',
  },
  {
    slug: 'technical/components',
    title: 'One system.\nMany precise connections.',
    eyebrow: 'Components & technology',
    description:
      'Doors, drives, ropes, rails and controls — selected to work as a complete system.',
    image: '/images/mechanism/lift mechanism-2.webp',
    kind: 'products',
  },
  {
    slug: 'technical/safety-engineering',
    title: 'Considered engineering.\nAt every stage.',
    eyebrow: 'Safety & engineering',
    description:
      'A reliable elevator begins with the right questions, suitable components and ongoing care.',
    image: '/images/mechanism/lift mechanism-2.webp',
    kind: 'safety',
  },
  {
    slug: 'services',
    title: 'From your first idea.\nTo every journey after.',
    eyebrow: 'Our services',
    description:
      'Installation, modernization, maintenance and annual service support.',
    image: '/images/mechanism/lift mechanism-2.webp',
    kind: 'services',
  },
  ...services.map((s) => ({
    slug: `services/${s.slug}`,
    title: s.title,
    eyebrow: 'Care at every level',
    description: s.desc,
    image: '/images/mechanism/lift mechanism-2.webp',
    kind: 'service',
    body: s.body,
    points: s.steps,
  })),
  {
    slug: 'projects',
    title: 'Beyond the drawing.\nInto the real world.',
    eyebrow: 'On-site gallery',
    description:
      'A closer look at elevator spaces and installations through the supplied on-site footage.',
    image: '/images/videos/elevator-5.webp',
    kind: 'projects',
  },
  {
    slug: 'videos',
    title: 'See the details.\nFeel the movement.',
    eyebrow: 'Video showcase',
    description:
      'Step inside our cabin walkthroughs and explore elevators and touch panels in action.',
    image: '/images/videos/elevator-1.webp',
    kind: 'videos',
  },
  {
    slug: 'partners',
    title: 'Quality in\nevery connection.',
    eyebrow: 'Component brands',
    description:
      'Leading industry brands across the components that make up an elevator.',
    image: '/images/mechanism/lift mechanism-1.webp',
    kind: 'partners',
  },
  {
    slug: 'contact',
    title: 'Your next level\nstarts here.',
    eyebrow: 'Let’s talk',
    description:
      'A new elevator, a considered upgrade or care for your existing system. Tell us what you have in mind.',
    image: '/images/cabins/cabin-5.webp',
    kind: 'contact',
  },
  {
    slug: 'enquiry',
    title: 'Let’s bring your\nvision to life.',
    eyebrow: 'Project enquiry',
    description:
      'Share a few details. Our team can help you explore the right elevator solution.',
    image: '/images/cabins/cabin-8.webp',
    kind: 'enquiry',
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy &\nyour information.',
    eyebrow: 'Website information',
    description:
      'How this website handles the information you choose to share.',
    image: '/images/cabins/cabin-3.webp',
    kind: 'privacy',
  },
  {
    slug: 'terms',
    title: 'Website\ndisclaimer.',
    eyebrow: 'Website information',
    description:
      'Information about the collection, imagery and enquiries on this website.',
    image: '/images/cabins/cabin-3.webp',
    kind: 'terms',
  },
];
