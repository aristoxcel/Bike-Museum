import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-orange-500 to-orange-700">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">🏍️ Bike Museum</div>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="text-white hover:text-gray-900">Home</Link>
        </li>
        <li>
          <Link to="/products" className="text-white hover:text-gray-900">Products</Link>
        </li>
        <li>
          <Link to="/about-us" className="text-white hover:text-gray-900">About Us</Link>
        </li>
      </ul>

      {/* Login Button */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="border px-4 py-1 rounded text-white hover:bg-orange-600">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
