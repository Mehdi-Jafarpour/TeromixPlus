import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@shared/schema";

interface CartItem {
  id: number;
  product: Product & {
    selectedDimensionIndex?: number;
  };
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product & { selectedDimensionIndex?: number }, quantity: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("teromix-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("teromix-cart");
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("teromix-cart", JSON.stringify(cart));
  }, [cart]);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = item.product.salePrice || item.product.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  const addToCart = (product: Product & { selectedDimensionIndex?: number }, quantity: number) => {
    // Check if the product with the same dimension is already in the cart
    const existingItemIndex = cart.findIndex(item => 
      item.product.id === product.id && 
      item.product.selectedDimensionIndex === product.selectedDimensionIndex
    );
    
    if (existingItemIndex !== -1) {
      // If item exists with same dimension, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If item doesn't exist or has different dimension, add it as new item
      const newItem: CartItem = {
        id: Date.now(), // Use timestamp as a unique ID
        product,
        quantity
      };
      setCart(prevCart => [...prevCart, newItem]);
    }
  };
  
  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or negative, remove the item
      removeFromCart(id);
    } else {
      // Otherwise update the quantity
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
