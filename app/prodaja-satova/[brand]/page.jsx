'use client';

import { observer } from 'mobx-react-lite';
import { watchStore } from '@/stores/WatchStore';
import BrandCatalogClient from './BrandCatalogClient';

const BrandPage = observer(({ params }) => {
  const brandSlug = params?.brand;
  const brandWatches = watchStore.getWatchesByBrand(brandSlug);
  const brandName = brandWatches[0]?.brand || brandSlug;

  return <BrandCatalogClient brandSlug={brandSlug} brandName={brandName} />;
});

export default BrandPage;
