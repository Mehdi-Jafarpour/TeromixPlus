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
      imageUrl: "https://www.familyhandyman.com/wp-content/uploads/2022/03/8-best-polyurethane-stains-ft-e1646690172271.jpg?fit=700%2C700"
    },
    {
      id: 2,
      name: "assembling",
      title: t('services.assembling.title'),
      description: t('services.assembling.description'),
      icon: "fas fa-tools",
      imageUrl: "https://refurn.com/wp-content/uploads/2024/02/furniture-stores-that-assemble.jpg"
    },
    {
      id: 3,
      name: "cutting",
      title: t('services.cutting.title'),
      description: t('services.cutting.description'),
      icon: "fas fa-cut",
      imageUrl: "https://www.stylecnc.com/uploads/240617/1-24061G60T2X4.jpg"
    },
    {
      id: 4,
      name: "custom",
      title: t('services.custom.title'),
      description: t('services.custom.description'),
      icon: "fas fa-drafting-compass",
      imageUrl: "https://sentientfurniture.com/wp-content/uploads/2024/11/Custom-Services-1-640x640.jpg"
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
              backgroundImage: "url('https://bns.co.uk/wp-content/uploads/2024/04/Local-Carpentry-Services-Choose-BNS-as-Your-Trusted-Residential-Commercial-Contractor-1.jpg')"
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
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-[#73946B]">
                      <i className={service.icon}></i>
                    </div>
                    <h6 className="text-xl font-playfair font-bold text-[#73946B]">{service.title}</h6>
                    <p className="mt-2 mb-4 text-[#73946B]">
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
                <div className="text-[#73946B] p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-[#F9F5E7]">
                  <i className={service.icon}></i>
                </div>
                <h3 className="text-3xl font-playfair font-bold text-[#73946B] mb-2">{service.title}</h3>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-[#73946B]">
                  {service.description}
                </p>
                <p className="text-lg leading-relaxed mt-0 mb-4 text-[#73946B]">
                  {t(`services.${service.name}.details`)}
                </p>
                <a href="/custom-orders" className="font-bold text-[#73946B] hover:text-[#4A3C2A] mt-8 inline-block transition duration-300">
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
                    <h4 className="text-xl font-bold text-[#73946B]">
                      {t(`services.${service.name}.quote_title`)}
                    </h4>
                    <p className="text-md font-light mt-2 text-[#73946B]">
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
              <h2 className="text-4xl font-playfair font-bold text-[#73946B]">
                {t('services.cta.title')}
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-[#73946B]">
                {t('services.cta.description')}
              </p>
              <a 
                href="/contact" 
                className="mt-6 inline-block px-6 py-3 bg-[#73946B] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300 shadow-lg hover:shadow-xl"
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