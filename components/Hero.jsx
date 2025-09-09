import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { watchStore } from '@/stores/WatchStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { getHeroSlide, getHeroBrand } from '@/lib/images';

const Hero = observer(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  
  const heroSlides = [
    {
      image: getHeroSlide(0).url,
      title: t.hero.rolex.title,
      subtitle: t.hero.rolex.subtitle,
      description: t.hero.rolex.description
    },
    {
      image: getHeroSlide(1).url,
      title: t.hero.breitling.title,
      subtitle: t.hero.breitling.subtitle,
      description: t.hero.breitling.description
    },
    {
      image: getHeroSlide(2).url,
      title: t.hero.cartier.title,
      subtitle: t.hero.cartier.subtitle,
      description: t.hero.cartier.description
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleDotClick = (index) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const currentSlide = heroSlides[currentImageIndex];

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={currentSlide.image}
            alt="Luxury Watch"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 sm:pt-20">
            <div className={`text-white max-w-xl transition-all duration-700 ease-out transform ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <p className={`text-sm font-semibold mb-2 tracking-wider text-amber-400 transition-all duration-700 ease-out delay-100 transform ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`} style={{color: '#bd890f'}}>
                {currentSlide.subtitle}
              </p>
              <h1 className={`text-2xl sm:text-4xl md:text-5xl font-light mb-4 leading-tight transition-all duration-700 ease-out delay-200 transform ${
                isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}>
                {currentSlide.title}
              </h1>
              <p className={`text-base sm:text-lg text-gray-300 mb-6 leading-relaxed transition-all duration-700 ease-out delay-300 transform ${
                isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}>
                {currentSlide.description}
              </p>
              <div className={`transition-all duration-700 ease-out delay-500 transform ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                <Link href="/prodaja-satova">
                  <Button 
                    variant="outline" 
                    className="border-white text-black bg-white hover:bg-[#bd890f] hover:text-white hover:border-[#bd890f] transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  >
                    {t.hero.viewOffer}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-500 ease-out hover:scale-110 ${
                index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Rolex */}
            <div className="relative group cursor-pointer rounded-lg">
              <div className="aspect-square overflow-hidden transition-all duration-300">
                <img
                  src={getHeroBrand('rolex').url}
                  alt={getHeroBrand('rolex').alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-white">
                  <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">ROLEX</p>
                  <h3 className="text-sm sm:text-xl font-semibold mb-2" dangerouslySetInnerHTML={{__html: t.hero.brands.rolex.title.replace(/\n/g, '<br />')}}></h3>
                  <Link href="/prodaja-satova">
                    <Button size="sm" variant="outline" className="border-white text-black bg-white hover:bg-[#bd890f] hover:text-white hover:border-[#bd890f] text-xs font-semibold px-2 sm:px-4 py-1 sm:py-2">
                      {t.hero.viewOffer}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Breitling */}
            <div className="relative group cursor-pointer rounded-lg">
              <div className="aspect-square overflow-hidden transition-all duration-300">
                <img
                  src={getHeroBrand('breitling').url}
                  alt={getHeroBrand('breitling').alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-white">
                  <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">BREITLING</p>
                  <h3 className="text-sm sm:text-xl font-semibold mb-2" dangerouslySetInnerHTML={{__html: t.hero.brands.breitling.title.replace(/\n/g, '<br />')}}></h3>
                  <Link href="/prodaja-satova">
                    <Button size="sm" variant="outline" className="border-white text-black bg-white hover:bg-[#bd890f] hover:text-white hover:border-[#bd890f] text-xs font-semibold px-2 sm:px-4 py-1 sm:py-2">
                      {t.hero.viewOffer}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Cartier */}
            <div className="relative group cursor-pointer rounded-lg">
              <div className="aspect-square overflow-hidden transition-all duration-300">
                <img
                  src={getHeroBrand('cartier').url}
                  alt={getHeroBrand('cartier').alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-white">
                  <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">CARTIER</p>
                  <h3 className="text-sm sm:text-xl font-semibold mb-2" dangerouslySetInnerHTML={{__html: t.hero.brands.cartier.title.replace(/\n/g, '<br />')}}></h3>
                  <Link href="/prodaja-satova">
                    <Button size="sm" variant="outline" className="border-white text-black bg-white hover:bg-[#bd890f] hover:text-white hover:border-[#bd890f] text-xs font-semibold px-2 sm:px-4 py-1 sm:py-2">
                      {t.hero.viewOffer}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Hero;