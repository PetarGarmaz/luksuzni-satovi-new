import { createClient } from "@supabase/supabase-js";

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

export async function getWatchByBrandAndSlug(brandSlug, watchSlug) {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);

	const { data: watches, error } = await supabase
		.from("watch")
		.select("*")
		.eq("brand", await resolveBrandName(supabase, brandSlug));

	if (error || !watches) return null;

	return watches.find(w => getWatchUrlSlug(w, watches) === watchSlug) || null;
}

async function resolveBrandName(supabase, brandSlug) {
	const { data: watches } = await supabase.from("watch").select("brand");
	if (!watches) return brandSlug;
	const match = watches.find(w => generateSlug(w.brand) === brandSlug);
	return match?.brand || brandSlug;
}

export async function getWatchForMeta(brandSlug, watchSlug) {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);

	const { data: allWatches, error } = await supabase.from("watch").select("*");
	if (error || !allWatches) return null;

	const brandWatches = allWatches.filter(w => generateSlug(w.brand) === brandSlug);
	return brandWatches.find(w => getWatchUrlSlug(w, brandWatches) === watchSlug) || null;
}
