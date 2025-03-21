import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      form.reset();
    }, 1500);
  };

  return (
    <div className="bg-[#F9F5E7]">
      {/* Hero Section */}
      <div className="relative bg-[#4A3C2A] h-[250px] md:h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1609921205586-7e8a57516512?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&h=300&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">Contact Us</h1>
          <p className="text-[#F9F5E7] text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions about our products or custom work.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-playfair font-bold text-[#4A3C2A] mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#F9F5E7] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#8C7354]">
                    <i className="fas fa-map-marker-alt text-lg"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4A3C2A] mb-1">Visit Us</h3>
                    <address className="not-italic text-[#8C7354]">
                      123 Craftsman Way<br />
                      Portland, OR 97205<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#F9F5E7] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#8C7354]">
                    <i className="fas fa-envelope text-lg"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4A3C2A] mb-1">Email Us</h3>
                    <p className="text-[#8C7354]">
                      <a href="mailto:info@woodcraftmillworks.com" className="hover:text-[#4A3C2A] transition-colors">
                        info@woodcraftmillworks.com
                      </a>
                    </p>
                    <p className="text-[#8C7354]">
                      <a href="mailto:sales@woodcraftmillworks.com" className="hover:text-[#4A3C2A] transition-colors">
                        sales@woodcraftmillworks.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#F9F5E7] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#8C7354]">
                    <i className="fas fa-phone-alt text-lg"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4A3C2A] mb-1">Call Us</h3>
                    <p className="text-[#8C7354]">
                      <a href="tel:+15035551234" className="hover:text-[#4A3C2A] transition-colors">
                        (503) 555-1234
                      </a>
                    </p>
                    <p className="text-[#8C7354]">Mon-Fri: 9am-6pm, Sat: 10am-4pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#F9F5E7] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#8C7354]">
                    <i className="fas fa-share-alt text-lg"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4A3C2A] mb-1">Follow Us</h3>
                    <div className="flex space-x-3 text-[#8C7354]">
                      <a href="#" className="hover:text-[#4A3C2A] transition-colors">
                        <i className="fab fa-facebook-f text-lg"></i>
                      </a>
                      <a href="#" className="hover:text-[#4A3C2A] transition-colors">
                        <i className="fab fa-instagram text-lg"></i>
                      </a>
                      <a href="#" className="hover:text-[#4A3C2A] transition-colors">
                        <i className="fab fa-pinterest-p text-lg"></i>
                      </a>
                      <a href="#" className="hover:text-[#4A3C2A] transition-colors">
                        <i className="fab fa-houzz text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-playfair font-bold text-[#4A3C2A] mb-6">Send Us a Message</h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-[#4A3C2A] mb-1">Full Name*</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-red-500 text-sm">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#4A3C2A] mb-1">Email Address*</label>
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
                    <label htmlFor="phone" className="block text-[#4A3C2A] mb-1">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                      {...form.register("phone")}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-[#4A3C2A] mb-1">Subject*</label>
                    <input 
                      type="text" 
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                      {...form.register("subject")}
                    />
                    {form.formState.errors.subject && (
                      <p className="mt-1 text-red-500 text-sm">{form.formState.errors.subject.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-[#4A3C2A] mb-1">Message*</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8C7354]"
                    {...form.register("message")}
                  ></textarea>
                  {form.formState.errors.message && (
                    <p className="mt-1 text-red-500 text-sm">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] relative">
        <div className="absolute inset-0 bg-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178844.82526414435!2d-122.77261153801464!3d45.5429732924719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1690226423833!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="WoodCraft Millworks Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
