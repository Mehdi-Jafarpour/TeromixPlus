import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { hasField, hasImage, hasCategory, getImageUrl, getDimensionField } from '@/services/strapi';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    dimensions?: Array<{
      price: number;
      dimension: string;
      woodType: string;
      inStock: boolean;
    }> | {
      price: number;
      dimension: string;
      woodType: string;
      inStock: boolean;
    };
    price?: number;
    woodType?: string;
    inStock?: boolean;
    category?: {
      id: number;
      name: string;
      slug: string;
    };
    rating?: number;
    reviewCount?: number;
    description?: string;
    salePrice?: number;
    categoryId?: number;
    createdAt?: Date;
    isFeatured?: boolean;
    weight?: number;
    [key: string]: any;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the first dimension or use default product values
    const price = getDimensionField(product, 'price') ?? product.price ?? 0;
    const woodType = getDimensionField(product, 'woodType') ?? product.woodType ?? '';
    const inStock = getDimensionField(product, 'inStock') ?? product.inStock ?? true;
    const dimension = getDimensionField(product, 'dimension') ?? null;
    
    const productToAdd = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      imageUrl: product.imageUrl,
      price: price || 0,
      woodType: woodType || '',
      inStock: inStock,
      dimension: dimension,
      dimensions: dimension || null,
      rating: product.rating ?? null,
      reviewCount: product.reviewCount ?? null,
      description: product.description || '',
      salePrice: product.salePrice || 0,
      categoryId: product.category?.id || 0,
      createdAt: product.createdAt || new Date(),
      isFeatured: product.isFeatured || false,
      weight: product.weight || 0
    };
    
    addToCart(productToAdd, 1);
    
    toast({
      title: t('cart.add_to_cart'),
      description: `${product.name} ${t('cart.added_to_cart')}`,
      duration: 3000,
    });
  };

  const price = getDimensionField(product, 'price') ?? product.price;
  const inStock = getDimensionField(product, 'inStock') ?? product.inStock ?? true;
  const woodType = getDimensionField(product, 'woodType') ?? product.woodType;
  const dimension = getDimensionField(product, 'dimension');

  const navigateToProduct = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return; // Don't navigate if clicking on a button
    }
    window.location.href = `/products/${product.slug}`;
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={navigateToProduct}
    >
      <div className="relative h-64 overflow-hidden group">
        {product.imageUrl !== '/placeholder.jpg' ? (
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-[#F9F5E7] flex items-center justify-center">
            <i className="fas fa-box text-4xl text-[#8C7354]"></i>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-[#8C7354] hover:text-[#4A3C2A] transition shadow-sm">
            <i className="far fa-heart"></i>
          </button>
        </div>
        {isHovered && (
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-[#342917]/70 to-transparent opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <button 
                onClick={handleAddToCart}
                className="bg-[#8C7354] hover:bg-[#4A3C2A] text-white text-sm py-1 px-3 rounded-md flex-grow transition"
                disabled={!inStock}
              >
                {!inStock ? t('products.out_of_stock') : t('products.add_to_cart')}
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/products/${product.slug}`;
                }}
                className="bg-white text-[#4A3C2A] hover:bg-[#F9F5E7] w-8 h-8 rounded-md flex items-center justify-center transition"
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        {hasCategory(product) && product.category && (
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (product.category?.slug) {
                  window.location.href = `/products?category=${product.category.slug}`;
                }
              }}
              className="text-xs text-[#8C7354] bg-[#F9F5E7] px-2 py-1 rounded-full hover:bg-[#A38F71]/10"
            >
              {product.category.name}
            </button>
            {hasField(product, 'rating') && typeof product.rating === 'number' && (
              <div className="flex items-center text-amber-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas ${i < Math.floor(product.rating || 0) ? 'fa-star' : i < (product.rating || 0) ? 'fa-star-half-alt' : 'fa-star'}`}
                  ></i>
                ))}
                {hasField(product, 'reviewCount') && (
                  <span className="text-[#8C7354] ml-1 text-xs">({product.reviewCount})</span>
                )}
              </div>
            )}
          </div>
        )}
        <h3 className="font-playfair font-bold text-lg text-[#4A3C2A] mb-1">{product.name}</h3>
        {(woodType || dimension) && (
          <p className="text-[#8C7354] text-sm mb-2">
            {[woodType, dimension].filter(Boolean).join(' - ')}
          </p>
        )}
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="text-[#4A3C2A] font-bold">${price?.toFixed(2) || '0.00'}</span>
          </div>
          <span className="text-xs text-[#8C7354]">
            {inStock ? t('products.in_stock') : t('products.out_of_stock')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
