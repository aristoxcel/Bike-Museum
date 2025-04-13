export type TUserRole = "user" | "admin";
export type TUserStatus = "active" | "blocked";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  imageUrl?: string; // Optional if not every user has it
  createdAt?: string;
  updatedAt?: string;
}
