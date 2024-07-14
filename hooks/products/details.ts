import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_SERVICE } from '~/services/products';

export function useProductDetails(id: string | string[] | undefined) {
  const {
    data,
    isLoading: loadingProduct,
    ...others
  } = useQuery({
    queryKey: ['products-details', id],
    queryFn: () => PRODUCTS_SERVICE.getProductDetails(id),
  });

  return {
    data,
    loadingProduct,
    ...others,
  };
}
