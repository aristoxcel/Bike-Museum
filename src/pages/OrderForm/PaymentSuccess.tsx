import Lottie from "lottie-react";
import { useParams, useNavigate } from "react-router-dom";
import paymentSuccess from "../../assets/paymentAssets/payment-success.json";

const PaymentSuccess = () => {
  const { tran_Id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="text-white min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="text-center w-11/12 md:w-1/2 mx-auto">
        <Lottie animationData={paymentSuccess} loop={true} className="h-80 mx-auto" />
        <h1 className="flex justify-center items-center font-bold font-mono text-red-500 mt-4">
          <span className="text-2xl pr-2">Transaction ID:</span> {tran_Id}
        </h1>
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
          Shop More
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
