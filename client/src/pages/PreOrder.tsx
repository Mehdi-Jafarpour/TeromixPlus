import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const preOrderSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().optional()
});

type PreOrderFormValues = z.infer<typeof preOrderSchema>;

const PreOrder = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PreOrderFormValues>({
    resolver: zodResolver(preOrderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = async (data: PreOrderFormValues) => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before placing a pre-order.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order details
      const orderDetails = {
        customerInfo: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          message: data.message
        },
        items: cart.map(item => ({
          productName: item.product.name,
          dimension: item.product.dimensions?.[item.product.selectedDimensionIndex || 0]?.dimension,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: cartTotal
      };

      // Send pre-order information to backend
      const response = await fetch('/api/pre-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails)
      });
      
      if (response.ok) {
        // Clear the cart and show success message
        clearCart();
        
        toast({
          title: "Pre-Order Submitted Successfully!",
          description: "Thank you for your pre-order. We will contact you shortly to finalize your purchase.",
        });
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Pre-Order Failed",
        description: "There was an error submitting your pre-order. Please try again.",
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
            You need to add items to your cart before placing a pre-order.
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
        <h1 className="text-3xl font-playfair font-bold text-[#73946B] mb-6">Place Pre-Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pre-Order Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-playfair font-bold text-[#73946B] mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-[#73946B] mb-1">Full Name</label>
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
                      <label htmlFor="email" className="block text-[#73946B] mb-1">Email</label>
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
                      <label htmlFor="phone" className="block text-[#73946B] mb-1">Phone Number</label>
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
                    <div className="md:col-span-2">
                      <label htmlFor="message" className="block text-[#73946B] mb-1">Additional Notes (Optional)</label>
                      <textarea 
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                        {...form.register("message")}
                      />
                    </div>
                  </div>
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
                    className="px-6 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300 disabled:opacity-70"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Submit Pre-Order"}
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
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#73946B] font-bold">Total</span>
                  <span className="text-[#73946B] font-bold text-xl">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="text-xs text-[#8C7354] mt-4">
                <p className="mb-2">
                  By submitting your pre-order, you agree to our <Link href="/terms" className="text-[#8C7354] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#8C7354] underline">Privacy Policy</Link>.
                </p>
                <p>
                  <i className="fas fa-info-circle mr-1"></i> We will contact you shortly to finalize your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder; 