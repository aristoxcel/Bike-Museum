import Testimonial from "../components/HomePageComponents/Testimonial";
import Banner from "../components/HomePageComponents/Banner";
import FeatureSection from "../components/HomePageComponents/FeaturedProducts";

const Home = () => {
  return (
    <div className="font-sans">
      <Banner/>
      <FeatureSection/>
      <Testimonial/>
    </div>
  );
};

export default Home;
