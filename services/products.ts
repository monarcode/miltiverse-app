import { apiClient } from './api-client';

import { GetSingeProductResponse } from '~/types/product';
import { GetProductsResponse } from '~/types/products';

const APPID = 'BI06Q7WQSTWQS3Y';
const ORGID = 'af547bb2d12043c7981e599d53b1b13f';
const APIKEY = 'eb2437e4b26f465daa2499cd93fd22fe20240714155727801765';

// new api key: eb2437e4b26f465daa2499cd93fd22fe20240714155727801765
// new app id: BI06Q7WQSTWQS3Y
// new org id: af547bb2d12043c7981e599d53b1b13f

const queryString = `Appid=${APPID}&organization_id=${ORGID}&Apikey=${APIKEY}&page=1&size=50`;

const getProducts = async () => {
  try {
    const req = await apiClient
      .get(`products?page=1&size=10&${queryString}`)
      .json<GetProductsResponse>();
    return req;
  } catch (error) {
    console.log(error);
  }
};

const getProductDetails = async (id: string | string[] | undefined) => {
  try {
    const req = await apiClient
      .get(`products/${id}?${queryString}`)
      .json<GetSingeProductResponse>();
    return req;
  } catch (error) {
    console.log(error);
  }
};

export const PRODUCTS_SERVICE = { getProducts, getProductDetails };
