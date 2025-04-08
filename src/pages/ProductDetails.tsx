
const ProductDetails = (name, brand, model, price, category, quantity, image) => {
    return (
        <div className="container mx-auto p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <img src={image} alt={name} className="rounded-xl w-full object-cover" />
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-600">{brand} | {model}</p>
              <p className="text-xl text-primary font-semibold">${price}</p>
              <p className="text-sm text-gray-500">Category: {category}</p>
              <p className="text-sm">Stock: {quantity > 0 ? quantity : 'Out of stock'}</p>
    
              <button
                disabled={quantity === 0}
                onClick={() => navigate(`/checkout/${id}`)}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${
                    quantity > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      );

};

export default ProductDetails;