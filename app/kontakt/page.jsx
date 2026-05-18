import KontaktPageClient from './ContactPageClient';

export async function generateMetadata() {
	return {
		title: 'Kontakt - Kontaktirajte nas sa Povjerenjem - Time',
		description: 'Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz proverenu autentičnost i sigurnost.',
	};
}

const KontaktPage = () => {
	return (
		<KontaktPageClient/>
	)
}

export default KontaktPage