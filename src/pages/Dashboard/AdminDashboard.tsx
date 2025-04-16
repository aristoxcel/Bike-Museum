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
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/features/products/productApi";
import { TOrder } from "../../redux/types/order";
import { skipToken } from "@reduxjs/toolkit/query";
import { persistor } from "../../redux/store";
import {
  useChangeRoleMutation,
} from "../../redux/features/auth/authApi";
import { IUser } from "../../redux/types/user";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector(useCurrentUser);
  console.log(currentUser);

  
  const {
    data: user,
    isLoading: userLoading,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);
  console.log(user);

  const { data: usersData, refetch: refetchUser } = useGetAllUserDataQuery({});
  const { data: orderData, isLoading: ordersLoading } =
    useGetAdminOrdersDataQuery(currentUser?.email ?? skipToken);
  const { data: productData, isLoading: productsLoading, refetch: refetchProduct } =
    useGetAllProductsQuery({});
  // const [deactivateAccount] = useDeactivateAccountMutation();
  // const [activeAccount] = useActiveAccountMutation();
  const [changeRole] = useChangeRoleMutation();
  console.log(usersData)


  const [deleteProduct] = useDeleteProductMutation();

  const products = productData?.data || [];
  console.log(products.length)

  const handleLogout = () => {
    persistor.purge();
    dispatch(logout());
    localStorage.removeItem("auth_token");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const handleDelete = async (id: string) => { 
    try {
      
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");

      refetchProduct()
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // const handleDeactivate = async (email: string) => {
  //   try {
  //     await deactivateAccount({ email }).unwrap();
  //     toast.success("User deactivated successfully");
  //   } catch (err) {
  //     console.log(err)
  //     toast.error("Failed to deactivate user");
  //   }
  // };

  // const handleActivate = async (email: string) => {
  //   try {
  //     await activeAccount({ email }).unwrap();
  //     toast.success("User activated successfully");
  //   } catch (err) {
  //     console.log(err)
  //     toast.error("Failed to activate user");
  //   }
  // };

  const handleChangeRole = async (id: string, role: 'admin' | 'user') => {
    try {
      await changeRole({ id, role }).unwrap(); 
       
      toast.success("User role updated");
      refetchUser()
    } catch (err) {
      console.log(err);
      toast.error("Failed to update role");
    }
  };
  


  if (ordersLoading || productsLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <RingLoader size={80} color="#C2410C" />
      </div>
    );
  }

  const priceData = orderData?.map((item: TOrder) =>
    Number(item.product.price)
  );
  const totalPrice =
    priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;

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
                src={user?.data?.imageUrl || "/default-profile.png"}
                alt="Admin"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-400"
              />
              <h2 className="text-xl font-bold mb-2">{user?.data?.name || "Admin"}</h2>
              <p className="text-sm text-gray-400">{user?.data?.email}</p>
              <p className="text-sm text-gray-400">Role: {user?.data?.role}</p>
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

            {/* Product Management */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#3A2E42] p-4 rounded-lg mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Manage Products</h3>

              <div className="flex justify-end mb-4">
                <button
                  onClick={() => navigate("/admin/dashboard/products/add")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2B1E36]">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Stock</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => (
                      <tr key={product._id}>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">৳ {product.price}</td>
                        <td className="p-3">{product.inStock}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Orders Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#3A2E42] p-4 rounded-lg mt-8"
            >
              <h3 className="text-xl font-bold mb-4">Manage Orders</h3>
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
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#3A2E42] p-4 rounded-lg my-8"
            >
              <h3 className="text-xl font-bold mb-4">Manage Users</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2B1E36]">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData?.data?.map((user: IUser) => (
                      <tr key={user._id}>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3 capitalize">{user.role}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full ${user.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                              }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3 flex gap-2 flex-wrap">
                          {/* {user.status === "active" ? (
                            <button
                              onClick={() => handleDeactivate(user.email)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivate(user.email)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Activate
                            </button>
                          )} */}
                          <button
                            onClick={() =>
                              handleChangeRole(
                                user._id,
                                user.role === "admin" ? "user" : "admin"
                              )
                            }
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Make {user.role === "admin" ? "User" : "Admin"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
