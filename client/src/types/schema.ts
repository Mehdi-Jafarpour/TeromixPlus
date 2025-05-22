export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
  imageUrl: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
    };
  };
  subcategories: Category[];
  category: Category | null;
  products: any[];
} 