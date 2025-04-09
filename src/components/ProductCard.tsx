import { Link } from "react-router-dom";

type Props = {
  product: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: "Mountain" | "Road" | "Hybrid" | "Electric";
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
    <div className="rounded-xl px-[2%] py-[3%] shadow-xl">
      <figure>
        <img
          src={product.photo}
          alt={product.name}
          className="h-48 shadow-2xl shadow-primary rounded-md w-full object-cover"
        />
      </figure>
      <div className="pt-4 px-4">
        <h2 className="font-bold text-xl">{product.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <div>
            <p>Brand: <span className="font-semibold font-mono">{product.brand}</span></p>
            <p>Model: <span className="font-semibold font-mono">{product.name}</span></p>
            <p>Category: <span className="font-semibold font-mono">{product.category}</span></p>
          </div>
          <div>
            <p className="font-bold text-xl text-primary font-mono">${product.price}</p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Link
            to={`/product/${product._id}`}
            className="myBtn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
