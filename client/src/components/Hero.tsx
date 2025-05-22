import { Link } from "wouter";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative h-[500px] bg-[#73946B]">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&h=500&q=80')" }}
      >
      </div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-[#F9F5E7] font-light mb-8">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="px-8 py-3 bg-[#73946B] hover:bg-[#8C7354] text-white font-medium rounded-md transition duration-300 shadow-lg hover:shadow-xl">
              {t('home.hero.cta')}
            </Link>
            <Link href="/custom-orders" className="px-8 py-3 bg-transparent border-2 border-[#F9F5E7] hover:bg-[#F9F5E7]/20 text-white font-medium rounded-md transition duration-300">
              {t('navigation.custom_orders')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
