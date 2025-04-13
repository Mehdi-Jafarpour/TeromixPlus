import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  
  const carpentryServices = [
    {
      id: 1,
      name: "painting",
      title: t('services.painting.title'),
      description: t('services.painting.description'),
      icon: "fas fa-paint-roller",
      imageUrl: "https://images.unsplash.com/photo-1608613304899-ea8098577e38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "assembling",
      title: t('services.assembling.title'),
      description: t('services.assembling.description'),
      icon: "fas fa-tools",
      imageUrl: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "cutting",
      title: t('services.cutting.title'),
      description: t('services.cutting.description'),
      icon: "fas fa-cut",
      imageUrl: "https://images.unsplash.com/photo-1594712844133-d4193f13c17e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "custom",
      title: t('services.custom.title'),
      description: t('services.custom.description'),
      icon: "fas fa-drafting-compass",
      imageUrl: "https://images.unsplash.com/photo-1588159509476-12a702517d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-[#F9F5E7] min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh"
          }}>
        <div className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1556909172-bd5315ff1569?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"
            }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-[#342917]"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-playfair font-bold text-5xl">
                  {t('services.hero.title')}
                </h1>
                <p className="mt-4 text-lg text-[#F9F5E7]">
                  {t('services.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="pb-20 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {carpentryServices.map((service) => (
              <div key={service.id} className="lg:pt-12 pt-6 w-full md:w-6/12 lg:w-3/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-[#8C7354]">
                      <i className={service.icon}></i>
                    </div>
                    <h6 className="text-xl font-playfair font-bold text-[#4A3C2A]">{service.title}</h6>
                    <p className="mt-2 mb-4 text-[#8C7354]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Service Details */}
          {carpentryServices.map((service, index) => (
            <div key={service.id} id={service.name} className={`flex flex-wrap items-center mt-16 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-[#4A3C2A] p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-[#F9F5E7]">
                  <i className={service.icon}></i>
                </div>
                <h3 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-2">{service.title}</h3>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-[#8C7354]">
                  {service.description}
                </p>
                <p className="text-lg leading-relaxed mt-0 mb-4 text-[#8C7354]">
                  {t(`services.${service.name}.details`)}
                </p>
                <a href="/custom-orders" className="font-bold text-[#8C7354] hover:text-[#4A3C2A] mt-8 inline-block transition duration-300">
                  {t('services.request_quote')} <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                  <img
                    alt={service.title}
                    src={service.imageUrl}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <h4 className="text-xl font-bold text-[#4A3C2A]">
                      {t(`services.${service.name}.quote_title`)}
                    </h4>
                    <p className="text-md font-light mt-2 text-[#8C7354]">
                      {t(`services.${service.name}.quote`)}
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-playfair font-bold text-[#4A3C2A]">
                {t('services.cta.title')}
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-[#8C7354]">
                {t('services.cta.description')}
              </p>
              <a 
                href="/contact" 
                className="mt-6 inline-block px-6 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300 shadow-lg hover:shadow-xl"
              >
                {t('services.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;