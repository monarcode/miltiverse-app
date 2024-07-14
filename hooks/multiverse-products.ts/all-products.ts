import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_SERVICE } from '~/services/products';

export function useProducts() {
  const { data, isLoading, error, ...others } = useQuery({
    queryKey: ['products'],
    queryFn: PRODUCTS_SERVICE.getProducts,
  });

  const techgagdets = data?.items
    .filter((item) => item?.categories?.[0]?.name === 'tech-gagdet')
    .sort((a, b) => {
      const dateA = new Date(a.date_created || '').getTime();
      const dateB = new Date(b.date_created || '').getTime();
      return dateA - dateB;
    });
  const mensfashion = data?.items
    .filter((item) => item?.categories?.[0]?.name === 'mens-fashion')
    .sort((a, b) => {
      const dateA = new Date(a.date_created || '').getTime();
      const dateB = new Date(b.date_created || '').getTime();
      return dateA - dateB;
    });
  const womensfashion = data?.items
    .filter((item) => item?.categories?.[0]?.name === 'womens-fashion')
    .sort((a, b) => {
      const dateA = new Date(a.date_created || '').getTime();
      const dateB = new Date(b.date_created || '').getTime();
      return dateA - dateB;
    });

  return { isLoading, techgagdets, mensfashion, womensfashion, error, ...others };
}
