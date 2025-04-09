import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => { 
    setIsDropdownOpen(!isDropdownOpen);
  };

  const user = true;

  return (


<nav className="z-50 flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-orange-500 to-orange-700">
  <div className="flex gap-6">
    {/* Brand */}
    <Link to="/">
      <span className="text-2xl font-bold text-white">🏍️ Bike Museum</span>
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex space-x-8 items-center">
      <Link to="/" className="text-lg text-white hover:text-gray-900">
        Home
      </Link>
      <Link to="/products" className="text-lg text-white hover:text-gray-900">
        All Products
      </Link>
      <Link to="/about-us" className="text-lg text-white hover:text-gray-900">
        About Us
      </Link>
      {!user && (
        <Link to="/login" className="border px-4 py-1 rounded text-white hover:bg-orange-600">
          Login
        </Link>
      )}

      {user && (
        <div className="relative">
          {/* Avatar */}
          <div
            className="rounded-full overflow-hidden cursor-pointer"
            onClick={toggleDropdown}
            aria-label="User Menu"
          >
            <img
              // src={user?.imageUrl}
              alt="User Avatar"
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-whit z-10  border border-gray-200 rounded-lg shadow-lg">
              <ul className="py-1">
                <li>
                  {user && (
                    <Link
                      // to={`/${user.role}/dashboard`}
                      to={`/dashboard`}
                      className="block w-full text-left px-4 py-2 hover:bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] "
                    >
                      Dashboard
                    </Link>
                  )}
                </li>
                <li>
                  <button
                    // onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Mobile Menu Toggle */}
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-2xl"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>
    </div>
  </div>


{/* Mobile Menu */}
{isMenuOpen && (
  <div className="md:hidden bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] space-y-4 py-4 px-6">
    <Link to="/" className="block text-lg hover:text-[#FFD700]">
      Home
    </Link>
    <Link
      to="/products"
      className="block text-lg hover:text-[#FFD700]"
    >
      All Products
    </Link>
    <Link to="/about-us" className="block text-lg hover:text-[#FFD700]">
      All Products
    </Link>
    {!user && (
      <Link to="/login" className="block text-lg hover:text-[#FFD700]">
        About Us
      </Link>
    )}
    {user && (
      <Link
        // to={`/${user.role}/dashboard`}
        to={`dashboard`}
        className="block text-lg hover:text-[#FFD700]"
      >
        Dashboard
      </Link>
    )}
    {user && (
      <button
        // onClick={handleLogout}
        className="block w-full text-left text-lg hover:text-[#FFD700]"
      >
        Logout
      </button>
    )}
  </div>
)}
</nav>
  );
};

export default Navbar;
