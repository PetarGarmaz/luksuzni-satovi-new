'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ArrowLeft, Search, Filter } from 'lucide-react';
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

const CatalogClient = observer(() => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const allCategories = watchStore.categories;
  const allBrands = ['All', ...new Set(watchStore.watches.map(watch => watch.brand))];
  
  let filteredWatches = watchStore.getFilteredWatches(searchTerm, selectedCategory);
  
  // Filter by brand
  if (selectedBrand !== 'All') {
    filteredWatches = filteredWatches.filter(watch => watch.brand === selectedBrand);
  }
  
  // Sort watches
  filteredWatches.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'year':
        return b.year - a.year;
      case 'brand':
        return a.brand.localeCompare(b.brand);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4 sm:mb-6">
            <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors mr-4">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-sm sm:text-base">{t.catalog.back}</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4">{t.catalog.title}</h1>
          <p className="text-sm sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 sm:py-8 px-4 sm:px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder={t.catalog.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-sm h-10"
              />
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="text-xs sm:text-sm h-9 sm:h-10 sm:w-40">
                  <SelectValue placeholder={t.catalog.category} />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category} className="text-xs sm:text-sm">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="text-xs sm:text-sm h-9 sm:h-10 sm:w-40">
                  <SelectValue placeholder={t.catalog.brand} />
                </SelectTrigger>
                <SelectContent>
                  {allBrands.map((brand) => (
                    <SelectItem key={brand} value={brand} className="text-xs sm:text-sm">
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="text-xs sm:text-sm h-9 sm:h-10 sm:w-40">
                  <SelectValue placeholder={t.catalog.sort} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name" className="text-xs sm:text-sm">{t.catalog.sortOptions.name}</SelectItem>
                  <SelectItem value="brand" className="text-xs sm:text-sm">{t.catalog.sortOptions.brand}</SelectItem>
                  <SelectItem value="price-low" className="text-xs sm:text-sm">{t.catalog.sortOptions.priceLow}</SelectItem>
                  <SelectItem value="price-high" className="text-xs sm:text-sm">{t.catalog.sortOptions.priceHigh}</SelectItem>
                  <SelectItem value="year" className="text-xs sm:text-sm">{t.catalog.sortOptions.year}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            {t.catalog.resultsCount.replace('{count}', filteredWatches.length).replace('{total}', watchStore.watches.length)}
          </div>
        </div>
      </section>

      {/* Watch Grid */}
      <section className="py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filteredWatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {filteredWatches.map((watch) => (
                <Link key={watch.id} href={`/prodaja-satova/${watch.id}`} className="block group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-gray-50 overflow-hidden relative">
                    <img
                      src={watch.image || getWatchImage(watch.brand).url}
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
                      <Badge variant="secondary" className="text-xs">
                        {watch.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {watch.condition}
                      </Badge>
                      <span className="text-xs text-gray-500">{watch.year}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-light text-gray-900 mb-3 sm:mb-4">
                      {formatPrice(watch.price)}
                    </p>
                    <Button 
                      className="w-full text-white hover:opacity-90 transition-opacity text-xs sm:text-sm py-2 sm:py-3"
                      style={{backgroundColor: '#bd890f'}}
                    >
                      {t.catalog.viewDetails}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-500 text-base sm:text-lg mb-4">
                {t.catalog.noResults}
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                }}
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

export default CatalogClient;