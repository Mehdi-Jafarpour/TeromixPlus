import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import CraftsmanshipBanner from "@/components/CraftsmanshipBanner";
import CustomWork from "@/components/CustomWork";
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
      <Newsletter />
      <InstagramFeed />
    </>
  );
};

export default Home;
