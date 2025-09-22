import { observer } from 'mobx-react-lite';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { referralStore } from '@/stores/ReferralStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const Recommendations = observer(() => {
  const recommendations = referralStore.latestRecommendations;
  const { language } = useLanguage();
  const t = translations[language];

  const scrollLeft = () => {
    const container = document.getElementById('recommendations-scroll');
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('recommendations-scroll');
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 uppercase">{t.recommendations.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.recommendations.subtitle}
          </p>
        </div>

        {/* Horizontal Scrolling Recommendations */}
        {recommendations.length > 0 ? (
          <>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute max-lg:hidden left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ marginTop: '-2rem' }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute max-lg:hidden right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ marginTop: '-2rem' }}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
              
              <div id="recommendations-scroll" className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 min-w-max px-16">
                  {recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="group cursor-pointer flex-shrink-0 w-80">
                      <div className="bg-white rounded-lg p-6 shadow-sm group-hover:shadow-lg transition-all duration-300 h-full">
                        <div className="flex items-center mb-4">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{recommendation.name}</h3>
                            <p className="text-sm text-gray-500">{recommendation.location}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(recommendation.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          "{recommendation.text}"
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            {new Date(recommendation.createdAt).toLocaleDateString('hr-HR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {t.recommendations.noRecommendations}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

export default Recommendations;