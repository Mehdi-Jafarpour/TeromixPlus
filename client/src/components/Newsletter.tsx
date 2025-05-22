import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          marketingEmail: 'marketing.teromixplus.ge'
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setEmail("");
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-[#73946B]">Join Our Newsletter</h2>
          <p className="text-[#73946B]/90 mb-8">
            Subscribe to receive updates on new products, design tips, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-4 py-3 rounded-md bg-white border border-[#73946B]/30 text-[#73946B] placeholder-[#73946B]/60 focus:outline-none focus:ring-2 focus:ring-[#73946B] flex-grow max-w-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#73946B] hover:bg-[#8C7354] text-white font-medium rounded-md transition duration-300 whitespace-nowrap disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
          <p className="text-[#73946B]/70 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
