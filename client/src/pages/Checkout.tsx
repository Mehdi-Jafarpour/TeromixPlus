import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  shippingAddress: z.string().min(5, "Address is required"),
  shippingCity: z.string().min(2, "City is required"),
  shippingState: z.string().min(2, "State is required"),
  shippingZipCode: z.string().min(5, "ZIP code is required"),
  paymentMethod: z.enum(["credit", "paypal"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional()
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZipCode: "",
      paymentMethod: "credit",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: ""
    }
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checking out.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Send checkout information to backend
      const response = await apiRequest(
        "POST", 
        "/api/orders", 
        {
          shippingAddress: data.shippingAddress,
          shippingCity: data.shippingCity,
          shippingState: data.shippingState,
          shippingZipCode: data.shippingZipCode
        }
      );
      
      if (response.ok) {
        // Clear the cart and navigate to success page
        clearCart();
        
        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. We'll send you a confirmation email shortly.",
        });
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F9F5E7] min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-shopping-cart text-5xl text-[#8C7354] mb-4"></i>
          <h1 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">Your cart is empty</h1>
          <p className="text-[#8C7354] mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5E7] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair font-bold text-[#73946B] mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-playfair font-bold text-[#73946B] mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-[#73946B] mb-1">Full Name*</label>
                      <input 
                        type="text" 
                        id="fullName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                        {...form.register("fullName")}
                      />
                      {form.formState.errors.fullName && (
                        <p className="mt-1 text-red-500 text-sm">{form.formState.errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[#73946B] mb-1">Email Address*</label>
                      <input 
                        type="email" 
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="mt-1 text-red-500 text-sm">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[#73946B] mb-1">Phone Number*</label>
                      <input 
                        type="tel" 
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                        {...form.register("phone")}
                      />
                      {form.formState.errors.phone && (
                        <p className="mt-1 text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-playfair font-bold text-[#73946B] mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-[#73946B] mb-1">Street Address*</label>
                      <input 
                        type="text" 
                        id="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                        {...form.register("shippingAddress")}
                      />
                      {form.formState.errors.shippingAddress && (
                        <p className="mt-1 text-red-500 text-sm">{form.formState.errors.shippingAddress.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-[#73946B] mb-1">City*</label>
                        <input 
                          type="text" 
                          id="city"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                          {...form.register("shippingCity")}
                        />
                        {form.formState.errors.shippingCity && (
                          <p className="mt-1 text-red-500 text-sm">{form.formState.errors.shippingCity.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-[#73946B] mb-1">State/Province*</label>
                        <input 
                          type="text" 
                          id="state"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                          {...form.register("shippingState")}
                        />
                        {form.formState.errors.shippingState && (
                          <p className="mt-1 text-red-500 text-sm">{form.formState.errors.shippingState.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-[#73946B] mb-1">ZIP/Postal Code*</label>
                        <input 
                          type="text" 
                          id="zipCode"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                          {...form.register("shippingZipCode")}
                        />
                        {form.formState.errors.shippingZipCode && (
                          <p className="mt-1 text-red-500 text-sm">{form.formState.errors.shippingZipCode.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-playfair font-bold text-[#73946B] mb-4">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="credit" 
                        value="credit"
                        className="mr-2"
                        {...form.register("paymentMethod")}
                      />
                      <label htmlFor="credit" className="text-[#73946B] flex items-center">
                        <span>Credit Card</span>
                        <div className="ml-4 flex space-x-2">
                          <i className="fab fa-cc-visa text-blue-700 text-xl"></i>
                          <i className="fab fa-cc-mastercard text-red-600 text-xl"></i>
                          <i className="fab fa-cc-amex text-blue-500 text-xl"></i>
                        </div>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="paypal" 
                        value="paypal"
                        className="mr-2"
                        {...form.register("paymentMethod")}
                      />
                      <label htmlFor="paypal" className="text-[#73946B] flex items-center">
                        <span>PayPal</span>
                        <i className="fab fa-paypal text-blue-600 ml-4 text-xl"></i>
                      </label>
                    </div>
                  </div>
                  
                  {/* Credit Card Details */}
                  {paymentMethod === "credit" && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-[#73946B] mb-1">Card Number</label>
                          <input 
                            type="text" 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                            {...form.register("cardNumber")}
                          />
                        </div>
                        <div>
                          <label htmlFor="expiry" className="block text-[#73946B] mb-1">Expiry Date</label>
                          <input 
                            type="text" 
                            id="expiry" 
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                            {...form.register("cardExpiry")}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-[#73946B] mb-1">CVC</label>
                          <input 
                            type="text" 
                            id="cvc" 
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                            {...form.register("cardCVC")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <Link href="/cart">
                    <button 
                      type="button" 
                      className="px-6 py-3 bg-white border border-gray-300 text-[#73946B] rounded-md hover:bg-[#F9F5E7] transition"
                    >
                      Back to Cart
                    </button>
                  </Link>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-[#73946B] hover:bg-[#8C7354] text-white font-medium rounded-md transition duration-300 disabled:opacity-70"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-playfair font-bold text-[#73946B] mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-3">
                        <p className="text-[#73946B] font-medium">{item.product.name}</p>
                        <p className="text-[#8C7354] text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-[#73946B] font-medium">
                      ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <div className="text-[#73946B] font-medium">Subtotal</div>
                  <span className="text-[#73946B] font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#73946B] font-medium">Shipping</div>
                  <span className="text-[#73946B]">
                    {cartTotal >= 999 ? "Free" : "$75.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#73946B] font-medium">Tax</div>
                  <span className="text-[#73946B]">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <div className="text-[#73946B] font-bold">Total</div>
                  <div className="text-[#73946B] font-bold text-xl">
                    ${(cartTotal + (cartTotal >= 999 ? 0 : 75) + (cartTotal * 0.08)).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-[#8C7354] mt-4">
                <p className="mb-2">
                  By placing your order, you agree to our <Link href="/terms" className="text-[#8C7354] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#8C7354] underline">Privacy Policy</Link>.
                </p>
                <p>
                  <i className="fas fa-lock mr-1"></i> Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
