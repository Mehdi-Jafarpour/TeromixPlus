import { Link } from 'wouter';
import { hasImage, hasField, hasSubcategories, hasParentCategory } from '@/services/strapi';

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    slug: string;
    [key: string]: any; // Allow any additional fields
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products?category=${category.slug}`}>
        <div className="relative">
          {hasImage(category) ? (
            <img 
              src={category.image.url}
              alt={category.image.alternativeText || category.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-[#F9F5E7] flex items-center justify-center">
              <i className="fas fa-folder text-4xl text-[#8C7354]"></i>
            </div>
          )}
          {hasParentCategory(category) && (
            <div className="absolute top-3 left-3">
              <Link href={`/products?category=${category.parentCategory.slug}`}>
                <span className="bg-[#73946B]/80 text-white text-xs px-2 py-1 rounded hover:bg-[#73946B]">
                  {category.parentCategory.name}
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-playfair font-bold text-lg text-[#4A3C2A] mb-2">{category.name}</h3>
          {hasField(category, 'description') && (
            <p className="text-[#8C7354] text-sm mb-4 line-clamp-2">{category.description}</p>
          )}
          {hasSubcategories(category) && (
            <div className="space-x-2">
              {category.subcategories.map(sub => (
                <Link key={sub.id} href={`/products?category=${sub.slug}`}>
                  <span className="inline-block text-xs text-[#73946B] bg-[#F9F5E7] px-2 py-1 rounded-full hover:bg-[#A38F71]/10">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard; 