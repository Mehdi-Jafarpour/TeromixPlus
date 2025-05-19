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
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-playfair font-bold text-[#4A3C2A]">Shopping Cart</h2>
          <button 
            onClick={onClose}
            className="text-[#8C7354] hover:text-[#4A3C2A]"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
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
              {cart.map((item) => {
                const dimension = item.product.dimensions?.[item.product.selectedDimensionIndex || 0];
                return (
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
                      {dimension && (
                        <div className="text-sm text-[#8C7354] space-y-1">
                          <p>Size: {dimension.dimension}</p>
                          <p>Wood: {dimension.woodType}</p>
                          <p>Weight: {dimension.weight} lbs</p>
                          <p className="font-medium">${dimension.price.toFixed(2)}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            className="px-2 py-1 text-[#8C7354]"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-[#8C7354]"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#4A3C2A] font-medium">Subtotal</span>
              <span className="text-xl font-bold text-[#4A3C2A]">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-[#8C7354] text-white rounded-md hover:bg-[#4A3C2A] transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
