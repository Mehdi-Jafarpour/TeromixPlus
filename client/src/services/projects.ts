import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
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
    const response = await fetch(`${API_URL}/api/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}; 