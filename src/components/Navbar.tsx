import { Link } from 'react-router-dom';
import logo from '../assets/logos.png'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, useCurrentUser } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dispatch = useAppDispatch();
  // const user = useAppSelector(useCurrentUser);
  const user = true;
  // console.log(user?.imageUrl);

  const handleLogout = () => {
    dispatch(logout());
  };



  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-orange-500 to-orange-700">
      {/* Logo */}
      <Link to="/" className=""><img className='h-[50px]' src={logo} alt="" /></Link>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="text-white hover:text-gray-900">Home</Link>
        </li>
        <li>
          <Link to="/products" className="text-white hover:text-gray-900">All Products</Link>
        </li>
        <li>
          <Link to="/about-us" className="text-white hover:text-gray-900">About Us</Link>
        </li>
      </ul>

      {/* Login Button */}
      <div className="flex gap-4">
       
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
                    src={user?.imageUrl}
                    alt="User Avatar"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 text-white bg-gradient-to-b from-orange-500 to-orange-700 text-whit z-10  border border-orange-400 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li>
                        {user && (
                          <Link
                            to={`/${user.role}/dashboard`}
                            className="block w-full text-left px-4 py-2 hover:bg-gradient-to-b from-orange-700 to-orange-500 "
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gradient-to-r from-orange-500 to-orange-700"
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
    </nav>
  );
};

export default Navbar;
