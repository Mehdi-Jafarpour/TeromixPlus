import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategories } from "@/services/api";
import { ChevronDown, ChevronRight } from "lucide-react";

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

interface ProductSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (min: number, max: number) => void;
  woodTypes: string[];
  selectedWoodTypes: string[];
  onWoodTypeChange: (type: string) => void;
  onResetFilters: () => void;
}

const ProductSidebar = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  woodTypes,
  selectedWoodTypes,
  onWoodTypeChange,
  onResetFilters
}: ProductSidebarProps) => {
  // State for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  // Fetch categories with their subcategories
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 3
  });

  // Toggle category expansion
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCategories = categories?.filter(category => {
    const matchInMain = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchInSub = category.subcategories.some(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchInMain || matchInSub;
  });

  return (
    <div className="lg:w-1/4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-playfair font-bold text-xl text-[#4A3C2A] mb-4">Filters</h2>
        
        {/* Categories Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-[#4A3C2A]">Categories</h3>
            <button 
              onClick={() => setExpandedCategories(new Set(categories?.map(c => c.id) || []))}
              className="text-sm text-[#73946B] hover:text-[#4A3C2A]"
            >
              Expand All
            </button>
          </div>

          {/* Category Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5DED5] rounded-md text-sm focus:outline-none focus:border-[#8C7354]"
            />
          </div>

          {isCategoriesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="ml-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : categoriesError ? (
            <div className="text-red-500 text-sm">
              Failed to load categories. Please try again later.
            </div>
          ) : filteredCategories && filteredCategories.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="cat-all" 
                  name="category" 
                  className="mr-2"
                  checked={!selectedCategory}
                  onChange={() => onCategoryChange(null)}
                />
                <label htmlFor="cat-all" className="text-[#8C7354]">
                  All Products
                </label>
              </div>
              {filteredCategories.map(category => (
                <div key={category.id} className="space-y-2">
                  {/* Parent Category */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center flex-1">
                      <input 
                        type="radio" 
                        id={`cat-${category.id}`} 
                        name="category" 
                        className="mr-2"
                        checked={selectedCategory === category.slug}
                        onChange={() => onCategoryChange(category.slug)}
                      />
                      <label 
                        htmlFor={`cat-${category.id}`} 
                        className={`text-[#8C7354] font-medium flex items-center flex-1 ${selectedCategory === category.slug ? 'text-[#4A3C2A]' : ''}`}
                      >
                        {category.name}
                        <span className="ml-2 text-xs text-[#8C7354]">
                          ({category.productCount})
                        </span>
                      </label>
                    </div>
                    {category.subcategories?.length > 0 && (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="p-1 rounded-md hover:bg-[#F9F5E7] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {expandedCategories.has(category.id) ? (
                          <ChevronDown className="w-4 h-4 text-[#8C7354]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#8C7354]" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Subcategories */}
                  {category.subcategories?.length > 0 && expandedCategories.has(category.id) && (
                    <div className="ml-6 space-y-2 border-l-2 border-[#F9F5E7] pl-4">
                      {category.subcategories.map(sub => (
                        <div key={sub.id} className="flex items-center relative group">
                          <div className="absolute -left-4 top-1/2 h-px w-3 bg-[#F9F5E7]"></div>
                          <input 
                            type="radio" 
                            id={`subcat-${sub.id}`} 
                            name="category" 
                            className="mr-2"
                            checked={selectedCategory === sub.slug}
                            onChange={() => onCategoryChange(sub.slug)}
                          />
                          <label 
                            htmlFor={`subcat-${sub.id}`} 
                            className={`text-[#8C7354] flex items-center justify-between flex-1 ${selectedCategory === sub.slug ? 'text-[#4A3C2A]' : ''}`}
                          >
                            <span>{sub.name}</span>
                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              ({sub.productCount} products)
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[#8C7354] text-sm">
              No categories found.
            </div>
          )}
        </div>
        
        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-[#4A3C2A] mb-3">Price Range</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#8C7354]">${priceRange[0]}</span>
            <input 
              type="range" 
              min="0" 
              max="3000" 
              step="100"
              value={priceRange[0]}
              onChange={(e) => onPriceChange(parseInt(e.target.value), priceRange[1])}
              className="flex-grow"
            />
            <span className="text-[#8C7354]">${priceRange[1]}</span>
          </div>
          <div className="flex justify-between text-sm text-[#8C7354]">
            <span>Min: ${priceRange[0]}</span>
            <span>Max: ${priceRange[1]}</span>
          </div>
        </div>
        
        {/* Wood Type Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-[#4A3C2A] mb-3">Wood Type</h3>
          <div className="space-y-2">
            {woodTypes.map(type => (
              <div key={type} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`wood-${type}`} 
                  className="mr-2"
                  checked={selectedWoodTypes.includes(type)}
                  onChange={() => onWoodTypeChange(type)}
                />
                <label htmlFor={`wood-${type}`} className="text-[#8C7354]">{type}</label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reset Filters Button */}
        <button 
          onClick={() => {
            onResetFilters();
            setSearchTerm("");
            setExpandedCategories(new Set());
          }}
          className="w-full py-2 bg-[#73946B] text-white rounded-md hover:bg-[#4A3C2A] transition"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default ProductSidebar; 