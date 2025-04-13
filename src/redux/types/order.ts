import { TUser } from "../features/auth/authSlice";
import { TProduct } from "./product";

 export interface TOrder {
    _id: string;
    product: TProduct;
    paidStatus: boolean;
    orderStatus: string;
    transactionId: string;
    userInfo: TUser;
    status: string;
  }