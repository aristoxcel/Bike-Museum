import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // To navigate to the all products page
import { useGetAllProductsQuery } from '../../redux/features/products/productApi'; // Assuming RTK Query
import ProductCard from '../ProductCard'; // Assuming you have a ProductCard component

const FeatureSection = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  // Fetch all products from the API
  const { data, isLoading, error } = useGetAllProductsQuery({});

  // Update the featured products once data is fetched
  useEffect(() => {
    if (data && data.data) {
      setFeaturedProducts(data.data.slice(0, 3)); // Get the first 3 products
    }
  }, [data]);

  return (
    <section className="px-14 py-20">
      <h2 className="text-5xl pb-10 text-orange-500 font-bold mb-6 text-center">Featured Products</h2>

      {/* Check for loading or error */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-center">No featured products available.</div>
          )}
        </div>
      )}

      {/* View More Button */}
      <div className="text-center mt-6 pt-8">
      <Link to={`/products`} className="mt-4 px-10 py-4 border-4 text-2xl border-orange-400  text-orange-400 hover:bg-orange-400 hover:text-white font-extrabold transition-colors duration-300">
            View More
          </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
