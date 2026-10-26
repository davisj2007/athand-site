import type { APIRoute } from "astro";

// The six indexable pages at their permanent URLs. 404 is left out.
const pages = [
  "https://athandapp.com/",
  "https://athandapp.com/features.html",
  "https://athandapp.com/pricing.html",
  "https://athandapp.com/privacy-overview.html",
  "https://athandapp.com/privacy.html",
  "https://athandapp.com/support.html",
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
