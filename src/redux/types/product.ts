// Main Product type
export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  photo?: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt?: Date; 
  updatedAt?: Date;
};

export type TProductResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TProduct;
};

export type TProductsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TProduct[];
};

export type TCreateProductPayload = Omit<TProduct, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;

export type TUpdateProductPayload = Partial<TCreateProductPayload> & {
  _id: string;
};
