import React, { useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

import { RingLoader } from "react-spinners";

import { toast } from "sonner";
import { useDeleteOrderMutation, useGetUserOrdersDataQuery } from "../../redux/features/orders/orderApi";
import { TOrder } from "../../redux/types/order";

const ViewUserOrderHistory: React.FC = () => {
  const user = useAppSelector(useCurrentUser); // present user data selection
  const [deleteOrder] = useDeleteOrderMutation();
  // API sent to userEmailData 
  const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });

  // console.log("data =>", data);
  const [selectedCategory, setSelectedCategory] = useState<TOrder | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen  px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const userOrderData = data?.data;
  const handleDeleteOrder = async (id: string) => {
    // console.log(id);
    const orderInfo = {
      id: id,
    };

    // console.log(orderInfo);

    try {
      const result = await deleteOrder(orderInfo).unwrap();
      // console.log(result);
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Table Head */}
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
            {/* Table Rows */}
            {userOrderData?.map((item: TOrder) => (
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
                <td className="px-6 py-4">{item?.product?.name }</td>
                <td className="px-6 py-4">৳ {item?.product?.price}</td>
                <td className="px-6 py-4">{item?.product?.category}</td>
                <td className="px-6 py-4">
                  {item?.transactionId.slice(0, 10)}...
                </td>
                <td className="px-6 py-4">{item?.orderStatus}</td>
                <td className="py-4 text-center">
                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                    onClick={() => setSelectedCategory(item)} // Open modal
                  >
                    Product Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-5">
          <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-lg w-96 p-6 relative">
            <h3 className="font-bold text-lg mb-4">Product  Details</h3>
            <p className="py-2">
              <strong>Brand:</strong> {selectedCategory?.product?.brand}
            </p>
            <p className="py-2">
              <strong>Price:</strong> {selectedCategory?.product?.price}
            </p>

            <div className="absolute top-3 right-3">
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                onClick={() => setSelectedCategory(null)} // Close modal
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
