import useSWR from 'swr';

type MenuItem = {
  id: string;
  name: string;
  price?: string;
  desc?: string;
  img?: string;
  ingredients?: string;
  steps?: string;
  categoryId?: string;
};

type Category = {
  id: string;
  title: string;
  items: MenuItem[];
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    '/api/categories',
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch on window focus
      revalidateOnReconnect: false, // Don't refetch on reconnect
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
    mutate, // Function to manually refresh data
  };
}
