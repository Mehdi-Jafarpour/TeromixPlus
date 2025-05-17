import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { CartSidebar } from "./CartSidebar";
import { useCart } from "@/contexts/CartContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  const { cart } = useCart();
  const { t } = useTranslation();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside or on a navigation link
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (mobileMenuOpen && !(e.target as HTMLElement).closest('#mobile-menu') && 
          !(e.target as HTMLElement).closest('#mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
<<<<<<< HEAD
              <span className="text-[#4A3C2A] font-playfair text-2xl md:text-3xl font-bold">Teromix</span>
              <span className="text-[#8C7354] font-playfair text-2xl md:text-2xl ml-1">+</span>
=======
              <img src="./src/logo.png" alt="Teromix+" className="w-[220px] h-[100px] mr-2" />
              
>>>>>>> ff91559 (strapi cms added)
            </Link>
            <button 
              id="mobile-menu-button" 
              className="md:hidden text-[#4A3C2A] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>

          <div id="mobile-menu" className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row mt-4 md:mt-0`}>
            <nav className="flex flex-col md:flex-row md:items-center md:ml-6 space-y-3 md:space-y-0">
              <Link href="/" className="text-[#4A3C2A] font-medium hover:text-[#8C7354] md:mx-4">
                {t('navigation.home')}
              </Link>
              <Link href="/products" className="text-[#4A3C2A] font-medium hover:text-[#8C7354] md:mx-4">
                {t('navigation.products')}
              </Link>
              <Link href="/services" className="text-[#4A3C2A] font-medium hover:text-[#8C7354] md:mx-4">
                {t('navigation.services')}
              </Link>
              <Link href="/custom-orders" className="text-[#4A3C2A] font-medium hover:text-[#8C7354] md:mx-4">
                {t('navigation.custom_orders')}
              </Link>
              <Link href="/about" className="text-[#4A3C2A] font-medium hover:text-[#8C7354] md:mx-4">
                {t('navigation.about')}
              </Link>
              <Link href="/contact" className="text-[#4A3C2A] font-medium hover:text-[#8C7354] md:mx-4">
                {t('navigation.contact')}
              </Link>
            </nav>
            <div className="flex md:ml-6 mt-4 md:mt-0 space-x-4 items-center">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder={t('navigation.search_placeholder')} 
                  className="px-4 py-2 rounded-full bg-[#F9F5E7] border border-[#A38F71] focus:outline-none focus:border-[#8C7354] text-sm w-full md:w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-2 text-[#8C7354]">
                  <i className="fas fa-search"></i>
                </button>
              </form>
              <Link href="/account" className="text-[#4A3C2A] hover:text-[#8C7354]">
                <i className="fas fa-user text-xl"></i>
              </Link>
              <LanguageSwitcher />
              <button 
                className="text-[#4A3C2A] hover:text-[#8C7354] relative"
                onClick={() => setCartOpen(true)}
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8C7354] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
