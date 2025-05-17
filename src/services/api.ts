import axios from 'axios';
import { adaptProductResponse, adaptProduct } from './strapi-adapter';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products?populate=*`);
  return adaptProductResponse(response.data);
};

export const getProduct = async (slug: string) => {
  const response = await axios.get(`${API_URL}/api/products/${slug}?populate=*`);
  return adaptProduct(response.data.data);
};

export const getFeaturedProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products?filters[featured][$eq]=true&populate=*`);
  return adaptProductResponse(response.data);
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/api/categories?populate=*`);
  return response.data.data.map((category: any) => ({
    id: category.id,
    name: category.title,
    slug: category.documentId,
    subcategories: category.subcategories?.map((sub: any) => ({
      id: sub.id,
      name: sub.title,
      slug: sub.documentId,
    })) || [],
  }));
}; 