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
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={product.photo} alt={product.name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Brand: {product.brand}</p>
        <p>Model: {product.name}</p>
        <p>Category: {product.category}</p>
        <p className="font-bold text-xl text-primary">${product.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${product._id}`} className="btn btn-sm btn-outline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
