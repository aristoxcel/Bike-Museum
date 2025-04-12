// In your PaymentSuccess.tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
//   const url = "https://bike-museum-server-tan.vercel.app/api";
const url = "http://localhost:5000/api";


  useEffect(() => {
    if (transactionId) {
      axios.patch(`${url}/orders/update-status`, {
        transactionId,
        status: "paid",
      });
    }
  }, [transactionId]);

  return <h1>Payment Successful!</h1>;
};

export default PaymentSuccess;
