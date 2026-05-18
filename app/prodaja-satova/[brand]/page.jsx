import { watchStore } from '@/stores/WatchStore';
import BrandCatalogClient from './BrandCatalogClient';

export async function generateMetadata({ params }) {
	const brandSlug = params?.brand;
  	const brandWatches = watchStore.getWatchesByBrand(brandSlug);
 	const brandName = brandWatches[0]?.brand || brandSlug;

	if (!brandName) {
		return {
			title: 'Brend nije pronađen - Prodaja i Otkup - Time',
			description: 'Traženi brend nije dostupan u našoj ponudi.',
		};
	}

	const title = `${brandName} Satovi - Prodaja i Otkup - Time`;
	const description = 'Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz provjerenu autentičnost i sigurnost.';

	return {
		title,
		description,
		openGraph: {
			title,
			description
		},
	};
}

const BrandPage = ({ params }) => {
  const brandSlug = params?.brand;
  const brandWatches = watchStore.getWatchesByBrand(brandSlug);
  const brandName = brandWatches[0]?.brand || brandSlug;

  return <BrandCatalogClient brandSlug={brandSlug} brandName={brandName} />;
};

export default BrandPage;
