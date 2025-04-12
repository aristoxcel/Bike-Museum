import { useParams } from "react-router-dom";


const PaymentCancel = () => {
  const {id} = useParams()
  console.log(id);
  return (
    <div>PaymentCancel</div>
  )
}

export default PaymentCancel