'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const TermsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-16 px-4 sm:px-6">
		<section className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-semibold mb-4">{t.termsOfUse.title}</h1>

			<p className="mb-6">{t.termsOfUse.intro}</p>

			{Object.values(t.termsOfUse.sections).map((section, index) => (
				<div key={index} className="mb-6">
				<h2 className="text-2xl font-medium mb-2">{section.title}</h2>
				<p className="mb-2">{section.content}</p>
				{section.items && (
					<ul className="list-disc list-inside mb-2">
					{section.items.map((item, i) => (
						<li key={i}>{item}</li>
					))}
					</ul>
				)}
				</div>
			))}

			<p className="text-gray-600 text-sm">{t.termsOfUse.lastUpdated}</p>
		</section>

      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;