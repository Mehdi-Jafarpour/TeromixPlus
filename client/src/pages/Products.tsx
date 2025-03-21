import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product, Category } from "@shared/schema";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [woodTypes, setWoodTypes] = useState<string[]>([]);
  const [selectedWoodTypes, setSelectedWoodTypes] = useState<string[]>([]);

  // Parse URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const category = searchParams.get('category');
    const query = searchParams.get('q');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  // Fetch all categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch products with filters
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory, searchQuery],
    enabled: true,
  });

  // Extract unique wood types from products
  useEffect(() => {
    if (products && products.length > 0) {
      const types = [...new Set(products.map(product => product.woodType))];
      setWoodTypes(types);
    }
  }, [products]);

  // Filter products based on selected criteria
  const filteredProducts = products?.filter(product => {
    const matchesWoodType = selectedWoodTypes.length === 0 || selectedWoodTypes.includes(product.woodType);
    const matchesPrice = (product.salePrice || product.price) >= priceRange[0] && (product.salePrice || product.price) <= priceRange[1];
    return matchesWoodType && matchesPrice;
  });

  // Handle wood type filter change
  const handleWoodTypeChange = (type: string) => {
    if (selectedWoodTypes.includes(type)) {
      setSelectedWoodTypes(selectedWoodTypes.filter(t => t !== type));
    } else {
      setSelectedWoodTypes([...selectedWoodTypes, type]);
    }
  };

  // Handle price range change
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-[#4A3C2A]">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-[#8C7354] mt-2">Loading products...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-96 animate-pulse">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
        </h1>
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5E7]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-[#4A3C2A]">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`
                : "All Products"
            }
          </h1>
          <p className="text-[#8C7354] mt-2">
            Discover our handcrafted wooden millwork pieces for your home
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-playfair font-bold text-xl text-[#4A3C2A] mb-4">Filters</h2>
              
              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-[#4A3C2A] mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="cat-all" 
                      name="category" 
                      className="mr-2"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory(null)}
                    />
                    <label htmlFor="cat-all" className="text-[#8C7354]">All Products</label>
                  </div>
                  {categories?.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`cat-${category.id}`} 
                        name="category" 
                        className="mr-2"
                        checked={selectedCategory === category.slug}
                        onChange={() => setSelectedCategory(category.slug)}
                      />
                      <label htmlFor={`cat-${category.id}`} className="text-[#8C7354]">{category.name}</label>
                    </div>
                  ))}
                </div>
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
                    onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
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
                        onChange={() => handleWoodTypeChange(type)}
                      />
                      <label htmlFor={`wood-${type}`} className="text-[#8C7354]">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button 
                onClick={() => {
                  setSelectedWoodTypes([]);
                  setPriceRange([0, 3000]);
                }}
                className="w-full py-2 bg-[#F9F5E7] text-[#4A3C2A] rounded-md hover:bg-[#A38F71]/10 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center">
                <i className="fas fa-search text-5xl text-[#8C7354] mb-4"></i>
                <h3 className="font-playfair font-bold text-xl text-[#4A3C2A] mb-2">No Products Found</h3>
                <p className="text-[#8C7354] mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery(null);
                    setSelectedWoodTypes([]);
                    setPriceRange([0, 3000]);
                  }}
                  className="px-4 py-2 bg-[#8C7354] text-white rounded-md hover:bg-[#4A3C2A] transition"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
