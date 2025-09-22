'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { watchStore } from '@/stores/WatchStore';
import WatchDetailClient from './WatchDetailClient';

const WatchDetailPage = observer(({ params }) => {
  const watch = watchStore.watches.find(w => w.slug === params?.slug);

  console.log("My Watch:\n" + watchStore);

  return <WatchDetailClient watch={watch} />;
});

export default WatchDetailPage;