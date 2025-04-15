import { Link, useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../redux/features/products/productApi';
import { RingLoader } from 'react-spinners';

interface ProductError {
  data: {
    message: string;
  };
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  console.log("Product ID:", id);

  // Fetch product details using the id
  const { data: response, isLoading, isError, error } = useGetSingleProductQuery(id!);

  // Extract product data from the response
  const product = response?.data;

  // Debugging logs
  console.log("Product Data:", product);
  console.log("Loading:", isLoading);
  console.log("Error:", error);

  // Show loading state
  if (isLoading) return       <div className="flex items-center justify-center min-h-screen  px-4">
  <RingLoader size={80} color="#C2410C" />
</div>

  // Show error message if there is an issue fetching the product
  if (isError) {
    const errorMessage = (error as ProductError)?.data?.message || 'Unknown error';
    return <div className="text-red-500">Error fetching product details: {errorMessage}</div>;
  }

  // If no product data is available, show a message
  if (!product) return <div>No product found.</div>;

  // Display the product details once available
  return (
    <div className="container mx-auto py-10  px-10 lg:px-32">
      <h1 className='text-5xl font-bold text-orange-400 text-center my-10'>Product Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-[0_4px_20px_rgba(255,165,0,0.3)] rounded-4xl">
        <div className='w-full max-h-fit'>
          <img
            src={product?.photo || "https://via.placeholder.com/300"} 
            alt={product?.name}
            className="w-full rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl h-full object-cover "
          />
        </div>
        <div className='px-8 py-8'>
          <h1 className="text-3xl md:text-5xl  text-orange-400 font-bold">{product?.name}</h1>
          <p className="text-xl mt-2 text-amber-100">{product?.category}</p>
          <p className="mt-2 text-amber-50">{product?.description}</p>
          <p className="mt-6 text-4xl font-semibold text-red-400">${product?.price}</p>
          <p className="mt-2 mb-4 text-amber-200 text-lg">Stock: {product?.quantity}</p>

          <div className='flex mt-8 md:mt-0 justify-between'>
            <Link
              to={`/products/orderForm/${product._id}`}
              className="mt-4 px-10 py-4 border-4 text-2xl border-orange-400  text-orange-400 hover:bg-orange-400 hover:text-white font-extrabold transition-colors duration-300"
              
            >
              Buy Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;