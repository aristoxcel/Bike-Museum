import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";
import {
  useDeleteOrderMutation,
  useGetUserOrdersDataQuery,
} from "../../redux/features/orders/orderApi";
import { TOrder } from "../../redux/types/order";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";

const ViewUserOrderHistory: React.FC = () => {
  const currentUser = useAppSelector(useCurrentUser);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);

  const [deleteOrder] = useDeleteOrderMutation();
  const { data: orderData, isLoading: ordersLoading, error: ordersError } = useGetUserOrdersDataQuery(user?.data?._id ?? skipToken);

  const [userOrderData, setUserOrderData] = useState<TOrder[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TOrder | null>(null);

  useEffect(() => {
    if (orderData) {
      setUserOrderData(orderData.data);
    }
  }, [orderData]);

  if (userLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <RingLoader size={80} color="#C2410C" />
      </div>
    );
  }

  if (userError || ordersError) {
    toast.error("Failed to fetch data. Please try again later.");
    return null;
  }

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      const updatedOrders = userOrderData.filter(order => order._id !== orderId);
      setUserOrderData(updatedOrders);
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {userOrderData.map((item: TOrder) => (
              <tr key={item._id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full h-12 w-12 overflow-hidden">
                      <img
                        src={item?.product?.photo}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{item?.product?.name}</td>
                <td className="px-6 py-4">৳ {item?.product?.price}</td>
                <td className="px-6 py-4">{item?.product?.category}</td>
                <td className="px-6 py-4">{item?.transactionId}</td>
                <td className="px-6 py-4">{item?.status}</td>
                <td className="py-4 text-center">
                  <button
                    onClick={() => handleDeleteOrder(item._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                    onClick={() => setSelectedCategory(item)}
                  >
                    Product Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-lg w-96 p-6 relative">
            <h3 className="font-bold text-lg mb-4">Product Details</h3>
            <p className="py-2">
              <strong>Brand:</strong> {selectedCategory?.product?.brand}
            </p>
            <p className="py-2">
              <strong>Price:</strong> {selectedCategory?.product?.price}
            </p>

            <div className="absolute top-3 right-3">
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                onClick={() => setSelectedCategory(null)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserOrderHistory;