import CatalogClient from './CatalogClient';

export async function generateMetadata() {
	return {
		title: 'Prodaja Satova - Luksuzni Satovi po Odličnim Cijenama - Time',
		description: 'Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz provjerenu autentičnost i sigurnost.',
	};
}

const KatalogPage = () => {

	return (
		<CatalogClient />
	)
};

export default KatalogPage;