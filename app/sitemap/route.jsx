import { supabase } from "@/lib/supabaseClient";

export const runtime = 'edge';

function generateSlug(title) {
	return title
		.toLowerCase()
		.replace(/[čć]/g, 'c')
		.replace(/[đ]/g, 'd')
		.replace(/[š]/g, 's')
		.replace(/[ž]/g, 'z')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

function getWatchUrlSlug(watch, allWatches) {
	const brandSlug = generateSlug(watch.brand);
	const modelSlug = generateSlug(watch.name);
	const sameBrandAndModel = allWatches.filter(
		w => generateSlug(w.brand) === brandSlug && generateSlug(w.name) === modelSlug
	);
	if (sameBrandAndModel.length <= 1) return modelSlug;
	const index = sameBrandAndModel.findIndex(w => w.id === watch.id);
	return `${modelSlug}-${index + 1}`;
}

export async function GET() {
	const { data: posts = [], error: errorPosts } = await supabase.from("blog").select("*").order("publishedAt", { ascending: false });
	if (errorPosts) console.error("Supabase blog fetch error:", errorPosts);

	const { data: watches = [], error: errorWatches } = await supabase.from("watch").select("*");
	if (errorWatches) console.error("Supabase watch fetch error:", errorWatches);

	const baseUrl = 'https://www.luksuzni-satovi.com';
	const staticPages = ['/', '/prodaja-satova', '/otkup-satova', '/kontakt'];

	// Unique brand slugs
	const brandSlugs = [...new Map(watches.map(w => [generateSlug(w.brand), w.brand])).keys()];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `
	<url>
		<loc>${baseUrl}${page}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>`).join('')}

${posts.map(post => `
	<url>
		<loc>${baseUrl}/blog/${post.slug}</loc>
		<lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`).join('')}

${brandSlugs.map(brandSlug => `
	<url>
		<loc>${baseUrl}/prodaja-satova/${brandSlug}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`).join('')}

${watches.map(watch => {
	const brandSlug = generateSlug(watch.brand);
	const watchSlug = getWatchUrlSlug(watch, watches);
	const lastmod = watch.createdAt ? `\n\t\t<lastmod>${new Date(watch.createdAt).toISOString()}</lastmod>` : '';
	return `
	<url>
		<loc>${baseUrl}/prodaja-satova/${brandSlug}/${watchSlug}</loc>${lastmod}
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
	</url>`;
}).join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: { 'Content-Type': 'application/xml' },
	});
}
