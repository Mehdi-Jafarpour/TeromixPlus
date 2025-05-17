import axios, { AxiosError } from 'axios';

const STRAPI_URL = 'http://localhost:1337';

const api = axios.create({
  baseURL: STRAPI_URL,
});

// Helper to safely access nested properties
const get = (obj: any, path: string, defaultValue: any = undefined) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

// Process any media field from Strapi
const processMedia = (data: any) => {
  if (!data?.data) return null;
  const { attributes } = data.data;
  return {
    url: attributes?.url ? `${STRAPI_URL}${attributes.url}` : null,
    alternativeText: attributes?.alternativeText,
    ...attributes
  };
};

// Process any relation field from Strapi
const processRelation = (data: any): any => {
  if (!data?.data) return null;
  if (Array.isArray(data.data)) {
    return data.data.map(item => ({
      id: item.id,
      ...item.attributes
    }));
  }
  return {
    id: data.data.id,
    ...data.data.attributes
  };
};

// Process any Strapi response
const processStrapiResponse = (data: any): any => {
  if (!data) return null;

  // If it's an array of items
  if (Array.isArray(data)) {
    return data.map(item => processStrapiResponse(item));
  }

  // If it's a single item
  const processed: any = {
    id: data.id,
    ...data.attributes
  };

  // Process all potential media fields
  Object.keys(processed).forEach(key => {
    if (key.toLowerCase().includes('image') || key.toLowerCase().includes('media')) {
      processed[key] = processMedia(processed[key]);
    }
  });

  // Process all relation fields (they come as {data: {...}} from Strapi)
  Object.keys(processed).forEach(key => {
    if (processed[key]?.data !== undefined) {
      processed[key] = processRelation(processed[key]);
    }
  });

  return processed;
};

// Generic fetch function with better error handling
const fetchFromApi = async (endpoint: string, params = {}) => {
  try {
    console.log(`Fetching from ${endpoint} with params:`, params);
    const response = await api.get(endpoint, { 
      params: { 
        populate: '*',  // Always populate all relations
        ...params 
      } 
    });
    console.log(`Raw response from ${endpoint}:`, response.data);
    const processed = processStrapiResponse(response.data.data);
    console.log(`Processed response from ${endpoint}:`, processed);
    return processed;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`Error fetching ${endpoint}:`, {
      message: axiosError.message,
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data
    });
    throw error;
  }
};

export const getProducts = async (params = {}) => {
  return fetchFromApi('/api/products', params);
};

export const getProduct = async (slug: string) => {
  const products = await fetchFromApi('/api/products', {
    'filters[slug][$eq]': slug
  });
  return Array.isArray(products) ? products[0] : null;
};

export const getCategories = async (params = {}) => {
  return fetchFromApi('/api/categories', params);
};

export const getCategory = async (slug: string) => {
  const categories = await fetchFromApi('/api/categories', {
    'filters[slug][$eq]': slug
  });
  return Array.isArray(categories) ? categories[0] : null;
};

export const getFeaturedProducts = async () => {
  return fetchFromApi('/api/products', {
    'filters[featured][$eq]': true
  });
};

// Type guard functions to check field existence
export const hasField = (obj: any, field: string): boolean => {
  switch (field) {
    case 'price':
    case 'woodType':
    case 'dimensions':
    case 'weight':
    case 'inStock':
      return obj.dimensions?.[0]?.[field] !== undefined;
    default:
      return obj[field] !== undefined;
  }
};

export const hasImage = (obj: any): boolean => {
  return obj.imageUrl?.[0]?.url !== undefined || obj.imageUrl?.[0]?.formats?.thumbnail?.url !== undefined;
};

export const hasCategory = (obj: any): boolean => {
  return obj.category?.name !== undefined && obj.category?.slug !== undefined;
};

export const hasSubcategories = (obj: any): boolean => {
  const subs = get(obj, 'subcategories', []);
  return Array.isArray(subs) && subs.length > 0;
};

export const hasParentCategory = (obj: any): boolean => {
  return get(obj, 'parentCategory.id') !== undefined;
};

export const getImageUrl = (obj: any): string => {
  if (!hasImage(obj)) return '/placeholder.jpg';
  
  const baseUrl = 'http://localhost:1337';
  return obj.imageUrl[0].url 
    ? `${baseUrl}${obj.imageUrl[0].url}`
    : `${baseUrl}${obj.imageUrl[0].formats.thumbnail.url}`;
};

export const getDimensionField = (obj: any, field: string): any => {
  if (!obj?.dimensions) return undefined;
  
  // Handle array of dimensions
  if (Array.isArray(obj.dimensions)) {
    return obj.dimensions[0]?.[field];
  }
  
  // Handle single dimension object
  if (typeof obj.dimensions === 'object') {
    return obj.dimensions[field];
  }
  
  return undefined;
}; 