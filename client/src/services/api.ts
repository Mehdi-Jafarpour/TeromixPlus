import axios from 'axios';

const STRAPI_URL = 'http://localhost:1337';

const api = axios.create({
  baseURL: STRAPI_URL,
});

interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    subcategories?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
          description?: string;
          productCount?: number;
        }
      }>
    }
    productCount?: number;
  }
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  subcategories: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    productCount: number;
  }>;
}

// Transform Strapi product data to match our frontend structure
const transformProduct = (item: any) => {
  const baseUrl = 'http://localhost:1337';
  const imageUrl = item.imageUrl?.[0]?.url 
    ? `${baseUrl}${item.imageUrl[0].url}`
    : item.imageUrl?.[0]?.formats?.thumbnail?.url 
      ? `${baseUrl}${item.imageUrl[0].formats.thumbnail.url}`
      : '/placeholder.jpg';

  return {
    id: item.id,
    name: item.name,
    description: item.description?.[0]?.children?.[0]?.text || '',
    price: item.dimensions?.[0]?.price || 0,
    woodType: item.dimensions?.[0]?.woodType || '',
    dimensions: item.dimensions?.[0]?.dimension || '',
    weight: item.dimensions?.[0]?.weight || 0,
    rating: item.rating || 0,
    reviewCount: item.reviewCount || 0,
    inStock: item.dimensions?.[0]?.inStock ?? true,
    slug: item.slug,
    imageUrl,
    category: item.category ? {
      id: item.category.id,
      name: item.category.name,
      slug: item.category.slug
    } : null
  };
};

export const getProducts = async () => {
  const response = await api.get('/api/products?populate=*');
  return response.data.data.map(transformProduct);
};

export const getProduct = async (slug: string) => {
  const response = await api.get(`/api/products?filters[slug][$eq]=${slug}&populate=*`);
  const product = response.data.data[0];
  if (!product) return null;
  return transformProduct(product);
  console.log (product)
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/api/products?filters[featured][$eq]=true&populate=*');
  return response.data.data.map(transformProduct);
};

// Transform category data with improved type safety and error handling
const transformCategory = (item: any): Category => {
  if (!item || typeof item !== 'object') {
    throw new Error('Invalid category item received');
  }

  // Log the raw item for debugging
  console.log('Raw category item:', JSON.stringify(item, null, 2));

  // Handle both direct properties and nested attributes structure
  const data = item.attributes || item;
  
  const category: Category = {
    id: item.id,
    name: data.name || 'Untitled Category',
    slug: data.slug || `category-${item.id}`,
    description: data.description || '',
    productCount: data.products?.count || 0,
    subcategories: []
  };

  // Handle subcategories with error checking
  if (data.subcategories?.data && Array.isArray(data.subcategories.data)) {
    console.log('Found subcategories:', data.subcategories.data);
    category.subcategories = data.subcategories.data.map(sub => {
      if (!sub || !sub.attributes) {
        console.warn('Invalid subcategory data:', sub);
        return null;
      }
      return {
        id: sub.id,
        name: sub.attributes.name || 'Untitled Subcategory',
        slug: sub.attributes.slug || `subcategory-${sub.id}`,
        description: sub.attributes.description || '',
        productCount: sub.attributes.products?.count || 0
      };
    }).filter(Boolean); // Remove any null values
  }

  console.log('Transformed category:', category);
  return category;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/api/categories?populate[subcategories][populate]=*&populate[products][count]=true');
    console.log('Raw categories response:', JSON.stringify(response.data, null, 2));
    
    if (!response.data?.data || !Array.isArray(response.data.data)) {
      console.error('Invalid API response structure:', response.data);
      throw new Error('Invalid category data received from API');
    }
    
    const categories = response.data.data
      .map(item => {
        try {
          return transformCategory(item);
        } catch (error) {
          console.warn('Failed to transform category:', item, error);
          return null;
        }
      })
      .filter(Boolean); // Remove any null values
    
    console.log('Transformed categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategory = async (slug: string): Promise<Category | null> => {
  try {
    const response = await api.get(
      `/api/categories?filters[slug][$eq]=${slug}&populate[subcategories][populate]=*&populate[products][count]=true`
    );
    console.log('Raw category response:', response.data);
    
    const category = response.data.data[0];
    if (!category) return null;
    
    return transformCategory(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}; 