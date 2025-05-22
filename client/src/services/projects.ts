import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

console.log('STRAPI_URL:', STRAPI_URL); // Debug log

const api = axios.create({
  baseURL: STRAPI_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  id: number;
  documentId: string;
  Title: string;
  Description: string[] | string;
  Category: string;
  Location: string;
  Photo?: {
    url: string;
  };
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    console.log('Starting to fetch projects...'); // Debug log
    console.log('API URL:', `${STRAPI_URL}/api/projects`); // Debug log
    
    const response = await api.get('/api/projects', {
      params: {
        populate: '*',
      },
    });
    
    console.log('Response received:', response); // Debug log
    console.log('Projects data:', response.data);
    return response.data.data;
  } catch (error) {
    console.log('Error details:', { // Debug log
      error,
      config: axios.isAxiosError(error) ? error.config : null,
      response: axios.isAxiosError(error) ? error.response : null,
    });
    
    if (axios.isAxiosError(error)) {
      console.error('Error fetching projects:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    } else {
      console.error('Error fetching projects:', error);
    }
    return [];
  }
}; 