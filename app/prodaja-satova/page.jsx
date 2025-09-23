import CatalogClient from './CatalogClient';
import Head from 'next/head';

const KatalogPage = () => {

	return (
		<>
			<Head>
				<title>title: 'Luksuzni-Satovi | Prodaja luksuznih satova',</title>
				<meta name="description" content="Luksuzni satovi – prodaja luksuznih satova sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz proverenu autentičnost i sigurnost." />
			</Head>
			<CatalogClient />;
		</>
	)
};

export default KatalogPage;