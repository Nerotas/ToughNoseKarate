import { DisplayName } from '../common/DisplayName';

export interface CreateProduct {
  name: string;
  description?: string;
  price?: number;
  category?: string;
}

export interface IndexCSVProduct {
  name: string;
  description: string;
  price: string;
  category: string;
}

export interface ProductsAndSectionsForProducts {
  productSections: DisplayName[];
  productTypes: DisplayName[];
  personTypes: DisplayName[];
}
