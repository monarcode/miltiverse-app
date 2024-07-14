import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_SERVICE } from '~/services/products';

export function useAllProducts() {
  const {
    data,
    isLoading: loadingProducts,
    ...others
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => PRODUCTS_SERVICE.getProducts(),
  });

  const productsCatalog = data?.items ?? [];

  return {
    productsCatalog,
    loadingProducts,
    ...others,
  };
}
