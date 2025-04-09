import { useState, useEffect } from 'react';
// Import images (make sure they are in the right folder, e.g., src/assets)
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

// Carousel image array
const bannerImages = [banner1, banner2, banner3];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="w-full h-[1000px] md:h-[500px] overflow-hidden relative">
      {/* Carousel Image */}
      <img
        src={bannerImages[current]}  // Use the current image in the array
        alt={`Banner ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-1000"
      />
      {/* Text Overlay (optional) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold">Welcome to Bike Museum</h1>
      </div>
    </div>
  );
};

export default Banner;
