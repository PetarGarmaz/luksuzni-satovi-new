import { supabase } from "@/lib/supabaseClient";

export const runtime = 'edge'; // optional, makes it super fast

export async function GET() {
	// Fetch blog posts
	const { data: posts = [], error: errorPosts } = await supabase.from("blog").select("*").order("publishedAt", { ascending: false });

	if (errorPosts) console.error("Supabase blog fetch error:", errorPosts);

	// Fetch watches
	const { data: watches = [], error: errorWatches } = await supabase.from("watch").select("*");

	if (errorWatches) console.error("Supabase watch fetch error:", errorWatches);

	const baseUrl = 'https://www.luksuzni-satovi.com';
	const staticPages = ['/', '/prodaja-satova', '/otkup-satova'];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${staticPages.map(page => `
		<url>
		<loc>${baseUrl}${page}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
		</url>
	`).join('')}

	${posts.map(post => `
		<url>
		<loc>${baseUrl}/blog/${post.slug}</loc>
		<lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		</url>
	`).join('')}

	${watches.map(watch => `
		<url>
		<loc>${baseUrl}/prodaja-satova/${watch.slug}</loc>
		<lastmod>${new Date(watch.createdAt).toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		</url>
	`).join('')}
	</urlset>`;

	return new Response(sitemap, {
		headers: { 'Content-Type': 'application/xml' },
	});
}
