interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ProductImage {
  id: number;
  documentId: string;
  name: string;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
  };
  url: string;
}

interface ProductDimension {
  id: number;
  code: string;
  dimension: string;
  price: number;
  inStock: boolean;
}

interface Category {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featured: boolean | null;
  category: Category;
  image: ProductImage[];
  dimensions: ProductDimension[];
}

export interface ProductResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
} 