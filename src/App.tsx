import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import { useAppDispatch } from './redux/hooks';
import { verifyToken } from './redux/utils/verifyToken';
import { setUser, TUser } from './redux/features/auth/authSlice';
import { RingLoader } from 'react-spinners';

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const user = verifyToken(token) as TUser;
      if (user) {
        dispatch(setUser({ user, token }));
      }
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen  px-4">
        <RingLoader size={80} color="#C2410C" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="bg-gradient-to-b from-[#1f1c2c] via-[#2d1e40] to-[#0f0c29] fixed top-0 left-0 w-full min-h-screen -z-10"></div>

        <div>
          <Navbar />
          <Toaster />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
