import imagesData from '@/data/images.json';

export const getImage = (category, id = 'default') => {
  try {
    const categoryImages = imagesData[category];
    if (!categoryImages) {
      console.warn(`Image category '${category}' not found`);
      return imagesData.watches.default;
    }

    if (Array.isArray(categoryImages)) {
      const image = categoryImages.find(img => img.id === id);
      return image || categoryImages[0] || imagesData.watches.default;
    }

    const image = categoryImages[id] || categoryImages.default || categoryImages;
    return image || imagesData.watches.default;
  } catch (error) {
    console.error('Error loading image:', error);
    return imagesData.watches.default;
  }
};

export const getWatchImage = (brand) => {
  const brandKey = brand?.toLowerCase().replace(/[^a-z]/g, '');
  const brandMap = {
    'rolex': 'rolex',
    'omega': 'omega', 
    'breitling': 'breitling',
    'cartier': 'cartier',
    'tagheuer': 'tagHeuer',
    'hublot': 'hublot',
    'audemarspiguet': 'audemars',
    'patekphilippe': 'patek',
    'alangesoehne': 'lange'
  };
  
  const imageKey = brandMap[brandKey] || 'default';
  return getImage('watches', imageKey);
};

export const getHeroSlide = (index) => {
  return getImage('hero', 'slides')?.[index] || getImage('watches', 'default');
};

export const getHeroBrand = (brandId) => {
  const brands = imagesData.hero.brands;
  return brands.find(brand => brand.id === brandId) || brands[0];
};

export const getLogo = () => {
  return getImage('logo', 'main');
};

export const getAboutImage = () => {
  return getImage('about', 'main');
};