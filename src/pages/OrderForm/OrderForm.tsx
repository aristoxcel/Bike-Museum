import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleProductQuery } from "../../redux/features/products/productApi"; 
import { RingLoader } from "react-spinners";

const OrderForm = () => {
  const { id } = useParams();
  const url = "https://bike-museum-server-tan.vercel.app/api";

  const currentUser = useAppSelector(useCurrentUser);

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetSingleProductQuery(id as string); 

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);

  const inputClasses =
    "border p-2 w-full rounded-xl text-center border-one placeholder-opacity-70";

  interface IOrderData {
    user?: string;
    product: string;
    email: string;
    phone: number;
    address: string;
    transactionId: number;
    totalPrice?: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderData>();

  const onSubmit = (data: IOrderData) => {
    if (userLoading) {
      console.log("Loading user data...");
      return;
    }

    if (userError) {
      console.error("Error fetching user data:", userError);
      return;
    }

    if (!user?.data?._id) {
      console.error("User ID is missing. Full user data:", user);
      return;
    }

    data.transactionId = Number(Date.now());
    data.product = id as string;
    data.user = user.data._id;
    data.totalPrice = productData?.data?.price || 0; 

    console.log("Submitting Order:", data);

    axios
      .post(`${url}/orders/create-order`, data)
      .then((result) => {
        console.log("Order created:", result.data);
        axios
          .post(`${url}/payment/initiate`, data)
          .then((paymentResult) => {
            console.log("Payment initiated:", paymentResult.data);
            window.location.href = paymentResult.data.url;
          })
          .catch((error) => {
            console.error("Error:", error.response?.data || error.message);
          });
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
      });
  };

  return (
    <div className="w-10/12 mx-auto my-10 bg-four py-10 text-white">
      <div className="md:w-2/5 mx-auto">
        {/* Show product info */}
        {productLoading ? (
          <RingLoader size={80} color="#C2410C" />
        ) : productError ? (
          <p className="text-center text-red-500">Failed to load product.</p>
        ) : (
          <div className="mb-6 p-4 border rounded-xl bg-one text-white shadow-md text-center">
          <img
            src={productData?.data?.photo}
            alt={productData?.data?.name}
            className="w-32 h-32 object-cover mx-auto rounded-md mb-3"
          />
          
          <h2 className="text-xl font-bold mb-1">{productData?.data?.name}</h2>
          <p><strong>Category:</strong> {productData?.data?.category}</p>
          <p><strong>Price:</strong> ৳{productData?.data?.price}</p>
        </div>
        )}

        <h1 className="text-2xl font-bold mb-6 text-center">Order Form</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Email */}
          <div className="w-full">
            <h2 className="text-lg mb-2 text-center">Your Email</h2>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              placeholder="example@gmail.com"
              className={inputClasses}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          {/* Address */}
          <div className="w-full">
            <h2 className="text-lg mb-2 text-center">Address</h2>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Street, Village, District"
              className={inputClasses}
            />
            {errors.address && (
              <span className="text-red-600">{errors.address.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="w-full">
            <h2 className="text-lg mb-2 text-center">Phone Number</h2>
            <input
              type="number"
              {...register("phone", {
                required: "Phone number is required",
                valueAsNumber: true,
              })}
              placeholder="017XXXXXXXX"
              className={inputClasses}
            />
            {errors.phone && (
              <span className="text-red-600">{errors.phone.message}</span>
            )}
          </div>

          {/* Submit */}
          <div className="w-1/2 mx-auto pt-4">
            <button
              type="submit"
              className="hover:cursor-pointer hover:bg-black hover:text-white transition-all w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md duration-300"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
