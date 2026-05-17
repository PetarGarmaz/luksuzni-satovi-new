import { getWatchForMeta } from '@/lib/watchUtils';
import WatchDetailPageClient from './WatchDetailPageClient';

export async function generateMetadata({ params }) {
	const { brand: brandSlug, watchSlug } = params;
	const watch = await getWatchForMeta(brandSlug, watchSlug);

	if (!watch) {
		return {
			title: 'Sat nije pronađen | Luksuzni-Satovi',
			description: 'Traženi sat nije dostupan u našoj ponudi.',
		};
	}

	const title = `${watch.brand} ${watch.name} | Luksuzni-Satovi`;
	const description = watch.description
		? watch.description.slice(0, 155).trimEnd() + (watch.description.length > 155 ? '…' : '')
		: `Kupite ${watch.brand} ${watch.name} (${watch.year}) – ${watch.condition} sat. Autentičnost zajamčena. Pogledajte cijenu i specifikacije na Luksuzni-Satovi.`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: watch.images?.[0] ? [{ url: watch.images[0] }] : [],
		},
	};
}

export default function WatchDetailPage({ params }) {
	const { brand: brandSlug, watchSlug } = params;
	return <WatchDetailPageClient brandSlug={brandSlug} watchSlug={watchSlug} />;
}
