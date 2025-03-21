import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    }, 500);
  };

  return (
    <div className="bg-[#F9F5E7] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-6">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-shopping-cart text-5xl text-[#8C7354] mb-4"></i>
            <h2 className="text-2xl font-playfair font-bold text-[#4A3C2A] mb-4">Your cart is empty</h2>
            <p className="text-[#8C7354] mb-8">
              It looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products">
              <button className="px-6 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-[#4A3C2A] uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-[#4A3C2A] uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-[#4A3C2A] uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-[#4A3C2A] uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-[#4A3C2A] uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0">
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.name} 
                                  className="h-full w-full object-cover rounded"
                                />
                              </div>
                              <div className="ml-4">
                                <Link href={`/products/${item.product.slug}`}>
                                  <span className="text-[#4A3C2A] font-medium hover:text-[#8C7354] cursor-pointer">
                                    {item.product.name}
                                  </span>
                                </Link>
                                <div className="text-sm text-[#8C7354]">{item.product.woodType}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center text-[#4A3C2A]">
                            ${(item.product.salePrice || item.product.price).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center">
                              <button 
                                className="w-8 h-8 flex items-center justify-center bg-[#F9F5E7] rounded-l-md border border-r-0 border-gray-300 text-[#8C7354]"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input 
                                type="number" 
                                min="1"
                                value={item.quantity} 
                                onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 h-8 text-center border border-gray-300 focus:outline-none text-[#4A3C2A]"
                              />
                              <button 
                                className="w-8 h-8 flex items-center justify-center bg-[#F9F5E7] rounded-r-md border border-l-0 border-gray-300 text-[#8C7354]"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center font-medium text-[#4A3C2A]">
                            ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <button 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button 
                      className="px-4 py-2 bg-[#F9F5E7] text-[#4A3C2A] border border-gray-200 rounded-md hover:bg-[#A38F71]/10 transition"
                      onClick={handleClearCart}
                      disabled={isClearing}
                    >
                      {isClearing ? 'Clearing...' : 'Clear Cart'}
                    </button>
                    <Link href="/products">
                      <button className="px-4 py-2 bg-white text-[#4A3C2A] border border-gray-200 rounded-md hover:bg-[#F9F5E7] transition">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-playfair font-bold text-[#4A3C2A] mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#8C7354]">Subtotal</span>
                    <span className="text-[#4A3C2A] font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C7354]">Shipping</span>
                    <span className="text-[#4A3C2A]">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C7354]">Tax</span>
                    <span className="text-[#4A3C2A]">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-[#4A3C2A] font-bold">Estimated Total</span>
                    <span className="text-[#4A3C2A] font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link href="/checkout">
                    <button className="w-full py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300">
                      Proceed to Checkout
                    </button>
                  </Link>
                  <div className="flex items-center justify-center mt-4 text-sm text-[#8C7354]">
                    <i className="fas fa-lock mr-2"></i>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
