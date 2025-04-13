import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { t } = useTranslation();
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  const filterProducts = (category: string) => {
    setActiveFilter(category);
  };

  if (isLoading) {
    return (
      <section id="products" className="py-16 bg-[#F9F5E7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">{t('home.featured_products.title')}</h2>
              <p className="text-[#8C7354] max-w-xl">{t('common.loading')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
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
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-16 bg-[#F9F5E7]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">{t('home.featured_products.title')}</h2>
          <p className="text-red-500">{t('common.error')}</p>
        </div>
      </section>
    );
  }

  // Filter products based on selected category
  let filteredProducts = products;
  if (activeFilter !== "all" && products) {
    const categoryId = activeFilter === "doors" ? 1 : 
                       activeFilter === "cabinetry" ? 2 :
                       activeFilter === "furniture" ? 3 :
                       activeFilter === "moldings" ? 4 :
                       activeFilter === "decor" ? 5 : 0;
                       
    filteredProducts = products.filter(product => product.categoryId === categoryId);
  }

  return (
    <section id="products" className="py-16 bg-[#F9F5E7]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">{t('home.featured_products.title')}</h2>
            <p className="text-[#8C7354] max-w-xl">Our most popular and newest handcrafted wooden millwork pieces</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/products" className="inline-flex items-center text-[#8C7354] hover:text-[#4A3C2A] font-medium">
              {t('home.featured_products.view_all')} <i className="fas fa-long-arrow-alt-right ml-2"></i>
            </Link>
          </div>
        </div>

        {/* Product Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-[#8C7354] text-white' : 'bg-white hover:bg-[#A38F71]/10 text-[#4A3C2A]'} text-sm font-medium transition`}
            onClick={() => filterProducts('all')}
          >
            {t('products.all')}
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'doors' ? 'bg-[#8C7354] text-white' : 'bg-white hover:bg-[#A38F71]/10 text-[#4A3C2A]'} text-sm font-medium transition`}
            onClick={() => filterProducts('doors')}
          >
            Doors
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'cabinetry' ? 'bg-[#8C7354] text-white' : 'bg-white hover:bg-[#A38F71]/10 text-[#4A3C2A]'} text-sm font-medium transition`}
            onClick={() => filterProducts('cabinetry')}
          >
            Cabinetry
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'moldings' ? 'bg-[#8C7354] text-white' : 'bg-white hover:bg-[#A38F71]/10 text-[#4A3C2A]'} text-sm font-medium transition`}
            onClick={() => filterProducts('moldings')}
          >
            Moldings
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'furniture' ? 'bg-[#8C7354] text-white' : 'bg-white hover:bg-[#A38F71]/10 text-[#4A3C2A]'} text-sm font-medium transition`}
            onClick={() => filterProducts('furniture')}
          >
            Furniture
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'decor' ? 'bg-[#8C7354] text-white' : 'bg-white hover:bg-[#A38F71]/10 text-[#4A3C2A]'} text-sm font-medium transition`}
            onClick={() => filterProducts('decor')}
          >
            Decor
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts && filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts && filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-[#4A3C2A]">{t('products.no_results')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
