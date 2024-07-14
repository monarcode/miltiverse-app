export interface GetProductsResponse {
  page: number;
  size: number;
  total: number;
  debug: null;
  previous_page: null;
  next_page: null;
  items: Product[];
}

export interface Product {
  name: string;
  description: string | null;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: null;
  unavailable: boolean;
  unavailable_start: null;
  unavailable_end: null;
  id: string;
  parent_product_id: null;
  parent: null;
  organization_id: string;
  product_image: any[];
  categories: Category[];
  date_created: string;
  last_updated: string;
  user_id: string;
  photos: Photo[];
  current_price: Currentprice[];
  is_deleted: boolean;
  available_quantity: number;
  selling_price: null;
  discounted_price: null;
  buying_price: null;
  extra_infos: null;
}

interface Currentprice {
  NGN: (any[] | null | number)[];
}

interface Photo {
  model_name: string;
  model_id: string;
  organization_id: string;
  filename: string;
  url: string;
  is_featured: boolean;
  save_as_jpg: boolean;
  is_public: boolean;
  file_rename: boolean;
  position: number;
}

interface Category {
  organization_id: string;
  name: string;
  position: null;
  category_type: string;
  description: string;
  last_updated: string;
  id: string;
  parent_id: null;
  url_slug: null;
  is_deleted: boolean;
  date_created: string;
  subcategories: any[];
  parents: any[];
}
