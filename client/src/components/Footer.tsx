import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#342917] text-[#F9F5E7]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-white font-playfair text-2xl font-bold">Teromix</span>
              <span className="text-[#A38F71] font-playfair text-xl">+</span>
            </Link>
            <p className="text-[#F9F5E7]/80 mb-6">Crafting exceptional wooden millwork for distinctive homes since 1985.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#F9F5E7] hover:text-[#A38F71] transition-colors">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-[#F9F5E7] hover:text-[#A38F71] transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-[#F9F5E7] hover:text-[#A38F71] transition-colors">
                <i className="fab fa-pinterest-p text-lg"></i>
              </a>
              <a href="#" className="text-[#F9F5E7] hover:text-[#A38F71] transition-colors">
                <i className="fab fa-houzz text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-[#F9F5E7]/80 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products?category=interior-doors" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Interior Doors</Link></li>
              <li><Link href="/products?category=cabinetry" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Cabinetry</Link></li>
              <li><Link href="/products?category=moldings" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Moldings & Trim</Link></li>
              <li><Link href="/products?category=furniture" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Custom Furniture</Link></li>
              <li><Link href="/products?category=decor" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Home Decor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-[#F9F5E7]/80 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/custom-orders" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link href="/shipping" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Care Instructions</Link></li>
              <li><Link href="/warranty" className="text-[#F9F5E7]/80 hover:text-white transition-colors">Warranty Information</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Visit Our Workshop</h3>
            <address className="text-[#F9F5E7]/80 not-italic mb-4">
              123 Craftsman Way<br />
              Portland, OR 97205<br /><br />
              <a href="tel:+15035551234" className="hover:text-white transition-colors">Phone: (503) 555-1234</a><br />
              <a href="mailto:info@teromixplus.com" className="hover:text-white transition-colors">info@teromixplus.com</a>
            </address>
            <p className="text-[#F9F5E7]/80">
              <span className="block mb-1"><strong className="text-white">Hours:</strong></span>
              Monday-Friday: 9am-6pm<br />
              Saturday: 10am-4pm<br />
              Sunday: Closed
            </p>
          </div>
        </div>
        
        <div className="border-t border-[#8C7354]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#F9F5E7]/70 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Teromix+. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#F9F5E7]/70">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
