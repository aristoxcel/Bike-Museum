import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RingLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserOrdersDataQuery } from "../../redux/features/orders/orderApi";
import { TOrder } from "../../redux/types/order";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";

const UserDashboard = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

 
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);
 
  const {
    data: orderResponse,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetUserOrdersDataQuery(userData?.data?._id ?? skipToken);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };


  if (userLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <RingLoader size={80} color="#C2410C" />
      </div>
    );
  }

  // Show error
  if (userError || ordersError) {
    toast.error("Failed to fetch data. Please try again later.");
    return null;
  }

  if (!userData?.data?.email) {
    toast.error("User email is missing!");
    return null;
  }

  const orderData = orderResponse?.data || [];
  const priceData = orderData.map((item: TOrder) => Number(item?.product?.price));
  const totalPrice = priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.aside
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 bg-[#2B1E36] p-6 rounded-lg shadow-lg min-h-screen"
          >
            <div className="text-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={userData?.data.imageUrl || "/default-avatar.png"}
                alt="User"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-400"
              />
              <h2 className="text-xl font-bold mb-2">{userData?.data?.name || "User"}</h2>
              <p className="text-sm text-gray-400">{userData?.data?.email}</p>
              <p className="text-sm text-gray-400">Role : {userData?.data?.role || "N/A"}</p>
            </div>

            <div className="my-10 flex flex-col items-center justify-center gap-5">
              <Link
                to="/"
                className="w-[150px] text-center px-12 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="w-[150px] text-center px-12 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </motion.aside>

          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3 bg-[#2B1E36] p-6 rounded-lg shadow-lg min-h-screen"
          >
            <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#3A2E42] p-4 rounded-lg"
              >
                <h3 className="text-gray-400">Total Spend</h3>
                <p className="text-2xl font-bold">৳ {totalPrice}</p>
                <div className="h-1 bg-purple-500 mt-2 rounded-full w-3/4" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#3A2E42] p-4 rounded-lg"
              >
                <h3 className="text-gray-400">Active Orders</h3>
                <p className="text-2xl font-bold">{orderData.length}</p>
                <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
              </motion.div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Order Summary</h1>
                {/* <Link
                  to="/user/dashboard/edit-orders"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Edit Orders
                </Link> */}
              </div>
              <table className="w-full">
                <thead className="bg-[#3A2E42]">
                  <tr>
                    <th className="p-3 text-left">Transaction ID</th>
                    <th className="p-3 text-left">Product Name</th>
                    <th className="p-3 text-left">Brand</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((item: TOrder) => (
                    <tr key={item._id}>
                      <td className="p-3">{item.transactionId}</td>
                      <td className="p-3">{item.product?.name}</td>
                      <td className="p-3">{item.product?.brand}</td>
                      <td className="p-3">৳ {item.product?.price}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
