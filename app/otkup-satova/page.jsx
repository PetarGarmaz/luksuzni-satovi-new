import OtkupClientPage from './OtkupClient';

export async function generateMetadata() {
	return {
		title: 'Otkup Satova - Rabljeni Luksuzni Satovi Odlične Cijene - Time',
		description: 'Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz proverenu autentičnost i sigurnost.',
	};
}

const OtkupSatovaPage = () => {
	return (
		<OtkupClientPage/>
	)
}

export default OtkupSatovaPage;