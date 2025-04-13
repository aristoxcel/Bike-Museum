import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import paymentFailed from "../../assets/paymentAssets/payment-failed.json"; 

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="text-center w-11/12 md:w-1/2 mx-auto">
        <Lottie animationData={paymentFailed} loop={true} className="h-80 mx-auto" />
        <h1 className="text-3xl font-bold text-yellow-400 mt-6">
          Payment Cancelled
        </h1>
        <p className="text-gray-400 mt-2">Something went wrong.</p>
      </div>

      <div className="my-10 flex gap-6 justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
