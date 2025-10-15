import useSWR from 'swr';

type GalleryItem = {
  id: string;
  title?: string;
  caption?: string;
  img: string;
  branch?: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useGallery() {
  const { data, error, isLoading, mutate } = useSWR<GalleryItem[]>(
    '/api/gallery',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    items: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
