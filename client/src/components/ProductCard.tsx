import { Link } from "wouter";
import { Product } from "@shared/schema";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  // Find category name based on categoryId
  const getCategoryName = (categoryId: number) => {
    const categories = {
      1: "Interior Doors",
      2: "Cabinetry",
      3: "Furniture",
      4: "Moldings",
      5: "Decor"
    };
    return categories[categoryId as keyof typeof categories] || "Other";
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 overflow-hidden group">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-[#8C7354] hover:text-[#4A3C2A] transition shadow-sm">
              <i className="far fa-heart"></i>
            </button>
          </div>
          {product.salePrice && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#8C7354] text-white text-xs px-2 py-1 rounded">Sale</span>
            </div>
          )}
          {isHovered && (
            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-[#342917]/70 to-transparent opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <button 
                  onClick={handleAddToCart}
                  className="bg-[#8C7354] hover:bg-[#4A3C2A] text-white text-sm py-1 px-3 rounded-md flex-grow transition"
                >
                  Add to Cart
                </button>
                <Link href={`/products/${product.slug}`}>
                  <button className="bg-white text-[#4A3C2A] hover:bg-[#F9F5E7] w-8 h-8 rounded-md flex items-center justify-center transition">
                    <i className="fas fa-eye"></i>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#8C7354] bg-[#F9F5E7] px-2 py-1 rounded-full">
              {getCategoryName(product.categoryId)}
            </span>
            <div className="flex items-center text-amber-500 text-sm">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fas ${i < Math.floor(product.rating) ? 'fa-star' : i < product.rating ? 'fa-star-half-alt' : 'fa-star'}`}
                ></i>
              ))}
              <span className="text-[#8C7354] ml-1 text-xs">({product.reviewCount})</span>
            </div>
          </div>
          <h3 className="font-playfair font-bold text-lg text-[#4A3C2A] mb-1">{product.name}</h3>
          <p className="text-[#8C7354] text-sm mb-2">{product.woodType} - {product.dimensions}</p>
          <div className="flex justify-between items-center mt-3">
            <div>
              <span className="text-[#4A3C2A] font-bold">${product.price.toFixed(2)}</span>
              {product.salePrice && (
                <span className="text-gray-500 line-through text-sm ml-2">${product.salePrice.toFixed(2)}</span>
              )}
            </div>
            <span className="text-xs text-[#8C7354]">{product.inStock ? 'In stock' : 'Out of stock'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
