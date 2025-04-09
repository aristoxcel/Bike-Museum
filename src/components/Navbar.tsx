const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-orange-500 to-orange-700">
      <div className="text-2xl font-bold text-white">🏍️ Bike Museum</div>
      <ul className="flex gap-6">
        <li className="text-white hover:text-gray-900">Home</li>
        <li className="text-white hover:text-gray-900">All Products</li>
        <li className="text-white hover:text-gray-900">Product Details Page</li>
        <li className="text-white hover:text-gray-900">About Page</li>
      </ul>
      <div className="flex gap-4">
        <button className="border px-4 py-1 rounded text-white hover:bg-orange-600">Login</button>
        <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
