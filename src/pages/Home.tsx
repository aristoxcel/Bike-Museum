import Navbar from '../pages/components/Navbar';
import Banner from '../pages/components/Banner';

import Testimonials from '../pages/components/Testimonials';
import Footer from '../pages/components/Footer';

const Home = () => {
  return (
    <div className="bg-white text-black font-sans">
      <Navbar />
      <Banner />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
