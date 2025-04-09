const products = [
    { id: 1, name: "Yamaha R15", brand: "Yamaha", price: "$3000" },
    { id: 2, name: "Honda CBR", brand: "Honda", price: "$3500" },
    { id: 3, name: "KTM Duke", brand: "KTM", price: "$4000" },
    { id: 4, name: "Suzuki GSX", brand: "Suzuki", price: "$3300" },
    { id: 5, name: "Bajaj Pulsar", brand: "Bajaj", price: "$2000" },
    { id: 6, name: "Hero Xtreme", brand: "Hero", price: "$1800" },
  ];
  
  const FeaturedProducts = () => {
    return (
      <div className="p-6 md:p-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.brand}</p>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800">View All</button>
        </div>
      </div>
    );
  };
  
  export default FeaturedProducts;
  