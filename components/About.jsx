import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { getAboutImage } from '@/lib/images';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-light text-gray-900 mb-4 uppercase">
            {t.about.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-8 sm:mb-16">
          <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={getAboutImage().url}
              alt={getAboutImage().alt}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6 uppercase">
              {t.about.serviceTitle}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              {t.about.description1}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {t.about.description2}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
              <svg className="w-8 h-8" style={{color: '#bd890f'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{t.about.features.authenticity.title}</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {t.about.features.authenticity.description}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
              <svg className="w-8 h-8" style={{color: '#bd890f'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{t.about.features.valuation.title}</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {t.about.features.valuation.description}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
              <svg className="w-8 h-8" style={{color: '#bd890f'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{t.about.features.security.title}</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {t.about.features.security.description}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 uppercase">
            {t.about.whyChooseTitle}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            {t.about.whyChooseDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left max-w-4xl mx-auto">
            {t.about.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#bd890f'}}></div>
                <p className="text-gray-700 text-xs sm:text-sm" dangerouslySetInnerHTML={{__html: benefit}}></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;