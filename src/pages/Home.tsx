import Testimonial from "../components/HomePageComponents/Testimonial";
import Banner from "../components/HomePageComponents/Banner";
import Marquee from "react-fast-marquee";

import h1 from "../assets/images/h1.png";
import h2 from "../assets/images/h2.png";
import h3 from "../assets/images/h3.png";
import h4 from "../assets/images/h4.png";
import h5 from "../assets/images/h5.png";
import h6 from "../assets/images/h6.png";
import h7 from "../assets/images/h7.png";
import h8 from "../assets/images/h8.png";
import h9 from "../assets/images/h9.png";
import h10 from "../assets/images/h10.png";
import h11 from "../assets/images/h11.png";
import h12 from "../assets/images/h12.png";
import explore from "../assets/images/explore.png"; // 

const Home = () => {
  return (
    <div className="font-sans">
      {/* Banner Section */}
      <Banner />

      {/* Marquee with bike images */}
      <div className="bg-orange-100 py-6 my-6">
        <Marquee gradient={false} speed={40}>
          <img src={h1} alt="Bike 1" className="h-32 mx-4 rounded shadow-md" />
          <img src={h2} alt="Bike 2" className="h-32 mx-4 rounded shadow-md" />
          <img src={h3} alt="Bike 3" className="h-32 mx-4 rounded shadow-md" />
          <img src={h4} alt="Bike 4" className="h-32 mx-4 rounded shadow-md" />
          <img src={h5} alt="Bike 5" className="h-32 mx-4 rounded shadow-md" />
          <img src={h6} alt="Bike 6" className="h-32 mx-4 rounded shadow-md" />
          <img src={h7} alt="Bike 7" className="h-32 mx-4 rounded shadow-md" />
          <img src={h8} alt="Bike 8" className="h-32 mx-4 rounded shadow-md" />
          <img src={h9} alt="Bike 9" className="h-32 mx-4 rounded shadow-md" />
          <img src={h10} alt="Bike 10" className="h-32 mx-4 rounded shadow-md" />
          <img src={h11} alt="Bike 11" className="h-32 mx-4 rounded shadow-md" />
          <img src={h12} alt="Bike 12" className="h-32 mx-4 rounded shadow-md" />
        </Marquee>
      </div>

      {/* Special Services Section with larger text and image */}
      <div className="flex flex-col-1 lg:flex-row items-center justify-between px-10 py-20 bg-white gap-16">
        {/* Left Side - Large Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-6xl font-extrabold text-orange-600 mb-8">
            Check out our special services
          </h2>
          <p className="text-3xl text-gray-700 leading-relaxed">
            Explore exclusive services that cater to vintage and modern bikes, from restoration to customization.
          </p>
        </div>

        {/* Right Side - Large Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={explore}
            alt="Special Bike Services"
            className="rounded-2xl shadow-xl w-full max-w-4xl"  // Increased max width to make the image larger
          />
        </div>
      </div>

      {/* Testimonials */}
      <Testimonial />
    </div>
  );
};

export default Home;
