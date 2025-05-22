import { Link } from "wouter";

const About = () => {
  return (
    <div className="bg-[#F9F5E7]">
      {/* Hero Section */}
      <div className="relative bg-[#4A3C2A] h-[300px] md:h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&h=400&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">About Teromix+</h1>
          <p className="text-[#F9F5E7] text-lg md:text-xl max-w-2xl">
            Crafting exceptional wooden millwork and furniture with passion and precision since 1985
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white text-[#73946B] px-4 py-1 rounded-full text-sm font-medium mb-4">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#73946B] leading-tight mb-6">
                A Tradition of Excellence in Woodworking
              </h2>
              <p className="text-[#73946B] mb-6 leading-relaxed">
                Teromix+ began with a simple passion: creating beautiful, functional wooden pieces that stand the test of time. Founded in 1985 by master craftsman Thomas Anderson, our workshop started as a small operation focused on custom cabinetry in Portland, Oregon.
              </p>
              <p className="text-[#73946B] mb-6 leading-relaxed">
                Over the decades, we've grown into a team of skilled artisans dedicated to preserving traditional woodworking techniques while embracing modern innovations. What hasn't changed is our commitment to quality materials, meticulous craftsmanship, and sustainable practices.
              </p>
              <p className="text-[#73946B] leading-relaxed">
                Today, Teromix+ continues to be a family-owned business, creating custom wooden elements for homes across the country. Each piece that leaves our workshop carries with it not just exceptional quality, but the rich heritage of our craft.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://www.bestdesignprojects.com/wp-content/uploads/2019/03/The-Best-Of-American-Craftsmanship-In-Three-Amazing-Artists-capa-715x400.jpg" 
                alt="Craftsman working on wooden furniture" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 w-2/3 max-w-[250px]">
                <img 
                  src="https://images.unsplash.com/photo-1437034096614-74b8355ffd7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Wood workshop with tools" 
                  className="rounded-lg shadow-xl border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-[#F9F5E7] text-[#73946B] px-4 py-1 rounded-full text-sm font-medium mb-4">Our Values</span>
            <h2 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">
              The Principles That Guide Our Craft
            </h2>
            <p className="text-[#73946B]">
              At Teromix+, we believe in creating products that honor the natural beauty of wood while ensuring they serve your home for generations to come.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F9F5E7] p-8 rounded-lg shadow-md">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#73946B]">
                <i className="fas fa-tree text-2xl"></i>
              </div>
              <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-4">Sustainable Sourcing</h3>
              <p className="text-[#73946B]">
                We partner with responsible suppliers who practice sustainable forestry. Every piece of timber we use is carefully selected not just for its beauty, but for its ethical sourcing.
              </p>
            </div>
            
            <div className="bg-[#F9F5E7] p-8 rounded-lg shadow-md">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#73946B]">
                <i className="fas fa-hammer text-2xl"></i>
              </div>
              <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-4">Impeccable Craftsmanship</h3>
              <p className="text-[#73946B]">
                We honor traditional woodworking techniques that have stood the test of time. Our artisans spend years mastering their craft, ensuring every joint, curve, and finish is perfect.
              </p>
            </div>
            
            <div className="bg-[#F9F5E7] p-8 rounded-lg shadow-md">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#73946B]">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h3 className="font-playfair font-bold text-xl text-[#73946B] mb-4">Customer Collaboration</h3>
              <p className="text-[#73946B]">
                We believe the best results come from working closely with our customers. Whether you choose from our collections or commission a custom piece, your vision guides our hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Workshop */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-white text-[#73946B] px-4 py-1 rounded-full text-sm font-medium mb-4">Our Workshop</span>
            <h2 className="text-3xl font-playfair font-bold text-[#73946B] mb-4">
              Where Craftsmanship Comes to Life
            </h2>
            <p className="text-[#73946B]">
              Located in the heart of Portland, our workshop combines time-honored tools with modern technology to create exceptional wooden elements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://www.robertogiovannini.com/media/news/CF062228.jpg" 
                alt="Wood workshop with various tools" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://www.robertogiovannini.com/media/news/DSC00579.jpg" 
                alt="Craftsman working on wooden cabinets" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://www.robertogiovannini.com/media/news/CF062348.jpg" 
                alt="Selection of wood materials" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact">
              <button className="px-8 py-3 bg-[#73946B] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300">
                Visit Our Workshop
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-[#73946B] mb-6">
            Experience the Teromix+ Difference
          </h2>
          <p className="text-[#73946B] max-w-2xl mx-auto mb-8">
            Whether you're looking for a signature piece from our collections or seeking a custom creation, we're here to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <button className="px-8 py-3 bg-[#73946B] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300">
                Browse Our Collections
              </button>
            </Link>
            <Link href="/custom-orders">
              <button className="px-8 py-3 bg-transparent border-2 border-[#73946B] hover:bg-[#73946B] hover:text-white text-[#73946B] font-medium rounded-md transition duration-300">
                Start a Custom Project
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
