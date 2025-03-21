import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";
import { Link } from "wouter";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, updateCartItemQuantity, removeFromCart, cartTotal } = useCart();

  // Close the cart when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && 
          !(e.target as HTMLElement).closest('#cart-sidebar') && 
          !(e.target as HTMLElement).closest('button[aria-label="Open cart"]')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    // Prevent scrolling on body when cart is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div 
      id="cart-sidebar" 
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-playfair font-bold text-xl text-[#4A3C2A]">
            Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </h3>
          <button 
            onClick={onClose}
            className="text-[#8C7354] hover:text-[#4A3C2A]"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
              <p className="text-[#4A3C2A]">Your cart is empty</p>
              <p className="text-[#8C7354] text-sm mt-2 mb-6">Add some products to your cart to continue shopping</p>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-[#8C7354] text-white rounded-md hover:bg-[#4A3C2A] transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex border-b border-gray-100 pb-4">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="font-medium text-[#4A3C2A]">{item.product.name}</h4>
                    <p className="text-sm text-[#8C7354]">{item.product.woodType}</p>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center">
                        <button 
                          className="w-6 h-6 bg-[#F9F5E7] rounded text-[#8C7354]"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2 text-[#4A3C2A]">{item.quantity}</span>
                        <button 
                          className="w-6 h-6 bg-[#F9F5E7] rounded text-[#8C7354]"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-medium text-[#4A3C2A]">
                        ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="ml-2 text-gray-400 hover:text-[#8C7354]"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-between mb-4">
              <span className="text-[#8C7354]">Subtotal</span>
              <span className="font-medium text-[#4A3C2A]">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-[#8C7354]">Shipping</span>
              <span className="text-[#4A3C2A]">Calculated at checkout</span>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <button className="block w-full py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white text-center font-medium rounded-md transition duration-300 mb-3">
                Proceed to Checkout
              </button>
            </Link>
            <button 
              onClick={onClose}
              className="block w-full py-3 bg-[#F9F5E7] text-[#4A3C2A] text-center font-medium rounded-md hover:bg-[#A38F71]/10 transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
