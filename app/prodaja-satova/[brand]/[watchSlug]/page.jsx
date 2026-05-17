'use client';

import { observer } from 'mobx-react-lite';
import { watchStore } from '@/stores/WatchStore';
import WatchDetailClient from './WatchDetailClient';

const WatchDetailPage = observer(({ params }) => {
  const { brand: brandSlug, watchSlug } = params || {};
  const watch = watchStore.getWatchByBrandAndSlug(brandSlug, watchSlug);

  return <WatchDetailClient watch={watch} brandSlug={brandSlug} />;
});

export default WatchDetailPage;
