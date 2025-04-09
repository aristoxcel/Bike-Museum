import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../redux/features/products/productApi';

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
  if (isLoading) return <div className="flex justify-center items-center">Loading...</div>;

  // Show error message if there is an issue fetching the product
  if (isError) {
    const errorMessage = (error as ProductError)?.data?.message || 'Unknown error';
    return <div className="text-red-500">Error fetching product details: {errorMessage}</div>;
  }

  // If no product data is available, show a message
  if (!product) return <div>No product found.</div>;

  // Display the product details once available
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product?.photo || "https://via.placeholder.com/300"} // Fallback image if no product photo
            alt={product?.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-xl text-gray-700">{product?.category}</p>
          <p className="mt-2 text-gray-500">{product?.description}</p>
          <p className="mt-4 text-2xl font-semibold text-green-600">${product?.price}</p>
          <p className="mt-4 text-lg">Stock: {product?.quantity}</p>

          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg"
            onClick={() => {
              // Later: dispatch add to cart
              alert('Added to cart!');
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
