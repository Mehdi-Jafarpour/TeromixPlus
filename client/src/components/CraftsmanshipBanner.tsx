import { Link } from "wouter";

const CraftsmanshipBanner = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565372557932-8fcaa0c3f118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')" }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#F9F5E7] text-[#8C7354] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Craftsmanship
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#4A3C2A] leading-tight mb-6">
              Dedication to Quality In Every Piece We Create
            </h2>
            <p className="text-[#8C7354] mb-6 leading-relaxed">
              At Teromix+, we believe that exceptional wooden elements are the foundation of a beautiful home. Each piece begins with selecting the finest sustainably-sourced hardwoods, which are then carefully transformed by our master craftspeople using both traditional techniques and modern precision.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#8C7354] mt-1 mr-3"></i>
                <span className="text-[#4A3C2A]">Sustainably sourced premium hardwoods</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#8C7354] mt-1 mr-3"></i>
                <span className="text-[#4A3C2A]">Handcrafted by master woodworkers</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#8C7354] mt-1 mr-3"></i>
                <span className="text-[#4A3C2A]">Meticulous attention to detail in every piece</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#8C7354] mt-1 mr-3"></i>
                <span className="text-[#4A3C2A]">Custom designs to match your vision</span>
              </li>
            </ul>
            <Link href="/about" className="inline-flex items-center px-6 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white rounded-md font-medium transition duration-300">
              Learn About Our Process <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1617104551722-6988fc70b411?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Craftsman working on wooden millwork" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-left-12 w-2/3 rounded-lg overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1611021061279-92662c6cd73c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                alt="Close up of woodworking detail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipBanner;
