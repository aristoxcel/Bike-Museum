import { Link } from 'react-router-dom';
const ProductCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
          <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand} | {product.model}</p>
            <p className="text-primary font-bold">${product.price}</p>
            <Link
              to={`/products/${product._id}`}
              className="inline-block mt-2 text-blue-500 hover:underline text-sm"
            >
              View Details →
            </Link>
          </div>
        </div>
      );
};

export default ProductCard;