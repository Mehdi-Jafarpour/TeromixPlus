const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://teromix-cms.onrender.com';

export const fetchAPI = async (path: string, options: RequestInit = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${path}`, mergedOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

export const getStrapiURL = (path: string) => {
  return `${API_URL}${path}`;
};

export const getStrapiMedia = (url: string) => {
  if (url == null) {
    return null;
  }

  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  return `${API_URL}${url}`;
}; 