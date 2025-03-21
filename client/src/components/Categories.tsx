import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] text-center mb-3">Our Collections</h2>
          <p className="text-[#8C7354] text-center max-w-2xl mx-auto mb-12">Loading collections...</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="h-80 rounded-lg bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">Our Collections</h2>
          <p className="text-red-500">Failed to load collections. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] text-center mb-3">Our Collections</h2>
        <p className="text-[#8C7354] text-center max-w-2xl mx-auto mb-12">
          Explore our range of beautifully crafted wooden products for every part of your home
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories && categories.map((category) => (
            <div key={category.id} className="group relative h-80 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#342917]/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-playfair font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-[#F9F5E7] mb-4 opacity-90">{category.description}</p>
                  <Link href={`/products?category=${category.slug}`} className="inline-block text-sm text-white font-medium border-b border-[#8C7354] pb-1 transition hover:border-white">
                    Explore Collection <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
