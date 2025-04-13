import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useGetAllUserDataQuery,
  useGetUserByEmailQuery,
} from "../../redux/features/auth/authApi";
import { useGetAdminOrdersDataQuery } from "../../redux/features/orders/orderApi";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { TOrder } from "../../redux/types/order";
import { skipToken } from "@reduxjs/toolkit/query";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector(useCurrentUser);

  // ✅ Get full admin info by email
  const {
    data: user,
    isLoading: userLoading,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);

  const { data: usersData } = useGetAllUserDataQuery(skipToken);
  const { data: orderData, isLoading: ordersLoading } = useGetAdminOrdersDataQuery(
    currentUser?.email ?? skipToken
  );
  const { isLoading: productsLoading } = useGetAllProductsQuery(skipToken);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  if (ordersLoading || productsLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <RingLoader size={80} color="#C2410C" />
      </div>
    );
  }

  const priceData = orderData?.map((item: TOrder) => Number(item.product.price));
  const totalPrice = priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 bg-[#2B1E36] p-6 rounded-lg shadow-lg min-h-screen"
          >
            <div className="text-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={user?.imageUrl || "/default-profile.png"}
                alt="Admin"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-400"
              />
              <h2 className="text-xl font-bold mb-2">{user?.name || "Admin"}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-400">Role: {user?.role}</p>
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

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3 bg-[#2B1E36] p-6 rounded-lg shadow-lg min-h-screen"
          >
            <h1 className="text-2xl font-bold mb-6">Sales Summary</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-[#3A2E42] p-4 rounded-lg">
                <h3 className="text-gray-400">Total Sell</h3>
                <p className="text-2xl font-bold">৳ {totalPrice}</p>
                <div className="h-1 bg-purple-500 mt-2 rounded-full w-3/4" />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="bg-[#3A2E42] p-4 rounded-lg">
                <h3 className="text-gray-400">Active Orders</h3>
                <p className="text-2xl font-bold">{orderData?.length}</p>
                <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="bg-[#3A2E42] p-4 rounded-lg">
                <h3 className="text-gray-400">New Users</h3>
                <p className="text-2xl font-bold">{usersData?.data?.length}</p>
                <div className="h-1 bg-blue-500 mt-2 rounded-full w-1/3" />
              </motion.div>
            </div>

            {/* Sales Trends */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#3A2E42] p-4 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Sales Trends</h3>
              <div className="h-48 bg-[#2B1E36] rounded-lg p-4">
                <div className="flex h-full items-end justify-between">
                  {[60, 80, 45, 90, 75].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1 }}
                      className="w-12 bg-purple-500 mx-1 rounded-t-lg"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#3A2E42]">
                  <tr>
                    <th className="p-3 text-left">Transaction ID</th>
                    <th className="p-3 text-left">Buyer</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((item: TOrder) => (
                    <tr key={item._id}>
                      <td className="p-3">{item.transactionId}</td>
                      <td className="p-3">{item?.userInfo?.name}</td>
                      <td className="p-3">৳ {item?.product?.price}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {item.orderStatus}
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

export default AdminDashboard;
