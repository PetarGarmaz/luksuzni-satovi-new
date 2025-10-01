import './globals.css';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap'
});

export const metadata = {
  title: 'Luksuzni-Satovi | Rabljeni luksuzni satovi',
  description: 'Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz proverenu autentičnost i sigurnost.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
		<head>
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Luksuzni-Satovi | Rabljeni luksuzni satovi" />
			<meta property="og:description" content="Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz proverenu autentičnost i sigurnost." />
			<meta property="og:site_name" content="Luksuzni-satovi" />
			<meta name="keywords" content="luksuzni satovi, prodaja luksuznih satova, otkup luksuznih satova, otkup rolex, rolex, otkup satova, Rolex, Breitling, Omega, Iwc, Patek Philippe, Audemars Piguet" />
			<meta property="og:locale" content="hr_HR" />

			<meta property="og:image" content="https://luksuzni-satovi-new.vercel.app/og_logo.jpg" />
			<meta property="og:image:width" content="300" />
			<meta property="og:image:height" content="200" />
			<meta property="og:image:alt" content="Luksuzni-Satovi" />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content="Luksuzni-Satovi | Rabljeni luksuzni satovi" />
			<meta name="twitter:description" content="Luksuzni satovi – rabljeni luksuzni satovi sa garancijom. Otkup luksuznih satova, prodaja i kupovina ekskluzivnih brendova uz proverenu autentičnost i sigurnost." />
			<meta name="twitter:image" content="https://luksuzni-satovi-new.vercel.app/og_logo.jpg" />
			<meta name="twitter:image:alt" content="Luksuzni-Satovi" />
			
			<link rel="icon" href="/favicon.ico" sizes="64x64" />
			<link rel="apple-touch-icon" href="/favicon.ico"></link>
		</head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}