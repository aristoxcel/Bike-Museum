import { Link } from "react-router-dom";

type Props = {
  product: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
    photo?: string;
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="card bg-amber-100 shadow-2xl">
      <figure className="w-full">
        <img src={product.photo} alt={product.name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-orange-600 text-2xl font-bold">{product.name}</h2>
        <p className="text-lg font-light text-black">Brand: <span className="font-semibold">{product.brand}</span></p>
        {/* <p className="text-lg font-light text-black">Model: {product.name}</p> */}
        <p className="text-lg font-light text-black">Category: <span className="font-semibold">{product.category}</span></p>
        <p className="font-bold text-3xl text-red-600">${product.price}</p>
        <div className="card-actions justify-center text-right py-4">
          <Link to={`/products/${product._id}`} className="mt-2 px-3 py-1 border-4 text-xl border-orange-400 bg-orange-400  text-white hover:bg-transparent hover:text-orange-400 font-bold transition-colors duration-300">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
