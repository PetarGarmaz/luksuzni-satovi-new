'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { watchStore } from '@/stores/WatchStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getWatchImage } from '@/lib/images';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const BrandCatalogClient = observer(({ brandSlug, brandName }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const brandWatches = watchStore.getWatchesByBrand(brandSlug);

  const allCategories = ['All', ...new Set(brandWatches.map(w => w.category).filter(Boolean))];

  let filtered = brandWatches.filter(watch => {
    const matchesSearch =
      watch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      watch.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || watch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'year': return b.year - a.year;
      default: return a.name.localeCompare(b.name);
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4 sm:mb-6">
            <Link href="/prodaja-satova" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-sm sm:text-base">{t.catalog.back}</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4">{brandName}</h1>
          <p className="text-sm sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {filtered.length} {filtered.length === 1 ? 'sat' : 'satova'} dostupno
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-8 px-4 sm:px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder={t.catalog.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-sm h-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="text-xs sm:text-sm h-9 sm:h-10 sm:w-40">
                  <SelectValue placeholder={t.catalog.category} />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-xs sm:text-sm">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="text-xs sm:text-sm h-9 sm:h-10 sm:w-40">
                  <SelectValue placeholder={t.catalog.sort} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name" className="text-xs sm:text-sm">{t.catalog.sortOptions.name}</SelectItem>
                  <SelectItem value="price-low" className="text-xs sm:text-sm">{t.catalog.sortOptions.priceLow}</SelectItem>
                  <SelectItem value="price-high" className="text-xs sm:text-sm">{t.catalog.sortOptions.priceHigh}</SelectItem>
                  <SelectItem value="year" className="text-xs sm:text-sm">{t.catalog.sortOptions.year}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            {t.catalog.resultsCount.replace('{count}', filtered.length).replace('{total}', brandWatches.length)}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {filtered.map((watch) => {
                const watchSlug = watchStore.getWatchUrlSlug(watch);
                return (
                  <Link
                    key={watch.id}
                    href={`/prodaja-satova/${brandSlug}/${watchSlug}`}
                    className="block group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                      <img
                        src={watch.images[0] || getWatchImage(watch.brand).url}
                        alt={`${watch.brand} ${watch.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {watch.featured && (
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">
                            {t.catalog.featured}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                        {watch.brand} - {watch.name}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{watch.category}</Badge>
                        <Badge variant="outline" className="text-xs">{watch.condition}</Badge>
                        <span className="text-xs text-gray-500">{watch.year}</span>
                      </div>
                      <p className="text-lg sm:text-xl font-light text-gray-900 mb-3 sm:mb-4">
                        {formatPrice(watch.price)}
                      </p>
                      <Button
                        className="w-full text-white hover:opacity-90 transition-opacity text-xs sm:text-sm py-2 sm:py-3"
                        style={{ backgroundColor: '#bd890f' }}
                      >
                        {t.catalog.viewDetails}
                      </Button>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-500 text-base sm:text-lg mb-4">{t.catalog.noResults}</p>
              <Button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                variant="outline"
                className="text-sm"
              >
                {t.catalog.resetFilters}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
});

export default BrandCatalogClient;
