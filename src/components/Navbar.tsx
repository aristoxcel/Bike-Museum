import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-myGradient text-black font-semibold">
      {/* Logo */}
      <Link to="/" className=""><img className='h-[50px]' src={logo} alt="" /></Link>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        <li>
          <Link to="/" className=" hover:text-violet-800">Home</Link>
        </li>
        <li>
          <Link to="/products" className=" hover:text-violet-800">Products</Link>
        </li>
        <li>
          <Link to="/about-us" className=" hover:text-violet-800">About Us</Link>
        </li>
      </ul>

      {/* Login Button */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="border px-4 py-1 rounded  hover:bg-green-300">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
