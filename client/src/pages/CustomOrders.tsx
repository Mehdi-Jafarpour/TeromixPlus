import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomWorkShowcase from '@/components/CustomWorkShowcase';
import { useTranslation } from "react-i18next";

const customOrderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  projectType: z.enum(["doors", "cabinetry", "furniture", "moldings", "other"]),
  projectDescription: z.string().min(20, "Please provide more details about your project"),
  budget: z.enum(["under2k", "2k5k", "5k10k", "10k20k", "over20k"]),
  timeline: z.enum(["flexible", "1to3months", "3to6months", "6plusmonths", "urgent"]),
  referenceImages: z.any().optional(),
  additionalInfo: z.string().optional()
});

type CustomOrderFormValues = z.infer<typeof customOrderSchema>;

const CustomOrders = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const form = useForm<CustomOrderFormValues>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "doors",
      projectDescription: "",
      budget: "2k5k",
      timeline: "3to6months",
      additionalInfo: ""
    }
  });

  const onSubmit = async (data: CustomOrderFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Custom Project Inquiry Submitted!",
        description: "Thank you for your interest. Our design team will contact you within 48 hours to discuss your project.",
      });
      
      form.reset();
    }, 1500);
  };

  return (
    <div className="bg-[#F9F5E7]">
      {/* Hero Section */}
      <div className="relative bg-[#73946B] h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://www.woodbychoice.com/wp-content/uploads/2024/01/events-5-scaled.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white">
              Custom Order
            </h1>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <section id="process" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">
              Our Custom Design Process
            </h2>
            <p className="text-[#73946B]">
              We believe in a collaborative approach to creating custom millwork. Our process ensures that your vision is realized with exceptional craftsmanship and attention to detail.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#73946B] transform -translate-x-1/2"></div>
            
            <div className="space-y-16 relative">
              {/* Step 1 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-2xl font-playfair font-bold text-[#73946B] mb-3">1. Initial Consultation</h3>
                    <p className="text-[#73946B]">
                      Our design team meets with you to understand your vision, requirements, and the space where the custom piece will live. We discuss materials, styles, and functionality.
                    </p>
                  </div>
                  <div className="hidden md:block absolute left-1/2 w-10 h-10 rounded-full bg-[#F9F5E7] border-4 border-[#73946B] transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-[#73946B] font-extrabold flex items-center justify-center">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <img 
                      src="https://immigracia.ca/wp-content/uploads/2023/07/consultation-1.jpeg" 
                      alt="Designer meeting with client" 
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                    <img 
                      src="https://vimalsventure.com/wp-content/uploads/2016/02/11674993_l.jpg" 
                      alt="Design sketches and blueprints" 
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                  <div className="hidden md:block absolute left-1/2 w-10 h-10 rounded-full bg-[#F9F5E7] border-4 border-[#73946B] transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-[#73946B] font-extrabold flex items-center justify-center">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-2xl font-playfair font-bold text-[#73946B] mb-3">2. Design & Planning</h3>
                    <p className="text-[#73946B]">
                      Based on our consultation, we create detailed designs and blueprints for your approval. We select the perfect wood species and finishes to match your aesthetic.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-2xl font-playfair font-bold text-[#73946B] mb-3">3. Crafting Process</h3>
                    <p className="text-[#73946B]">
                      Our master craftspeople bring your design to life using traditional techniques and modern precision. We keep you updated throughout the process.
                    </p>
                  </div>
                  <div className="hidden md:block absolute left-1/2 w-10 h-10 rounded-full bg-[#F9F5E7] border-4 border-[#73946B] transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-[#73946B] font-extrabold flex items-center justify-center">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <img 
                      src="https://www.mikebrowngroup.com/wp-content/uploads/2022/03/new-construction-homes-idaho.jpg" 
                      alt="Craftsman working on wooden piece" 
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                    <img 
                      src="https://media.miele.com/media/domestic_nz/media/assets_673_x/service/20000173511_673x379.jpg" 
                      alt="Finished wooden cabinet in home" 
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                  <div className="hidden md:block absolute left-1/2 w-10 h-10 rounded-full bg-[#F9F5E7] border-4 border-[#73946B] transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-[#73946B] font-extrabold flex items-center justify-center">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-2xl font-playfair font-bold text-[#73946B] mb-3">4. Delivery & Installation</h3>
                    <p className="text-[#73946B]">
                      When your piece is complete, our team carefully delivers and installs it in your space. We ensure everything fits perfectly and functions as intended.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Work Showcase */}
      <CustomWorkShowcase />

      {/* Custom Order Form */}
      <section id="consultation" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-[#73946B] text-white p-8">
                <h2 className="text-2xl font-playfair font-bold mb-6">Start Your Custom Project</h2>
                <p className="mb-6 text-[#73946B]/90">
                  Fill out this form to begin the conversation about your custom millwork project. Our design team will reach out to schedule your consultation.
                </p>
                <div className="space-y-4 text-[#73946B]/90">
                  <p className="flex items-center">
                    <i className="fas fa-check-circle mr-2 text-[#73946B]"></i>
                    Expert design consultation
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-check-circle mr-2 text-[#73946B]"></i>
                    Detailed project quotes
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-check-circle mr-2 text-[#73946B]"></i>
                    Master craftsmanship
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-check-circle mr-2 text-[#73946B]"></i>
                    Timely project updates
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-check-circle mr-2 text-[#73946B]"></i>
                    Professional installation
                  </p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-[#73946B] mb-1">Full Name*</label>
                      <input 
                        type="text" 
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                        {...form.register("name")}
                      />
                      {form.formState.errors.name && (
                        <p className="mt-1 text-red-500 text-sm">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-[#73946B] mb-1">Email Address*</label>
                      <input 
                        type="email" 
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                        {...form.register("phone")}
                      />
                      {form.formState.errors.phone && (
                        <p className="mt-1 text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="projectType" className="block text-[#73946B] mb-1">Project Type*</label>
                      <select 
                        id="projectType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                        {...form.register("projectType")}
                      >
                        <option value="doors">Custom Doors</option>
                        <option value="cabinetry">Cabinetry</option>
                        <option value="furniture">Furniture</option>
                        <option value="moldings">Moldings & Trim</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="projectDescription" className="block text-[#73946B] mb-1">Project Description*</label>
                    <textarea 
                      id="projectDescription" 
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                      placeholder="Please describe your project, including dimensions, wood preferences, and any specific design elements you're looking for."
                      {...form.register("projectDescription")}
                    ></textarea>
                    {form.formState.errors.projectDescription && (
                      <p className="mt-1 text-red-500 text-sm">{form.formState.errors.projectDescription.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="budget" className="block text-[#73946B] mb-1">Budget Range*</label>
                      <select 
                        id="budget"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                        {...form.register("budget")}
                      >
                        <option value="under2k">Under $2,000</option>
                        <option value="2k5k">$2,000 - $5,000</option>
                        <option value="5k10k">$5,000 - $10,000</option>
                        <option value="10k20k">$10,000 - $20,000</option>
                        <option value="over20k">Over $20,000</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block text-[#73946B] mb-1">Desired Timeline*</label>
                      <select 
                        id="timeline"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                        {...form.register("timeline")}
                      >
                        <option value="urgent">Urgent (ASAP)</option>
                        <option value="1to3months">1-3 months</option>
                        <option value="3to6months">3-6 months</option>
                        <option value="6plusmonths">6+ months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="additionalInfo" className="block text-[#73946B] mb-1">Additional Information (Optional)</label>
                    <textarea 
                      id="additionalInfo" 
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#73946B]"
                      placeholder="Any other details you'd like to share about your project or questions for our team."
                      {...form.register("additionalInfo")}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-[#73946B] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300 disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Project Inquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">
              What Clients Say About Our Custom Work
            </h2>
            <p className="text-[#73946B]">
              Don't just take our word for it. Here's what clients have to say about their custom millwork experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F9F5E7] p-6 rounded-lg relative">
              <div className="text-[#73946B] text-6xl absolute top-4 right-4 opacity-20">"</div>
              <div className="relative z-10">
                <div className="flex items-center text-amber-500 mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-[#73946B] italic mb-6">
                  "WoodCraft Millworks created custom built-ins for our entire home office. From the initial design to final installation, they were professional, detail-oriented, and a pleasure to work with. The finished product exceeded our expectations."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/22.jpg" 
                    alt="James Wilson" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#73946B]"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-[#73946B]">James Wilson</h4>
                    <p className="text-sm text-[#73946B]">Seattle, WA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F9F5E7] p-6 rounded-lg relative">
              <div className="text-[#73946B] text-6xl absolute top-4 right-4 opacity-20">"</div>
              <div className="relative z-10">
                <div className="flex items-center text-amber-500 mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-[#73946B] italic mb-6">
                  "When we decided to renovate our historic home, finding craftspeople who could match the original woodwork was crucial. WoodCraft not only matched it perfectly but enhanced the home's character with new pieces that look completely authentic."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/12.jpg" 
                    alt="Elizabeth Johnson" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#73946B]"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-[#73946B]">Elizabeth Johnson</h4>
                    <p className="text-sm text-[#73946B]">Chicago, IL</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F9F5E7] p-6 rounded-lg relative">
              <div className="text-[#73946B] text-6xl absolute top-4 right-4 opacity-20">"</div>
              <div className="relative z-10">
                <div className="flex items-center text-amber-500 mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <p className="text-[#73946B] italic mb-6">
                  "As an interior designer, I've worked with many millwork companies, but WoodCraft stands above the rest. Their ability to translate my designs into exquisite wooden elements has made them my go-to partner for client projects."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Michael Rodriguez" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#73946B]"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-[#73946B]">Michael Rodriguez</h4>
                    <p className="text-sm text-[#73946B]">Interior Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomOrders;
