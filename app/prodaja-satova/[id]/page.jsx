import { watchStore } from '@/stores/WatchStore';
import WatchDetailClient from './WatchDetailClient';

export async function generateStaticParams() {
  // Generate static params for all watches in the store
  return watchStore.watches.map((watch) => ({
    id: watch.id.toString(),
  }));
}

const WatchDetailPage = ({ params }) => {
  const watchId = parseInt(params.id);
  const watch = watchStore.watches.find(w => w.id === watchId);

  return <WatchDetailClient watch={watch} />;
};

export default WatchDetailPage;