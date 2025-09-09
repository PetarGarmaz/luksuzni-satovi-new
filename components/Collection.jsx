import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { watchStore } from '@/stores/WatchStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { getWatchImage } from '@/lib/images';

const Collection = observer(() => {
  const featuredWatches = watchStore.featuredWatches;
  const { language } = useLanguage();
  const t = translations[language];

  const scrollLeft = () => {
    const container = document.getElementById('featured-scroll');
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('featured-scroll');
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="collection" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">{t.collection.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.collection.subtitle}
          </p>
        </div>

        {/* Horizontal Scrolling Watch Cards */}
        {featuredWatches.length > 0 ? (
          <>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ marginTop: '-2rem' }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ marginTop: '-2rem' }}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
              
              <div id="featured-scroll" className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 min-w-max px-16">
                {featuredWatches.map((watch) => (
                  <Link key={watch.id} href={`/prodaja-satova/${watch.id}`} className="block group cursor-pointer flex-shrink-0 w-80">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <img
                        src={watch.image || getWatchImage(watch.brand).url}
                        alt={`${watch.brand} ${watch.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{watch.brand} - {watch.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{watch.year} • {watch.condition}</p>
                      <p className="text-lg font-light text-gray-900">{formatPrice(watch.price)}</p>
                    </div>
                  </Link>
                ))}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/prodaja-satova">
                <Button 
                  className="text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity"
                  style={{backgroundColor: '#bd890f'}}
                >
                  {t.collection.viewAll}
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {t.collection.noWatches}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

export default Collection;