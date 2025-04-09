
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../redux/features/products/productApi';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetSingleProductQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details: {(error as any)?.data?.message || 'Unknown error'}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700">{product.category}</p>
          <p className="mt-2 text-gray-500">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-green-600">
            ${product.price}
          </p>
          <p className="mt-4 text-lg">Stock: {product.quantity}</p>

          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg"
            onClick={() => {
              // Later: dispatch add to cart
              alert('Added to cart!');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
