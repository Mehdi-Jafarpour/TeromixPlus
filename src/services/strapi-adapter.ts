import { Product as StrapiProduct } from '../types/product';

export interface AdaptedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  inStock: boolean;
  dimensions: string;
}

export function adaptProduct(strapiProduct: StrapiProduct): AdaptedProduct {
  // Get the first dimension's price or 0 if no dimensions
  const price = strapiProduct.dimensions?.[0]?.price || 0;
  
  // Check if any dimension is in stock
  const inStock = strapiProduct.dimensions?.some(dim => dim.inStock) || false;
  
  // Get the first image URL or empty string if no images
  const imageUrl = strapiProduct.image?.[0]?.url || '';
  
  // Get all dimensions as a string
  const dimensionsStr = strapiProduct.dimensions
    ?.map(dim => `${dim.dimension} (${dim.code})`)
    .join(', ') || '';

  return {
    id: strapiProduct.id,
    name: strapiProduct.name,
    slug: strapiProduct.documentId, // Using documentId as slug since we don't have a slug field
    price,
    imageUrl,
    category: {
      id: strapiProduct.category.id,
      name: strapiProduct.category.title,
      slug: strapiProduct.category.documentId, // Using documentId as slug
    },
    inStock,
    dimensions: dimensionsStr,
  };
}

export function adaptProductResponse(response: { data: StrapiProduct[] }) {
  return response.data.map(adaptProduct);
} 