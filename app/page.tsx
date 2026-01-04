import { fetchProductList } from '@/lib/api';
import HomeContent from './_components/HomeContent';

export default async function Home() {
  const initialData = await fetchProductList({
    category: null,
    lastId: null,
    size: 10,
  }).catch(() => undefined);

  return <HomeContent initialData={initialData} />;
}
