'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { getLogo } from '@/lib/images';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, switchLanguage } = useLanguage();
  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src={getLogo().url}
              alt={getLogo().alt}
              className="h-6 sm:h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="nav-link text-sm text-white hover:text-gray-300 transition-colors font-medium uppercase">
              {t.header.home}
            </Link>
            <Link href="/#about" className="nav-link text-sm text-gray-300 hover:text-white transition-colors uppercase">
              {t.header.about}
            </Link>
            <Link href="/prodaja-satova" className="nav-link text-sm text-gray-300 hover:text-white transition-colors uppercase">
              {t.header.watchSales}
            </Link>
            <Link href="/otkup-satova" className="nav-link text-sm text-gray-300 hover:text-white transition-colors uppercase">
              {t.header.watchBuying}
            </Link>
            <Link href="/#contact" className="nav-link text-sm text-gray-300 hover:text-white transition-colors uppercase">
              {t.header.contact}
            </Link>
          </nav>

          {/* Language Switcher & Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 rounded-lg p-1">
              <button
                onClick={() => switchLanguage('hr')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === 'hr' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                HR
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === 'en' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                EN
              </button>
            </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-sm text-white hover:text-gray-300 transition-colors font-medium py-2 border-b border-gray-700 uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.home}
              </Link>
              <Link 
                href="/#about" 
                className="text-sm text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-700 uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.about}
              </Link>
              <Link 
                href="/prodaja-satova" 
                className="text-sm text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-700 uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.watchSales}
              </Link>
              <Link 
                href="/otkup-satova" 
                className="text-sm text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-700 uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.watchBuying}
              </Link>
              <Link 
                href="/#contact" 
                className="text-sm text-gray-300 hover:text-white transition-colors py-2 uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.contact}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;