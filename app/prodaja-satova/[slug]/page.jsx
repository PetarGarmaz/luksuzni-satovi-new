'use client';

import { observer } from 'mobx-react-lite';
import { watchStore } from '@/stores/WatchStore';
import WatchDetailClient from './WatchDetailClient';
import Head from 'next/head';

const WatchDetailPage = observer(({ params }) => {
  const watch = watchStore.watches.find(w => w.slug === params?.slug);

  return (
	<>
		<Head>
			<title>{watch?.title}</title>
			<meta name="description" content={watch?.description} />
			<meta property="og:title" content={watch?.brand + " - " + watch?.model}  />
			<meta property="og:description" content={watch?.description} />
			<meta property="og:image" content={watch?.images[0]} />
		</Head>
		<WatchDetailClient watch={watch} />;
	</>
  )
});

export default WatchDetailPage;