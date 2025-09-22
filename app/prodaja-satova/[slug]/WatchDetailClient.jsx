'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, Shield, Clock, Award, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getWatchImage } from '@/lib/images';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const WatchDetailClient = ({ watch }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showContactForm, setShowContactForm] = useState(false);
  const [mainImage, setMainImage] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

	useEffect(() => {
		if (watch) {
			setMainImage(watch.images[0] || getWatchImage(watch.brand).url);
		}
	}, [watch]);

  if (!watch) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            <Link href="/prodaja-satova">
              <Button 
                className="text-white hover:opacity-90 transition-opacity"
                style={{backgroundColor: '#bd890f'}}
              >
                {t.watchDetail.backToCatalog}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-20 sm:pt-32 pb-8 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">{t.footer.home}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/prodaja-satova" className="text-gray-500 hover:text-gray-700">{t.footer.watchSales}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{watch.brand} {watch.name}</span>
          </div>
          <Link href="/prodaja-satova" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.watchDetail.backToCatalog}
          </Link>
        </div>
      </section>

      {/* Watch Detail */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
           {/* Image */}
			<div className="flex flex-col gap-4">
			{/* Main Image */}
			<div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
				<img
				src={mainImage}
				alt={`${watch.brand} ${watch.name}`}
				className="w-full h-full object-cover"
				/>
			</div>

			{/* Image Gallery */}
			<div className="grid grid-cols-4 gap-2">
				{watch.images.map((imgUrl, index) => (
				<button
					key={index}
					onClick={() => setMainImage(imgUrl)}
					className="aspect-square w-full border border-gray-200 rounded overflow-hidden focus:outline-none"
				>
					<img
					src={imgUrl}
					alt={`${watch.brand} ${watch.name} ${index + 1}`}
					className="w-full h-full object-cover hover:opacity-80 transition-opacity"
					/>
				</button>
				))}
			</div>
			</div>

            {/* Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                {watch.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-3">
                    {t.catalog.featured}
                  </Badge>
                )}
                <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
                  {watch.brand}
                </h1>
                <h2 className="text-xl sm:text-2xl text-gray-700 mb-4">
                  {watch.name}
                </h2>
                <p className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                  {formatPrice(watch.price)}
                </p>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{watch.category}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{watch.condition}</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{t.watchDetail.year}:</span> {watch.year}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{t.watchDetail.model}:</span> {watch.model}
                </div>
              </div>

              {/* Description */}
              {watch.description && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t.watchDetail.description}</h3>
                  <p className="text-gray-700 leading-relaxed">{watch.description}</p>
                </div>
              )}

              {/* Technical Specifications */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t.watchDetail.technicalSpecs}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {watch.referenceNumber && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{t.watchDetail.referenceNumber}:</span>
                      <span className="font-medium">{watch.referenceNumber}</span>
                    </div>
                  )}
                  {watch.mechanism && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{t.watchDetail.mechanism}:</span>
                      <span className="font-medium">{watch.mechanism}</span>
                    </div>
                  )}
                  {watch.caseDiameter && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{t.watchDetail.caseDiameter}:</span>
                      <span className="font-medium">{watch.caseDiameter}</span>
                    </div>
                  )}
                  {watch.caseMaterial && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{t.watchDetail.caseMaterial}:</span>
                      <span className="font-medium">{watch.caseMaterial}</span>
                    </div>
                  )}
                  {watch.glassType && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{t.watchDetail.glassType}:</span>
                      <span className="font-medium">{watch.glassType}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Included Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t.watchDetail.included}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {watch.hasBox ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={watch.hasBox ? 'text-gray-900' : 'text-gray-500'}>
                      {t.watchDetail.originalBox}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {watch.hasPapers ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={watch.hasPapers ? 'text-gray-900' : 'text-gray-500'}>
                      {t.watchDetail.documentation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {watch.hasWarranty ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={watch.hasWarranty ? 'text-gray-900' : 'text-gray-500'}>
                      {t.watchDetail.warranty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Shield className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">{t.watchDetail.trustIndicators.authenticity}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">{t.watchDetail.trustIndicators.fastDelivery}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">{t.watchDetail.trustIndicators.expertCheck}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button 
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full text-white py-4 text-lg hover:opacity-90 transition-opacity"
                  style={{backgroundColor: '#bd890f'}}
                  size="lg"
                >
                  {t.watchDetail.contactToBuy}
                </Button>
                
                {showContactForm && (
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">{t.watchDetail.contactInfo}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">{t.contact.phone}</p>
                          <a href="tel:+385989060212" className="text-blue-600 hover:text-blue-800">
                            +385 98 906 0212
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">{t.contact.email}</p>
                          <a href="mailto:info@luksuzni-satovi.com" className="text-blue-600 hover:text-blue-800">
                            info@luksuzni-satovi.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      {t.watchDetail.mentionModel.replace('{brand}', watch.brand).replace('{name}', watch.name).replace('{model}', watch.model)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WatchDetailClient;