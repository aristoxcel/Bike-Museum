import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentFail = () => {
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get("transactionId");
    // const url = "https://bike-museum-server-tan.vercel.app/api";
    const url = "http://localhost:5000/api";

    useEffect(() => {
      if (transactionId) {
        axios.patch(`${url}/orders/update-status`, {
          transactionId,
          status: "cancelled",
        });
      }
    }, [transactionId]);
  
    return <h1>Payment Failed</h1>;
  };
  
  export default PaymentFail;
  