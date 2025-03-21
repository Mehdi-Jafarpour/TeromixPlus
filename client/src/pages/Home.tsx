import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import CraftsmanshipBanner from "@/components/CraftsmanshipBanner";
import CustomWork from "@/components/CustomWork";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CraftsmanshipBanner />
      <CustomWork />
      <Testimonials />
      <Newsletter />
      <InstagramFeed />
    </>
  );
};

export default Home;
