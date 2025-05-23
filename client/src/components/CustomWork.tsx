import { Link } from "wouter";

const CustomWork = () => {
  return (
    <section id="custom" className="py-16 bg-[#F9F5E7]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">Custom Millwork Solutions</h2>
          <p className="text-[#73946B]">
            Have a specific vision for your space? Our master craftspeople can bring your ideas to life with custom-designed wooden elements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48">
              <img 
                src="https://www.1benmu.com/wp-content/uploads/2023/10/Expert-Millwork-Contractors.jpg" 
                alt="Custom Kitchen Design" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-3">1. Design Consultation</h3>
              <p className="text-[#73946B] mb-4">
                Schedule a one-on-one meeting with our design team to discuss your vision, requirements, and space.
              </p>
              <Link href="/custom-orders#consultation" className="inline-flex items-center text-[#73946B] hover:text-[#4A3C2A] font-medium border-b border-[#73946B] pb-1 hover:border-[#4A3C2A] transition-colors">
                Schedule Consultation <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48">
              <img 
                src="https://www.1benmu.com/wp-content/uploads/2023/10/Handcrafted-Millwork.jpg" 
                alt="Custom Blueprint Design" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-3">2. Custom Blueprints</h3>
              <p className="text-[#73946B] mb-4">
                Our design team creates detailed blueprints and renders to visualize your custom millwork project.
              </p>
              <Link href="/custom-orders#samples" className="inline-flex items-center text-[#73946B] hover:text-[#4A3C2A] font-medium border-b border-[#73946B] pb-1 hover:border-[#4A3C2A] transition-colors">
                View Sample Designs <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48">
              <img 
                src="https://www.elogictech.com/uploads/services/1588051216_millwork-drawing.jpg" 
                alt="Handmade Woodworking" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-3">3. Handcrafted Creation</h3>
              <p className="text-[#73946B] mb-4">
                Our master craftspeople bring your design to life, with meticulous attention to detail and premium materials.
              </p>
              <Link href="/custom-orders#process" className="inline-flex items-center text-[#73946B] hover:text-[#4A3C2A] font-medium border-b border-[#73946B] pb-1 hover:border-[#4A3C2A] transition-colors">
                Our Crafting Process <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/custom-orders" className="inline-flex items-center px-8 py-3 bg-[#73946B] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300 shadow-md hover:shadow-lg">
            Start Your Custom Project <i className="fas fa-long-arrow-alt-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomWork;
