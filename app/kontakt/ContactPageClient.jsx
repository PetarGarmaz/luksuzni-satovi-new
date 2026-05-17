"use client"

import React from 'react'
import Contact from '@/components/Contact';
import Link from 'next/link';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const KontaktPageClient = () => {
	const { language } = useLanguage();
  	const t = translations[language];

	return (
		<>
			<section className="pt-20 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 bg-black text-white">
				<div className="max-w-7xl mx-auto">
				<div className="flex items-center mb-4 sm:mb-6">
					<Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors mr-4">
					<ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
					<span className="text-sm sm:text-base">{t.catalog.back}</span>
					</Link>
				</div>
				<h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4">{t.contact.title}</h1>
				<p className="text-sm sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
					{t.contact.subtitle}
				</p>
				</div>
			</section>

			<Contact isHeaderVisible={true}/>
		</>
	)
}

export default KontaktPageClient