'use client';

import { observer } from 'mobx-react-lite';
import { watchStore } from '@/stores/WatchStore';
import WatchDetailClient from './WatchDetailClient';

const WatchDetailPageClient = observer(({ brandSlug, watchSlug }) => {
	const watch = watchStore.getWatchByBrandAndSlug(brandSlug, watchSlug);
	return <WatchDetailClient watch={watch} brandSlug={brandSlug} />;
});

export default WatchDetailPageClient;
