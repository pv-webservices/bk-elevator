import { pages } from '../data/site';
export function GET() {
  const urls = ['', ...pages.map((p) => p.slug + '/')];
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      urls
        .map((p) => `<url><loc>https://bkelevator.in/${p}</loc></url>`)
        .join('') +
      '</urlset>',
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
