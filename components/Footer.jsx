'use client';

import Link from 'next/link';
import Image from "next/image";
import { Watch, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { getLogo } from '@/lib/images';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language];

return (
	<footer className="bg-black text-white rounded-t-lg">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
				{/* Brand Section */}
				<div className="space-y-3 sm:space-y-4 text-center md:text-left">
					<div className="flex items-center gap-2">
					 <img src={getLogo().url} alt={getLogo().alt} className="h-8 sm:h-10 w-auto filter invert brightness-0 contrast-100 mx-auto md:mx-0"/>
					</div>
					<p className="text-background/60 text-xs sm:text-sm">
					{t.footer.description.split('\n\n').map((line, index) => (
						<span key={index}>
							{line}
							{index === 0 && <><br className="hidden sm:block"/><br className="hidden sm:block"/></>}
						</span>
					))}
					</p>
				</div>

				{/* Quick Links */}
				<div className="text-center md:text-left">
					<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.footer.navigation}</h3>
					<ul className="space-y-1 sm:space-y-2">
						<li><Link href="/#pocetna" className="nav-link text-background/60 hover:text-background transition text-sm">{t.footer.home}</Link></li>
						<li><Link href="/prodaja-satova" className="nav-link text-background/60 hover:text-background transition text-sm">{t.footer.watchSales}</Link></li>
						<li><Link href="/otkup-satova" className="nav-link text-background/60 hover:text-background transition text-sm">{t.footer.watchBuying}</Link></li>
						<li><Link href="/#kontakt" className="nav-link text-background/60 hover:text-background transition text-sm">{t.footer.contact}</Link></li>
					</ul>
				</div>

				{/* Contact Info */}
				<div className="text-center md:text-left">
					<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.footer.contact}</h3>
					<div className='flex flex-col space-y-2 sm:space-y-3 text-background/60'>
						<Link href="mailto:milicevic.domagoj1@gmail.com" className='nav-link flex gap-2 text-background/60 hover:text-background transition justify-center md:justify-start'>
							<Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
							<span className="text-xs sm:text-sm break-all">milicevic.domagoj1@gmail.com</span>
						</Link>
						<Link href="tel:+385989060212" className='flex gap-2 nav-link text-background/60 hover:text-background transition justify-center md:justify-start'>
							<Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
							<span className="text-xs sm:text-sm">+385 98 906 0212</span>
						</Link>
					</div>
				</div>

			</div>

      {/*<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174.59031067008064!2d18.67709519223647!3d45.561489733325715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ce7a775ea4e15%3A0x97f9d54da0a3b881!2sStanica%20TRG%20A.%20STAR%C4%8CEVI%C4%86A%20%22NAMA%22%20(JUG)!5e0!3m2!1sen!2shr!4v1746380583386!5m2!1sen!2shr" className='rounded-lg w-full my-10' width="600" height="300" allowfullscreen="false" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>*/}
			
			{/* Bottom Bar */}
			<div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
				<div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
					<p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
					{t.footer.copyright.replace('{year}', currentYear)}
					</p>
					<div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
					<Link href="#" className="text-gray-400 hover:text-white transition">{t.footer.privacy}</Link>
					<Link href="#" className="text-gray-400 hover:text-white transition">{t.footer.terms}</Link>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
}