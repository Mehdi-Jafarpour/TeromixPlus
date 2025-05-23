import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useState, useRef, useEffect } from "react";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";
import { getProduct, getProducts } from "@/services/api";

interface Dimension {
  id: number;
  code: string;
  dimension: string;
  price: number;
  woodType: string;
  weight: number;
  inStock: boolean;
}

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage = ({ src, alt }: ZoomableImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden bg-white rounded-lg shadow-md"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <img 
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />

      {/* Zoom Lens */}
      {isZoomed && (
        <div 
          className="absolute w-[150px] h-[150px] border-2 border-white rounded-full overflow-hidden pointer-events-none shadow-lg"
          style={{
            left: `calc(${position.x}% - 75px)`,
            top: `calc(${position.y}% - 75px)`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            className="absolute w-[300%] h-[300%]"
            style={{
              left: `-${position.x}%`,
              top: `-${position.y}%`,
              backgroundImage: `url(${src})`,
              backgroundSize: '300%',
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedDimensionIndex, setSelectedDimensionIndex] = useState<number>(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product | null>({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug || ''),
    enabled: !!slug
  });

  // Add debugging logs
  console.log('Product data:', product);
  console.log('Dimensions:', product?.dimensions);

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    enabled: !!product
  });

  // Filter related products by same category, excluding current product
  const filteredRelatedProducts = relatedProducts?.filter(
    p => p.category?.id === product?.category?.id && p.id !== product?.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (product && product.dimensions && product.dimensions.length > 0) {
      const selectedDimension = product.dimensions[selectedDimensionIndex];
      const productWithSelectedDimension = {
        ...product,
        price: selectedDimension.price,
        dimension: selectedDimension.dimension,
        woodType: selectedDimension.woodType,
        weight: selectedDimension.weight,
        inStock: selectedDimension.inStock,
        selectedDimensionIndex
      };
      
      addToCart(productWithSelectedDimension, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} (${selectedDimension.dimension}) added to your cart.`,
      });
    }
  };

  // Get the currently selected dimension with proper null checks
  const dimensions = Array.isArray(product?.dimensions) ? product.dimensions : [];
  const selectedDimension = dimensions[selectedDimensionIndex];
  const isInStock = selectedDimension?.inStock ?? false;
  const currentPrice = selectedDimension?.price ?? product?.price ?? 0;

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
        <h1 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">Product Not Found</h1>
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
          <Link href="/" className="text-[#73946B] hover:text-[#4A3C2A]">Home</Link>
          <span className="mx-2 text-[#8C7354]">/</span>
          <Link href="/products" className="text-[#73946B] hover:text-[#4A3C2A]">Products</Link>
          <span className="mx-2 text-[#8C7354]">/</span>
          <span className="text-[#73946B]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <ZoomableImage 
            src={product.imageUrl}
            alt={product.name}
          />

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#73946B] mb-2">
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
              <span className="text-2xl font-bold text-[#73946B] mr-3">
                ${currentPrice.toFixed(2)}
              </span>
              {isInStock ? (
                <span className="ml-auto text-green-600 flex items-center">
                  <i className="fas fa-check-circle mr-1"></i> In Stock
                </span>
              ) : (
                <span className="ml-auto text-red-600 flex items-center">
                  <i className="fas fa-times-circle mr-1"></i> Out of Stock
                </span>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="text-[#73946B] leading-relaxed mb-4">
                {product.description}
              </p>
              
              {dimensions.length > 0 ? (
                <div className="mt-6">
                  <h3 className="font-medium text-[#73946B] mb-3">Available Options</h3>
                  <div className="space-y-3">
                    {dimensions.map((dim, index) => (
                      <label 
                        key={dim.id || index}
                        className={`block relative p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDimensionIndex === index 
                            ? 'border-[#8C7354] bg-[#F9F5E7]' 
                            : 'border-gray-200 hover:border-[#8C7354]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="dimension"
                          className="absolute opacity-0"
                          checked={selectedDimensionIndex === index}
                          onChange={() => setSelectedDimensionIndex(index)}
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-[#73946B]">{dim.dimension}</p>
                            <p className="text-sm text-[#8C7354] mt-1">
                              Wood Type: {dim.woodType} • Weight: {dim.weight} lbs
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#73946B]">${dim.price.toFixed(2)}</p>
                            <p className={`text-sm ${dim.inStock ? 'text-green-600' : 'text-red-600'}`}>
                              {dim.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="p-4 bg-[#F9F5E7] rounded-lg">
                    <p className="text-[#8C7354] text-sm">
                      Standard size • Wood Type: {product?.woodType} • Weight: {product?.weight} lbs
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-2 text-[#8C7354]"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!isInStock}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <input 
                    type="number" 
                    min="1"
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                    disabled={!isInStock}
                  />
                  <button 
                    className="px-3 py-2 text-[#8C7354]"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!isInStock}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-[#73946B] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300"
                  disabled={!isInStock}
                >
                  {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>

            <div className="mt-6 text-[#8C7354]">
              <p className="flex items-center mb-2">
                <i className="fas fa-truck mr-3 text-[#73946B]"></i>
                Free shipping on orders over $999
              </p>
              <p className="flex items-center mb-2">
                <i className="fas fa-sync-alt mr-3 text-[#73946B]"></i>
                30-day returns policy
              </p>
              <p className="flex items-center">
                <i className="fas fa-shield-alt mr-3 text-[#73946B]"></i>
                5-year craftsmanship warranty
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-4">Product Description</h3>
            <div className="text-[#8C7354] leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>
                Each piece is meticulously handcrafted by our master woodworkers, ensuring the highest quality and attention to detail. 
                We use only sustainably sourced {product.woodType.toLowerCase()} wood, selected for its beauty, durability, and character.
                The natural variations in grain and color make each piece unique, celebrating the inherent beauty of the material.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts && filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold text-[#73946B] mb-8">You May Also Like</h2>
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
