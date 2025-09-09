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
    <html lang="en">
		<head>
			<meta property="og:image" content="/og_logo.png" />
			<meta property="og:image:alt" content="Luksuzni-Satovi" />
			<meta property="og:image:type" content="image/png" />
			<meta property="og:image:width" content="32" />
			<meta property="og:image:height" content="32" />
			<meta name="keywords" content="luksuzni satovi, prodaja luksuznih satova, otkup luksuznih satova, otkup rolex, rolex, otkup satova, Rolex, Breitling, Omega, Iwc, Patek Philippe, Audemars Piguet" />

			<meta name="twitter:image" content="/og_logo.png" />
			<meta name="twitter:image:type" content="image/png" />
			<meta name="twitter:image:width" content="32" />
			<meta name="twitter:image:height" content="32" />

			<link rel="icon" href="/favicon.ico" sizes="32x32" />
			<link rel="apple-touch-icon" href="/appleIcon.png"></link>
		</head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}