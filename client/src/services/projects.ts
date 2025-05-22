import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: STRAPI_URL,
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
    const response = await api.get('/api/projects', {
      params: {
        populate: '*',
      },
    });
    console.log('Projects data:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}; 