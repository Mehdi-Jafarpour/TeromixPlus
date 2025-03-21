import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!product,
  });

  // Filter related products by same category, excluding current product
  const filteredRelatedProducts = relatedProducts?.filter(
    p => p.categoryId === product?.categoryId && p.id !== product?.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-200 rounded-lg h-[500px]"></div>
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-4">Product Not Found</h1>
        <p className="text-[#8C7354] mb-6">
          The product you are looking for is not available or may have been removed.
        </p>
        <Link href="/products">
          <button className="px-6 py-3 bg-[#8C7354] text-white rounded-md hover:bg-[#4A3C2A] transition">
            Browse All Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5E7]">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm">
          <Link href="/" className="text-[#8C7354] hover:text-[#4A3C2A]">Home</Link>
          <span className="mx-2 text-[#8C7354]">/</span>
          <Link href="/products" className="text-[#8C7354] hover:text-[#4A3C2A]">Products</Link>
          <span className="mx-2 text-[#8C7354]">/</span>
          <span className="text-[#4A3C2A]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#4A3C2A] mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-amber-500 mr-3">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas ${i < Math.floor(product.rating) ? 'fa-star' : i < product.rating ? 'fa-star-half-alt' : 'fa-star'}`}
                  ></i>
                ))}
              </div>
              <span className="text-[#8C7354]">{product.reviewCount} reviews</span>
            </div>

            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold text-[#4A3C2A] mr-3">
                ${product.price.toFixed(2)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.salePrice.toFixed(2)}
                </span>
              )}
              {product.inStock ? (
                <span className="ml-auto text-green-600 flex items-center">
                  <i className="fas fa-check-circle mr-1"></i> In Stock
                </span>
              ) : (
                <span className="ml-auto text-red-500 flex items-center">
                  <i className="fas fa-times-circle mr-1"></i> Out of Stock
                </span>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="text-[#4A3C2A] leading-relaxed mb-4">
                {product.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-[#8C7354]">
                  <span className="font-medium text-[#4A3C2A]">Wood Type:</span> {product.woodType}
                </div>
                <div className="text-[#8C7354]">
                  <span className="font-medium text-[#4A3C2A]">Dimensions:</span> {product.dimensions}
                </div>
                <div className="text-[#8C7354]">
                  <span className="font-medium text-[#4A3C2A]">Weight:</span> {product.weight} lbs
                </div>
                <div className="text-[#8C7354]">
                  <span className="font-medium text-[#4A3C2A]">SKU:</span> WCM-{product.id.toString().padStart(4, '0')}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-2 text-[#8C7354]"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <input 
                    type="number" 
                    min="1"
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button 
                    className="px-3 py-2 text-[#8C7354]"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                
                <button 
                  className="flex-grow py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button className="w-12 h-12 flex items-center justify-center rounded-md border border-gray-300 text-[#8C7354] hover:bg-[#F9F5E7]">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>

            <div className="mt-6 text-[#8C7354]">
              <p className="flex items-center mb-2">
                <i className="fas fa-truck mr-3 text-[#4A3C2A]"></i>
                Free shipping on orders over $999
              </p>
              <p className="flex items-center mb-2">
                <i className="fas fa-sync-alt mr-3 text-[#4A3C2A]"></i>
                30-day returns policy
              </p>
              <p className="flex items-center">
                <i className="fas fa-shield-alt mr-3 text-[#4A3C2A]"></i>
                5-year craftsmanship warranty
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex overflow-x-auto">
              <button className="px-6 py-3 text-[#4A3C2A] font-medium border-b-2 border-[#8C7354] focus:outline-none">
                Description
              </button>
              <button className="px-6 py-3 text-[#8C7354] hover:text-[#4A3C2A] focus:outline-none">
                Specifications
              </button>
              <button className="px-6 py-3 text-[#8C7354] hover:text-[#4A3C2A] focus:outline-none">
                Reviews ({product.reviewCount})
              </button>
              <button className="px-6 py-3 text-[#8C7354] hover:text-[#4A3C2A] focus:outline-none">
                Shipping & Returns
              </button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h3 className="font-playfair font-bold text-xl text-[#4A3C2A] mb-4">Product Description</h3>
            <p className="text-[#8C7354] leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-[#8C7354] leading-relaxed">
              Each piece is meticulously handcrafted by our master woodworkers, ensuring the highest quality and attention to detail. 
              We use only sustainably sourced {product.woodType.toLowerCase()} wood, selected for its beauty, durability, and character.
              The natural variations in grain and color make each piece unique, celebrating the inherent beauty of the material.
            </p>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts && filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold text-[#4A3C2A] mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
