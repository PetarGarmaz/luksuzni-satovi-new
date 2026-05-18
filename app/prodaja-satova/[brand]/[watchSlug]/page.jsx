import { getWatchForMeta } from '@/lib/watchUtils';
import WatchDetailPageClient from './WatchDetailPageClient';

export async function generateMetadata({ params }) {
	const { brand: brandSlug, watchSlug } = params;
	const watch = await getWatchForMeta(brandSlug, watchSlug);

	if (!watch) {
		return {
			title: 'Sat nije pronađen - Prodaja i Otkup - Time',
			description: 'Traženi sat nije dostupan u našoj ponudi.',
		};
	}

	const title = `${watch.brand} ${watch.name} - Prodaja i Otkup - Time`;
	const description = 'Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz provjerenu autentičnost i sigurnost.';

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
