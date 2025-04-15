import { Link } from 'react-router-dom';
import logo from '../assets/logos.png';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, useCurrentUser } from '../redux/features/auth/authSlice';
import { useGetUserByEmailQuery } from '../redux/features/auth/authApi';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(useCurrentUser);

  const { data: user, isLoading: userLoading } = useGetUserByEmailQuery(currentUser?.email ?? '');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth_token");
    setIsDropdownOpen(false);
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* You can place a spinner here */}
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-orange-500 to-orange-700">
      {/* Logo */}
      <Link to="/"><img className="h-[50px]" src={logo} alt="Logo" /></Link>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
        <li><Link to="/products" className="text-white hover:text-gray-200">All Products</Link></li>
        <li><Link to="/about-us" className="text-white hover:text-gray-200">About Us</Link></li>
      </ul>

      {/* Avatar or Login */}
      <div className="relative">
        {currentUser && user ? (
          <div className="relative">
            <button
              className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
              onClick={toggleDropdown}
              aria-label="User Menu"
            >
              <img
                src={user?.data?.imageUrl || '/default.jpg'}
                alt="User Avatar"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 text-white bg-gradient-to-b from-orange-500 to-orange-700 border border-orange-400 rounded-lg shadow-lg z-50">
                <ul className="py-1">
                  <li>
                    <Link
                      to={`/${user?.data?.role}/dashboard`}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="border px-4 py-1 rounded text-white hover:bg-orange-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
